// Runs every example circuit that ships with CircuitJS1 through the headless
// engine. This is the compatibility check for our stand-in UI layer: if a
// component needs something from the real UI that we do not provide, it shows
// up here.

import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { CircuitEngine } from "../src/engine";

const dir = path.resolve(__dirname, "../circuitjs1/ts/public/circuits");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".txt")).sort();

const STEPS = 300;

interface Outcome {
    file: string;
    status: "ok" | "error" | "exception";
    detail: string;
}

describe("CircuitJS1 example circuits", () => {
    let engine: CircuitEngine;
    const outcomes: Outcome[] = [];
    const typesSeen = new Set<string>();

    beforeAll(() => {
        // CircuitJS1 logs solver details (timestep changes and so on) to the console.
        vi.spyOn(console, "log").mockImplementation(() => {});
        vi.spyOn(console, "error").mockImplementation(() => {});
        engine = CircuitEngine.create();
    });
    afterAll(() => {
        engine.dispose();
        vi.restoreAllMocks();
    });

    it(`has examples to run`, () => {
        expect(files.length).toBeGreaterThan(300);
    });

    it("loads and simulates every example", () => {
        for (const file of files) {
            const text = fs.readFileSync(path.join(dir, file), "utf8");
            try {
                engine.load(text);
                engine.step(STEPS);
                for (const e of engine.elements) {
                    typesSeen.add(e.type);
                    e.info();       // the hover text must work for every component
                }
                const error = engine.error;
                if (error != null)
                    outcomes.push({ file, status: "error", detail: error.message });
                else if (engine.elements.length > 0 && !(engine.time > 0))
                    outcomes.push({ file, status: "error", detail: "time did not advance" });
                else if (engine.elements.some(e => e.postCount <= 2 && !Number.isFinite(e.current)))
                    outcomes.push({ file, status: "error", detail: "non-finite current" });
                else
                    outcomes.push({ file, status: "ok", detail: "" });
            } catch (e) {
                outcomes.push({ file, status: "exception", detail: e instanceof Error ? `${e.message} @ ${e.stack?.split("\n")[1]?.trim()}` : String(e) });
            }
        }

        const bad = outcomes.filter(o => o.status !== "ok");
        const report = [
            `${outcomes.length - bad.length} of ${outcomes.length} example circuits ran cleanly for ${STEPS} steps (${typesSeen.size} component types)`,
            ...bad.map(o => `  ${o.status.padEnd(9)} ${o.file.padEnd(28)} ${o.detail}`),
            `UI calls with no stand-in: ${[...engine.unhandledUiCalls].sort().join(", ") || "none"}`,
        ].join("\n");
        process.stdout.write("\n" + report + "\n");

        expect(bad.map(o => o.file)).toEqual([]);
    });
});
