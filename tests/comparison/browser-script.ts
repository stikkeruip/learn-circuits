// Prints a script to paste into the browser console of any page running
// CircuitJS1: Falstad's site (https://www.falstad.com/circuit/circuitjs.html)
// or our own sim.html. It uses only CircuitJS1's public JavaScript interface
// (window.CircuitJS1), so exactly the same code measures both.
//
//   node tests/comparison/browser-script.ts
//
// The script loads each circuit, runs it, and at fixed timestep counts takes
// every number the simulator offers: the time, the voltage at every terminal
// of every component and the current through every component. Each sample is
// reduced to a SHA-256 fingerprint of the raw 64-bit values, so two runs
// match only if every number is identical to the last bit.
//
// Sampling detail: CircuitJS1 leaves wires, grounds and closed switches out of
// its equations and works out their currents once per drawn frame, not per
// timestep. So the script pauses the simulation on the wanted timestep and
// reads the values at the end of that frame, when everything is up to date.
//
// When it finishes, `await __comparison` in the console gives the results.

import { circuits, SAMPLE_STEPS } from "./circuits.ts";

function pageScript(circuits: { name: string; text: string }[], steps: number[]) {
    const sim = (window as any).CircuitJS1;

    async function fingerprint(values: number[]): Promise<string> {
        const digest = await crypto.subtle.digest("SHA-256", new Float64Array(values).buffer);
        return [...new Uint8Array(digest)].slice(0, 8).map(b => b.toString(16).padStart(2, "0")).join("");
    }

    function runOne(circuit: { name: string; text: string }) {
        return new Promise<any>(resolve => {
            sim.ontimestep = sim.onupdate = null;
            sim.setSimRunning(false);
            sim.importCircuit(circuit.text, false);
            const wanted = new Set(steps);
            const last = Math.max(...steps);
            const taken: { step: number; values: number[] }[] = [];
            let elements: any[] | null = null;
            let step = 0;
            let due = false;
            // Called after every timestep: pause on the ones we want.
            sim.ontimestep = () => {
                step++;
                if (wanted.has(step)) {
                    due = true;
                    sim.setSimRunning(false);
                }
            };
            // Called at the end of every drawn frame: read the values, then carry on.
            sim.onupdate = () => {
                if (!due)
                    return;
                due = false;
                elements ??= sim.getElements();
                const values: number[] = [sim.getTime()];
                for (const e of elements!) {
                    for (let post = 0; post < e.getPostCount(); post++)
                        values.push(e.getVoltage(post));
                    values.push(e.getCurrent());
                }
                taken.push({ step, values });
                if (step < last) {
                    sim.setSimRunning(true);
                    return;
                }
                sim.ontimestep = sim.onupdate = null;
                Promise.all(taken.map(async s => ({ step: s.step, t: s.values[0], sha: await fingerprint(s.values) })))
                    .then(samples => resolve({
                        name: circuit.name,
                        types: elements!.map(e => e.getType().replace(/Elm$/, "")).join(" "),
                        samples,
                        final: taken[taken.length - 1].values,
                    }));
            };
            sim.setSimRunning(true);
        });
    }

    // Browsers slow the timers of a tab that is not on screen to about one
    // tick a second, and CircuitJS1 runs its frames from setInterval and
    // setTimeout. While the comparison runs, short timers are fired as soon as
    // the page is idle instead. This changes only how fast frames come, not
    // what a timestep computes.
    function withUnthrottledTimers<T>(work: () => Promise<T>): Promise<T> {
        const real = { setInterval: window.setInterval, clearInterval: window.clearInterval, setTimeout: window.setTimeout };
        const repeating = new Map<number, () => void>();
        let once: (() => void)[] = [];
        let nextId = 1e9;
        let posted = false;
        const channel = new MessageChannel();
        const pump = () => {
            if (!posted && (repeating.size > 0 || once.length > 0)) {
                posted = true;
                channel.port2.postMessage(0);
            }
        };
        channel.port1.onmessage = () => {
            posted = false;
            const due = once;
            once = [];
            for (const fn of due)
                fn();
            for (const fn of [...repeating.values()])
                fn();
            pump();
        };
        const w = window as any;
        w.setInterval = (fn: () => void, ms?: number, ...rest: unknown[]) => {
            if (typeof fn !== "function" || (ms ?? 0) > 50)
                return real.setInterval.call(window, fn as any, ms, ...rest);
            repeating.set(++nextId, fn);
            pump();
            return nextId;
        };
        w.clearInterval = (id: number) => {
            if (!repeating.delete(id))
                real.clearInterval.call(window, id);
        };
        w.setTimeout = (fn: () => void, ms?: number, ...rest: unknown[]) => {
            if (typeof fn !== "function" || (ms ?? 0) > 50)
                return real.setTimeout.call(window, fn as any, ms, ...rest);
            once.push(fn);
            pump();
            return ++nextId;
        };
        return work().finally(() => {
            repeating.clear();
            once = [];
            Object.assign(window, real);
        });
    }

    (window as any).__comparison = withUnthrottledTimers(async () => {
        const results = [];
        for (const circuit of circuits)
            results.push(await runOne(circuit));
        return results;
    });
}

console.log(`(${pageScript.toString()})(${JSON.stringify(circuits)}, ${JSON.stringify(SAMPLE_STEPS)});`);
