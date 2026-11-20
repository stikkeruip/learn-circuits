import type { Lesson } from "../lesson/types";

// The part of Carmen's alarm that rings the bell. A 12 V battery; down the
// middle, a switch (standing in for the alarm) and the base resistor Rb
// (10 kΩ) along to the transistor's base; down the right, the bell, drawn as
// a 120 Ω resistor, with the transistor under it. ("$" and "v" lines: see
// ohms-law.ts; "s" and "x" lines: parallel.ts; "p" line: real-battery.ts.)
//
// "$" line: current-dot speed 60, as the currents here are milliamps.
// "t" line: an NPN transistor (1); the voltages it last had, base to
// collector and base to emitter (0 and 0: worked out afresh); gain 100; and
// CircuitJS1's default model. Base at (400, 208), collector at (448, 192),
// emitter at (448, 224). With the switch closed it is fully on: 1.13 mA into
// the base, 98.6 mA through the bell, 0.71 V base to emitter and 0.17 V
// collector to emitter. With Rb anywhere from 1 kΩ to 11.3 kΩ it stays fully
// on; above that it is only part on, which this job leaves to the next.
// "p" line: the meter across the transistor, collector to emitter.
// "Short", the switch out on the right, joins collector to emitter when it
// is closed: what a transistor shorted inside does. It is open (1) here.
const circuit = `$ 1 0.000005 10.2 60 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 288 96 0
w 288 96 448 96 0
s 288 96 288 208 0 1 false
r 288 208 400 208 0 10000
r 448 96 448 192 0 120
t 400 208 448 208 0 1 0 0 100 default
w 448 224 448 320 0
w 448 320 128 320 0
p 496 192 496 224 2 0 0 0
w 448 192 496 192 0
w 448 224 496 224 0
w 496 192 576 192 0
s 576 192 576 320 0 1 false
w 576 320 448 320 0
x 333 242 355 245 4 18 Rb
x 468 122 508 125 4 18 Bell
x 596 234 650 237 4 18 Short`;

