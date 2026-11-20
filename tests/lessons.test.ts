// Every lesson against the simulator: its circuit loads, its names point at
// real parts and settings, and every answer it gives is the value CircuitJS1
// computes. A lesson that states a wrong number fails here.

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CircuitEngine } from "../src/engine";
import { LessonCircuit } from "../src/lesson/circuit";
import { formatValue, parseAnswer } from "../src/lesson/format";
import { jobNumber, nextLesson } from "../src/lesson/links";
import { describePart, describeTerminal } from "../src/lesson/probe";
import { lessons } from "../src/lessons";
import { describeLesson } from "./lessonChecks";

for (const lesson of lessons)
    describeLesson(lesson);

describe("every lesson", () => {
    it("has an id of its own", () => {
        const ids = lessons.map(l => l.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe("course order", () => {
    it("leads from each lesson to the next, and from the last to none", () => {
        lessons.forEach((lesson, i) => expect(nextLesson(lesson)).toBe(lessons[i + 1] ?? null));
    });

    it("numbers the jobs in course order, from №0001", () => {
        lessons.forEach((lesson, i) => expect(jobNumber(lesson)).toBe("№" + String(i + 1).padStart(4, "0")));
        expect(jobNumber(lessons[0])).toBe("№0001");
    });

    it("tells every lesson as a job, with its story filled in", () => {
        for (const lesson of lessons) {
            for (const [field, text] of Object.entries(lesson.job))
                expect(text.trim(), `${lesson.id} job.${field}`).not.toBe("");
        }
    });
});

describe("the probe", () => {
    const resistor = ["resistor", "I = 2 A", "Vd = 12 V", "R = 6 Ω", "P = 24 W"];

    it("names CircuitJS1's readings for a beginner", () => {
        expect(describePart(resistor, null)).toEqual({
            title: "resistor",
            readings: [
                { label: "I · current", value: "2 A" },
                { label: "V · across it", value: "12 V" },
                { label: "R · resistance", value: "6 Ω" },
                { label: "P · power", value: "24 W" },
            ],
        });
    });

    it("leaves out CircuitJS1's working-out and keeps unknown readings as they are", () => {
        const view = describePart(["voltage source", "I = 2 A", "(R = 6 Ω)", "Vce = 0.2 V", "closed"], null);
        expect(view.readings).toEqual([
            { label: "I · current", value: "2 A" },
            { label: "Vce", value: "0.2 V" },
            { label: "closed", value: "" },
        ]);
    });

    it("leaves out how CircuitJS1 models a part", () => {
        expect(describePart(["diode (default)", "I = 8.4 mA", "Vd = 559 mV", "P = 4.7 mW"], null).title).toBe("diode");
        expect(describePart(["fuse (blown)", "I = 12 nA", "Vd = 12 V", "R = 1 mΩ", "I2t = 27"], null)).toEqual({
            title: "fuse (blown)",
            readings: [{ label: "I · current", value: "12 nA" }, { label: "V · across it", value: "12 V" }],
        });
        expect(describePart(["capacitor", "I = 0 A", "Vd = 12 V", "C = 100 μF", "P = 0 W", "Q = 1.2 mC"], null).readings.map(r => r.label))
            .toEqual(["I · current", "V · across it", "C · capacitance", "P · power"]);
        expect(describePart(["transistor (NPN)", "default, β=100", "saturation", "Ic = 98.6 mA", "Ib = 1.13 mA", "Vce = 170 mV"], null)).toEqual({
            title: "transistor (NPN)",
            readings: [{ label: "Ic", value: "98.6 mA" }, { label: "Ib", value: "1.13 mA" }, { label: "Vce", value: "170 mV" }],
        });
        expect(describePart(["n-MOSFET (old-mosfet)", "Vt=3 V, β=0.228", "Ids = 0.96 A", "Vgs = 12 V", "linear", "gm = 1 A/V", "Ib = 0 A"], null)).toEqual({
            title: "n-MOSFET",
            readings: [{ label: "Ids", value: "0.96 A" }, { label: "Vgs", value: "12 V" }],
        });
        expect(describeTerminal("relay (old-relay)", "12 V", null).title).toBe("relay · end");
    });

    it("shows a voltmeter's reading and none of its statistics over time", () => {
        const view = describePart(["voltmeter", "Vd = 12 V", "Vmax = 12 V", "V(rms) = 0 V", "Duty cycle = 1"], null);
        expect(view.readings).toEqual([{ label: "V · across it", value: "12 V" }]);
        expect(describePart(["voltmeter", "Vd = 12 V", "Duty cycle = 1"], "V").readings).toEqual([{ label: "V · across it", value: "?" }]);
    });

    it("hides readings in the unit a question asks for, and power", () => {
        const values = (unit: string) => describePart(resistor, unit).readings.map(r => r.value);
        expect(values("A")).toEqual(["?", "12 V", "6 Ω", "?"]);
        expect(values("V")).toEqual(["2 A", "?", "6 Ω", "?"]);
        expect(values("Ω")).toEqual(["2 A", "12 V", "?", "?"]);
        expect(describePart(["resistor", "I = 500 mA"], "A").readings[0].value).toBe("?");
    });

    it("reads a terminal's voltage, hidden while a voltage is asked for", () => {
        expect(describeTerminal("wire", "12 V", null)).toEqual({ title: "wire · end", readings: [{ label: "V · voltage", value: "12 V" }] });
        expect(describeTerminal("wire", "12 V", "V").readings[0].value).toBe("?");
        expect(describeTerminal("wire", "12 V", "A").readings[0].value).toBe("12 V");
    });
});

describe("a switch in a lesson", () => {
    // One engine at a time: CircuitJS1 keeps global state.
    let engine: CircuitEngine;

    beforeEach(() => { engine = CircuitEngine.create(); });
    afterEach(() => { engine.dispose(); });

    it("reads 1 closed and 0 open, and makes and breaks the loop", () => {
        const lesson = lessons.find(l => l.id === "closed-loop")!;
        engine.load(lesson.circuit);
        const circuit = new LessonCircuit(engine, lesson);

        circuit.set("switch", 1);
        engine.step(3000);  // the lamp's filament warms up: 3 simulated seconds
        expect(circuit.read("switch")).toBe(1);
        expect(circuit.read("current")).toBeCloseTo(2, 3);

        circuit.set("switch", 0);
        engine.step(2);
        expect(circuit.read("switch")).toBe(0);
        expect(circuit.read("current")).toBe(0);
        expect(engine.error).toBeNull();

        expect(() => circuit.set("switch", 2)).toThrow(RangeError);
    });
});

describe("lesson answers", () => {
    it("reads plain numbers, commas, units and prefixes", () => {
        expect(parseAnswer("3", "A")).toBe(3);
        expect(parseAnswer(" 3.0 ", "A")).toBe(3);
        expect(parseAnswer("0,5", "A")).toBe(0.5);
        expect(parseAnswer(".5", "A")).toBe(0.5);
        expect(parseAnswer("3 A", "A")).toBe(3);
        expect(parseAnswer("3amps", "A")).toBe(3);
        expect(parseAnswer("500 mA", "A")).toBeCloseTo(0.5, 12);
        expect(parseAnswer("24 Ω", "Ω")).toBe(24);
        expect(parseAnswer("24 ohms", "Ω")).toBe(24);
        expect(parseAnswer("2.2kΩ", "Ω")).toBeCloseTo(2200, 9);
        expect(parseAnswer("12 V", "V")).toBe(12);
        expect(parseAnswer("12 volts", "V")).toBe(12);
    });

    it("rejects what is not a number in the unit", () => {
        expect(parseAnswer("", "A")).toBeNull();
        expect(parseAnswer("three", "A")).toBeNull();
        expect(parseAnswer("3 V", "A")).toBeNull();
        expect(parseAnswer("3 A 4", "A")).toBeNull();
    });

    it("formats values for beginners", () => {
        expect(formatValue(2, "A")).toBe("2 A");
        expect(formatValue(0.5, "A")).toBe("0.5 A");
        expect(formatValue(4 / 3, "A")).toBe("1.33 A");
        expect(formatValue(0.05, "A")).toBe("50 mA");
        expect(formatValue(2200, "Ω")).toBe("2.2 kΩ");
        expect(formatValue(0, "V")).toBe("0 V");
        expect(formatValue(1.9999999999, "A")).toBe("2 A");
    });
});
