import type { Lesson } from "../lesson/types";

// A 9 V battery, a resistor R along the top, then down the right a switch S
// and a red LED. A meter in a column of its own reads across S and the LED
// together. ("$" and "v" lines: see ohms-law.ts, with the current-dot speed
// at 60 for milliamps; "s" and "x" lines: see parallel.ts; "p" line: see
// real-battery.ts.)
//
// "162" line: an LED, its arrow from (352, 208) down to (352, 320), so the
// anode is at the top. Flags 2: a model is named next, "default-led". Then
// its colour as red, green and blue from 0 to 1 (red), and the current that
// gives full brightness on the drawing, 20 mA: it glows brighter as its
// current rises to that. It drops about 1.65 V at 2.5 mA, 1.8 V at 12 mA and
// 1.82 V at 15 mA, and in this simulator it never burns out.
//
// S stands for the hair-thin wire inside the LED: open, it does what an LED
// gone open does, and the meter across S and the LED reads the full supply.
// S is above the LED, not below it, so that with S open no current at all
// flows: below it, a few picoamps leak and the readout across R shows
// hundredths of a nanovolt.
const circuit = `$ 1 0.000005 10.2 60 9 50
v 128 320 128 96 16 0 40 9 0 0 0.5
r 128 96 352 96 0 680
s 352 96 352 208 0 0 false
162 352 208 352 320 2 default-led 1 0 0 0.02
w 352 96 448 96 0
p 448 96 448 320 2 0 0 0
w 448 320 352 320 0
w 352 320 128 320 0
x 229 130 251 133 4 18 R
x 372 130 394 133 4 18 S
x 372 242 394 245 4 18 LED`;