export const transistor: Lesson = {
    id: "transistor",
    title: "The transistor",
    summary: "How a small current into its base lets a transistor switch a large one, with nothing that moves, and how to tell a good one from a shorted one.",
    job: {
        title: "The bell that rings at once",
        customer: "Carmen, with a burglar alarm",
        request: "The moment I switch the alarm on, the bell goes off. Door shut, door open, it makes no difference. The whole street knows when I go out.",
        thanks: "Quiet when I set it, and it rings the moment the door opens. Just as it should.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        switch: { type: "Switch", nth: 0 },
        rb: { type: "Resistor", nth: 0 },
        bell: { type: "Resistor", nth: 1 },
        meter: { type: "Probe" },
        short: { type: "Switch", nth: 1 },
    },
    quantities: {
        switch: { label: "Base switch", part: "switch", switch: true },
        rb: { label: "Base resistor", symbol: "Rb", unit: "Ω", part: "rb", setting: "Resistance" },
        ib: { label: "Into base", symbol: "Ib", unit: "A", part: "rb", measure: "current" },
        il: { label: "Through bell", symbol: "I", unit: "A", part: "bell", measure: "current" },
        vce: { label: "Across transistor", symbol: "Vce", unit: "V", part: "meter", measure: "voltage" },
        short: { label: "Short", part: "short", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "Under the bell",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "Carmen's alarm bell is the 120 Ω resistor on the right. Under it is a **transistor**: a switch worked by a current, as a relay is, but with nothing in it that moves.\n\n"
                + "The switch on the left stands in for the alarm. Closed, it sends a small current through Rb into the transistor's left-hand end, its **base**. For now the meter across the transistor reads {vce}, as across any open switch.",
            note: "The switch marked Short is for later.",
        },
        {
            kind: "explore",
            title: "Call for the bell",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "Press the switch on the screen, as the alarm would. Watch two currents: the one into the base, and the one through the bell.",
            controls: [],
            goal: { switch: 1 },
            success: "{ib} goes into the base, and {il} through the bell. The meter across the transistor has fallen to {vce}.",
        },
        {
            kind: "choice",
            set: { switch: 1, rb: 10000, short: 0 },
            question: "About 1 mA goes into the base, and about 100 mA through the bell. Where does the bell's current come from?",
            options: ["From the base current", "From the battery", "Made by the transistor"],
            answer: 1,
            explain: "The bell's loop runs from the battery, through the bell and the transistor, and back. The battery drives it. The base current only tells the transistor to let it through, as a relay's coil tells its contacts.",
        },
        {
            kind: "read",
            title: "Three ends",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "The bell's current goes into the transistor at its top end, the **collector**. The base current goes in at the base, and inside, the two join.\n\n"
                + "Both leave by the end with the arrow, the **emitter**, and go back to the battery. From base to emitter the transistor acts as a diode, with a forward drop of about 0.7 V. Nothing else limits the base current: Rb is there to set it.",
            note: "Wire the base straight to the battery and its current soars, and the transistor soon burns out.",
        },
        {
            kind: "explore",
            title: "More into the base",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "Guess first: if the base gets ten times the current, will the bell? Then drag **Rb** down to **1 kΩ** and watch both currents.",
            controls: [{ quantity: "rb", min: 1000, max: 10000, step: 1000 }],
            goal: { rb: 1000 },
            success: "The base takes {ib} now, ten times as much. The bell's current has hardly moved: {il}.",
        },
        {
            kind: "choice",
            set: { switch: 1, rb: 1000, short: 0 },
            question: "Ten times the base current, and the bell's current hardly moved. Why not?",
            options: ["Already fully on", "The gain is too low", "Rb uses up the extra"],
            answer: 0,
            explain: "Fully on, the transistor leaves only a fraction of a volt, so the bell has nearly all 12 V, and 12 V ÷ 120 Ω is 100 mA at most. The battery and the bell set that. No base current can push past it.",
        },
        {
            kind: "read",
            title: "Gain",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "A transistor's **gain** says how many times its base current it will let through, at most: about 100 for this one. It is a ceiling, not a promise. The bell takes only what the battery can drive through it.\n\n"
                + "Gains vary a lot from one transistor to the next, so a switch gets base current to spare. Then it turns fully on, with only about 0.2 V left across it. Rb sets the base current:",
            formula: "Ib = (V − 0.7) ÷ Rb",
            note: "V is the supply. Here: 11.3 V ÷ 10 kΩ = 1.13 mA, enough for 113 mA. The bell needs under 100 mA.",
        },
        {
            kind: "number",
            set: { switch: 1, rb: 4700, short: 0 },
            question: "On 12 V, with Rb at 4.7 kΩ, about what current goes into the base? Take the base's forward drop as 0.7 V.",
            solveFor: "ib",
            answer: 0.0024,
            tolerance: 0.01,
            explain: "Ib = (12 V − 0.7 V) ÷ 4.7 kΩ = 11.3 V ÷ 4.7 kΩ = 2.4 mA",
        },
        {
            kind: "number",
            set: { switch: 1, rb: 11300, short: 0 },
            question: "A bell takes 100 mA from 12 V, through a transistor with a gain of 100. With 0.7 V base to emitter, what is the largest Rb that turns it fully on?",
            solveFor: "rb",
            answer: 11300,
            explain: "The base needs at least 100 mA ÷ 100 = 1 mA, so Rb = 11.3 V ÷ 1 mA = 11.3 kΩ. Fit the next size down, 10 kΩ, for current to spare.",
        },
        {
            kind: "read",
            title: "Where you'll find one",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "You'll find transistor switches all through the sets on the bench. In a television with a remote control, one works the relay that switches the mains. In a car with electronic ignition, one switches the ignition coil, a job that used to wear out a pair of contacts.\n\n"
                + "The case gives the type. A BC108, a little metal can, stands 20 V when off and passes 100 mA at most. A 2N3055 passes 15 A, but its gain may be as low as 20.",
            note: "Which leg is which differs, even within one type: check the maker's data sheet, or the meter.",
        },
        {
            kind: "explore",
            title: "Shorted",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "A good transistor switch sits at one end or the other. Off: 12 V across it, none across the bell. On: about 0.2 V across it, the rest across the bell, and 0.7 V base to emitter.\n\n"
                + "Transistors mostly fail outright, open or shorted, and heat is the usual cause. The switch marked **Short** does what a transistor shorted collector to emitter does. The base switch is open: press Short on the screen.",
            controls: [],
            goal: { short: 1 },
            success: "The bell takes {il}, with {ib} into the base. Across the transistor: {vce}. Shorted, a transistor is on whatever its base does.",
        },
        {
            kind: "choice",
            set: { switch: 1, rb: 10000, short: 0 },
            question: "Another alarm. Its base is fed, with 0.7 V base to emitter, but the bell is silent and the meter reads the full 12 V across the transistor. What has failed?",
            options: ["Rb, burnt open", "Transistor, shorted", "Transistor, open"],
            answer: 2,
            explain: "0.7 V base to emitter says the base current is arriving, so Rb is fine. A short would leave 0 V across the transistor. The full 12 V across it, with its base fed, says it is open.",
        },
        {
            kind: "read",
            title: "Out of the set",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "On the bench, a meter on ohms sees a transistor as two diodes joined at the base: one to the collector, one to the emitter. With the meter's + lead on the base, each reads a few hundred ohms; turned round, neither conducts.\n\n"
                + "But a transistor can be shorted collector to emitter with both diodes reading normal. So test that pair too, both ways round: a good one conducts neither way.",
            note: "Many moving-coil meters put the + on the black lead when set to ohms. Try a known diode first.",
        },
        {
            kind: "choice",
            set: { switch: 0, rb: 10000, short: 1 },
            question: "Carmen's alarm: the bell rings with the door shut and the loop made. Base to emitter reads 0 V, and across the transistor 0 V. What has failed?",
            options: ["The door loop", "The transistor", "The base resistor"],
            answer: 1,
            explain: "0 V base to emitter: nothing is calling for the bell, so the door loop is fine. Yet it rings, with 0 V across the transistor: shorted, collector to emitter.",
        },
    ],
};
