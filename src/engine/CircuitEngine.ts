// Keep this import first: it loads CircuitJS1's modules in the order they need.
import { createHeadlessApp } from "./headlessApp";
import { CirSim } from "circuitjs/CirSim";
import { CircuitLoader } from "circuitjs/CircuitLoader";
import type { SimulationManager } from "circuitjs/SimulationManager";
import { CircuitElement } from "./CircuitElement";

export type EngineEvent =
    /** After every simulated timestep. */
    | "step"
    /** After every real-time frame while running (the moment to refresh a display). */
    | "frame"
    /** After the circuit was re-analysed because something in it changed. */
    | "analyze"
    /** When the simulator stops with a problem; see CircuitEngine.error. */
    | "error";

/** What CircuitEngine.probe() found at a point of the drawing. */
export interface Probe {
    element: CircuitElement;
    /** The terminal the point is on, or null for the element's body. */
    terminal: number | null;
}

export interface EngineError {
    /** CircuitJS1's message, e.g. "Singular matrix!" or "Voltage source/wire loop with no resistance!". */
    message: string;
    /** The element CircuitJS1 blames, when it names one. */
    element: CircuitElement | null;
}

type Listener = (engine: CircuitEngine) => void;

/**
 * Our API over a CircuitJS1 simulation (Paul Falstad's simulator, imported
 * unmodified from ./circuitjs1): load a circuit, run it continuously or step
 * by step, read voltages and currents, and change the circuit while it runs.
 *
 * It comes in two forms with the same API:
 *  - create(): no user interface at all; the engine drives the simulation.
 *  - attach(app): on top of the full CircuitJS1 application, which keeps
 *    drawing, animating and handling the mouse itself.
 *
 * CircuitJS1 keeps global state, so only one engine can exist per page.
 */
export class CircuitEngine {
    static #current: CircuitEngine | null = null;

