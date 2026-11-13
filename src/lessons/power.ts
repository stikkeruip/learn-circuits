import type { Lesson } from "../lesson/types";

// A battery and one resistor, as in ohms-law.ts (see there for the "$" and
// "v" lines), with the power the resistor turns into heat read off it too.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 352 96 0
r 352 96 352 320 0 6
w 352 320 128 320 0`;

export const power: Lesson = {
    id: "power",
    title: "Power",
    summary: "Why parts get hot: power is voltage times current, in watts, and every part can only take so much.",
    job: {
        title: "The smell of burning",
        customer: "Mr. Okafor, with a kitchen radio",
        request: "It plays fine for ten minutes, and then there's a smell of burning. My wife wants it out of the kitchen.",
        thanks: "An hour on, and no smell. It can stay in the kitchen.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        resistor: { type: "Resistor" },
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        resistance: { label: "Resistance", symbol: "R", unit: "Ω", part: "resistor", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "resistor", measure: "current" },
        power: { label: "Power", symbol: "P", unit: "W", part: "resistor", measure: "power" },
    },
    steps: [
        {
            kind: "read",
            title: "A fourth number",
            set: { voltage: 12, resistance: 6 },
            text: "The loop from last time: 12 V pushing 2 A through 6 Ω. The meter has a fourth reading now.\n\n"
                + "**Power** is how fast the resistor turns electrical energy into heat. It is measured in **watts** (**W**). Right now it is {power}.",
        },
        {
            kind: "read",
            title: "Where the heat comes from",
            set: { voltage: 12, resistance: 6 },
            text: "The battery has to push the charge through the resistor, and the energy that takes comes out as heat. A lamp's filament is the same thing, run so hot that it glows.\n\n"
                + "More push or more flow means more heat:",
            formula: "P = V × I",
            note: "**P** is the power in watts (W). Here: 12 V × 2 A = 24 W, about what a soldering iron gives off. You would not want to touch this resistor.",
        },
        {
            kind: "explore",
            title: "Turn up the voltage",
            set: { voltage: 12, resistance: 6 },
            text: "Guess first: what will the power be at twice the voltage? Then drag the battery up to **24 V**.",
            controls: [{ quantity: "voltage", min: 0, max: 24, step: 1 }],
            goal: { voltage: 24 },
            success: "The power is {power}.",
        },
        {
            kind: "choice",
            set: { voltage: 24, resistance: 6 },
            question: "You doubled the voltage. What happened to the power?",
            options: ["It stayed the same", "It doubled", "It went up four times"],
            answer: 2,
            explain: "Twice the voltage pushes twice the current, and power is the two multiplied: 24 V × 4 A = 96 W, four times the 24 W before.",
        },
        {
            kind: "explore",
            title: "Now the resistance",
            set: { voltage: 12, resistance: 6 },
            text: "Back to 12 V. Drag the resistance up to **12 Ω** and watch the power.",
            controls: [{ quantity: "resistance", min: 1, max: 24, step: 1 }],
            goal: { resistance: 12 },
            success: "The power is {power}.",
        },
        {
            kind: "choice",
            set: { voltage: 12, resistance: 12 },
            question: "You doubled the resistance. What happened to the power?",
            options: ["It doubled", "It halved", "It stayed the same"],
            answer: 1,
            explain: "Twice the resistance lets half the current through: 12 V × 1 A = 12 W. On the same voltage, more resistance means less heat, not more.",
        },
        {
            kind: "number",
            set: { voltage: 9, resistance: 3 },
            question: "The battery gives 9 V and 3 A flows. What is the power?",
            solveFor: "power",
            answer: 27,
            explain: "P = V × I = 9 V × 3 A = 27 W",
        },
        {
            kind: "number",
            set: { voltage: 12, resistance: 3 },
            question: "On a 12 V battery, the resistor is turning 48 W into heat. What current flows?",
            solveFor: "current",
            answer: 4,
            explain: "I = P ÷ V = 48 W ÷ 12 V = 4 A",
        },
        {
            kind: "read",
            title: "Small numbers",
            set: { voltage: 1, resistance: 20 },
            text: "Most parts in a set handle far less than this, so small amounts get a prefix. **milli** (**m**) means a thousandth: the meter now reads {current} and {power}, which are 0.05 A and 0.05 W.\n\n"
                + "**kilo** (**k**) means a thousand: an electric heater takes 2000 W, or 2 kW.",
        },
        {
            kind: "choice",
            set: { voltage: 1, resistance: 20 },
            question: "A resistor is marked ¼ W. Which is the same?",
            options: ["250 mW", "25 mW", "2.5 kW"],
            answer: 0,
            explain: "A quarter of a watt is 0.25 W, and milli means a thousandth: 0.25 W = 250 mW.",
        },
        {
            kind: "read",
            title: "Ratings",
            set: { voltage: 1, resistance: 20 },
            text: "That mark is the resistor's **power rating**: the most heat it can get rid of without cooking itself. The small ones in a radio are rated ¼ W. Ask more of one and it scorches, smokes, and in the end burns open.\n\n"
                + "So ask two things of any part: how much power is it turning into heat, and is that inside its rating?",
        },
        {
            kind: "number",
            set: { voltage: 9, resistance: 90 },
            question: "A resistor in the radio has 9 V across it and carries 0.1 A. What power is it turning into heat?",
            solveFor: "power",
            answer: 0.9,
            explain: "P = V × I = 9 V × 0.1 A = 0.9 W",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 90 },
            question: "It is rated ¼ W, and it is turning 0.9 W into heat. What does the radio need?",
            options: ["A ⅛ W resistor", "Nothing: ¼ W will do", "A 1 W resistor"],
            answer: 2,
            explain: "0.9 W is more than three times what a ¼ W part can get rid of, so it cooks. The same resistance with a 1 W rating runs cool. That was the smell.",
        },
    ],
};
