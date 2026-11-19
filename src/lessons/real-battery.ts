import type { Lesson } from "../lesson/types";

// A perfect 12 V battery with the resistance inside it, Ri, drawn as a
// resistor in series along the top. Where Ri ends are the battery's
// terminals: a meter across them, then a switch and the load (the set) down
// the right. ("$" and "v" lines: see ohms-law.ts; "s" and "x" lines: see
// parallel.ts.)
//
// "p" line: CircuitJS1's voltmeter, across the terminals. Flags 2: drawn as
// a circle marked V, with no value written beside it, as a number question
// could not hide one. Then meter 0 (plain voltage), scale 0 (auto), and
// series resistance 0, which CircuitJS1 takes as infinite: the meter draws
// no current and changes no reading, so it reads the terminals with the
// switch open as well as closed.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 288 96 0 20
p 288 96 288 320 2 0 0 0
w 288 96 448 96 0
s 448 96 448 208 0 1 false
r 448 208 448 320 0 10
w 448 320 288 320 0
w 288 320 128 320 0
x 197 130 219 133 4 18 Ri
x 468 242 490 245 4 18 R`;

export const realBattery: Lesson = {
    id: "real-battery",
    title: "The real battery",
    summary: "Why a battery that reads full on the meter can still fail under load: the resistance inside it, and how to measure it.",
    job: {
        title: "The batteries that read fine",
        customer: "Mr. Castellano, with a portable television",
        request: "My son put his meter on the batteries: twelve volts, he says, so they're good. But switch the television on and the picture shrinks to a thin line and goes.",
        thanks: "New batteries, and the picture fills the screen. Twelve volts of nothing, the old ones were.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        ri: { type: "Resistor", nth: 0 },
        meter: { type: "Probe" },
        switch: { type: "Switch" },
        load: { type: "Resistor", nth: 1 },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        ri: { label: "Internal", symbol: "Ri", unit: "Ω", part: "ri", setting: "Resistance" },
        load: { label: "Load", symbol: "R", unit: "Ω", part: "load", setting: "Resistance" },
        switch: { label: "Switch", part: "switch", switch: true },
        vout: { label: "Terminals", symbol: "Vout", unit: "V", part: "meter", measure: "voltage" },
        current: { label: "From battery", symbol: "I", unit: "A", part: "battery", measure: "current" },
    },
    steps: [
        {
            kind: "read",
            title: "It reads fine",
            set: { voltage: 12, ri: 20, load: 10, switch: 0 },
            text: "Mr. Castellano's batteries are on the left, drawn as one 12 V battery. The circle marked V is a meter across its two terminals, the ends you connect to. It draws no current of its own.\n\n"
                + "The set is **R**, switched off. **Ri** is part of the battery: more on that soon. With nothing connected, the meter reads {vout}.",
        },
        {
            kind: "explore",
            title: "Switch the set on",
            set: { voltage: 12, ri: 20, load: 10, switch: 0 },
            text: "Guess first: will the meter still read 12 V once the set is on? Then press the switch on the screen and watch the meter.",
            controls: [],
            goal: { switch: 1 },
            success: "The meter has dropped to {vout}. The set gets only a third of the battery's 12 V.",
        },
        {
            kind: "choice",
            set: { voltage: 12, ri: 20, load: 10, switch: 1 },
            question: "Nothing connected, the meter read 12 V. With the set on, it reads 4 V. Where are the other 8 V?",
            options: ["Used up by the set", "The meter took them", "Inside the battery"],
            answer: 2,
            explain: "The battery still makes 12 V, and round a loop the drops add up to that. The set drops 4 V and the meter takes no current, so the other 8 V are dropped inside the battery, across Ri.",
        },
        {
            kind: "read",
            title: "Resistance inside",
            set: { voltage: 12, ri: 20, load: 10, switch: 1 },
            text: "Every real battery has some resistance inside it, its **internal resistance**: Ri on the drawing. All its current passes through Ri, so Ri drops a share of the voltage.\n\n"
                + "Ri and the set are a voltage divider, as in Ines's volume knob. Ri is R1, the set is R2, and the terminals are Vout:",
            formula: "Vout = V × R ÷ (Ri + R)",
            note: "Here: 12 V × 10 Ω ÷ 30 Ω = 4 V. A third of the resistance, a third of the voltage.",
        },
        {
            kind: "number",
            set: { voltage: 9, ri: 3, load: 6, switch: 1 },
            question: "A battery reads 9 V with nothing connected. It has 3 Ω of internal resistance and feeds a 6 Ω set. What do its terminals read?",
            solveFor: "vout",
            answer: 6,
            explain: "Vout = 9 V × 6 Ω ÷ (3 Ω + 6 Ω) = 6 V",
        },
        {
            kind: "explore",
            title: "A fresh battery",
            set: { voltage: 12, ri: 20, load: 10, switch: 1 },
            text: "A fresh battery has little internal resistance. Drag **Ri** down to **2 Ω** and watch the terminals.",
            controls: [{ quantity: "ri", min: 2, max: 30, step: 2 }],
            goal: { ri: 2 },
            success: "The terminals read {vout} now, with {current} flowing. Less is lost inside, so more reaches the set.",
        },
        {
            kind: "explore",
            title: "Nothing connected",
            set: { voltage: 12, ri: 2, load: 10, switch: 0 },
            text: "The set is off again. Drag **Ri** back up to **20 Ω**, as worn as Mr. Castellano's batteries, and keep your eye on the meter.",
            controls: [{ quantity: "ri", min: 2, max: 30, step: 2 }],
            goal: { ri: 20 },
            success: "The meter still reads {vout}. With nothing connected, a fresh battery and a worn one read the same.",
        },
        {
            kind: "choice",
            set: { voltage: 12, ri: 20, load: 10, switch: 0 },
            question: "The set is off. Why does the worn battery read the full 12 V, just like the fresh one?",
            options: ["No current, no loss", "Ri shrinks to nothing", "The meter tops it up"],
            answer: 0,
            explain: "The meter draws no current, so none flows through Ri, and a resistance with no current through it drops no voltage: 0 A × 20 Ω = 0 V. Ri is still there. It shows only under load.",
        },
        {
            kind: "read",
            title: "Two readings",
            set: { voltage: 12, ri: 20, load: 10, switch: 1 },
            text: "A meter alone can't tell a fresh battery from a worn one. The shop takes two readings: one with nothing connected, and one across a load it knows.\n\n"
                + "The difference is the voltage lost inside. Divide it by the current, and you have the internal resistance:",
            formula: "Ri = (V − Vout) ÷ I",
            note: "Here: 12 V alone, 4 V across the 10 Ω set. The set takes 4 V ÷ 10 Ω = 0.4 A, so Ri = 8 V ÷ 0.4 A = 20 Ω.",
        },
        {
            kind: "number",
            set: { voltage: 6, ri: 4, load: 8, switch: 1 },
            question: "A lantern battery reads 6 V with nothing connected, and 4 V across an 8 Ω test load. What is its internal resistance?",
            solveFor: "ri",
            answer: 4,
            explain: "I = 4 V ÷ 8 Ω = 0.5 A, so Ri = (6 V − 4 V) ÷ 0.5 A = 4 Ω",
        },
        {
            kind: "read",
            title: "Test it under load",
            set: { voltage: 12, ri: 20, load: 10, switch: 1 },
            text: "A battery wears out in two ways. It runs down, and reads low on the meter. Or its internal resistance grows with age, and a meter alone never sees that: it draws no current.\n\n"
                + "So test a battery under load: with its set switched on, or across a test resistor. One that sags is worn, whatever it reads alone.",
        },
        {
            kind: "choice",
            set: { voltage: 12, ri: 20, load: 10, switch: 1 },
            question: "His batteries read 12 V with the meter alone. Why is his set still dead?",
            options: ["The set needs repair", "Their Ri has grown", "The meter is lying"],
            answer: 1,
            explain: "Internal resistance grows as batteries age. With the set on, his lose 8 V inside and give it only 4 V. The meter alone draws no current, so it never showed that. Fresh ones mend it.",
        },
    ],
};
