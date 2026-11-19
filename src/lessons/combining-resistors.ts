import type { Lesson } from "../lesson/types";

// The circuit of kirchhoff.ts: a 12 V battery, R1 in series with it along the
// top, then two branches, R2 down the middle and R3 down the right. ("$" and
// "v" lines: see ohms-law.ts.) The battery stays at 12 V: the steps change
// only R2 and R3, so the lesson is about resistances alone.
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

export const combiningResistors: Lesson = {
    id: "combining-resistors",
    title: "Combining resistors",
    summary: "Resistors side by side act as one smaller resistor, and a whole circuit boils down to one resistance, a pair at a time.",
    job: {
        title: "The silent speaker",
        customer: "Tomasz, with a hi-fi amplifier",
        request: "The left speaker has gone quiet. The right one plays as loud as ever, and I haven't touched a thing.",
        thanks: "Both speakers again. Two resistors where there was one, you say? I can't hear the difference.",
    },
    circuit,
    parts: {
        r1: { type: "Resistor", nth: 0 },
        r2: { type: "Resistor", nth: 1 },
        r3: { type: "Resistor", nth: 2 },
    },
    quantities: {
        r2: { label: "Resistor R2", symbol: "R2", unit: "Ω", part: "r2", setting: "Resistance" },
        r3: { label: "Resistor R3", symbol: "R3", unit: "Ω", part: "r3", setting: "Resistance" },
        i1: { label: "Through R1", symbol: "I1", unit: "A", part: "r1", measure: "current" },
        i2: { label: "Through R2", symbol: "I2", unit: "A", part: "r2", measure: "current" },
        i3: { label: "Through R3", symbol: "I3", unit: "A", part: "r3", measure: "current" },
        v2: { label: "Across R2", symbol: "V2", unit: "V", part: "r2", measure: "voltage" },
    },
    steps: [
        {
            kind: "read",
            title: "Yesterday's circuit",
            set: { r2: 6, r3: 3 },
            text: "The circuit from yesterday: **R1** along the top, then **R2** and **R3** side by side. You read it then: {i1} from the battery, {v2} across the pair, {i2} and {i3} down the branches.\n\n"
                + "Today you work those out before you look. The trick is to see a group of resistors as one.",
        },
        {
            kind: "explore",
            title: "Two the same",
            set: { r2: 6, r3: 3 },
            text: "Drag **R3** up to **6 Ω**, the same as R2. Then compare **I2**, the current down one branch, with **I1**, the current into the pair.",
            controls: [{ quantity: "r3", min: 1, max: 12, step: 1 }],
            goal: { r3: 6 },
            success: "{i2} down each branch, so {i1} into the pair: twice what one branch takes, from the same {v2}.",
        },
        {
            kind: "choice",
            set: { r2: 6, r3: 6 },
            question: "From the same voltage, the pair takes twice the current one 6 Ω does. So it acts like what?",
            options: ["One 12 Ω", "One 3 Ω", "One 6 Ω"],
            answer: 1,
            explain: "Twice the current from the same voltage means half the resistance: {v2} ÷ {i1} = 3 Ω. A second path makes it easier for the current, not harder.",
        },
        {
            kind: "read",
            title: "Equivalent resistance",
            set: { r2: 6, r3: 3 },
            text: "Two 6 Ω side by side act as one 3 Ω. The one resistance that would take the same current as a group is its **equivalent resistance**.\n\n"
                + "For any pair, each branch takes V ÷ R and the battery supplies the sum, as in Lena's camper van. V ÷ that sum is the pair's resistance. In letters:",
            formula: "R = R2 × R3 ÷ (R2 + R3)",
            note: "Here: 6 Ω × 3 Ω ÷ 9 Ω = 2 Ω. Two checks to carry about: a pair is always less than its smaller resistor, and an equal pair is half.",
        },
        {
            kind: "choice",
            set: { r2: 6, r3: 12 },
            question: "R3 is now 12 Ω, beside R2's 6 Ω. Without working it out, what could the pair act as?",
            options: ["18 Ω", "9 Ω", "4 Ω"],
            answer: 2,
            explain: "A pair is always less than its smaller resistor, so under 6 Ω. 18 Ω is the two in series, and 9 Ω their average. The rule gives 72 ÷ 18 = 4 Ω, and {v2} ÷ {i1} agrees.",
        },
        {
            kind: "choice",
            set: { r2: 6, r3: 3 },
            question: "To boil the circuit down to one resistor, which two can you combine first?",
            options: ["R2 and R3", "R1 and R2", "All three at once"],
            answer: 0,
            explain: "R2 and R3 join the same two points, so they are side by side. R1 and R2 look in series, but a branch leaves for R3 between them, so not all of R1's current goes through R2.",
        },
        {
            kind: "read",
            title: "Boil it down",
            set: { r2: 6, r3: 3 },
            text: "First the pair: R2 and R3 act as one 2 Ω. That leaves R1 and the 2 Ω in series, so the whole circuit acts as 2 Ω + 2 Ω = 4 Ω.\n\n"
                + "The battery sees one 4 Ω, and pushes 12 V ÷ 4 Ω = 3 A through it: I1 reads {i1}. That 2 Ω is not a part you could pick up. It is the pair, as the battery sees it.",
        },
        {
            kind: "read",
            title: "Work back out",
            set: { r2: 6, r3: 3 },
            text: "3 A through R1's 2 Ω drops 6 V. 3 A through the pair's 2 Ω drops 6 V too, and V2 reads {v2}. So R2 takes 6 V ÷ 6 Ω = {i2}, and R3 takes 6 V ÷ 3 Ω = {i3}.\n\n"
                + "Kirchhoff's laws still balance: {i2} + {i3} = {i1} at the junction, and 6 V + 6 V = 12 V round the loop. Every reading on the screen, worked out before you looked.",
        },
        {
            kind: "number",
            set: { r2: 10, r3: 15 },
            question: "R1 is 2 Ω, R2 is 10 Ω and R3 is 15 Ω, on 12 V. What current flows through R1?",
            solveFor: "i1",
            answer: 1.5,
            explain: "The pair is 10 Ω × 15 Ω ÷ 25 Ω = 6 Ω, and 2 Ω + 6 Ω = 8 Ω, so I1 = 12 V ÷ 8 Ω = 1.5 A",
        },
        {
            kind: "number",
            set: { r2: 20, r3: 5 },
            question: "R2 is 20 Ω and R3 is 5 Ω, and 2 A flows into the pair. What current flows through R3?",
            solveFor: "i3",
            answer: 1.6,
            explain: "The pair is 20 Ω × 5 Ω ÷ 25 Ω = 4 Ω, so V2 = 2 A × 4 Ω = 8 V, and I3 = 8 V ÷ 5 Ω = 1.6 A",
        },
        {
            kind: "number",
            set: { r2: 3, r3: 6 },
            question: "A 3 Ω is fitted as R2, and the pair should act as 2 Ω. What must R3 be?",
            solveFor: "r3",
            answer: 6,
            explain: "Try 6 V across the pair: 2 Ω would take 3 A and R2 takes 2 A, so R3 takes 1 A, and R3 = 6 V ÷ 1 A = 6 Ω",
        },
        {
            kind: "read",
            title: "The amplifier on the bench",
            set: { r2: 6, r3: 3 },
            text: "In Tomasz's amplifier, a resistor in the left channel has burnt open: no loop, no current, no sound. It is marked 5 Ω, an old value, and the drawer has none.\n\n"
                + "You don't need one. The circuit round it only feels the current it takes, so any group with an equivalent resistance of 5 Ω will do the old part's job.",
        },
        {
            kind: "choice",
            set: { r2: 6, r3: 3 },
            question: "The drawer has no 5 Ω. Which pair, side by side, will stand in for it?",
            options: ["4 Ω and 6 Ω", "Two 10 Ω", "2 Ω and 3 Ω"],
            answer: 1,
            explain: "4 Ω and 6 Ω average 5 Ω, and 2 Ω and 3 Ω make 5 Ω in series. Side by side, each pair is less than its smaller one. An equal pair is half: two 10 Ω make 5 Ω.",
        },
    ],
};
