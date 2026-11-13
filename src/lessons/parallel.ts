import type { Lesson } from "../lesson/types";

// A battery with two branches across it: R1 down the middle, and a switch
// and R2 down the right. ("$" and "v" lines: see ohms-law.ts.)
// "s" line: the switch, open (position 1).
// "x" lines: the names written beside the resistors, in 18 px text.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 288 96 0
w 288 96 448 96 0
r 288 96 288 320 0 6
s 448 96 448 208 0 1 false
r 448 208 448 320 0 4
w 448 320 288 320 0
w 288 320 128 320 0
x 308 186 330 189 4 18 R1
x 468 242 490 245 4 18 R2`;

export const parallel: Lesson = {
    id: "parallel",
    title: "Parallel circuits",
    summary: "Parts side by side each get the full voltage, and the battery supplies all their currents added together.",
    job: {
        title: "The fuse that keeps blowing",
        customer: "Lena, with a camper van",
        request: "Lamp on, fine. Fan on as well, fine. Plug in the cool box and the fuse goes, every time. I'm through a whole packet.",
        thanks: "Cool box on a fuse of its own, and nothing has blown all week.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        r1: { type: "Resistor", nth: 0 },
        r2: { type: "Resistor", nth: 1 },
        switch: { type: "Switch" },
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        r1: { label: "Resistor R1", symbol: "R1", unit: "Ω", part: "r1", setting: "Resistance" },
        r2: { label: "Resistor R2", symbol: "R2", unit: "Ω", part: "r2", setting: "Resistance" },
        switch: { label: "Switch", part: "switch", switch: true },
        current: { label: "From battery", symbol: "I", unit: "A", part: "battery", measure: "current" },
        i1: { label: "Through R1", symbol: "I1", unit: "A", part: "r1", measure: "current" },
        i2: { label: "Through R2", symbol: "I2", unit: "A", part: "r2", measure: "current" },
    },
    steps: [
        {
            kind: "read",
            title: "Two paths",
            set: { voltage: 12, r1: 6, r2: 4, switch: 0 },
            text: "This time the wire splits. Each resistor sits on a path of its own, a **branch**, joined straight across the battery. That is a **parallel** circuit.\n\n"
                + "**R1** is the middle branch. **R2** is the branch on the right, and its switch is open, so for now R1 works alone: {i1}.",
        },
        {
            kind: "explore",
            title: "Bring in the second branch",
            set: { voltage: 12, r1: 6, r2: 4, switch: 0 },
            text: "Press the switch on the screen to bring R2 in. As you do, keep an eye on **I1**, the current through R1.",
            controls: [],
            goal: { switch: 1 },
            success: "I1 hasn't moved: {i1}. R2 takes {i2} of its own.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 6, r2: 4, switch: 1 },
            question: "Closing the switch added a second branch. What happened to the current through R1?",
            options: ["It dropped", "It rose", "It stayed the same"],
            answer: 2,
            explain: "Each branch is joined straight across the battery, so each has the full 12 V across it and takes its own current, as if the other were not there.",
        },
        {
            kind: "read",
            title: "The currents add",
            set: { voltage: 12, r1: 6, r2: 4, switch: 1 },
            text: "The battery has to feed both branches at once. **I** is the current through the battery:",
            formula: "I = I1 + I2",
            note: "2 A + 3 A = 5 A. Follow the dots: the flow splits where the wire splits, and joins up again on the way back.",
        },
        {
            kind: "explore",
            title: "Change one branch",
            set: { voltage: 12, r1: 6, r2: 4, switch: 1 },
            text: "Drag **R2** down to **2 Ω** and watch all three currents.",
            controls: [{ quantity: "r2", min: 1, max: 12, step: 1 }],
            goal: { r2: 2 },
            success: "I2 is {i2} now, and the battery supplies {current}. I1 is still {i1}.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 6, r2: 2, switch: 1 },
            question: "Add a third branch across the battery. What happens to the battery's current?",
            options: ["It goes up", "It goes down", "No change"],
            answer: 0,
            explain: "Every branch is one more path, and the battery feeds them all. That is why a parallel circuit as a whole has less resistance than any one of its branches.",
        },
        {
            kind: "number",
            set: { voltage: 12, r1: 4, r2: 3, switch: 1 },
            question: "The battery gives 12 V. R1 is 4 Ω and R2 is 3 Ω. What current does the battery supply?",
            solveFor: "current",
            answer: 7,
            explain: "I1 = 12 V ÷ 4 Ω = 3 A and I2 = 12 V ÷ 3 Ω = 4 A, so I = 3 A + 4 A = 7 A",
        },
        {
            kind: "number",
            set: { voltage: 6, r1: 3, r2: 2, switch: 1 },
            question: "The battery supplies 5 A, and 2 A of it goes through R1. What current flows through R2?",
            solveFor: "i2",
            answer: 3,
            explain: "I = I1 + I2, so I2 = 5 A − 2 A = 3 A",
        },
        {
            kind: "number",
            set: { voltage: 12, r1: 6, r2: 12, switch: 1 },
            question: "The battery gives 12 V and supplies 3 A. R1 takes 2 A of it. How big is R2?",
            solveFor: "r2",
            answer: 12,
            explain: "R2 carries 3 A − 2 A = 1 A and has the full 12 V across it, so R2 = 12 V ÷ 1 A = 12 Ω",
        },
        {
            kind: "read",
            title: "One wire for everything",
            set: { voltage: 12, r1: 6, r2: 4, switch: 1 },
            text: "In a set, a car or a house, nearly everything is wired in parallel: each thing gets the full voltage, and can be switched by itself. The price is that the currents add up in the wire they share.\n\n"
                + "A **fuse** guards that wire. It is a thin link that melts, and opens the circuit, when more than its rated current flows. Lena's camper has one 8 A fuse for everything.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r1: 6, r2: 4, switch: 1 },
            question: "The lamp takes 2 A, the fan 3 A and the cool box 4 A, all through the 8 A fuse. What happens with all three on?",
            options: ["The fuse blows", "The lamp dims", "Each gets less current"],
            answer: 0,
            explain: "Parallel currents add: 2 A + 3 A + 4 A = 9 A, through a fuse made to melt above 8 A. Any two are fine together. The fuse is doing its job: the cool box needs a circuit and a fuse of its own.",
        },
    ],
};
