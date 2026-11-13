import type { Lesson } from "../lesson/types";

// A battery and two resistors in one loop: R1 along the top, R2 down the
// right. ("$" and "v" lines: see ohms-law.ts.)
// "x" lines: the names written beside the resistors, in 18 px text.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 352 96 0 2
r 352 96 352 320 0 4
w 352 320 128 320 0
x 229 130 251 133 4 18 R1
x 372 186 394 189 4 18 R2`;

export const series: Lesson = {
    id: "series",
    title: "Series circuits",
    summary: "Parts in a row share one current, and share out the battery's voltage between them.",
    job: {
        title: "The dead string",
        customer: "Mrs. Papadaki, with a string of lights",
        request: "One little lamp went pop, and now the whole string is dark. Forty lamps! Must I buy a new set?",
        thanks: "One lamp. I nearly threw the lot away. Bless you.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        r1: { type: "Resistor", nth: 0 },
        r2: { type: "Resistor", nth: 1 },
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        r1: { label: "Resistor R1", symbol: "R1", unit: "Ω", part: "r1", setting: "Resistance" },
        r2: { label: "Resistor R2", symbol: "R2", unit: "Ω", part: "r2", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "r1", measure: "current" },
        v1: { label: "Across R1", symbol: "V1", unit: "V", part: "r1", measure: "voltage" },
        v2: { label: "Across R2", symbol: "V2", unit: "V", part: "r2", measure: "voltage" },
    },
    steps: [
        {
            kind: "read",
            title: "Two in a row",
            set: { voltage: 12, r1: 2, r2: 4 },
            text: "Two resistors, one after the other, with no branch between them. That is a **series** circuit: there is one path, so whatever leaves the battery has to go through both.\n\n"
                + "**R1** is the one along the top, and **R2** is the one on the right.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 2, r2: 4 },
            question: "How does the current through R1 compare with the current through R2?",
            options: ["R1 has more", "R2 has more", "They are the same"],
            answer: 2,
            explain: "One path, one current: {current} through the battery, through R1 and through R2. As on your first day, nothing is used up on the way round.",
        },
        {
            kind: "read",
            title: "The voltage is shared out",
            set: { voltage: 12, r1: 2, r2: 4 },
            text: "The battery's 12 V is shared between the two, though not equally. **V1** is the voltage across R1, and **V2** the voltage across R2: {v1} and {v2}.\n\n"
                + "Add them up:",
            formula: "V = V1 + V2",
            note: "4 V + 8 V = 12 V. Whatever the battery gives, the resistors in the loop take between them: all of it, and no more.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 2, r2: 4 },
            question: "R2 has twice the resistance of R1. How do their voltages compare?",
            options: ["R2 has twice as much", "R2 has half as much", "They are equal"],
            answer: 0,
            explain: "The same current flows through both, and V = I × R. Twice the resistance, twice the voltage: 2 A × 2 Ω = 4 V across R1, and 2 A × 4 Ω = 8 V across R2.",
        },
        {
            kind: "explore",
            title: "Even them up",
            set: { voltage: 12, r1: 2, r2: 4 },
            text: "Drag **R1** up to **4 Ω**, the same as R2, and watch V1 and V2.",
            controls: [{ quantity: "r1", min: 1, max: 12, step: 1 }],
            goal: { r1: 4 },
            success: "Equal resistors, equal shares: {v1} and {v2}.",
        },
        {
            kind: "read",
            title: "Resistances add",
            set: { voltage: 12, r1: 2, r2: 4 },
            text: "The battery can't tell two resistors from one. It pushes against the whole path, and the resistance of the path is the two added together:",
            formula: "R = R1 + R2",
            note: "2 Ω + 4 Ω = 6 Ω. So the current is 12 V ÷ 6 Ω = 2 A, just what a single 6 Ω resistor let through on your second day.",
        },
        {
            kind: "explore",
            title: "Add more",
            set: { voltage: 12, r1: 2, r2: 4 },
            text: "Drag **R2** up to **10 Ω** and watch the current.",
            controls: [{ quantity: "r2", min: 1, max: 12, step: 1 }],
            goal: { r2: 10 },
            success: "12 Ω in all now, and the current is {current}.",
        },
        {
            kind: "number",
            set: { voltage: 9, r1: 1, r2: 2 },
            question: "The battery gives 9 V. R1 is 1 Ω and R2 is 2 Ω. What current flows?",
            solveFor: "current",
            answer: 3,
            explain: "R = 1 Ω + 2 Ω = 3 Ω, so I = V ÷ R = 9 V ÷ 3 Ω = 3 A",
        },
        {
            kind: "number",
            set: { voltage: 10, r1: 2, r2: 3 },
            question: "The battery gives 10 V, and R1 has 4 V across it. What is the voltage across R2?",
            solveFor: "v2",
            answer: 6,
            explain: "V = V1 + V2, so V2 = 10 V − 4 V = 6 V",
        },
        {
            kind: "number",
            set: { voltage: 12, r1: 1, r2: 3 },
            question: "The battery gives 12 V and 3 A flows. R1 is 1 Ω. How big is R2?",
            solveFor: "r2",
            answer: 3,
            explain: "R = V ÷ I = 12 V ÷ 3 A = 4 Ω in all, so R2 = 4 Ω − 1 Ω = 3 Ω",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 2, r2: 4 },
            question: "Six identical lamps in series share a 12 V battery. What voltage does each get?",
            options: ["12 V", "6 V", "2 V"],
            answer: 2,
            explain: "Equal resistances share the voltage equally: 12 V ÷ 6 = 2 V each. That is how a string of small lamps runs from a supply that would burn out any one of them.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 2, r2: 4 },
            question: "One lamp in the string burns out and leaves a gap. What happens to the rest?",
            options: ["They all go dark", "They glow brighter", "Nothing changes"],
            answer: 0,
            explain: "One path, so one gap stops the current everywhere: an open circuit, as on your first day. Find the dead lamp, fit a new one, and the whole string lights.",
        },
    ],
};
