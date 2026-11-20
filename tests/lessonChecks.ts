// The checks every lesson must pass against the simulator: its circuit loads,
// its names point at real parts and settings, and every answer it gives is the
// value CircuitJS1 computes. tests/lessons.test.ts runs them over the whole
// course. To check one lesson while writing it, before it is in the course,
// make a file of four lines beside this one (and delete it afterwards):
//
//     // tests/tmp-my-lesson.test.ts
//     import { myLesson } from "../src/lessons/my-lesson";
//     import { describeLesson } from "./lessonChecks";
//     describeLesson(myLesson);
//
// and run it alone: npx vitest run tests/tmp-my-lesson.test.ts

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as LZString from "lz-string";
import { CircuitEngine } from "../src/engine";
import { LessonCircuit } from "../src/lesson/circuit";
import { formatValue, isClose, parseAnswer } from "../src/lesson/format";
import { benchUrl } from "../src/lesson/links";
import { describePart, describeTerminal } from "../src/lesson/probe";
import type { Lesson, Step } from "../src/lesson/types";

export function describeLesson(lesson: Lesson): void {
    describe(`lesson ${lesson.id}`, () => {
        let engine: CircuitEngine;

        beforeEach(() => { engine = CircuitEngine.create(); });
        afterEach(() => { engine.dispose(); });

        /** Run until the circuit is at rest: two timesteps, or the lesson's `settle` seconds. */
        function settle(): void {
            engine.step(lesson.settle == null ? 2 : Math.ceil(lesson.settle / engine.timeStep));
        }

        /** Put the circuit as a step starts it, and let it come to rest. */
        function start(circuit: LessonCircuit, step: Step): void {
            circuit.setAll(step.set);
            if (step.reset)
                engine.reset();
            settle();
        }

        function load(): LessonCircuit {
            engine.load(lesson.circuit);
            settle();
            expect(engine.error).toBeNull();
            return new LessonCircuit(engine, lesson);
        }

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
                start(circuit, step);
                expect(engine.error, `step ${i + 1}`).toBeNull();
            });
        });

        it("gives the answer the simulator computes, for every number question", () => {
            const circuit = load();
            const questions = lesson.steps.filter(s => s.kind === "number");
            for (const step of questions) {
                start(circuit, step);
                const simulated = circuit.read(step.solveFor);
                // To nine places, unless the step says its answer is only nearly round.
                expect(isClose(simulated, step.answer, step.tolerance ?? 1e-9), `"${step.question}": lesson says ${step.answer}, simulator ${simulated}`).toBe(true);
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
                start(circuit, step);
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

        // Options are shown in the order written, so a right answer that is always
        // in one place can be picked without reading the question.
        it("moves the right answer about between its choice questions", () => {
            const places = lesson.steps.filter(s => s.kind === "choice").map(s => s.answer);
            if (places.length >= 2)
                expect(new Set(places).size, `right answers at ${places.join(", ")}`).toBeGreaterThan(1);
        });
    });
}
