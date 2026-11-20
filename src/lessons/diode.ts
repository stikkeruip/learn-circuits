import type { Lesson } from "../lesson/types";

// A battery, a 1 kΩ resistor R along the top, and a diode down the right,
// in one loop. A meter across the diode, as in real-battery.ts. ("$" and "v"
// lines: see ohms-law.ts; "s" and "x" lines: see parallel.ts; "p" line: see
// real-battery.ts.)
//
// "$" line: current-dot speed 60, for the milliamps that flow here.
// "d" line: the diode, its arrow from (448, 192) down to (448, 320), so the
// battery as drawn pushes it forward. Flags 2: the next word names its model,
// CircuitJS1's "default". That model drops about 0.47 V at 1.5 mA and
// 0.57 V at 11.4 mA, and leaks about 171 nA in reverse, so every sum with it
// in is "about" (see `tolerance`).
// The two switches are faults, named on the drawing. "Break" is in line with
// the diode, closed: opened, it does what an open diode does. "Short" is
// across the diode, open: closed, it does what a shorted diode does. The
// meter spans both the Break switch and the diode, so it reads across the
// diode as a whole, faults and all.
const circuit = `$ 1 0.000005 10.2 60 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 288 96 0 1000
p 288 96 288 320 2 0 0 0
w 288 96 448 96 0
s 448 96 448 192 0 0 false
d 448 192 448 320 2 default
w 448 192 544 192 0
s 544 192 544 320 0 1 false
w 544 320 448 320 0
w 448 320 288 320 0
w 288 320 128 320 0
x 202 130 224 133 4 18 R
x 468 122 490 125 4 18 Break
x 564 234 586 237 4 18 Short`;