export const led: Lesson = {
    id: "led",
    title: "The LED",
    summary: "A diode that gives light: why every LED needs a resistor in series, how to work that resistor out, and how to find a dead one.",
    job: {
        title: "The dark stereo light",
        customer: "Miss Abara, with a hi-fi tuner",
        request: "It plays every station as well as ever, in stereo too as far as my ears can tell. But the little red light that says stereo has gone dark, and I miss it.",
        thanks: "There's my little red light. I hadn't known how often I looked for it.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        resistor: { type: "Resistor" },
        switch: { type: "Switch" },
        meter: { type: "Probe" },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        resistance: { label: "Resistor", symbol: "R", unit: "Ω", part: "resistor", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "resistor", measure: "current" },
        vled: { label: "Across LED", symbol: "VLED", unit: "V", part: "meter", measure: "voltage" },
        vr: { label: "Across R", symbol: "VR", unit: "V", part: "resistor", measure: "voltage" },
        switch: { label: "Switch S", part: "switch", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "A diode that lights",
            set: { voltage: 9, resistance: 680, switch: 1 },
            text: "On the bench: a 9 V battery, a resistor **R**, a switch **S** (closed, for now) and an **LED**, a light-emitting diode: the red circle. It is a diode made of a material that gives off light while current flows forward through it, anode to cathode.\n\n"
                + "The material sets the colour, not the plastic round it: the drawer holds red, yellow and green. The meter, the circle marked V, reads the voltage across the LED.",
            note: "This red one drops {vled}, three times a diode's 0.6 V. Yellow and green drop a little more, about 2 V.",
        },
        {
            kind: "explore",
            title: "Turn it up",
            set: { voltage: 9, resistance: 3000, switch: 1 },
            text: "R is 3 kΩ, and the LED glows dimly with 1.65 V across it. Guess first: what will less resistance do? Then drag **R** down to **500 Ω** and watch the LED and the meter.",
            controls: [{ quantity: "resistance", min: 400, max: 3000, step: 100 }],
            goal: { resistance: 500 },
            success: "Bright now, with {current} flowing. The meter across the LED reads {vled}.",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 500, switch: 1 },
            question: "R went from 3 kΩ to 500 Ω. About six times the current flows, and the LED is brighter. What did the voltage across the LED do?",
            options: ["Went up six times", "Hardly moved", "Fell to nothing"],
            answer: 1,
            explain: "It rose only from 1.65 V to {vled}. An LED holds its drop, as the diode did, and R takes the rest. The light follows the current, not the voltage.",
        },
        {
            kind: "read",
            title: "The series resistor",
            set: { voltage: 9, resistance: 600, switch: 1 },
            text: "A red LED drops about 1.8 V, near enough whatever flows, so it cannot hold its own current down. Put one straight across 9 V and the current shoots up: a real LED burns out at once. So every LED has a **series resistor**, a resistor in line with it that sets its current.\n\n"
                + "The LED takes its drop and the resistor takes the rest. Ohm's law on the resistor then gives R:",
            formula: "R = (V − VLED) ÷ I",
            note: "Here: (9 V − 1.8 V) ÷ 12 mA = 7.2 V ÷ 0.012 A = 600 Ω.",
        },
        {
            kind: "number",
            set: { voltage: 12, resistance: 680, switch: 1 },
            question: "A red LED drops about 1.8 V. To run it at 15 mA on a 12 V supply, what series resistor does it need?",
            solveFor: "resistance",
            answer: 680,
            explain: "R = (12 V − 1.8 V) ÷ 15 mA = 10.2 V ÷ 0.015 A = 680 Ω",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 680, switch: 1 },
            question: "On 9 V, an LED to run at 12 mA works out at 600 Ω. The drawer has 560 Ω and 680 Ω, but no 600 Ω. Which do you fit?",
            options: ["560 Ω: it's nearer", "Either: they're close", "680 Ω: round up"],
            answer: 2,
            explain: "Round up. With 680 Ω it runs at {current}: a touch less light, and a longer life. A little less current than you worked out is always safe. A little more may not be.",
        },
        {
            kind: "number",
            set: { voltage: 24, resistance: 1500, switch: 1 },
            question: "An LED drops about 1.8 V. On a 24 V supply, through a 1.5 kΩ series resistor, what current flows?",
            solveFor: "current",
            answer: 0.0148,
            tolerance: 0.01,
            explain: "I = (24 V − 1.8 V) ÷ 1.5 kΩ = 22.2 V ÷ 1500 Ω = 14.8 mA",
        },
        {
            kind: "choice",
            set: { voltage: 24, resistance: 1500, switch: 1 },
            question: "On 24 V, the LED's 1.5 kΩ resistor has 22.2 V across it and carries 14.8 mA. Will a ¼ W resistor do?",
            options: ["No: it's over ¼ W", "Yes: 14.8 mA is tiny", "Yes: the LED gets most"],
            answer: 0,
            explain: "P = 22.2 V × 14.8 mA, about 330 mW: more than a ¼ W part's 250 mW, so it would cook. The LED takes only about 27 mW. On a high supply, give the resistor a bigger rating.",
        },
        {
            kind: "read",
            title: "Where you'll meet it",
            set: { voltage: 9, resistance: 680, switch: 1 },
            text: "LEDs took over from the little bulbs behind a set's front panel: the power light, the stereo light on a tuner. They run cool, have nothing to shake loose, and last far longer. Seven bars of LEDs make each figure on a calculator or a digital meter.\n\n"
                + "Mind which way round one goes. The cathode is the shorter lead, beside a flat on the rim. Leads get cut, so on a used one go by the flat, or test it.",
            note: "Mind the voltage backwards too: an LED stands only about 5 V in reverse, where an ordinary diode stands 50 V or more.",
        },
        {
            kind: "explore",
            title: "Gone open",
            set: { voltage: 9, resistance: 680, switch: 1 },
            text: "Most LEDs just fade with the years, so judge one by its light. The sudden end is too much current: it burns through a hair-thin wire inside, and the LED goes open. S stands for that wire, and the meter is across both. Press S on the screen and watch the meter.",
            controls: [],
            goal: { switch: 0 },
            success: "Dark, with the full {vled} across the LED and {vr} across R. No current flows, so R drops nothing.",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 680, switch: 1 },
            question: "A good LED has been fitted backwards. In the set, what does the meter across it read?",
            options: ["About 1.8 V", "0 V", "The full supply"],
            answer: 2,
            explain: "Backwards it passes nothing, so R drops nothing and the LED has the whole supply: just like an open one. In the set the two read alike. And over 5 V backwards, it is being harmed.",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 680, switch: 1 },
            question: "Another set's LED is dark, with 0 V across it and the full supply across its resistor. What could be wrong?",
            options: ["LED shorted, or R open", "The LED is open", "The LED is backwards"],
            answer: 0,
            explain: "0 V across the LED is the sign of a short. But an open R reads the same: it has the whole supply, and leaves none for the LED. Switch off and measure R on ohms to tell which.",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 1000, switch: 1 },
            question: "Out of the set, the shop's meter on ohms reads an LED as open, both ways round. What now?",
            options: ["Bin it: it's open", "Try 9 V and 1 kΩ", "Swap the meter leads"],
            answer: 1,
            explain: "Many meters put out too little voltage on ohms to reach an LED's drop, so a good one reads open both ways. The sure test is on the screen: 9 V and 1 kΩ, {current}. Lit one way round: good.",
        },
        {
            kind: "choice",
            set: { voltage: 9, resistance: 680, switch: 0 },
            question: "Miss Abara's stereo light has the full supply across it and 0 V across its resistor. It has never been out of the set. What's wrong?",
            options: ["Its resistor is open", "The LED is open", "It's in backwards"],
            answer: 1,
            explain: "No current, the whole supply across the LED and none across R: the gap is in the LED. Backwards reads the same, but this one lit for years. A new red LED, flat to the cathode side, and it shines.",
        },
    ],
};
