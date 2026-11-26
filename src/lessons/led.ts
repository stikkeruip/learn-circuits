import type { Lesson } from "../lesson/types";

// The diode's loop with an LED in the diode's place: a 9 V battery, a resistor
// R along the top, and a red LED down the right, with a meter across it. Two
// fault switches, as in diode.ts. ("$" and "v" lines: see ohms-law.ts, with the
// current-dot speed at 60 for milliamps; "s" and "x" lines: see parallel.ts;
// "p" line: see real-battery.ts.)
//
// "162" line: an LED, its arrow from (448, 192) down to (448, 320), so the
// anode is at the top. Flags 2: a model is named next, "default-led". Then
// its colour as red, green and blue from 0 to 1 (red), and the current that
// gives full brightness on the drawing, 20 mA: it glows brighter as its
// current rises to that. It drops about 1.65 V at 2.5 mA, 1.79 V at 10.6 mA
// and 1.82 V at 14.4 mA, and in this simulator it never burns out.
//
// The two switches are faults, named on the drawing. "Break" is in line with
// the LED, closed: opened, it does what the hair-thin wire inside an LED does
// when it burns through. It sits above the LED, not below it, so that with it
// open no current at all flows: below it, a few picoamps leak and the readout
// across R shows hundredths of a nanovolt. "Short" is across the LED, open:
// closed, it does what a shorted LED does. The meter spans both Break and the
// LED, so it reads across the LED as a whole, faults and all.
//
// The battery has no readout: it stays at 9 V, and its voltage is written
// beside it on the drawing. That leaves room for both fault switches in six.
const circuit = `$ 1 0.000005 10.2 60 9 50
v 128 320 128 96 16 0 40 9 0 0 0.5
r 128 96 288 96 0 680
p 288 96 288 320 2 0 0 0
w 288 96 448 96 0
s 448 96 448 192 0 0 false
162 448 192 448 320 2 default-led 1 0 0 0.02
w 448 192 544 192 0
s 544 192 544 320 0 1 false
w 544 320 448 320 0
w 448 320 288 320 0
w 288 320 128 320 0
x 202 130 224 133 4 18 R
x 468 122 490 125 4 18 Break
x 468 234 490 237 4 18 LED
x 564 234 586 237 4 18 Short`;

