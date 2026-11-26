import type { Lesson } from "../lesson/types";

// The part of Carmen's alarm that rings the bell. A 12 V battery; down the
// middle, a switch (standing in for the alarm) and the base resistor Rb
// (10 kΩ) along to the transistor's base; down the right, the bell, drawn as
// a 120 Ω resistor, with the transistor under it. ("$" and "v" lines: see
// ohms-law.ts; "s" and "x" lines: parallel.ts; "p" lines: real-battery.ts.)
//
// "$" line: current-dot speed 60, as the currents here are milliamps.
// "t" line: an NPN transistor (1); the voltages it last had, base to
// collector and base to emitter (0 and 0: worked out afresh); gain 100; and
// CircuitJS1's default model. Base at (400, 208), collector at (448, 192),
// emitter at (448, 224), lettered B, C and E on the drawing. With the switch
// closed it is fully on: 0.71 V base to emitter, 0.17 V collector to
// emitter and 98.6 mA through the bell. With Rb anywhere from 1 kΩ to about
// 11 kΩ it stays fully on. Above that its base is starved and it is only half
// on: at 22 kΩ, about 6 V stays across it.
// "p" lines: two meters. The first, at x = 368, reads base to emitter (the
// bottom rail is the emitter's); the second, at x = 496, collector to emitter.
// The base meter has 50 kΩ in it, as a moving-coil meter of the time has on a
// low range, and that holds a base nothing feeds at 0 V, as such a meter
// would show. A meter that drew nothing would let the simulated transistor's
// leakage float the base at 0.24 V. It takes about 1% of the base current
// when the base is fed. The other meter draws nothing (series resistance 0),
// so the bell reads 0 when the transistor is off.
// "Short", the switch out on the right, joins collector to emitter when it
// is closed: what a transistor shorted inside does. It is open (1) here.
const circuit = `$ 1 0.000005 10.2 60 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 288 96 0
w 288 96 448 96 0
s 288 96 288 208 0 1 false
r 288 208 368 208 0 10000
w 368 208 400 208 0
r 448 96 448 192 0 120
t 400 208 448 208 0 1 0 0 100 default
w 448 224 448 320 0
p 368 208 368 320 2 0 0 50000
w 448 320 368 320 0
w 368 320 128 320 0
p 496 192 496 224 2 0 0 0
w 448 192 496 192 0
w 448 224 496 224 0
w 496 192 576 192 0
s 576 192 576 320 0 1 false
w 576 320 448 320 0
x 317 242 339 245 4 18 Rb
x 468 122 508 125 4 18 Bell
x 596 234 650 237 4 18 Short
x 382 234 394 237 4 18 B
x 424 180 436 183 4 18 C
x 456 246 468 249 4 18 E`;

