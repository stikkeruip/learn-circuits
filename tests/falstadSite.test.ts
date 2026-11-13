// Checks the engine (no user interface) against numbers recorded from
// Falstad's live site for the hand-written circuits in ./comparison.
//
// In a browser the engine reproduces the site to the last bit (see
// tests/comparison/README.md for how that is checked). Here, under Node, the
// values are required to agree to 9 significant digits rather than exactly:
// Node's Math.exp/log/sin differ from Chrome's in the final bit for some
// inputs, which shows up around the 14th digit in circuits with diodes and
// transistors. How many samples are bit-identical is printed for information.

import { createHash } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { CircuitEngine } from "../src/engine";
import { circuits, SAMPLE_STEPS } from "./comparison/circuits";
import site from "./comparison/falstad-site.json";

const RELATIVE_TOLERANCE = 1e-9;
const ABSOLUTE_TOLERANCE = 1e-15;     // for values that are zero on one side and rounding noise on the other

/** Same numbers, in the same order, as tests/comparison/browser-script.ts reads in the browser. */
function measure(engine: CircuitEngine): number[] {
    const values = [engine.time];
    for (const el of engine.elements) {
        for (let post = 0; post < el.postCount; post++)
            values.push(el.voltage(post));
        values.push(el.current);
    }
    return values;
}

function fingerprint(values: number[]): string {
    return createHash("sha256").update(new Uint8Array(new Float64Array(values).buffer)).digest("hex").slice(0, 16);
}

describe(`engine vs ${site.source} (recorded ${site.recorded})`, () => {
    let engine: CircuitEngine;
    const summary: string[] = [];

    beforeAll(() => {
        vi.spyOn(console, "log").mockImplementation(() => {});
        engine = CircuitEngine.create();
    });
    afterAll(() => {
        engine.dispose();
        vi.restoreAllMocks();
        process.stdout.write("\nBit-identical to falstad.com under this Node version:\n" + summary.join("\n") + "\n");
    });

    it("has a recording for every circuit", () => {
        expect(site.circuits.map(c => c.name)).toEqual(circuits.map(c => c.name));
    });

    circuits.forEach((circuit, index) => {
        it(`${circuit.name}: same values as the site`, () => {
            const recorded = site.circuits[index];
            engine.load(circuit.text);
            let done = 0;
            let identical = 0;
            let values: number[] = [];
            SAMPLE_STEPS.forEach((step, i) => {
                engine.step(step - done);
                done = step;
                values = measure(engine);
                expect(values[0], `simulated time after ${step} steps`).toBe(recorded.samples[i].t);
                if (fingerprint(values) === recorded.samples[i].sha)
                    identical++;
            });
            summary.push(`  ${circuit.name}: ${identical} of ${SAMPLE_STEPS.length} samples`);

            expect(engine.error).toBeNull();
            expect(values.length).toBe(recorded.final.length);
            const tooFar = values
                .map((v, i) => {
                    const want = recorded.final[i];
                    const off = Math.abs(v - want);
                    const ok = off <= ABSOLUTE_TOLERANCE || off <= RELATIVE_TOLERANCE * Math.max(Math.abs(v), Math.abs(want));
                    return ok ? null : `value ${i}: ${v} vs ${want}`;
                })
                .filter(Boolean);
            expect(tooFar).toEqual([]);
        });
    });
});