export const led: Lesson = {
    id: "led",
    title: "The LED",
    summary: "A diode that gives light: why every LED needs a resistor in series, how LEDs fade and fail, and the readings that tell a good one from a dead one.",
    job: {
        title: "The dark stereo light",
        customer: "Miss Abara, with a hi-fi tuner",
        request: "It plays every station as well as ever, in stereo too as far as my ears can tell. But the little red light that says stereo has gone dark, and I miss it.",
        thanks: "There's my little red light. I hadn't known how often I looked for it.",
    },
    circuit,
    parts: {
        resistor: { type: "Resistor" },
        meter: { type: "Probe" },
        breakSwitch: { type: "Switch", nth: 0 },
        shortSwitch: { type: "Switch", nth: 1 },
    },
    quantities: {
        resistance: { label: "Resistor", symbol: "R", unit: "Ω", part: "resistor", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "resistor", measure: "current" },
        vled: { label: "Across LED", symbol: "VLED", unit: "V", part: "meter", measure: "voltage" },
        vr: { label: "Across R", symbol: "VR", unit: "V", part: "resistor", measure: "voltage" },
        breakSwitch: { label: "Break switch", part: "breakSwitch", switch: true },
        shortSwitch: { label: "Short switch", part: "shortSwitch", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "A diode that lights",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            text: "Yesterday's loop on 9 V, with a new part where the diode was: an **LED**, a light-emitting diode, drawn as a circle that fills with light. It is a diode whose material gives off light while current flows forward through it.\n\n"
                + "Inside, a speck of that material sits in a tiny cup on one lead, with a hair-thin wire to the other. The material sets the colour, not the plastic: the drawer holds red, yellow and green.",
            note: "R is 680 Ω, and the meter reads across the LED. Leave the two switches alone for now.",
        },
        {
            kind: "explore",
            title: "Turn it up",
            set: { resistance: 3000, breakSwitch: 1, shortSwitch: 0 },
            text: "R is 3 kΩ, and the LED glows dimly with 1.65 V across it. Guess first: what will less resistance do? Then drag **R** down to **500 Ω** and watch the LED and the meter.",
            controls: [{ quantity: "resistance", min: 400, max: 3000, step: 100 }],
            goal: { resistance: 500 },
            success: "Bright now, with {current} flowing. The meter across the LED reads {vled}.",
        },
        {
            kind: "choice",
            set: { resistance: 500, breakSwitch: 1, shortSwitch: 0 },
            question: "R went from 3 kΩ to 500 Ω. About six times the current flows, and the LED is brighter. What did the voltage across the LED do?",
            options: ["Went up six times", "Hardly moved", "Fell to nothing"],
            answer: 1,
            explain: "It rose only from 1.65 V to {vled}. An LED holds its voltage, as the diode did, and R takes the rest. The light follows the current, not the voltage.",
        },
        {
            kind: "choice",
            set: { resistance: 500, breakSwitch: 1, shortSwitch: 0 },
            question: "The battery stayed at 9 V and the LED's voltage hardly moved. So what decided how much current flowed?",
            options: ["The LED itself", "The battery", "The resistor R"],
            answer: 2,
            explain: "Only R changed, and the current followed it. An LED does nothing to hold its own current down: the resistor does that.",
        },
        {
            kind: "read",
            title: "The series resistor",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            text: "A red LED keeps about 1.8 V for itself, whatever flows, and yellow or green about 2 V. Straight across a battery, nothing holds its current: it shoots up and burns the LED out at once. So every LED has a **series resistor** in line with it, to take the rest of the supply and set the current.\n\n"
                + "The light follows the current: 10 to 15 mA lights an indicator well, and about 20 mA is the most a small LED takes.",
            note: "Here R takes {vr} and passes {current}. A bigger R gives less light, and a longer life.",
        },
        {
            kind: "read",
            title: "Where you'll meet it",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            text: "LEDs took over from the little bulbs behind a set's front panel: the power light, the stereo light on a tuner. They run cool, have nothing to shake loose, and last far longer. Seven bars of LEDs make each figure on a calculator or a digital meter.\n\n"
                + "To replace one, match its colour and size, and fit it the right way round: the cathode is the shorter lead, beside a flat on the rim. If its resistor has failed, fit the same value as the old one.",
        },
        {
            kind: "choice",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            question: "An LED pulled from an old board has both its leads cut short. Which one is the cathode?",
            options: ["The one by the flat", "The shorter one", "Either: it's a lamp"],
            answer: 0,
            explain: "Leads are trimmed when a part is fitted, so their length tells you nothing on a used one. Go by the flat on the rim, or try it on a battery and resistor. Fitted backwards, it stays dark.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            text: "Most LEDs do not die as bulbs do: they fade over the years, faster if run hot or hard, and yellowed plastic dims them more. A tired one can pass every meter test and still be too dim. Judge an LED by its light.\n\n"
                + "The sudden ends are open and shorted. Too much current, from a surge or too small a resistor, burns through the hair-thin wire inside: open, and dark for good. And an LED stands only about 5 V backwards: more harms the chip itself, and it can short, or leak and glow dim.",
        },
        {
            kind: "explore",
            title: "Gone open",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            text: "Two switches stand in for faults. Opened, **Break** does what the burnt-through wire inside does. Press the Break switch on the screen, and watch the meter, R and the current.",
            controls: [],
            goal: { breakSwitch: 0 },
            success: "Dark, with the full {vled} across the LED and {vr} across R. No current flows, so R drops nothing. That is an open LED.",
        },
        {
            kind: "explore",
            title: "Shorted",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            text: "Break is closed again. Closed, **Short** joins the LED's two ends, as a shorted chip does. Press the Short switch on the screen, and watch the same readings.",
            controls: [],
            goal: { shortSwitch: 1 },
            success: "Dark the other way: {vled} across the LED, the whole {vr} across R, and {current} flowing, a little more than before. R still holds the current down.",
        },
        {
            kind: "choice",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 1 },
            question: "Another set's LED is dark, with 0 V across it and the full supply across its resistor. What could be wrong?",
            options: ["LED shorted, or R open", "The LED is open", "It's in backwards"],
            answer: 0,
            explain: "0 V across the LED is the sign of a short. But an open R reads the same: it has the whole supply, and leaves none for the LED. Switch off and measure R on ohms to tell which.",
        },
        {
            kind: "choice",
            set: { resistance: 680, breakSwitch: 1, shortSwitch: 0 },
            question: "A good LED has been fitted backwards. In the set, what does the meter across it read?",
            options: ["About 1.8 V", "0 V", "The full supply"],
            answer: 2,
            explain: "Backwards it passes nothing, so R drops nothing and the LED has the whole supply, just as an open one does. In the set the two read alike. And over 5 V backwards, it is being harmed.",
        },
        {
            kind: "choice",
            set: { resistance: 1000, breakSwitch: 1, shortSwitch: 0 },
            question: "Out of the set, the shop's meter on ohms reads an LED as open, both ways round. What now?",
            options: ["Bin it: it's open", "Try 9 V and 1 kΩ", "Swap the meter leads"],
            answer: 1,
            explain: "Many meters put out too little voltage on ohms to reach an LED's drop, so a good one reads open both ways. The sure test is on the screen: 9 V and 1 kΩ, {current}. Lit one way round: good.",
        },
        {
            kind: "choice",
            set: { resistance: 680, breakSwitch: 0, shortSwitch: 0 },
            question: "Miss Abara's stereo light has the full supply across it and 0 V across its resistor. It has never been out of the set. What's wrong?",
            options: ["Its resistor is open", "It's in backwards", "The LED is open"],
            answer: 2,
            explain: "No current, the whole supply across the LED and none across R: the gap is in the LED. Backwards reads the same, but this one lit for years. A new red LED, flat to the cathode side, and it shines.",
        },
    ],
};