export const transistor: Lesson = {
    id: "transistor",
    title: "The transistor",
    summary: "How a small current into its base lets a transistor switch a large one, with nothing that moves, and the meter readings that tell a good one from an open, shorted or half-on one.",
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
        baseMeter: { type: "Probe", nth: 0 },
        meter: { type: "Probe", nth: 1 },
        short: { type: "Switch", nth: 1 },
    },
    quantities: {
        switch: { label: "Base switch", part: "switch", switch: true },
        rb: { label: "Base resistor", symbol: "Rb", unit: "Ω", part: "rb", setting: "Resistance" },
        vbe: { label: "Base to emitter", symbol: "Vbe", unit: "V", part: "baseMeter", measure: "voltage" },
        vce: { label: "Across transistor", symbol: "Vce", unit: "V", part: "meter", measure: "voltage" },
        il: { label: "Through bell", symbol: "I", unit: "A", part: "bell", measure: "current" },
        short: { label: "Short switch", part: "short", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "Under the bell",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "Carmen's alarm bell is the 120 Ω resistor on the right. Under it is a **transistor**: a switch worked by a current, as a relay is, but with nothing in it that moves. Inside is a chip of silicon in three layers, with a lead to each.\n\n"
                + "The switch on the left stands in for the alarm. Closed, it sends a small current through Rb into the lead marked B, the **base**. For now the meter across the transistor reads {vce}, as across any open switch.",
            note: "The other meter reads from the base to the lead with the arrow. Short is for later.",
        },
        {
            kind: "explore",
            title: "Call for the bell",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "Press the switch on the screen, as the alarm would. Watch the meter on the base, the meter across the transistor, and the current through the bell.",
            controls: [],
            goal: { switch: 1 },
            success: "The base meter reads {vbe}, and {il} flows through the bell. Across the transistor, the meter has fallen from 12 V to {vce}.",
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
            title: "Three leads",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "The bell's current goes in at the top lead, the **collector** (C). The base current goes in at the base, and inside, the two join.\n\n"
                + "Both leave by the lead with the arrow, the **emitter** (E). From base to emitter the transistor is a diode: told to turn on, it keeps about 0.7 V, as now ({vbe}); not told, 0 V. Like an LED, it needs a resistor to set its current: that is Rb.",
            note: "Wire the base straight to the battery and its current soars, and the transistor soon burns out.",
        },
        {
            kind: "explore",
            title: "More into the base",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "Guess first: give the base ten times the current, and will the bell take ten times as much? Then drag **Rb** down to **1 kΩ**, a tenth of what it is, and watch the bell's current.",
            controls: [{ quantity: "rb", min: 1000, max: 10000, step: 1000 }],
            goal: { rb: 1000 },
            success: "The base takes about ten times as much now. The bell's current has hardly moved: {il}. Across the transistor: {vce}.",
        },
        {
            kind: "choice",
            set: { switch: 1, rb: 1000, short: 0 },
            question: "Ten times the base current, and the bell's current hardly moved. Why not?",
            options: ["Already fully on", "The transistor is weak", "Rb uses up the extra"],
            answer: 0,
            explain: "It was already **fully on**: next to nothing across it, so the bell has nearly all 12 V. Then the battery and the bell set the current, and no base current can push past that. A switch is given base current to spare, to be sure of it.",
        },
        {
            kind: "read",
            title: "Where you'll find one",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "Transistor switches are all through the sets on the bench. In a remote-control television, one works the relay that switches the mains. With electronic ignition, one switches a car's ignition coil, a job that used to wear out a pair of contacts.\n\n"
                + "The type is printed on the case. A BC108, a little metal can, stands 20 V off and passes 100 mA at most. A 2N3055 passes 15 A, and its metal case is its collector. Fit the same type, or one that stands more and passes more.",
            note: "Which lead is which differs, even within one type: check the data sheet, or the meter.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { switch: 1, rb: 10000, short: 0 },
            text: "Transistors mostly die outright, open or shorted. Heat kills most: too heavy a load, a base resistor bridged by solder, a coil's kick with no diode across it, or being left **half on**, neither off nor fully on, where it runs hottest.\n\n"
                + "The set shows it: a load stuck on, or never on. A shorted power transistor in a television takes the fuse with it. When you change one, read the voltages round it: what killed the old one can kill the new.",
            note: "In a television those are joined to the mains: leave live probing there to Rita for now.",
        },
        {
            kind: "explore",
            title: "Good or shorted",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "A good transistor switch sits at one end or the other. Off: 0 V base to emitter, and the full 12 V across it. On: about 0.7 V base to emitter, and next to nothing across it.\n\n"
                + "The switch marked **Short** does what a transistor shorted collector to emitter does. The base switch is open: nothing calls for the bell. Press Short on the screen.",
            controls: [],
            goal: { short: 1 },
            success: "The bell takes {il}, with {vbe} on the base and {vce} across the transistor. Shorted, it's on whatever its base does.",
        },
        {
            kind: "choice",
            set: { switch: 1, rb: 10000, short: 0 },
            question: "Another alarm. Base to emitter reads 0.7 V, as here, but its bell is silent and the full 12 V is across the transistor. What has failed?",
            options: ["The bell, burnt out", "Rb, burnt open", "The transistor, open"],
            answer: 2,
            explain: "0.7 V base to emitter: the base is fed, so Rb is fine. 12 V reaching the collector: the bell is whole, or the 12 V couldn't get through it. Told to turn on, yet passing nothing: the transistor is open.",
        },
        {
            kind: "choice",
            set: { switch: 1, rb: 22000, short: 0 },
            question: "Another alarm: 0.7 V base to emitter, a weak bell, about 6 V across the transistor, and the transistor hot. What is wrong?",
            options: ["Only half on", "Shorted inside", "Nothing: it's on"],
            answer: 0,
            explain: "A good switch sits at one end or the other. Volts across it while the bell's current flows make heat: it is half on, and won't last. Its base is starved: on the screen, Rb is {rb} where 10 kΩ belongs.",
        },
        {
            kind: "read",
            title: "Out of the set",
            set: { switch: 0, rb: 10000, short: 0 },
            text: "On the bench, a meter on ohms sees a transistor as two diodes joined at the base: one to the collector, one to the emitter. With the meter's + on the base, each reads a few hundred ohms; turned round, neither conducts.\n\n"
                + "But a transistor can be shorted collector to emitter with both diodes reading normal. So test that pair too, both ways round: a good one conducts neither way.",
            note: "Many moving-coil meters put + on the black lead on ohms: try a known diode first. And skip the lowest ohms range, which can harm a small transistor.",
        },
        {
            kind: "choice",
            set: { switch: 0, rb: 10000, short: 1 },
            question: "Out of a set, a transistor's two diodes test normal, but collector to emitter reads 0 Ω, both ways round. What is it?",
            options: ["Good: the diodes pass", "Shorted", "Good, just left on"],
            answer: 1,
            explain: "Low both ways, collector to emitter, is a short: the one fault the diode tests miss. Out of the set nothing feeds its base, so it can't be on. A good one conducts neither way.",
        },
        {
            kind: "choice",
            set: { switch: 0, rb: 10000, short: 1 },
            question: "Carmen's alarm: the bell rings with the door shut and the loop made. Base to emitter reads 0 V, and across the transistor 0 V. What has failed?",
            options: ["The door loop", "The base resistor", "The transistor"],
            answer: 2,
            explain: "0 V base to emitter: nothing is calling for the bell. Yet it rings, with 0 V across the transistor: shorted, collector to emitter.",
        },
    ],
};