export const diode: Lesson = {
    id: "diode",
    title: "The diode",
    summary: "How a diode lets current through one way only and keeps about 0.6 V for itself, and how to tell a good one from a dead one.",
    job: {
        title: "Dead either way round",
        customer: "Dev, with a walkie-talkie",
        request: "I put the batteries in the wrong way round once. It stayed silent till I turned them round, then it was fine. Now it's dead with them the right way round as well. Not even a hiss.",
        thanks: "It hisses and crackles like it should. My sister heard me from the end of the street.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        resistor: { type: "Resistor" },
        meter: { type: "Probe" },
        breakSwitch: { type: "Switch", nth: 0 },
        shortSwitch: { type: "Switch", nth: 1 },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        current: { label: "Current", symbol: "I", unit: "A", part: "resistor", measure: "current" },
        vd: { label: "Across diode", symbol: "Vd", unit: "V", part: "meter", measure: "voltage" },
        vr: { label: "Across R", symbol: "VR", unit: "V", part: "resistor", measure: "voltage" },
        shortSwitch: { label: "Short switch", part: "shortSwitch", switch: true },
        breakSwitch: { label: "Break switch", part: "breakSwitch", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "Meet the diode",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "The loop of your first days, with a new part on the right: a **diode**, which lets current through one way only. Inside is a chip of silicon in two halves, and between them a very thin layer that blocks current: a voltage one way squeezes it away, the other way widens it.\n\n"
                + "Its symbol is an arrow against a bar. The arrow points the way current may go: in at the **anode**, out at the **cathode**. On the part, a band marks the cathode.",
            note: "R is 1 kΩ. The circle marked V is a meter across the diode. Leave the two switches beside it alone for now.",
        },
        {
            kind: "explore",
            title: "Turn the battery round",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "The battery pushes the way the arrow points, and {current} flows. Drag it down through 0 V to **−12 V**: the same battery, turned round. Watch the current.",
            controls: [{ quantity: "voltage", min: -12, max: 12, step: 1 }],
            goal: { voltage: -12 },
            success: "The dots have stopped. The current reads {current}, and the diode has all {vd} across it.",
        },
        {
            kind: "choice",
            set: { voltage: -12, shortSwitch: 0, breakSwitch: 1 },
            question: "The battery pushes just as hard as before, only the other way. What flows now?",
            options: ["The same, backwards", "Next to nothing", "Half as much"],
            answer: 1,
            explain: "A diode lets current through one way only, the way its arrow points. Pushed the other way it blocks, like an open switch: the whole 12 V is across it, and only a tiny leak gets by.",
        },
        {
            kind: "read",
            title: "Forward and reverse",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "Pushed the way its arrow points, a diode is **forward**: it conducts. Now it is forward, and {current} flows.\n\n"
                + "Pushed against the arrow, it is in **reverse**: it blocks, and has the whole supply across it, like an open switch. A real one leaks a little in reverse: less than a millionth of an amp, too little for the meter to show or to matter in a set.",
            note: "Turn the diode round instead of the battery and it comes to the same: in reverse, and blocking.",
        },
        {
            kind: "explore",
            title: "Up from nothing",
            set: { voltage: 0, shortSwitch: 0, breakSwitch: 1 },
            text: "Forward again, from nothing. Drag the battery up to **12 V**, a volt at a time, and watch two readings: across the diode, and across R.",
            controls: [{ quantity: "voltage", min: 0, max: 12, step: 1 }],
            goal: { voltage: 12 },
            success: "At 12 V the diode has {vd}, and R has {vr}. Nearly all of the rise went to R.",
        },
        {
            kind: "choice",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            question: "As the battery went from 2 V to 12 V, what did the voltage across the diode do?",
            options: ["Rose with the battery", "Fell to nothing", "Hardly moved"],
            answer: 2,
            explain: "It crept from 0.47 V to 0.57 V, while R's went from 1.5 V to 11.4 V. Once a diode conducts, its voltage barely moves, and the resistor takes the rest.",
        },
        {
            kind: "read",
            title: "The forward drop",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "A diode that is passing current keeps a small, nearly fixed voltage for itself: its **forward drop**. For this one, at these currents, call it about 0.6 V. Books often say 0.7 V: it shifts a little with the current and the make.\n\n"
                + "The voltages round the loop still add up to the battery's. The diode takes its drop, R takes the rest, and R's share sets the current:",
            formula: "V = Vd + VR",
            note: "Here: {vd} + {vr} = {voltage}, and {vr} ÷ 1 kΩ = {current}.",
        },
        {
            kind: "number",
            set: { voltage: 9, shortSwitch: 0, breakSwitch: 1 },
            question: "The battery gives 9 V, forward. Take the diode's drop as 0.6 V. What voltage is across the 1 kΩ resistor?",
            solveFor: "vr",
            answer: 8.4,
            tolerance: 0.01,
            explain: "VR = V − Vd = 9 V − 0.6 V = 8.4 V",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "In every set run from the mains, diodes turn a supply that pushes back and forth into one that pushes one way: a job for another day. Some battery sets have one in the battery lead, so batteries put in backwards are blocked. A third, across a coil, comes with coils.\n\n"
                + "A diode is known by its number, not its looks. A repairer reads two ratings: the most current it will carry, and the most voltage it will stand in reverse.",
            note: "1N4148: small and glass, 150 mA, 75 V. 1N4001 to 1N4007: 1 A each, standing 50 V up to 1000 V.",
        },
        {
            kind: "choice",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            question: "A 1N4004 has died in a television's mains supply: 1 A, 400 V. The drawer holds a 1N4148, a 1N4001 and a 1N4007. Which will do?",
            options: ["1N4007", "1N4001", "1N4148"],
            answer: 0,
            explain: "A replacement must match or beat both ratings. The 1N4007 carries the same 1 A and stands 1000 V. The 1N4001 stands only 50 V, and the 1N4148 carries far too little current.",
        },
        {
            kind: "explore",
            title: "A shorted diode",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "Two switches stand in for faults. Closed, **Short** joins the diode's two ends, as a shorted diode does. Press the Short switch on the screen, and watch the meter and the current.",
            controls: [],
            goal: { shortSwitch: 1 },
            success: "The meter reads {vd}. R has the whole {vr}, and the current has risen a little, to {current}. No voltage across a diode that should be conducting: it has shorted.",
        },
        {
            kind: "number",
            set: { voltage: 9, shortSwitch: 0, breakSwitch: 0 },
            question: "Now the Break switch is open, which does what an open diode does. The battery gives 9 V. What does the meter across the diode read?",
            solveFor: "vd",
            answer: 9,
            explain: "No current flows, so R drops nothing: Vd = 9 V − 0 V = 9 V. A good diode fitted backwards reads just the same.",
        },
        {
            kind: "read",
            title: "Good or dead",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "Diodes most often die shorted, above all in power supplies, where a shorted one blows the fuse at once. Now and then one goes open. In the set, open and fitted backwards read alike: the full supply across it, no current.\n\n"
                + "Out of the set, the shop's meter on ohms passes a little current through the diode. A good one gives a reading one way round and none the other. A reading both ways means shorted; none either way, open.",
            note: "On ohms the shop's meter, like many, makes its black lead positive: a good diode reads with black on the anode.",
        },
        {
            kind: "choice",
            set: { voltage: 9, shortSwitch: 0, breakSwitch: 0 },
            question: "Dev's set, batteries the right way: 9 V across the diode in its battery lead, 0 V across the set. On ohms, out of the set, the diode reads neither way. Why?",
            options: ["It has shorted", "It has gone open", "It is in backwards"],
            answer: 1,
            explain: "9 V across it: open, or in backwards. Backwards, it would still read one way on ohms, so it is open. Shorted, it would read 0 V and the set would work.",
        },
    ],
};
