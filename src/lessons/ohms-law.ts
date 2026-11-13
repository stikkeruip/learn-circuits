import type { Lesson } from "../lesson/types";

// A battery and one resistor in a loop.
//
// "$" line: show current dots; 5 µs timestep; current-dot speed 38 (slower
// than CircuitJS1's default 50, which suits milliamps; here currents are amps);
// voltage colours scaled to 12 V.
// "v" line: DC source, flags 16 = write its voltage next to it.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 352 96 0
r 352 96 352 320 0 6
w 352 320 128 320 0`;

export const ohmsLaw: Lesson = {
    id: "ohms-law",
    title: "Ohm's law",
    circuit,
    parts: {
        battery: { type: "Voltage" },
        resistor: { type: "Resistor" },
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        resistance: { label: "Resistance", symbol: "R", unit: "Ω", part: "resistor", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "resistor", measure: "current" },
    },
    steps: [
        {
            kind: "read",
            title: "Meet the circuit",
            set: { voltage: 12, resistance: 6 },
            text: "A **battery** pushes electric charge around a loop of wire. The **resistor** pushes back, limiting how much gets through.\n\n"
                + "The moving dots are the **current**: how much charge flows past each second. Right now it is {current}.",
        },
        {
            kind: "explore",
            title: "Turn up the voltage",
            set: { voltage: 12, resistance: 6 },
            text: "**Voltage** is how hard the battery pushes. Drag the battery up to **24 V**, twice what it is now, and watch the current.",
            controls: [{ quantity: "voltage", min: 0, max: 24, step: 1 }],
            goal: { voltage: 24 },
            success: "Now look at the current: {current}.",
        },
        {
            kind: "choice",
            set: { voltage: 24, resistance: 6 },
            question: "You doubled the voltage. What happened to the current?",
            options: ["It doubled", "It halved", "It stayed the same"],
            answer: 0,
            explain: "The current went from 2 A to 4 A. Twice the push, twice the flow.",
        },
        {
            kind: "explore",
            title: "Add resistance",
            set: { voltage: 12, resistance: 6 },
            text: "**Resistance** is how hard the resistor pushes back. Keep the battery at 12 V and drag the resistance up to **12 Ω**.",
            controls: [{ quantity: "resistance", min: 1, max: 24, step: 1 }],
            goal: { resistance: 12 },
            success: "Now look at the current: {current}.",
        },
        {
            kind: "choice",
            set: { voltage: 12, resistance: 12 },
            question: "You doubled the resistance. What happened to the current?",
            options: ["It doubled", "It halved", "It stayed the same"],
            answer: 1,
            explain: "The current went from 2 A to 1 A. Twice the resistance lets half as much through.",
        },
        {
            kind: "read",
            title: "Ohm's law",
            set: { voltage: 12, resistance: 6 },
            text: "Both experiments follow one rule, called **Ohm's law**:",
            formula: "V = I × R",
            note: "**V** is the voltage in volts (V), **I** is the current in amps (A) and **R** is the resistance in ohms (Ω).\n\n"
                + "Here: 2 A × 6 Ω = 12 V. Check it against the readings.",
        },
        {
            kind: "choice",
            set: { voltage: 12, resistance: 6 },
            question: "Which of these gives the current?",
            options: ["I = V ÷ R", "I = V × R", "I = R ÷ V"],
            answer: 0,
            explain: "Divide both sides of V = I × R by R. Here: 12 V ÷ 6 Ω = 2 A.",
        },
        {
            kind: "number",
            set: { voltage: 9, resistance: 3 },
            question: "The battery gives 9 V and the resistor is 3 Ω. What current flows?",
            solveFor: "current",
            answer: 3,
            explain: "I = V ÷ R = 9 V ÷ 3 Ω = 3 A",
        },
        {
            kind: "number",
            set: { voltage: 12, resistance: 4 },
            question: "The resistor is 4 Ω and 3 A flows through it. What voltage is the battery giving?",
            solveFor: "voltage",
            answer: 12,
            explain: "V = I × R = 3 A × 4 Ω = 12 V",
        },
        {
            kind: "number",
            set: { voltage: 12, resistance: 24 },
            question: "The battery gives 12 V and 0.5 A flows. How big is the resistance?",
            solveFor: "resistance",
            answer: 24,
            explain: "R = V ÷ I = 12 V ÷ 0.5 A = 24 Ω",
        },
    ],
};
