import type { Lesson } from "../lesson/types";

// A battery, a 1 kΩ resistor R along the top, and a diode down the right,
// in one loop. R stands for the set the diode feeds. A meter across the
// diode, as in real-battery.ts. ("$" and "v" lines: see ohms-law.ts; "s" and
// "x" lines: see parallel.ts; "p" line: see real-battery.ts.)
//
// "$" line: current-dot speed 60, for the milliamps that flow here.
// "d" line: the diode, its arrow from (448, 192) down to (448, 320), so the
// battery as drawn pushes it forward. Flags 2: the next word names its model,
// CircuitJS1's "default". That model drops 0.47 V at 2 V, 0.56 V at 9 V and
// 0.57 V at 12 V, and leaks about 171 nA in reverse, which the readouts show
// as 0 A. The lesson calls its drop "about 0.6 V".
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
    summary: "How a diode lets current through one way only and keeps about 0.6 V for itself, and how to tell a good one from a shorted or open one, in the set and on ohms.",
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
            note: "R stands for the set. The circle marked V is a meter across the diode. Leave the two switches alone for now.",
        },
        {
            kind: "explore",
            title: "The wrong way, then the right",
            set: { voltage: -12, shortSwitch: 0, breakSwitch: 1 },
            text: "The battery is in backwards, as Dev's once were, pushing against the arrow. Drag it up through 0 V to **12 V**, the right way round. Watch the current, and the meter across the diode.",
            controls: [{ quantity: "voltage", min: -12, max: 12, step: 1 }],
            goal: { voltage: 12 },
            success: "Backwards, nothing flowed, and the diode had the whole battery across it. The right way, {current} flows, and the diode keeps only {vd}: R has the rest, {vr}.",
        },
        {
            kind: "choice",
            set: { voltage: -12, shortSwitch: 0, breakSwitch: 1 },
            question: "Backwards, the battery pushed just as hard, only against the arrow. What flowed?",
            options: ["The same, backwards", "Next to nothing", "Half as much"],
            answer: 1,
            explain: "A diode lets current through one way only, the way its arrow points. Pushed the other way it blocks, like an open switch: the whole 12 V is across it, and only a tiny leak gets by.",
        },
        {
            kind: "choice",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            question: "The right way round, as the battery rose from 2 V to 12 V, what did the voltage across the diode do?",
            options: ["Rose with the battery", "Fell to nothing", "Hardly moved"],
            answer: 2,
            explain: "It crept from 0.47 V to {vd}, while R's went from 1.53 V to {vr}. Once a diode conducts, its voltage barely moves, and whatever it feeds takes the rest.",
        },
        {
            kind: "read",
            title: "Forward and reverse",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "Pushed the way its arrow points, a diode is **forward**, and conducts. Pushed against it, it is in **reverse**: it blocks, with the whole supply across it, like an open switch.\n\n"
                + "Forward, it keeps a small, nearly fixed voltage for itself: its **forward drop**. Current pays the same toll to cross that thin layer, however much of it flows, so the drop hardly moves. Here it is {vd}: call it about 0.6 V.",
            note: "Books often say 0.7 V. It shifts a little with the current, the heat and the make.",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "In every set run from the mains, diodes turn a supply that pushes back and forth into one that pushes one way: a job for another day. Some battery sets have one in the battery lead, so batteries put in backwards are blocked and the set stays silent. A third, across a coil, comes with coils.\n\n"
                + "A diode is known by its number, not its looks. A repairer reads two ratings: the most current it will carry, and the most voltage it will stand in reverse.",
            note: "1N4148: small and glass, 150 mA, 75 V. 1N4001 to 1N4007: 1 A each, standing 50 V up to 1000 V.",
        },
        {
            kind: "choice",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            question: "A 1N4004 has died in a television's mains supply: 1 A, 400 V. The drawer holds a 1N4148, a 1N4001 and a 1N4007. Which will do?",
            options: ["1N4007", "1N4001", "1N4148"],
            answer: 0,
            explain: "A replacement must match or beat both ratings. The 1N4007 carries the same 1 A and stands 1000 V. The 1N4001 stands only 50 V, and the 1N4148 carries far too little.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "Diodes seldom wear out slowly: they die outright. Most often they short, above all in a mains supply, where a shorted one blows the fuse the moment the set is switched on. Now and then one goes open, mostly the small glass kind.\n\n"
                + "Heat kills them most, along with too much current or too much voltage in reverse. Look for a blown fuse, a diode that looks cooked, and an electrolytic beside it that has smoked. One may have taken the other with it: check both.",
            note: "Small glass ones sometimes go leaky instead: they let a little by in reverse.",
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
            kind: "choice",
            set: { voltage: 9, shortSwitch: 0, breakSwitch: 1 },
            question: "Opened, the Break switch does what an open diode does. With the battery at 9 V, what would the meter across the diode read then?",
            options: ["About 0.6 V, still", "0 V: nothing flows", "The full 9 V"],
            answer: 2,
            explain: "No current, so R drops nothing: the whole 9 V stands across the gap. A good diode fitted backwards reads the same. So in the set: about 0.6 V good, 0 V shorted, the full supply open.",
        },
        {
            kind: "choice",
            set: { voltage: 9, shortSwitch: 0, breakSwitch: 1 },
            question: "A set is switched on. Across a diode that should be passing current, your meter reads 0.56 V. The book says 0.7 V. What do you make of it?",
            options: ["It is wearing out", "It is working", "It has shorted"],
            answer: 1,
            explain: "Near 0.6 V is a good diode's forward drop, and it shifts a little with the current, the heat and the make. Diodes seldom fade: shorted reads 0 V, open the full supply.",
        },
        {
            kind: "read",
            title: "Both ways round",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            text: "Out of the set, a meter on ohms is a small battery and a resistor, like the battery and R here: its needle shows the current. A good diode reads low one way round, the needle swinging well over, and high the other: it doesn't stir.\n\n"
                + "Low both ways: shorted. High both ways: open. A good diode fitted backwards still reads low one way, which tells it from an open one.",
            note: "Lift one end from the board first, with the set off. The shop's meter, like many, makes its black lead positive on ohms: a good diode reads low with black on the anode.",
        },
        {
            kind: "choice",
            set: { voltage: 12, shortSwitch: 0, breakSwitch: 1 },
            question: "A television blows every new mains fuse the moment it is switched on. Lifted out, one of its mains diodes reads low on ohms both ways round. What is it?",
            options: ["Shorted", "Good: it conducts", "Open"],
            answer: 0,
            explain: "Low both ways: it passes current backwards as well as forwards. It has shorted, and in a mains supply that blows the fuse at once. A good one reads low one way only.",
        },
        {
            kind: "choice",
            set: { voltage: 9, shortSwitch: 0, breakSwitch: 0 },
            question: "Dev's set, batteries the right way: 9 V across the diode in its lead, 0 V across the set, and high both ways on ohms. What is wrong?",
            options: ["It is in backwards", "It has gone open", "It has shorted"],
            answer: 1,
            explain: "9 V across it, none for the set: open or in backwards. Backwards, it would still read low one way on ohms, so it is open. Shorted, it would read 0 V and the set would play.",
        },
    ],
};
