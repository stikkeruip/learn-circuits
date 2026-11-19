import type { Lesson } from "../lesson/types";

// The divider from voltage-divider.ts (R1 along the top, R2 down the right),
// with its output leads carried on to a third column: a switch and a load
// resistor, RL, side by side with R2. Closing the switch puts the load
// across R2. ("$" line: as in voltage-divider.ts. "s" line: as in
// parallel.ts, open.)
// With R1 = 2 kΩ, the values the steps set for the battery, R2 and the load
// give whole numbers, or one decimal place, of volts to work with.
// "x" lines: the names written beside the resistors, in 18 px text.
const circuit = `$ 1 0.000005 10.2 60 9 50
v 128 320 128 96 16 0 40 9 0 0 0.5
r 128 96 352 96 0 2000
r 352 96 352 320 0 1000
w 352 96 448 96 0
s 448 96 448 208 0 1 false
r 448 208 448 320 0 1000
w 448 320 352 320 0
w 352 320 128 320 0
x 229 130 251 133 4 18 R1
x 372 186 394 189 4 18 R2
x 468 242 490 245 4 18 RL`;

export const loadedDivider: Lesson = {
    id: "loaded-divider",
    title: "The loaded divider",
    summary: "Whatever you connect to a divider's output is a branch across R2, so it pulls the output down.",
    job: {
        title: "The tape that won't turn",
        customer: "Mrs. Adeyemi, with a cassette player",
        request: "My nephew made a lead to run my cassette player off the car battery. His meter says 6 V, just right. Plug the player in, though, and the tape won't turn.",
        thanks: "The proper adaptor plays every tape. My nephew wants a word with you about his lead.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        r1: { type: "Resistor", nth: 0 },
        r2: { type: "Resistor", nth: 1 },
        switch: { type: "Switch" },
        load: { type: "Resistor", nth: 2 },
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        r2: { label: "Resistor R2", symbol: "R2", unit: "Ω", part: "r2", setting: "Resistance" },
        load: { label: "Load", symbol: "RL", unit: "Ω", part: "load", setting: "Resistance" },
        switch: { label: "Switch", part: "switch", switch: true },
        vout: { label: "Across R2", symbol: "Vout", unit: "V", part: "r2", measure: "voltage" },
        v1: { label: "Across R1", symbol: "V1", unit: "V", part: "r1", measure: "voltage" },
    },
    steps: [
        {
            kind: "read",
            title: "Nothing on the output",
            set: { voltage: 9, r2: 1000, load: 1000, switch: 0 },
            text: "The divider you met with Ines's radio, on 9 V: **R1** (2 kΩ) at the top, and **R2** (1 kΩ) at the bottom, joined to the bottom wire. With nothing connected to its output, Vout is {vout}, a third of 9 V.\n\n"
                + "On the right, a switch can join a load across R2: a resistor, **RL**, standing in for whatever the divider feeds.",
        },
        {
            kind: "explore",
            title: "Plug in a load",
            set: { voltage: 9, r2: 1000, load: 1000, switch: 0 },
            text: "The load is 1 kΩ, the same as R2. Guess first: will Vout change? Then press the switch on the screen and watch **Vout**.",
            controls: [],
            goal: { switch: 1 },
            success: "Vout has fallen from 3 V to {vout}, though R1 and R2 are just as they were.",
        },
        {
            kind: "choice",
            set: { voltage: 9, r2: 1000, load: 1000, switch: 1 },
            question: "Vout fell. R2 and the load, both 1 kΩ, now sit side by side. What resistance do the two make together?",
            options: ["2 kΩ", "1 kΩ, as before", "0.5 kΩ"],
            answer: 2,
            explain: "Two equal resistors side by side act as one of half the size: 0.5 kΩ. They would add only in series. So the bottom of the divider is now half what it was.",
        },
        {
            kind: "read",
            title: "A branch across R2",
            set: { voltage: 9, r2: 1000, load: 1000, switch: 1 },
            text: "The load joins the same two points as R2, so it is a branch across it. The bottom of the divider is now R2 and the load side by side, which is less than R2 alone, so it gets a smaller share:",
            formula: "Vout = V × R ÷ (R1 + R)",
            note: "R is the pair's equivalent resistance, 0.5 kΩ here: 9 V × 0.5 kΩ ÷ 2.5 kΩ = 1.8 V. The divider rule, with the pair in place of R2.",
        },
        {
            kind: "number",
            set: { voltage: 12, r2: 2000, load: 2000, switch: 1 },
            question: "R1 and R2 are both 2 kΩ on 12 V, so Vout is 6 V with nothing on. What is Vout with a 2 kΩ load?",
            solveFor: "vout",
            answer: 4,
            explain: "R2 and the load make 1 kΩ, so Vout = 12 V × 1 kΩ ÷ 3 kΩ = 4 V",
        },
        {
            kind: "number",
            set: { voltage: 12, r2: 3000, load: 6000, switch: 1 },
            question: "On 12 V, R1 is 2 kΩ and R2 is 3 kΩ. A 6 kΩ load goes across R2. What is Vout?",
            solveFor: "vout",
            answer: 6,
            explain: "R2 and the load make 3 × 6 ÷ (3 + 6) = 2 kΩ, so Vout = 12 V × 2 kΩ ÷ 4 kΩ = 6 V",
        },
        {
            kind: "explore",
            title: "Raise the load",
            set: { voltage: 9, r2: 1000, load: 1000, switch: 1 },
            text: "Back on 9 V with the 1 kΩ load. Drag the **load** up to **10 kΩ**, ten times R2, and watch Vout.",
            controls: [{ quantity: "load", min: 1000, max: 20000, step: 1000 }],
            goal: { load: 10000 },
            success: "Vout is back up to {vout}, close to the 3 V it gave with nothing on. R2 and 10 kΩ side by side make 0.91 kΩ: nearly R2 alone.",
        },
        {
            kind: "read",
            title: "Ten times R2",
            set: { voltage: 9, r2: 1000, load: 10000, switch: 1 },
            text: "The more resistance a load has, the less current it takes, and the less it pulls Vout down. Pulling an output down like this is called **loading** it.\n\n"
                + "A rule of thumb worth keeping: **a load of ten times R2 or more barely moves Vout**. Here Vout is {vout}, against 3 V with nothing on.",
        },
        {
            kind: "choice",
            set: { voltage: 9, r2: 1000, load: 10000, switch: 1 },
            question: "A divider's R2 is 2 kΩ. Which of these loads would barely move its Vout?",
            options: ["200 Ω", "47 kΩ", "2 kΩ"],
            answer: 1,
            explain: "Ten times 2 kΩ is 20 kΩ, and 47 kΩ is well over it. A 2 kΩ load would halve the bottom of the divider. 200 Ω is worse still: Vout all but vanishes.",
        },
        {
            kind: "choice",
            set: { voltage: 9, r2: 1000, load: 1000, switch: 1 },
            question: "When the 1 kΩ load went on, Vout fell from 3 V to 1.8 V. What did the voltage across R1 do?",
            options: ["It rose", "It fell too", "It stayed at 6 V"],
            answer: 0,
            explain: "The drops round the loop still come to 9 V, so R1 now has {v1}. The load lowered the resistance of the whole loop, so more current flows, and R1 drops more.",
        },
        {
            kind: "number",
            set: { voltage: 12, r2: 1000, load: 1000, switch: 1 },
            question: "On 12 V, R1 is 2 kΩ, and R2 and the load are both 1 kΩ. What is the voltage across R1?",
            solveFor: "v1",
            answer: 9.6,
            explain: "Vout = 12 V × 0.5 kΩ ÷ 2.5 kΩ = 2.4 V, so V1 = 12 V − 2.4 V = 9.6 V",
        },
        {
            kind: "read",
            title: "A meter is a load too",
            set: { voltage: 12, r2: 2000, load: 40, switch: 0 },
            text: "Your meter is a load too, but its resistance is huge: far more than ten times R2. It barely loads a divider, so it reads Vout as if nothing were there. Measure an output with its load connected.\n\n"
                + "On the screen is Mrs. Adeyemi's lead: two 2 kΩ resistors on 12 V, with RL for her player. With nothing on, Vout is {vout}, as her nephew's meter said.",
        },
        {
            kind: "choice",
            set: { voltage: 12, r2: 2000, load: 40, switch: 0 },
            question: "Mrs. Adeyemi's lead: two 2 kΩ resistors on 12 V. Her player acts like a 40 Ω load. What does it get?",
            options: ["About 6 V", "About 4 V", "Well under 1 V"],
            answer: 2,
            explain: "40 Ω is far below R2, let alone ten times it. R2 and the player together make under 40 Ω, a tiny share of 12 V: about 0.23 V. A motor needs a proper car adaptor, not a divider.",
        },
    ],
};
