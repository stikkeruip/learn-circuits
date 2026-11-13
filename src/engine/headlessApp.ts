// Builds a CircuitJS1 app object with no user interface.
//
// CircuitJS1's simulation classes expect an "app" (CirSim) that also owns the
// canvas, menus and mouse handling. Here we construct the real CirSim (so its
// own logic for loading, exporting and analysing is used untouched) and swap
// only the UI parts for inert stand-ins.

// Import order matters: CircuitJS1's modules import each other in cycles, and
// its own entry point (main.ts) loads CircuitElm first.
import { CircuitElm } from "circuitjs/CircuitElm";
import { CirSim } from "circuitjs/CirSim";
import { SimulationManager } from "circuitjs/SimulationManager";
import { ScopeManager } from "circuitjs/ScopeManager";
import { CircuitLoader } from "circuitjs/CircuitLoader";
import { MouseManager } from "circuitjs/MouseManager";
import { registerElements } from "circuitjs/registerElements";

export interface HeadlessHooks {
    /** CircuitJS1 asks to start or stop the simulation (it stops itself on errors). */
    setRunning(run: boolean): void;
    /** Called after every simulated timestep. */
    onTimeStep(): void;
    /** Called after the circuit has been re-analysed successfully. */
    onAnalyze(): void;
}

export interface HeadlessApp {
    app: CirSim;
    sim: SimulationManager;
    /** UI members CircuitJS1 asked for that we have no stand-in for (diagnostics). */
    unhandled: Set<string>;
}

/** A value holder with the interface of CircuitJS1's slider bars. */
function bar(initial: number) {
    let value = initial;
    return {
        getValue: () => value,
        setValue: (v: number) => { value = v; },
    };
}

/**
 * Wraps an object so that members we did not define are harmless no-op
 * functions instead of crashes. Whatever was asked for is recorded, so tests
 * can show which UI calls the simulation paths really make.
 */
function lenient<T extends object>(known: T, label: string, unhandled: Set<string>): T {
    const noop = (): void => {};
    return new Proxy(known, {
        get(target, prop, receiver) {
            if (typeof prop === "symbol" || prop in target || prop === "then" || prop === "toJSON")
                return Reflect.get(target, prop, receiver);
            unhandled.add(label + "." + prop);
            return noop;
        },
    });
}

let elementsRegistered = false;

export function createHeadlessApp(hooks: HeadlessHooks): HeadlessApp {
    const unhandled = new Set<string>();
    const nothing = (): void => {};

    // The constructor creates a few detached DOM nodes for menus; nothing is
    // attached to the page.
    const app = new CirSim();
    const sim = new SimulationManager(app);
    app.sim = sim;
    CircuitElm.initClass(app, sim);
    app.scopeManager = new ScopeManager(app);

    app.ui = lenient({
        get elmList() { return app.elmList; },
        steps: 0,
        lastFrameTime: 0,
        speedBar: bar(117),
        currentBar: bar(50),
        powerBar: bar(50),
        subcircuitStack: [] as unknown[],

        setSimRunning: (run: boolean) => hooks.setRunning(run),
        simIsRunning: () => app.simRunning,
        setGrid: () => {
            app.gridSize = app.menus.smallGridCheckItem.getState() ? 8 : 16;
            app.gridMask = ~(app.gridSize - 1);
            app.gridRound = app.gridSize / 2 - 1;
        },
        isReadOnly: () => false,
        isSelection: () => false,
        dialogIsShowing: () => false,
        modalDialogIsShowing: () => false,
        getOptionFromStorage: (_key: string, def: boolean) => def,

        // Display-only calls with nothing to do when there is no screen.
        repaint: nothing,
        centerCircuit: nothing,
        setCircuitTitle: nothing,
        setPowerBarEnable: nothing,
        enableItems: nothing,
        allowSave: nothing,
        addWidgetToVerticalPanel: nothing,
        removeWidgetFromVerticalPanel: nothing,
        setiFrameHeight: nothing,
        updateSubcircuitPath: nothing,
        composeSubcircuitMenu: nothing,
        setOptionInStorage: nothing,
        showToast: nothing,
    }, "ui", unhandled);

    app.mouse = lenient({
        mouseMode: MouseManager.MODE_SELECT,
        scopePlotRoles: new Map(),
        highlightedNode: null,
        dragElm: null,
        transformX: (x: number) => x,
        transformY: (y: number) => y,
        getMouseElm: (): any => null,
        clearMouseElm: nothing,
        setMouseElm: nothing,
        enableDisableMenuItems: nothing,
    }, "mouse", unhandled) as unknown as MouseManager;

    // CircuitJS1 already calls these hooks for its own JavaScript interface.
    app.jsInterface = {
        callTimeStepHook: () => hooks.onTimeStep(),
        callAnalyzeHook: () => hooks.onAnalyze(),
        callUpdateHook: nothing,
        callSVGRenderedHook: nothing,
    };

    // Fills static lookup tables shared by every app instance, so once is enough.
    if (!elementsRegistered) {
        registerElements();
        elementsRegistered = true;
    }

    app.loader = new CircuitLoader(app, sim, app.scopeManager, app.menus);
    // Same as CircuitJS1's own startup: an empty load applies the default settings.
    app.loader.readCircuit("");

    return { app, sim, unhandled };
}