    static create(): CircuitEngine {
        if (CircuitEngine.#current != null)
            throw new Error("A CircuitEngine already exists; CircuitJS1 supports one at a time. Call dispose() on it first.");
        CircuitEngine.#current = new CircuitEngine(null);
        return CircuitEngine.#current;
    }

    /**
     * Wrap a full CircuitJS1 application, i.e. one made with `new CirSim()`
     * and `await app.init()` (see src/sim/main.ts). CircuitJS1's own frame
     * loop keeps running the simulation and drawing it; the engine reads and
     * changes that same circuit.
     */
    static attach(app: CirSim): CircuitEngine {
        if (CircuitEngine.#current != null)
            throw new Error("A CircuitEngine already exists; CircuitJS1 supports one at a time. Call dispose() on it first.");
        CircuitEngine.#current = new CircuitEngine(app);
        return CircuitEngine.#current;
    }

    /** The underlying CircuitJS1 app object, for anything not covered here. */
    readonly app: CirSim;
    /** The underlying CircuitJS1 simulation manager. */
    readonly sim: SimulationManager;
    /** UI calls CircuitJS1 made that the engine has no stand-in for (diagnostics). */
    readonly unhandledUiCalls: Set<string>;

    /** Milliseconds between real-time frames while running (ignored when attached to the full app). */
    frameInterval = 16;

    /** True when there is no CircuitJS1 user interface and we drive the frames. */
    readonly #headless: boolean;
    #wantRunning = false;
    #timer: ReturnType<typeof setInterval> | null = null;
    #handles = new WeakMap<object, CircuitElement>();
    #nextId = 1;
    #listeners = new Map<EngineEvent, Set<Listener>>();
    #reportedError: string | null = null;
    #disposed = false;

    private constructor(fullApp: CirSim | null) {
        this.#headless = fullApp == null;
        if (fullApp == null) {
            const headless = createHeadlessApp({
                setRunning: run => this.#simAsksToRun(run),
                onTimeStep: () => this.#emit("step"),
                onAnalyze: () => this.#emit("analyze"),
            });
            this.app = headless.app;
            this.sim = headless.sim;
            this.unhandledUiCalls = headless.unhandled;
            return;
        }
        this.app = fullApp;
        this.sim = fullApp.sim;
        this.unhandledUiCalls = new Set();
        // CircuitJS1 reports timesteps, re-analysis and drawn frames to its
        // JavaScript interface; listen in, and pass everything on to it.
        const inner = fullApp.jsInterface;
        fullApp.jsInterface = Object.assign(Object.create(inner ?? null), {
            callTimeStepHook: () => { inner?.callTimeStepHook(); this.#emit("step"); },
            callAnalyzeHook: () => { inner?.callAnalyzeHook(); this.#emit("analyze"); },
            callUpdateHook: () => { inner?.callUpdateHook(); this.#reportError(); this.#emit("frame"); },
        });
    }

    // ---- circuit --------------------------------------------------------

    /**
     * Replace the circuit. Accepts CircuitJS1's text format (the "$ 1 0.000005 ..."
     * export) and its XML format. Simulated time restarts at zero.
     */
    load(circuit: string): void {
        this.#handles = new WeakMap();
        this.#nextId = 1;
        this.app.loader.readCircuit(this.#forLoading(circuit));
        this.#prepare();
        this.#reportError();
    }

    /** The circuit in CircuitJS1's current (XML) format, including component state. */
    export(): string {
        return this.app.dumpCircuit();
    }

    /** All components, in circuit order. */
    get elements(): CircuitElement[] {
        return this.app.elmList.map(raw => this.#handle(raw));
    }

    element(id: string): CircuitElement | null {
        return this.elements.find(e => e.id === id) ?? null;
    }

    /** Components of one kind: byType("Resistor") or byType("ResistorElm"). */
    byType(type: string): CircuitElement[] {
        const name = type.endsWith("Elm") ? type : type + "Elm";
        return this.elements.filter(e => e.type === name);
    }

    /**
     * Add a component between two grid points, e.g.
     * add("ResistorElm", 96, 64, 192, 64). Settings start at CircuitJS1's
     * defaults; change them with setParam() on the returned element.
     */
    add(type: string, x1: number, y1: number, x2: number, y2: number): CircuitElement {
        const name = type.endsWith("Elm") ? type : type + "Elm";
        const raw = CirSim.constructElement(name, x1, y1);
        if (raw == null)
            throw new Error(`Unknown component type "${type}"`);
        raw.drag(x2, y2);
        this.app.elmList.push(raw);
        this.app.needAnalyze();
        return this.#handle(raw);
    }

    /** Add components from lines in CircuitJS1's text format, e.g. "r 96 64 192 64 0 220". */
    addFromText(lines: string): CircuitElement[] {
        const before = this.app.elmList.length;
        this.app.loader.readCircuit(this.#forLoading(lines), CircuitLoader.RC_RETAIN | CircuitLoader.RC_NO_CENTER);
        return this.app.elmList.slice(before).map(raw => this.#handle(raw));
    }

    remove(element: CircuitElement): boolean {
        const i = this.app.elmList.indexOf(element.raw);
        if (i < 0)
            return false;
        element.raw.delete();
        this.app.elmList.splice(i, 1);
        this.app.needAnalyze();
        return true;
    }

    /** Voltage of a node carrying a "labeled node" element with this name. */
    nodeVoltage(label: string): number {
        return this.sim.getLabeledNodeVoltage(label);
    }

    // ---- running --------------------------------------------------------

    /** Run continuously in real time, at CircuitJS1's own pacing. */
    start(): void {
        this.#assertAlive();
        if (!this.#headless) {
            this.app.setSimRunning(true);
            return;
        }
        this.#wantRunning = true;
        // Forget how long we were paused, so the simulator does not try to catch up.
        this.sim.lastIterTime = 0;
        if (this.#timer == null)
            this.#timer = setInterval(this.#frame, this.frameInterval);
    }

    stop(): void {
        if (!this.#headless) {
            this.app.setSimRunning(false);
            return;
        }
        this.#wantRunning = false;
        this.app.simRunning = false;
        if (this.#timer != null) {
            clearInterval(this.#timer);
            this.#timer = null;
        }
    }

    /** True while start() is in effect, even if a circuit problem has paused the maths. */
    get running(): boolean { return this.#headless ? this.#wantRunning : this.app.simRunning; }

    /**
     * Advance exactly `count` timesteps, regardless of real time. Meant for
     * tests and for jumping ahead; works whether or not the engine is running.
     */
    step(count = 1): void {
        this.#assertAlive();
        const { app, sim } = this;
        const resume = app.simRunning;
        try {
            for (let i = 0; i < count; i++) {
                this.#prepare();
                if (app.stopMessage != null || sim.matrices == null)
                    break;
                // With this flag off, runCircuit() returns after a single timestep.
                app.simRunning = false;
                if (sim.lastIterTime === 0)
                    sim.lastIterTime = Date.now();
                try {
                    sim.runCircuit(true);
                } catch (e) {
                    this.#fail("Exception in runCircuit()", e);
                }
                this.#finishFrame();
            }
        } finally {
            app.simRunning = resume && app.stopMessage == null;
        }
        app.ui.repaint();
        this.#reportError();
    }

    /** Back to time zero with all component state cleared (CircuitJS1's Reset button). */
    reset(): void {
        const { app, sim } = this;
        app.consoleExceptionOccurred = false;
        app.analyzeFlag = true;
        if (app.autoDCOnReset)
            app.dcAnalysisFlag = true;
        sim.resetTime();
        sim.resetNodes();
        for (const raw of app.elmList)
            raw.reset();
        app.scopeManager.resetGraphs();
        this.#prepare();
        app.ui.repaint();
        this.#reportError();
    }

    /** Simulated time in seconds. */
    get time(): number { return this.sim.t; }

    /** Simulated seconds per timestep. */
    get timeStep(): number { return this.sim.maxTimeStep; }
    set timeStep(seconds: number) {
        this.sim.maxTimeStep = this.sim.timeStep = seconds;
        this.app.needAnalyze();
    }

    /** Timesteps per real second while running (CircuitJS1's "Simulation Speed"). */
    get stepsPerSecond(): number { return 160 * this.app.getIterCount(); }
    set stepsPerSecond(steps: number) {
        // Inverse of CirSim.getIterCount(), which reads this slider value.
        this.app.ui.speedBar.setValue(steps <= 0 ? 0 : Math.log(steps / 16) * 24 + 61);
    }

    /** The problem that stopped the simulation, or null when all is well. */
    get error(): EngineError | null {
        const message = this.app.stopMessage;
        if (message == null)
            return null;
        const culprit = this.app.stopElm;
        return { message, element: culprit != null ? this.#handle(culprit) : null };
    }

    // ---- pointing at the drawing ---------------------------------------

    /**
     * What is drawn at a point, found the way CircuitJS1 finds what the mouse
     * is over, and highlighted the same way, but without any mouse event
     * reaching it: nothing can be clicked, dragged or edited. x and y are CSS
     * pixels from the top-left of the simulator's page. `terminal` is set when
     * the point is on one of the element's terminals. Needs the full app.
     */
    probe(x: number, y: number): Probe | null {
        const mouse = this.#mouse();
        // It only reads the position and the Shift key from the event.
        mouse.mouseSelect({ clientX: x, clientY: y, shiftKey: false } as MouseEvent);
        const raw = mouse.getMouseElm();
        if (raw == null)
            return null;
        return { element: this.#handle(raw), terminal: mouse.mousePost >= 0 ? mouse.mousePost : null };
    }

    /** Take away the highlight left by probe(), as when the mouse leaves CircuitJS1's canvas. */
    endProbe(): void {
        const mouse = this.#mouse();
        mouse.mouseCursorX = -1;
        mouse.mousePost = -1;
        mouse.clearMouseElm();
        this.app.repaint();
    }

    #mouse() {
        if (this.#headless)
            throw new Error("probe() needs the full simulator (sim.html); there is no drawing without it");
        return this.app.mouse;
    }

    // ---- events ---------------------------------------------------------

    /** Subscribe; returns a function that unsubscribes. */
    on(event: EngineEvent, listener: Listener): () => void {
        let set = this.#listeners.get(event);
        if (set == null)
            this.#listeners.set(event, set = new Set());
        set.add(listener);
        return () => { set.delete(listener); };
    }

    dispose(): void {
        if (this.#headless)
            this.stop();
        this.#listeners.clear();
        this.#disposed = true;
        if (CircuitEngine.#current === this)
            CircuitEngine.#current = null;
    }

    // ---- internals ------------------------------------------------------

    // One real-time frame. Mirrors the simulation half of
    // UIManager.updateCircuit() in CircuitJS1; the drawing half is left out.
    #frame = (): void => {
        const { app, sim } = this;
        const didAnalyze = this.#prepare();
        // Resume by ourselves once a circuit problem has been fixed.
        if (this.#wantRunning && !app.simRunning && app.stopMessage == null)
            app.simRunning = true;
        if (app.simRunning) {
            try {
                sim.runCircuit(didAnalyze);
            } catch (e) {
                this.#fail("Exception in runCircuit()", e);
            }
        }
        this.#finishFrame();
        this.#reportError();
        this.#emit("frame");
    };

    /** Re-analyse and rebuild the matrices if the circuit changed. */
    #prepare(): boolean {
        const { app, sim } = this;
        const didAnalyze = app.analyzeFlag;
        if (app.analyzeFlag || app.dcAnalysisFlag) {
            sim.analyzeCircuit();
            app.analyzeFlag = false;
        }
        if (sim.needsStamp && app.stopMessage == null) {
            try {
                sim.preStampAndStampCircuit();
            } catch (e) {
                this.#fail("Exception in stampCircuit()", e);
            }
        }
        return didAnalyze;
    }

    #finishFrame(): void {
        const { app } = this;
        app.ui.lastFrameTime = app.simRunning ? Date.now() : 0;
        if (app.dcAnalysisFlag) {
            app.dcAnalysisFlag = false;
            app.analyzeFlag = true;
        }
    }

    #fail(what: string, e: unknown): void {
        console.error(what, e);
        if (this.app.stopMessage == null)
            this.sim.stop(what + ": " + (e instanceof Error ? e.message : String(e)), null);
    }

    // CircuitJS1 calls this through app.setSimRunning(): with false when it
    // hits a problem (stopMessage is then set) or when a "stop trigger"
    // component fires on purpose.
    #simAsksToRun(run: boolean): void {
        const app = this.app;
        if (run) {
            if (app.stopMessage == null)
                app.simRunning = true;
            return;
        }
        app.simRunning = false;
        if (app.stopMessage == null)
            this.stop();
    }

    #reportError(): void {
        const message = this.app.stopMessage;
        if (message === this.#reportedError)
            return;
        this.#reportedError = message;
        if (message != null)
            this.#emit("error");
    }

    #handle(raw: object): CircuitElement {
        let handle = this.#handles.get(raw);
        if (handle == null) {
            handle = new CircuitElement("e" + this.#nextId++, raw, this);
            this.#handles.set(raw, handle);
        }
        return handle;
    }

    #emit(event: EngineEvent): void {
        const set = this.#listeners.get(event);
        if (set == null)
            return;
        for (const listener of [...set]) {
            // Listeners run in the middle of CircuitJS1's simulation loop; one
            // that throws must not be mistaken for a simulation failure.
            try {
                listener(this);
            } catch (e) {
                console.error(`CircuitEngine "${event}" listener failed`, e);
            }
        }
    }

    /** Without a UI, scope panels and value sliders in a circuit file cannot be created. */
    #forLoading(circuit: string): string {
        return this.#headless ? withoutDisplayItems(circuit) : circuit;
    }

    #assertAlive(): void {
        if (this.#disposed)
            throw new Error("This CircuitEngine was disposed");
    }
}

/**
 * Drops lines that only describe on-screen extras in CircuitJS1's text format:
 * "o" (oscilloscope panels) and "&" / "38" (value sliders). They do not
 * affect the simulation and need the real UI to exist.
 */
function withoutDisplayItems(circuit: string): string {
    if (circuit.trimStart().startsWith("<"))
        return circuit;
    return circuit
        .split(/\r?\n|\r/)
        .filter(line => !/^(o|&|38)\s/.test(line))
        .join("\n");
}
