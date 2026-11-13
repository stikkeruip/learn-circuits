import type { Lesson } from "../lesson/types";

// A battery, a switch and a lamp in one loop.
//
// "$" line: show current dots; 1 ms timestep at about 8000 steps a second,
// so the lamp's filament, which CircuitJS1 warms up and cools down as a real
// one does, settles in a fifth of a second; current-dot speed 38, as in
// ohms-law.ts; voltage colours scaled to 12 V.
// "s" line: the switch, open (position 1).
// "181" line: the lamp, cold (300 K) and rated 12 V. Its rated power is the
// one at which the simulated filament settles at 2 A (6 Ω): a round number
// to read, and the values the next lesson starts from.
const circuit = `$ 1 0.001 50 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
s 128 96 352 96 0 1 false
181 352 96 352 320 0 300 24.015 12 0.4 0.4
w 352 320 128 320 0`;

export const closedLoop: Lesson = {
    id: "closed-loop",
    title: "The closed loop",
    summary: "What a circuit is: a loop that current flows round, and why a gap anywhere stops it everywhere.",
    job: {
        title: "First day on the bench",
        customer: "Rita, who runs the shop",
        request: "Before you touch a customer's set, show me you can light a lamp. Battery, switch, lamp. Go on.",
        thanks: "Good. Every set that comes through that door is loops like this one. Tomorrow, the meter.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        switch: { type: "Switch" },
        lamp: { type: "Lamp" },
    },
    quantities: {
        switch: { label: "Switch", part: "switch", switch: true },
        current: { label: "Current", symbol: "I", unit: "A", part: "lamp", measure: "current" },
    },
    steps: [
        {
            kind: "read",
            title: "Meet the circuit",
            set: { switch: 0 },
            text: "Three parts, joined by wire. The **battery** is the source: it pushes electric charge. The **lamp** is the load: the part where the charge does its work. The **switch** is a gap that you can close.\n\n"
                + "Right now the switch is open and the lamp is dark.",
        },
        {
            kind: "read",
            title: "Reading the drawing",
            set: { switch: 0 },
            text: "A drawing like this is a **schematic**: every part is a symbol, and every line is a wire.\n\n"
                + "The two plates on the left are the battery. The circle is the lamp. The lifted arm at the top is the switch, standing open.",
        },
        {
            kind: "explore",
            title: "Close the switch",
            set: { switch: 0 },
            text: "Press the switch on the screen to close the gap, and watch the lamp and the wires.",
            controls: [],
            goal: { switch: 1 },
            success: "The lamp is lit, and the dots are moving.",
        },
        {
            kind: "read",
            title: "Current",
            set: { switch: 1 },
            text: "The moving dots are **current**: electric charge flowing through the wire. It is measured in **amperes**, amps for short (**A**). Right now it is {current}.\n\n"
                + "Follow the dots. They leave the battery, go through the switch and the lamp, and come back to the battery. That complete loop is the **circuit**.",
        },
        {
            kind: "choice",
            set: { switch: 1 },
            question: "The lamp is lit. Where in the loop is the current biggest?",
            options: ["Before the lamp", "After the lamp", "The same all round"],
            answer: 2,
            explain: "One loop, one current: {current} at every point. The lamp doesn't use current up. It takes energy from the charge passing through, and the charge carries on round.",
        },
        {
            kind: "explore",
            title: "Open the switch",
            set: { switch: 1 },
            text: "Press the switch again to open it. Watch the dots in every wire, not only the ones next to the switch.",
            controls: [],
            goal: { switch: 0 },
            success: "Dark. The dots have stopped in every wire: the current is {current}.",
        },
        {
            kind: "choice",
            set: { switch: 0 },
            question: "The switch is open. Does current still flow in the bottom wire, from the lamp back to the battery?",
            options: ["Yes, as before", "Yes, a little", "No, none"],
            answer: 2,
            explain: "A gap anywhere stops the current everywhere. Charge moves only when it has a complete loop to move round. A loop with a gap in it is an **open circuit**.",
        },
        {
            kind: "read",
            title: "No loop, no current",
            set: { switch: 0 },
            text: "Current flows only round a complete loop: out of one side of the source, through the load, and back into the other side.\n\n"
                + "**Closed circuit**: the loop is complete, and current flows. **Open circuit**: there is a gap, and no current flows anywhere in it.",
        },
        {
            kind: "choice",
            set: { switch: 0 },
            question: "A lamp won't light, though the lamp and its battery are both good. What is the likeliest fault?",
            options: ["A gap in the loop", "Too much current", "The current got used up"],
            answer: 0,
            explain: "No light means no current, and no current means the loop is open somewhere: a broken wire, a loose contact, a bad switch. Finding the gap is half of repair work.",
        },
    ],
};
