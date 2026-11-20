// A lesson's circuit, by name: "set the voltage to 9", "read the current",
// "close the switch".
// Works on any CircuitEngine, the one inside the simulator frame on the
// lesson page or a headless one in the tests, and goes only through the
// engine's API, so every change is made the way CircuitJS1's edit dialog
// makes it and every reading comes from the simulation.

import type { CircuitElement, CircuitEngine } from "../engine";
import type { Lesson, Quantity } from "./types";

const MEASURES = { voltage: "voltageDiff", current: "current", power: "power" } as const;

/**
 * The least a reading can be before it reads 0, as on a shop meter: under a
 * microamp, a millivolt or a microwatt. The simulator never quite
 * gives nothing: a blown fuse is 1 GΩ to it, and an open switch leaks.
 */
const FLOOR = { voltage: 1e-3, current: 1e-6, power: 1e-6 };

export class LessonCircuit {
    readonly #parts = new Map<string, CircuitElement>();

    constructor(readonly engine: CircuitEngine, readonly lesson: Lesson) {
        for (const [name, ref] of Object.entries(lesson.parts)) {
            const nth = ref.nth ?? 0;
            const element = engine.byType(ref.type)[nth];
            if (element == null)
                throw new Error(`Lesson "${lesson.id}": part "${name}" (${ref.type} #${nth}) is not in the circuit`);
            this.#parts.set(name, element);
        }
        for (const [name, q] of Object.entries(lesson.quantities)) {
            const part = this.part(q.part, `quantity "${name}"`);
            if ("setting" in q)
                part.param(q.setting);  // throws, listing the available settings, if there is no such one
            else if ("switch" in q && !part.isSwitch)
                throw new Error(`Lesson "${lesson.id}": quantity "${name}" is a switch, but part "${q.part}" (${part.type}) is not`);
            else if ("slider" in q && !part.hasSlider)
                throw new Error(`Lesson "${lesson.id}": quantity "${name}" is a slider, but part "${q.part}" (${part.type}) has none`);
        }
    }

    part(name: string, usedBy = "a step"): CircuitElement {
        const element = this.#parts.get(name);
        if (element == null)
            throw new Error(`Lesson "${this.lesson.id}": ${usedBy} refers to part "${name}", which is not in its parts list`);
        return element;
    }

    quantity(name: string): Quantity {
        const q = this.lesson.quantities[name];
        if (q == null)
            throw new Error(`Lesson "${this.lesson.id}": no quantity "${name}"`);
        return q;
    }

    /** True for what a step can set: a setting, a part's slider or a switch. */
    isSetting(name: string): boolean {
        const q = this.quantity(name);
        return "setting" in q || "slider" in q || "switch" in q;
    }

    isSwitch(name: string): boolean {
        return "switch" in this.quantity(name);
    }

    /**
     * A setting's value as set, where a part's slider stands, a switch's
     * position (1 closed, 0 open), or the simulator's latest measurement. Signs are dropped: which way the current
     * flows is shown by the animation.
     */
    read(name: string): number {
        const q = this.quantity(name);
        const part = this.part(q.part);
        if ("switch" in q)
            return part.position === 0 ? 1 : 0;     // CircuitJS1 counts the other way: its position 0 is closed
        if ("setting" in q)
            return Number(part.param(q.setting));
        if ("slider" in q) {
            // To nine places, so that a value set is the value read back.
            const { min, max } = q.slider;
            return Number((min + part.sliderPosition * (max - min)).toFixed(9));
        }
        const value = Math.abs(part[MEASURES[q.measure]]);
        return value < FLOOR[q.measure] ? 0 : value;
    }

    set(name: string, value: number): void {
        const q = this.quantity(name);
        const part = this.part(q.part);
        if ("switch" in q) {
            if (value !== 0 && value !== 1)
                throw new RangeError(`Lesson "${this.lesson.id}": switch "${name}" is 1 (closed) or 0 (open), not ${value}`);
            part.setPosition(value === 1 ? 0 : 1);
            return;
        }
        if ("slider" in q) {
            const { min, max } = q.slider;
            if (this.read(name) !== value)
                part.setSlider((value - min) / (max - min));
            return;
        }
        if (!("setting" in q))
            throw new Error(`Lesson "${this.lesson.id}": "${name}" is measured by the simulator and cannot be set`);
        if (Number(part.param(q.setting)) !== value)
            part.setParam(q.setting, value);
    }

    setAll(values: Record<string, number> | undefined): void {
        for (const [name, value] of Object.entries(values ?? {}))
            this.set(name, value);
    }

    /** Show or hide the values CircuitJS1 writes next to parts on the drawing. */
    setLabels(visible: boolean): void {
        const app = this.engine.app;
        app.menus.showValuesCheckItem.setState(visible);
        // A voltage source draws its voltage by a flag of its own, whatever the option above says.
        for (const element of this.engine.elements) {
            // A name written on the drawing has no such flag, and CircuitJS1
            // cannot list its settings until it has drawn its first frame:
            // asked sooner, as when a job is started at once, it throws.
            if (element.type === "TextElm")
                continue;
            const flag = element.params().find(p => p.kind === "checkbox" && p.name === "Show Voltage");
            if (flag != null && flag.value !== visible)
                element.setParam(flag.index, visible);
        }
        app.ui.repaint();
    }
}
