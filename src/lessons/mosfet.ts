import type { Lesson } from "../lesson/types";

// The transistor's loop with a MOSFET in the transistor's place: the 12 V
// battery and the lamp (a resistor of 12 Ω, a 12 V 12 W bulb when lit) down
// the right, the MOSFET below the lamp. The gate is fed from a second battery,
// Vg, through RG (10 kΩ): Vg stands in for the flasher's timer, so the
// learner can raise the gate a volt at a time. ("$" and "v" lines: see
// ohms-law.ts; "s": see parallel.ts, open; "p": see real-battery.ts; "x": the
// names written on the drawing, in 18 px text.)
//
// "f" line: an N-channel MOSFET, gate at (416, 208), drain at (464, 192) and
// source at (464, 224). Flags 0: drawn as the usual symbol, with no built-in
// diode simulated (it plays no part here). Threshold 3 V; beta 1 ÷ 4.38, so
// that with 12 V on the gate it is 0.5 Ω, carrying the lamp's 0.96 A with
// 0.48 V across it. At 4 V on the gate it is half on: 0.11 A, with 10.6 V
// across it. Off, it leaks 1e-8 S, so the lamp shows 120 nA, which reads 0.
//
// The gate takes no current, so RG carries none and drops nothing: the gate
// gets all of Vg. Two faults, each a switch, both open here:
// - The switch above the 2 kΩ resistor named "Leak" joins the gate to the
//   source through it: a leak through a holed gate film. Closed, RG and the
//   leak are a divider: with 12 V from the timer the gate gets 2 V, below
//   the threshold, and RG carries 1 mA.
// - "Short", out on the right, joins drain to source: a MOSFET shorted
//   inside. Closed, the lamp takes 1 A whatever the gate does.
// One meter, drain to source (x = 544).
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 464 96 0
r 464 96 464 192 0 12
f 416 208 464 208 0 3 0.228310502283105
w 464 224 464 320 0
v 224 320 224 208 16 0 40 12 0 0 0.5
r 224 208 336 208 0 10000
w 336 208 384 208 0
w 384 208 416 208 0
s 384 208 384 256 0 1 false
r 384 256 384 320 0 2000
w 464 192 544 192 0
p 544 192 544 320 2 0 0 0
w 544 192 624 192 0
s 624 192 624 320 0 1 false
w 624 320 544 320 0
w 544 320 464 320 0
w 464 320 384 320 0
w 384 320 224 320 0
w 224 320 128 320 0
x 269 242 291 245 4 18 RG
x 404 270 444 273 4 18 Leak
x 484 122 528 125 4 18 Lamp
x 398 234 410 237 4 18 G
x 440 180 452 183 4 18 D
x 472 246 484 249 4 18 S
x 644 234 698 237 4 18 Short`;

export const mosfet: Lesson = {
    id: "mosfet",
    title: "The MOSFET",
    summary: "How a voltage on its gate, with no current at all, switches a MOSFET on, and how to tell a good one from a shorted one, or one whose gate static has holed.",
    job: {
        title: "The flasher that went dark",
        customer: "Bea, with a lamp flasher she built from a magazine kit",
        request: "I built this flasher from a kit in a magazine, and it blinked away on the kitchen table. Then I moved it into a neater box. The little three-legged part was fiddly: I had it out twice, turning it over in my fingers. Now the lamp won't light at all, and the bulb is new.",
        thanks: "It blinks again. The next one of those stays in its foam until the iron is hot.",
    },
    circuit,
    parts: {
        timer: { type: "Voltage", nth: 1 },
        lamp: { type: "Resistor", nth: 0 },
        rg: { type: "Resistor", nth: 1 },
        meter: { type: "Probe" },
        leak: { type: "Switch", nth: 0 },
        short: { type: "Switch", nth: 1 },
    },
    quantities: {
        vg: { label: "Timer", symbol: "Vg", unit: "V", part: "timer", setting: "Voltage" },
        gate: { label: "Through RG", symbol: "IG", unit: "A", part: "rg", measure: "current" },
        vds: { label: "Drain to source", symbol: "Vds", unit: "V", part: "meter", measure: "voltage" },
        lamp: { label: "Through lamp", symbol: "I", unit: "A", part: "lamp", measure: "current" },
        leak: { label: "Leak", part: "leak", switch: true },
        short: { label: "Short", part: "short", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "Bea's flasher",
            set: { vg: 0, leak: 0, short: 0 },
            text: "Bea's flasher, drawn as the transistor's loop, with a **MOSFET** where the transistor was: another kind of transistor. The small battery, Vg, stands in for the flasher's timer, feeding the MOSFET through RG.\n\n"
                + "The lead it feeds is the **gate** (G), which controls a MOSFET as the base did a transistor. The **drain** (D) goes to the lamp, the **source** (S) to the battery's minus. The meter reads drain to source.",
            note: "Vg at 12 V is the timer saying on; at 0 V, off. Leak and Short are for later.",
        },
        {
            kind: "explore",
            title: "Raise the gate",
            set: { vg: 0, leak: 0, short: 0 },
            text: "Drag **Vg** up a volt at a time to **4 V**, and watch two readings: the lamp's current, and the current through RG into the gate.",
            controls: [{ quantity: "vg", min: 0, max: 12, step: 1 }],
            goal: { vg: 4 },
            success: "Up to 3 V the lamp got next to nothing. At 4 V it takes {lamp}, a dull glow, with {vds} still across the MOSFET. And RG carries {gate}.",
        },
        {
            kind: "explore",
            title: "All the way up",
            set: { vg: 4, leak: 0, short: 0 },
            text: "Carry on up to **12 V**, the timer fully on, watching the same readings.",
            controls: [{ quantity: "vg", min: 0, max: 12, step: 1 }],
            goal: { vg: 12 },
            success: "Now the lamp takes {lamp} and is fully lit, with only {vds} left across the MOSFET. RG still carries {gate}.",
        },
        {
            kind: "choice",
            set: { vg: 12, leak: 0, short: 0 },
            question: "The transistor's base needed a current all the time it was on. What did this gate need to put the lamp fully on?",
            options: ["A tiny current", "As much as a base", "Only a voltage"],
            answer: 2,
            explain: "RG read 0 A the whole way up: no current flows into the gate. The voltage alone turns the MOSFET on. A base needs feeding; a gate only needs holding.",
        },
        {
            kind: "read",
            title: "A gate that touches nothing",
            set: { vg: 12, leak: 0, short: 0 },
            text: "Inside, the gate is a metal plate on a film of glass far thinner than a hair, so no current crosses. Once the gate passes its **threshold voltage**, a path opens from drain to source under the plate: that is where it starts, not where it is on.\n\n"
                + "The gate is a tiny capacitor: one gulp of charge, and it holds it. Never leave a gate joined to nothing: it keeps its last voltage, and the MOSFET may stay on.",
            note: "This one's threshold is 3 V. Off, it has the full supply across it; well above 3 V it is fully on, with next to nothing. Half on, it runs hot.",
        },
        {
            kind: "choice",
            set: { vg: 4, leak: 0, short: 0 },
            question: "A flasher on the bench: its lamp glows dull and the MOSFET is hot. The gate reads 4 V, drain to source 10.6 V. What's wrong?",
            options: ["MOSFET shorted", "Gate short of volts", "MOSFET open"],
            answer: 1,
            explain: "Shorted would read 0 V with the lamp bright; open, 12 V with it dark. At 4 V it is half on, with volts across it and current through it: it runs hot. Find why the gate is short of volts.",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { vg: 12, leak: 0, short: 0 },
            text: "In 1984 the power MOSFET is new: you'll meet it in the output stage of a recent hi-fi amplifier and in some switch-mode power supplies. Tiny ones fill calculator chips.\n\n"
                + "To replace one, read its data sheet. An IRF510 stands 100 V drain to source and 20 V on the gate, starts between 2 and 4 V, and is 0.54 Ω fully on. Fit the same, or one at least as good on each. Leads: gate, drain, source; the metal tab is the drain.",
            note: "Mind that 20 V on the gate: the static on a hand runs to thousands of volts.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { vg: 12, leak: 0, short: 0 },
            text: "The gate's film is the weak spot. Static from a hand, or a spike in the set, punches a hole through it that never mends, and the gate then leaks to the source or the drain. Static gives no warning: it can kill one at once, or months later.\n\n"
                + "The usual end is a short, drain to source and often the gate too: whatever it works stays on for good. Heat kills them too, when one is left half on; so does a coil's kick, with no diode to tame it.",
            note: "Big power MOSFETs shrug off more static than small ones. Handle them all the same.",
        },
        {
            kind: "explore",
            title: "Shorted",
            set: { vg: 0, leak: 0, short: 0 },
            text: "The timer is off, and drain to source reads the full 12 V, as a good one should. The switch marked **Short** does what a MOSFET shorted drain to source does: press it on the screen.",
            controls: [],
            goal: { short: 1 },
            success: "With the timer still off, the lamp takes {lamp}, and drain to source reads {vds}. Shorted, a MOSFET is on whatever its gate says.",
        },
        {
            kind: "choice",
            set: { vg: 12, leak: 0, short: 0 },
            question: "Shorted, a MOSFET reads 0 V drain to source, timer on or off. With the timer on, what does an open one read?",
            options: ["12 V, lamp dark", "0 V, lamp lit", "About 6 V, lamp dim"],
            answer: 0,
            explain: "Open, nothing passes: no current for the lamp, and the full supply across the MOSFET. A good one reads that too when off, so check the gate: with 12 V on it and still 12 V across, it's open.",
        },
        {
            kind: "read",
            title: "Out of the set",
            set: { vg: 12, leak: 0, short: 0 },
            text: "On the bench, empty the gate first: touch gate to source. Then gate to source and gate to drain read open both ways round, and drain to source passes one way only. Put a 9 V battery on the gate, plus to gate and minus to source, and drain to source passes both ways, until you empty the gate.\n\n"
                + "Keep MOSFETs in their black foam until they're wanted, hold them by the body, not the legs, and wear the shop's wrist strap.",
            note: "A dead one usually reads near 0 Ω between every pair of leads.",
        },
        {
            kind: "choice",
            set: { vg: 12, leak: 0, short: 0 },
            question: "A new MOSFET from the drawer reads shorted from drain to source, both ways round. What do you do first?",
            options: ["Throw it away", "Short gate to source", "Put 9 V on the gate"],
            answer: 1,
            explain: "Its gate may hold charge from an earlier touch, which keeps it on. Empty the gate and test again. Only if it still reads shorted is it dead.",
        },
        {
            kind: "explore",
            title: "Bea's gate",
            set: { vg: 12, leak: 0, short: 0 },
            text: "The timer is on and the lamp lit. **Leak**, the 2 kΩ from gate to source, does what a hole in the film does. Press the switch above it on the screen, and watch RG and the lamp.",
            controls: [],
            goal: { leak: 1 },
            success: "RG now carries {gate}: the gate is taking current, which a good one never does. RG drops most of the 12 V, the gate is left below its threshold, and the lamp goes out: {lamp}.",
        },
        {
            kind: "choice",
            set: { vg: 12, leak: 1, short: 0 },
            question: "Bea's flasher: the timer gives 12 V, but the gate reads 2 V, RG carries 1 mA, and drain to source reads 12 V. What's wrong?",
            options: ["RG has gone high", "The MOSFET is shorted", "Its gate is holed"],
            answer: 2,
            explain: "A good gate takes no current, whatever RG's value. Hers takes 1 mA: static from her fingers holed the film, so the gate never reaches its threshold.",
        },
    ],
};
