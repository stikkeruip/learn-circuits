import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CircuitEngine } from "../src/engine";

const OPTIONS = "$ 1 0.000005 10.20027730826997 50 5 50";

// 5 V source across a 100 ohm resistor.
const OHM = `${OPTIONS}
v 96 256 96 64 0 0 40 5 0 0 0.5
w 96 64 256 64 0
r 256 64 256 256 0 100
w 256 256 96 256 0`;

// 5 V source, switch, 1 k resistor, 1 uF capacitor in series (time constant 1 ms).
const RC = `${OPTIONS}
v 96 256 96 64 0 0 40 5 0 0 0.5
s 96 64 256 64 0 0 false
r 256 64 400 64 0 1000
c 400 64 400 256 0 0.000001 0
w 400 256 96 256 0`;

// A wire straight across a voltage source.
const SHORT = `${OPTIONS}
v 96 256 96 64 0 0 40 5 0 0 0.5
w 96 64 256 64 0
w 256 64 256 256 0
w 256 256 96 256 0`;

// 5 V between one end and the wiper of a 1 k potentiometer; the other end is left open.
// (CircuitJS1's own "Potentiometer" example with its second source removed.)
const POT = `${OPTIONS}
v 208 320 208 160 0 0 40 5 0 0 0.5
w 320 224 320 160 0
w 320 160 208 160 0
174 208 320 432 224 1 1000 0.5 Resistance`;

// 5 V source, 1 k resistor and a diode in series, diode forward biased.
const DIODE = `${OPTIONS}
v 96 256 96 64 0 0 40 5 0 0 0.5
r 96 64 256 64 0 1000
d 256 64 256 256 2 default
w 256 256 96 256 0`;

// A logic input (a fixed 5 V output) wired straight to ground.
const GROUNDED_OUTPUT = `${OPTIONS}
L 256 64 96 64 0 1 false 5 0
w 256 64 256 256 0
g 256 256 256 288 0 0`;

let engine: CircuitEngine;

beforeEach(() => { engine = CircuitEngine.create(); });
afterEach(() => { engine.dispose(); });

