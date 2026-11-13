import type { Lesson } from "../lesson/types";

// A battery, R1 in series with it along the top, then two branches: R2 down
// the middle and R3 down the right. ("$" and "v" lines: see ohms-law.ts.)
// With R1 = 2 Ω and R2 = 6 Ω, the values the steps set for the battery and R3
// give whole numbers of amps and volts to work with.
// "x" lines: the names written beside the resistors, in 18 px text.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 288 96 0 2
w 288 96 448 96 0
r 288 96 288 320 0 6
r 448 96 448 320 0 3
w 448 320 288 320 0
w 288 320 128 320 0
x 197 130 219 133 4 18 R1
x 308 186 330 189 4 18 R2
x 468 186 490 189 4 18 R3`;

export const kirchhoff: Lesson = {
    id: "kirchhoff",
    title: "Kirchhoff's laws",
    summary: "Two rules that hold in every circuit: currents balance at a junction, and voltages balance round a loop.",
    job: {
        title: "The numbers that don't add up",
        customer: "Rita, who runs the shop",
        request: "The last lad pencilled his readings on this schematic, and they don't add up. Find out which, before I bill the customer.",
        thanks: "Thought as much. He always did rush his meter. Check yours twice.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        r1: { type: "Resistor", nth: 0 },
        r2: { type: "Resistor", nth: 1 },
        r3: { type: "Resistor", nth: 2 },
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        r3: { label: "Resistor R3", symbol: "R3", unit: "Ω", part: "r3", setting: "Resistance" },
        i1: { label: "Through R1", symbol: "I1", unit: "A", part: "r1", measure: "current" },
        i2: { label: "Through R2", symbol: "I2", unit: "A", part: "r2", measure: "current" },
        i3: { label: "Through R3", symbol: "I3", unit: "A", part: "r3", measure: "current" },
        v1: { label: "Across R1", symbol: "V1", unit: "V", part: "r1", measure: "voltage" },
        v2: { label: "Across R2", symbol: "V2", unit: "V", part: "r2", measure: "voltage" },
    },
    steps: [
        {
            kind: "read",
            title: "Two rules",
            set: { voltage: 12, r3: 3 },
            text: "This circuit is neither plain series nor plain parallel. **R1**, along the top, is in series with the battery. Then the wire splits into **R2**, in the middle, and **R3**, on the right.\n\n"
                + "Two rules sort out any circuit, however tangled. They are called **Kirchhoff's laws**, and you have used both already.",
        },
        {
            kind: "read",
            title: "The current law",
            set: { voltage: 12, r3: 3 },
            text: "Look at the **junction** at the top of R2, where the wire splits. {i1} flows in through R1. {i2} goes down R2, and {i3} carries on to R3.\n\n"
                + "Charge can't pile up at a junction, or vanish there. What flows in flows out:",
            formula: "I1 = I2 + I3",
            note: "This is **Kirchhoff's current law**. It is why the currents in parallel branches add.",
        },
        {
            kind: "explore",
            title: "Try to break it",
            set: { voltage: 12, r3: 3 },
            text: "Drag **R3** up to **6 Ω**, then check the junction again.",
            controls: [{ quantity: "r3", min: 1, max: 12, step: 1 }],
            goal: { r3: 6 },
            success: "{i1} in, {i2} and {i3} out. It still balances.",
        },
        {
            kind: "read",
            title: "The voltage law",
            set: { voltage: 12, r3: 3 },
            text: "Now walk round a **loop**: out of the battery, through R1, down R2 and back. The battery raises the voltage by 12 V. R1 drops it by {v1}, and R2 by {v2}.\n\n"
                + "Back where you started, it has to come out even. Round any loop, the drops add up to the rise:",
            formula: "V = V1 + V2",
            note: "This is **Kirchhoff's voltage law**. It is why the voltages in a series circuit add.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r3: 3 },
            question: "A second loop runs through R1 and on through R3. R1 drops 6 V of the 12 V. What is across R3?",
            options: ["3 V", "6 V", "12 V"],
            answer: 1,
            explain: "Round that loop too the drops must come to 12 V, so 6 V across R1 leaves 6 V for R3. R2 and R3 join the same two points, so they always have the same voltage across them. That is all parallel means.",
        },
        {
            kind: "number",
            set: { voltage: 24, r3: 3 },
            question: "6 A flows in through R1, and 2 A of it goes down R2. What current flows through R3?",
            solveFor: "i3",
            answer: 4,
            explain: "I1 = I2 + I3, so I3 = 6 A − 2 A = 4 A",
        },
        {
            kind: "number",
            set: { voltage: 20, r3: 6 },
            question: "The battery gives 20 V, and R1 drops 8 V of it. What is the voltage across R2?",
            solveFor: "v2",
            answer: 12,
            explain: "V = V1 + V2, so V2 = 20 V − 8 V = 12 V",
        },
        {
            kind: "number",
            set: { voltage: 10, r3: 6 },
            question: "R1 drops 4 V and R2 drops 6 V. What voltage is the battery giving?",
            solveFor: "voltage",
            answer: 10,
            explain: "V = V1 + V2 = 4 V + 6 V = 10 V",
        },
        {
            kind: "choice",
            set: { voltage: 12, r3: 3 },
            question: "His readings at one junction: 5 A in, 2 A out one way, 2 A out the other. What do you make of them?",
            options: ["1 A is used up there", "Junctions lose a little", "A reading is wrong"],
            answer: 2,
            explain: "Current in equals current out, every time. 5 A can't turn into 4 A, so one of the three readings is wrong, or there is a third way out that he never measured.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r3: 3 },
            question: "His readings round one loop: battery 9 V, then drops of 4 V, 3 V and 1 V. Do they balance?",
            options: ["No: 1 V is missing", "Yes", "No: 1 V too many"],
            answer: 0,
            explain: "The drops round a loop must come to the full 9 V, and 4 V + 3 V + 1 V is only 8 V. A reading is wrong, or a part in the loop was missed. When the sums don't balance, measure again before you change a part.",
        },
    ],
};
