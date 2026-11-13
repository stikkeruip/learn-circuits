// Every lesson against the simulator: its circuit loads, its names point at
// real parts and settings, and every answer it gives is the value CircuitJS1
// computes. A lesson that states a wrong number fails here.

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CircuitEngine } from "../src/engine";
import { LessonCircuit } from "../src/lesson/circuit";
import * as LZString from "lz-string";
import { formatValue, isClose, parseAnswer } from "../src/lesson/format";
import { benchUrl, jobNumber, nextLesson } from "../src/lesson/links";
import { describePart, describeTerminal } from "../src/lesson/probe";
import { lessons } from "../src/lessons";

let engine: CircuitEngine;

beforeEach(() => { engine = CircuitEngine.create(); });
afterEach(() => { engine.dispose(); });

describe.each(lessons)("lesson $id", lesson => {
    function load(): LessonCircuit {
        engine.load(lesson.circuit);
        engine.step(2);
        expect(engine.error).toBeNull();
        return new LessonCircuit(engine, lesson);
    }

    it("has a unique id", () => {
        expect(lessons.filter(l => l.id === lesson.id)).toHaveLength(1);
    });

    it("loads, and every quantity can be read", () => {
        const circuit = load();
        for (const name of Object.keys(lesson.quantities))
            expect(Number.isFinite(circuit.read(name)), name).toBe(true);
    });

    it("only refers to quantities it has, and only sets settings", () => {
        const circuit = load();
        const names = new Set(Object.keys(lesson.quantities));
        const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]);
        lesson.steps.forEach((step, i) => {
            const where = `step ${i + 1}`;
            for (const name of Object.keys(step.set ?? {}))
                expect(circuit.isSetting(name), `${where} sets "${name}"`).toBe(true);
            const texts = Object.values(step).filter((v): v is string => typeof v === "string");
            for (const name of texts.flatMap(placeholders))
                expect(names.has(name), `${where} shows {${name}}`).toBe(true);
            if (step.kind === "explore") {
                // Sliders change settings. A switch has none: it is flipped on the drawing.
                for (const c of step.controls)
                    expect(circuit.isSetting(c.quantity) && !circuit.isSwitch(c.quantity), `${where} has a slider for "${c.quantity}"`).toBe(true);
            }
            if (step.kind === "number")
                expect(names.has(step.solveFor), `${where} asks for "${step.solveFor}"`).toBe(true);
        });
    });

    it("runs without a circuit problem at every step's values", () => {
        const circuit = load();
        lesson.steps.forEach((step, i) => {
            circuit.setAll(step.set);
            engine.step(2);
            expect(engine.error, `step ${i + 1}`).toBeNull();
        });
    });

    it("gives the answer the simulator computes, for every number question", () => {
        const circuit = load();
        const questions = lesson.steps.filter(s => s.kind === "number");
        for (const step of questions) {
            circuit.setAll(step.set);
            engine.step(2);
            const simulated = circuit.read(step.solveFor);
            expect(isClose(simulated, step.answer, 1e-9), `"${step.question}": lesson says ${step.answer}, simulator ${simulated}`).toBe(true);
        }
    });

    it("has explore goals that its sliders and switches can reach", () => {
        for (const step of lesson.steps) {
            if (step.kind !== "explore")
                continue;
            for (const [name, value] of Object.entries(step.goal)) {
                if (lesson.quantities[name] != null && "switch" in lesson.quantities[name]) {
                    // Flipped on the drawing, so it needs no slider.
                    expect([0, 1], `"${step.title}": switch ${name} is 1 (closed) or 0 (open)`).toContain(value);
                    // The step must not start with its goal already reached.
                    expect(step.set?.[name], `"${step.title}" starts with switch ${name} the other way`).toBe(1 - value);
                    continue;
                }
                const control = step.controls.find(c => c.quantity === name);
                expect(control, `"${step.title}" has a slider for ${name}`).toBeDefined();
                const { min, max, step: by } = control!;
                expect(value).toBeGreaterThanOrEqual(min);
                expect(value).toBeLessThanOrEqual(max);
                expect(Number.isInteger(Math.round((value - min) / by * 1e9) / 1e9), `${name} = ${value} is on the slider's steps`).toBe(true);
            }
        }
    });

    it("opens its own circuit on the Bench", () => {
        const params = new URLSearchParams(benchUrl(lesson).split("?")[1]);
        expect(params.get("from")).toBe(lesson.id);
        expect(LZString.decompressFromEncodedURIComponent(params.get("ctz")!)).toBe(lesson.circuit);
    });

    it("never shows a number question's answer on the probe", () => {
        const circuit = load();
        for (const step of lesson.steps) {
            if (step.kind !== "number")
                continue;
            circuit.setAll(step.set);
            engine.step(2);
            const unit = lesson.quantities[step.solveFor].unit;
            for (const element of engine.elements) {
                const info = element.info();
                const views = [
                    describePart(info, unit),
                    ...element.posts.map((_, i) => describeTerminal(info[0], formatValue(element.voltage(i), "V"), unit)),
                ];
                for (const { title, readings } of views) {
                    for (const { label, value } of readings) {
                        const where = `"${step.question}": ${title}, ${label} = ${value}`;
                        const shown = parseAnswer(value, unit);
                        expect(shown == null || !isClose(Math.abs(shown), step.answer), where).toBe(true);
                        // Power gives it away too (P = V × I).
                        expect(value.endsWith("W") || value.endsWith(unit) ? value : "?", where).toBe("?");
                    }
                }
            }
        }
    });

    it("has a valid answer for every choice question", () => {
        for (const step of lesson.steps) {
            if (step.kind !== "choice")
                continue;
            expect(step.options.length).toBeGreaterThanOrEqual(2);
            expect(step.options[step.answer], step.question).toBeDefined();
        }
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
