import type { Lesson } from "../lesson/types";

// A battery and two resistors in series, as in series.ts, with two leads out
// to the right from the ends of R2: the output.
//
// "$" line: as in ohms-law.ts, but current-dot speed 60, which suits the
// milliamps that flow here, and voltage colours scaled to 9 V.
// "x" lines: the names written on the drawing, in 18 px text.
const circuit = `$ 1 0.000005 10.2 60 9 50
v 128 320 128 96 16 0 40 9 0 0 0.5
r 128 96 352 96 0 2000
r 352 96 352 320 0 1000
w 352 320 128 320 0
w 352 96 448 96 0
w 352 320 448 320 0
x 229 130 251 133 4 18 R1
x 372 186 394 189 4 18 R2
x 462 214 502 217 4 18 Vout`;

export const voltageDivider: Lesson = {
    id: "voltage-divider",
    title: "Voltage dividers",
    summary: "How two resistors in series pick off any part of a voltage, and what a volume knob really is.",
    job: {
        title: "The crackling knob",
        customer: "Ines, with a portable radio",
        request: "The volume knob crackles like a fire, and half the time turning it does nothing at all.",
        thanks: "Not a crackle. I'd forgotten it could go quiet.",
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
        vout: { label: "Across R2", symbol: "Vout", unit: "V", part: "r2", measure: "voltage" },
    },
    steps: [
        {
            kind: "read",
            title: "Thousands and thousandths",
            set: { voltage: 9, r1: 2000, r2: 1000 },
            text: "Real sets run on big resistances and small currents, so from here on the meter uses the prefixes you met with power. **R1** is {r1}: that is 2000 Ω. The current is {current}: that is 0.003 A.\n\n"
                + "A shortcut worth keeping: volts ÷ kilohms = milliamps. Here, 9 V ÷ 3 kΩ = 3 mA.",
        },
        {
            kind: "read",
            title: "A series pair with a tap",
            set: { voltage: 9, r1: 2000, r2: 1000 },
            text: "You know this circuit: two resistors in series, sharing out the battery's voltage. What is new is where we look. The output is taken across R2 alone: **Vout**, {vout} of the battery's 9 V.\n\n"
                + "A series pair used to pick off part of a voltage is a **voltage divider**.",
        },
        {
            kind: "explore",
            title: "Half",
            set: { voltage: 9, r1: 2000, r2: 1000 },
            text: "Drag **R1** down to **1 kΩ**, the same as R2.",
            controls: [{ quantity: "r1", min: 1000, max: 6000, step: 1000 }],
            goal: { r1: 1000 },
            success: "Vout is {vout}: half of 9 V.",
        },
        {
            kind: "choice",
            set: { voltage: 9, r1: 1000, r2: 1000 },
            question: "Equal resistors give half the voltage. What if both were 10 kΩ instead of 1 kΩ?",
            options: ["A tenth as much", "Still half", "Ten times as much"],
            answer: 1,
            explain: "The share depends on how the two resistances compare, not on how big they are. Equal resistors always split the voltage in half. Bigger ones only pass less current.",
        },
        {
            kind: "explore",
            title: "A smaller share",
            set: { voltage: 9, r1: 1000, r2: 1000 },
            text: "Now drag **R1** up to **5 kΩ** and watch Vout.",
            controls: [{ quantity: "r1", min: 1000, max: 6000, step: 1000 }],
            goal: { r1: 5000 },
            success: "Vout is {vout}. R2 is a sixth of the resistance, and gets a sixth of the voltage.",
        },
        {
            kind: "read",
            title: "The divider rule",
            set: { voltage: 9, r1: 2000, r2: 1000 },
            text: "R2 gets the same share of the voltage as it has of the total resistance:",
            formula: "Vout = V × R2 ÷ (R1 + R2)",
            note: "Here: 9 V × 1 kΩ ÷ 3 kΩ = 3 V. A third of the resistance, a third of the voltage.",
        },
        {
            kind: "number",
            set: { voltage: 12, r1: 3000, r2: 1000 },
            question: "The battery gives 12 V. R1 is 3 kΩ and R2 is 1 kΩ. What is Vout?",
            solveFor: "vout",
            answer: 3,
            explain: "Vout = 12 V × 1 kΩ ÷ 4 kΩ = 3 V",
        },
        {
            kind: "number",
            set: { voltage: 12, r1: 1000, r2: 2000 },
            question: "Now R1 is 1 kΩ and R2 is 2 kΩ, still on 12 V. What is Vout?",
            solveFor: "vout",
            answer: 8,
            explain: "Vout = 12 V × 2 kΩ ÷ 3 kΩ = 8 V. R2 is the bigger one now, so it gets the bigger share.",
        },
        {
            kind: "number",
            set: { voltage: 6, r1: 2000, r2: 1000 },
            question: "R1 is 2 kΩ, R2 is 1 kΩ, and Vout reads 2 V. What voltage is the battery giving?",
            solveFor: "voltage",
            answer: 6,
            explain: "R2 is a third of the total resistance, so 2 V is a third of the battery's voltage: 3 × 2 V = 6 V",
        },
        {
            kind: "read",
            title: "The volume knob",
            set: { voltage: 9, r1: 2000, r2: 1000 },
            text: "A volume control is a voltage divider in a single part: a strip of resistance with a sliding contact, the **wiper**. The strip above the wiper is R1, and the strip below it is R2. Turn the knob, and one grows as the other shrinks.\n\n"
                + "The signal goes in across the whole strip and comes out at the wiper.",
        },
        {
            kind: "choice",
            set: { voltage: 9, r1: 2000, r2: 1000 },
            question: "Volume up slides the wiper towards the top of the strip. What does that do?",
            options: ["R1 grows, R2 shrinks", "Both shrink", "R1 shrinks, R2 grows"],
            answer: 2,
            explain: "With the wiper near the top, R2 is most of the strip, so most of the signal comes out. At the bottom R2 is nothing: silence. A worn strip makes poor contact with the wiper, and that is the crackle.",
        },
    ],
};
