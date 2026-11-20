import type { Lesson } from "../lesson/types";

// The transistor's loop with a MOSFET in the transistor's place: the 12 V
// battery and the lamp (a resistor of 12 Ω, a 12 V 12 W bulb when lit) down
// the right, the MOSFET below the lamp. The gate is fed from a second battery,
// Vg, through RG: Vg stands in for the flasher's timer, so the learner can
// raise the gate a volt at a time. ("$" and "v" lines: see ohms-law.ts; "s":
// see parallel.ts, open; "p": see real-battery.ts; "x": the names written on
// the drawing, in 18 px text.)
//
// "f" line: an N-channel MOSFET, gate at (416, 208), drain at (464, 192) and
// source at (464, 224). Flags 0: drawn as the usual symbol, with no built-in
// diode simulated (it plays no part here). Threshold 3 V; beta 1 ÷ 4.38, so
// that with 12 V on the gate it is exactly 0.5 Ω, carrying the lamp's 0.96 A
// with 0.48 V across it. With 10 V on the gate it is about 0.65 Ω. Off, it
// leaks 1e-8 S, so the lamp shows 120 nA.
//
// The gate takes no current, so RG carries none and drops nothing. The fault:
// a switch above Rf (2 kΩ) joins the gate to the source through Rf, a leak
// through a holed gate film. Closed, RG and Rf are a divider: with 12 V from
// the timer the gate gets 2 V, below the threshold, and RG carries 1 mA.
// Two meters: gate to source (x = 336) and drain to source (x = 544).
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
p 336 208 336 320 2 0 0 0
s 384 208 384 256 0 1 false
r 384 256 384 320 0 2000
w 464 192 544 192 0
p 544 192 544 320 2 0 0 0
w 544 320 464 320 0
w 464 320 384 320 0
w 384 320 336 320 0
w 336 320 224 320 0
w 224 320 128 320 0
x 269 242 291 245 4 18 RG
x 404 270 426 273 4 18 Rf
x 484 122 528 125 4 18 Lamp
x 398 234 410 237 4 18 G
x 440 180 452 183 4 18 D
x 472 246 484 249 4 18 S`;

export const mosfet: Lesson = {
    id: "mosfet",
    title: "The MOSFET",
    summary: "A switch worked by the voltage on its gate, which takes no current at all: its threshold, its resistance fully on, and the gate that static punches through.",
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
        gateMeter: { type: "Probe", nth: 0 },
        drainMeter: { type: "Probe", nth: 1 },
        fault: { type: "Switch" },
    },
    quantities: {
        vg: { label: "Timer", symbol: "Vg", unit: "V", part: "timer", setting: "Voltage" },
        gate: { label: "Through RG", symbol: "IG", unit: "A", part: "rg", measure: "current" },
        vgs: { label: "Gate to source", symbol: "Vgs", unit: "V", part: "gateMeter", measure: "voltage" },
        vds: { label: "Drain to source", symbol: "Vds", unit: "V", part: "drainMeter", measure: "voltage" },
        lamp: { label: "Through lamp", symbol: "I", unit: "A", part: "lamp", measure: "current" },
        fault: { label: "Fault switch", part: "fault", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "Bea's flasher",
            set: { vg: 0, fault: 0 },
            text: "Bea's flasher, drawn as the transistor's loop, with a **MOSFET** where the transistor was: another kind of transistor. The small battery, Vg, stands in for the flasher's timer, feeding the gate through RG.\n\n"
                + "The **gate** (G) is the lead that controls a MOSFET, as the base did a transistor. The **drain** (D) goes to the lamp, the **source** (S) to the battery's minus. The meters read gate to source, and drain to source.",
            note: "Vg at 12 V is the timer saying on; at 0 V, off. It is off now.",
        },
        {
            kind: "explore",
            title: "Raise the gate",
            set: { vg: 0, fault: 0 },
            text: "Drag **Vg** up a volt at a time to **4 V**, and watch two readings: the lamp's current, and the current through RG into the gate.",
            controls: [{ quantity: "vg", min: 0, max: 12, step: 1 }],
            goal: { vg: 4 },
            success: "Up to 3 V the lamp got next to nothing. At 4 V it takes {lamp}. And RG carries {gate}.",
        },
        {
            kind: "explore",
            title: "All the way up",
            set: { vg: 4, fault: 0 },
            text: "Carry on up to **10 V**, watching the same two readings.",
            controls: [{ quantity: "vg", min: 0, max: 12, step: 1 }],
            goal: { vg: 10 },
            success: "Now the lamp takes {lamp}, fully on, with only {vds} left across the MOSFET. RG still carries {gate}.",
        },
        {
            kind: "choice",
            set: { vg: 10, fault: 0 },
            question: "The transistor's base needed a current all the time it was on. What did this gate need to put the lamp fully on?",
            options: ["A tiny current", "As much as a base", "Only a voltage"],
            answer: 2,
            explain: "RG read 0 A the whole way up: no current flows into the gate. Vg holds it at a voltage, and the voltage alone turns the MOSFET on. The base needed a current; the gate only needs holding.",
        },
        {
            kind: "read",
            title: "A gate that touches nothing",
            set: { vg: 10, fault: 0 },
            text: "Inside, the gate is a metal plate on a film of glass a ten-thousandth of a millimetre thick. No current can cross the film. A voltage on the plate opens a path from drain to source beneath it.\n\n"
                + "So the gate is a tiny capacitor: one gulp of charge, and it holds it. Never leave a gate joined to nothing: it keeps its last voltage, and the MOSFET may stay on. A resistor from gate to source is there to drain it.",
            note: "Here RG carries nothing, so it drops nothing: 0 A × 10 kΩ = 0 V. The gate gets all of Vg: {vgs}.",
        },
        {
            kind: "read",
            title: "The threshold, and fully on",
            set: { vg: 10, fault: 0 },
            text: "The gate voltage, measured from the source, at which a MOSFET starts to conduct is its **threshold voltage**: 3 V for this one. It starts there, but is not on: at 4 V it was half on, 10.6 V across it with 0.11 A through it, over a watt of heat.\n\n"
                + "Well above the threshold it is fully on, and acts as a small resistor, Ron, from drain to source. Like any resistor, it obeys Ohm's law:",
            formula: "Vds = I × Ron",
            note: "Here, at 10 V: {vds} ÷ {lamp} is about 0.65 Ω. More gate voltage, less resistance.",
        },
        {
            kind: "number",
            set: { vg: 12, fault: 0 },
            question: "With the full 12 V on its gate, this MOSFET is 0.5 Ω, and the lamp takes 0.96 A. What does the meter read from drain to source?",
            solveFor: "vds",
            answer: 0.48,
            explain: "Vds = I × Ron = 0.96 A × 0.5 Ω = 0.48 V",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { vg: 12, fault: 0 },
            text: "In 1984 the power MOSFET is new: you'll meet it in the output stage of a recent hi-fi amplifier and in some switch-mode power supplies. Tiny ones fill calculator chips, and more sets use them every year.\n\n"
                + "From the data sheet, an IRF510: 100 V drain to source, ±20 V gate to source at most, threshold 2 to 4 V, 0.54 Ω fully on with 10 V on the gate. Leads: gate, drain, source; the metal tab is the drain.",
            note: "Mind that ±20 V: the static on a hand runs to thousands of volts.",
        },
        {
            kind: "explore",
            title: "One end or the other",
            set: { vg: 12, fault: 0 },
            text: "A good MOSFET sits at one end or the other. Read both meters with the timer on, then drag **Vg** down to **0 V**, the timer off, and read them again.",
            controls: [{ quantity: "vg", min: 0, max: 12, step: 1 }],
            goal: { vg: 0 },
            success: "On: 12 V gate to source, 0.48 V drain to source. Off: {vgs} and {vds}. Most MOSFETs die shorted: drain to source then reads 0 V, on or off, and the lamp never goes out.",
        },
        {
            kind: "read",
            title: "Out of the set",
            set: { vg: 12, fault: 0 },
            text: "Out of the set, empty the gate first: touch gate to source. Then gate to source and gate to drain read open both ways, and drain to source passes one way only. Put 9 V on the gate, plus to gate and minus to source, and it passes both ways, and stays on until you empty the gate.\n\n"
                + "That film stands 20 V. Keep a MOSFET in its black foam until it's wanted, hold it by the body, not the legs, and wear the shop's wrist strap.",
            note: "A dead one usually reads near 0 Ω between every pair of leads.",
        },
        {
            kind: "choice",
            set: { vg: 12, fault: 0 },
            question: "A new MOSFET from the drawer reads shorted from drain to source, both ways round. What do you do first?",
            options: ["Throw it away", "Short gate to source", "Put 9 V on the gate"],
            answer: 1,
            explain: "Its gate may hold charge from an earlier touch, which keeps it on. Empty the gate and test again. Only if it still reads shorted is it dead.",
        },
        {
            kind: "explore",
            title: "Bea's gate",
            set: { vg: 12, fault: 0 },
            text: "Rf is a leak through a holed film, from gate to source: 2 kΩ. The timer is on and the lamp lit. Press the switch above Rf on the screen to put the fault in, and watch RG and the gate.",
            controls: [],
            goal: { fault: 1 },
            success: "RG now carries {gate}: the gate is taking current, which a good one never does. RG drops 10 V of the 12, the gate is left {vgs}, below its 3 V threshold, and the lamp goes dark.",
        },
        {
            kind: "number",
            set: { vg: 9, fault: 1 },
            question: "With the 2 kΩ leak in, RG (10 kΩ) and the leak make a divider. Vg is set to 9 V. What does the meter read from gate to source?",
            solveFor: "vgs",
            answer: 1.5,
            explain: "Vgs = 9 V × 2 kΩ ÷ (10 kΩ + 2 kΩ) = 1.5 V",
        },
        {
            kind: "choice",
            set: { vg: 12, fault: 1 },
            question: "Bea's flasher: the timer gives 12 V, yet the gate reads 2 V from source, RG carries 1 mA, and drain to source reads 12 V. What's wrong?",
            options: ["Its gate is holed", "Drain to source short", "The timer is dead"],
            answer: 0,
            explain: "A good gate takes no current; hers takes 1 mA. Static from her fingers holed the film, so RG drops 10 V and the gate never reaches its threshold.",
        },
    ],
};