describe("CircuitEngine", () => {
    it("solves Ohm's law", () => {
        engine.load(OHM);
        engine.step(5);
        expect(engine.error).toBeNull();
        const [r] = engine.byType("Resistor");
        expect(Math.abs(r.voltageDiff)).toBeCloseTo(5, 6);
        expect(Math.abs(r.current)).toBeCloseTo(0.05, 6);
        expect(r.power).toBeCloseTo(0.25, 6);
    });

    it("gives elements stable ids, types and terminal positions", () => {
        engine.load(OHM);
        expect(engine.elements.map(e => `${e.id}:${e.type}`)).toEqual([
            "e1:VoltageElm", "e2:WireElm", "e3:ResistorElm", "e4:WireElm",
        ]);
        const r = engine.element("e3")!;
        expect(r.posts).toEqual([{ x: 256, y: 64 }, { x: 256, y: 256 }]);
    });

    it("advances simulated time by one timestep per step", () => {
        engine.load(OHM);
        engine.step(100);
        expect(engine.time).toBeCloseTo(100 * 5e-6, 12);
    });

    it("charges a capacitor along the RC curve", () => {
        engine.load(RC);
        const [c] = engine.byType("Capacitor");
        engine.step(200); // 1 ms = one time constant
        expect(engine.time).toBeCloseTo(1e-3, 9);
        expect(Math.abs(c.voltageDiff)).toBeCloseTo(5 * (1 - Math.exp(-1)), 2);
        engine.step(1800); // 10 time constants in total
        expect(Math.abs(c.voltageDiff)).toBeCloseTo(5, 2);
    });

    it("lets a switch be flipped while the simulation runs, keeping component state", () => {
        engine.load(RC);
        const [sw] = engine.byType("Switch");
        const [r] = engine.byType("Resistor");
        const [c] = engine.byType("Capacitor");
        expect(sw.isSwitch).toBe(true);
        expect(sw.position).toBe(0); // closed

        engine.step(400);
        const charged = Math.abs(c.voltageDiff);
        expect(charged).toBeGreaterThan(4);

        sw.toggle(); // open
        engine.step(50);
        expect(engine.error).toBeNull();
        expect(sw.position).toBe(1);
        expect(Math.abs(r.current)).toBeLessThan(1e-9);
        // Nothing discharges the capacitor, so it must hold its voltage
        // (give or take the one timestep in which the switch opened).
        expect(Math.abs(Math.abs(c.voltageDiff) - charged)).toBeLessThan(0.01);
        const held = Math.abs(c.voltageDiff);
        engine.step(500);
        expect(Math.abs(c.voltageDiff)).toBeCloseTo(held, 6);
    });

    it("changes a component value the way the edit dialog does", () => {
        engine.load(OHM);
        const [r] = engine.byType("Resistor");
        expect(r.params().map(p => p.name)).toContain("Resistance (ohms)");
        expect(r.param("resistance")).toBe(100);
        r.setParam("resistance", 250);
        engine.step(5);
        expect(Math.abs(r.current)).toBeCloseTo(0.02, 6);
        expect(() => r.setParam("no such thing", 1)).toThrow(/Available/);
    });

    it("moves a potentiometer's wiper", () => {
        engine.load(POT);
        const [pot] = engine.byType("Pot");
        expect(pot.hasSlider).toBe(true);
        const source = engine.elements[0];
        const resistances: number[] = [];
        for (const fraction of [0.25, 0.5, 0.75]) {
            pot.setSlider(fraction);
            engine.step(5);
            expect(engine.error).toBeNull();
            resistances.push(5 / Math.abs(source.current));
        }
        // The track between the connected end and the wiper is 1 k times the wiper
        // position, which CircuitJS1 derives from its slider as 0.005 + 0.0099 * (0..100).
        const track = (percent: number) => 1000 * (0.005 + 0.0099 * percent);
        expect(resistances[0]).toBeCloseTo(track(25), 3);
        expect(resistances[1]).toBeCloseTo(track(50), 3);
        expect(resistances[2]).toBeCloseTo(track(75), 3);
    });

    it("solves a nonlinear circuit (diode forward drop)", () => {
        engine.load(DIODE);
        engine.step(20);
        expect(engine.error).toBeNull();
        const [d] = engine.byType("Diode");
        const drop = Math.abs(d.voltageDiff);
        expect(drop).toBeGreaterThan(0.5);
        expect(drop).toBeLessThan(0.8);
        // Kirchhoff: what the diode does not drop, the resistor does.
        expect(Math.abs(engine.byType("Resistor")[0].current)).toBeCloseTo((5 - drop) / 1000, 6);
    });

    it("adds and removes components", () => {
        engine.load(OHM);
        const [r1] = engine.byType("Resistor");
        // A second 100 ohm resistor in parallel halves the total resistance.
        const r2 = engine.add("Resistor", 256, 64, 256, 256);
        r2.setParam("resistance", 100);
        engine.step(5);
        expect(engine.error).toBeNull();
        const source = engine.elements[0];
        expect(Math.abs(source.current)).toBeCloseTo(0.1, 6);

        expect(engine.remove(r2)).toBe(true);
        engine.step(5);
        expect(Math.abs(source.current)).toBeCloseTo(0.05, 6);
        expect(Math.abs(r1.current)).toBeCloseTo(0.05, 6);
    });

    it("treats a shorted source as CircuitJS1 does: a huge current, not an error", () => {
        engine.load(SHORT);
        engine.step(5);
        expect(engine.error).toBeNull();
        // CircuitJS1 gives a shorted source 1 milliohm of internal resistance.
        expect(Math.abs(engine.elements[0].current)).toBeCloseTo(5000, 0);
    });

    it("reports circuit problems and recovers once they are fixed", () => {
        const errors: string[] = [];
        engine.on("error", e => errors.push(e.error!.message));
        engine.load(GROUNDED_OUTPUT);
        engine.step(5);
        expect(engine.error?.message).toMatch(/path to ground with no resistance/i);
        expect(engine.error?.element?.type).toBe("LogicInputElm");
        expect(errors).toHaveLength(1);

        // Replace the wire with a resistor.
        engine.remove(engine.byType("Wire")[0]);
        engine.add("Resistor", 256, 64, 256, 256).setParam("resistance", 100);
        engine.step(5);
        expect(engine.error).toBeNull();
        expect(Math.abs(engine.byType("Resistor")[0].current)).toBeCloseTo(0.05, 6);
    });

    it("resets to time zero with state cleared", () => {
        engine.load(RC);
        engine.step(400);
        engine.reset();
        expect(engine.time).toBe(0);
        engine.step(1);
        expect(Math.abs(engine.byType("Capacitor")[0].voltageDiff)).toBeLessThan(0.1);
    });

    it("round-trips a circuit through export and load", () => {
        engine.load(OHM);
        const saved = engine.export();
        engine.load(RC);
        engine.load(saved);
        expect(engine.elements.map(e => e.type)).toEqual(["VoltageElm", "WireElm", "ResistorElm", "WireElm"]);
        engine.step(5);
        expect(Math.abs(engine.byType("Resistor")[0].current)).toBeCloseTo(0.05, 6);
    });

    it("runs continuously in real time", async () => {
        engine.load(RC);
        let steps = 0, frames = 0;
        engine.on("step", () => steps++);
        engine.on("frame", () => frames++);
        engine.start();
        await new Promise(resolve => setTimeout(resolve, 400));
        engine.stop();
        const t = engine.time;
        expect(frames).toBeGreaterThan(5);
        expect(steps).toBeGreaterThan(10);
        expect(t).toBeGreaterThan(0);
        expect(engine.error).toBeNull();
        // Speed follows stepsPerSecond: roughly that many steps in the time we ran.
        expect(steps).toBeLessThan(engine.stepsPerSecond * 0.4 * 1.5);

        await new Promise(resolve => setTimeout(resolve, 100));
        expect(engine.time).toBe(t); // really stopped
    });

    it("allows only one engine at a time", () => {
        expect(() => CircuitEngine.create()).toThrow(/already exists/);
    });
});
