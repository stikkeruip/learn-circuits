import type { Lesson } from "../lesson/types";

// One 12 V battery feeding two loops. On the left, the coil's loop: the
// Button, the Winding switch and the relay's coil. On the right, the
// contacts' loop: the relay's normally open contact, Rc and the load, R. A
// meter, Vc, reads across the contacts and Rc together. ("$" and "v" lines:
// see ohms-law.ts; "s" and "x" lines: see parallel.ts; "p" line: see
// real-battery.ts.)
//
// "178" line: CircuitJS1's relay, read with its old text format. Flags 22:
// a box drawn round it (2), the coil drawn along its length (4), and a
// 1 MΩ pull-down on each fixed contact (16), so an open contact passes no
// current at all. Then: one pole; a coil of 0.2 H; no coil current now;
// 1 nΩ across closed contacts (so Rc is all the contacts' resistance there
// is, and the readings come out round); 1 MΩ across open ones (not used with
// the pull-downs); it pulls in above 75 mA (9 V on its coil) and lets go
// below 30 mA; a coil of 120 Ω; 5 ms to swing across; and it starts let go.
// Its five ends: the common at (288, 176), where the arm is hinged; the
// normally closed contact at (416, 160), wired to nothing; the normally open
// one at (416, 192); and the coil's two at (288, 208) and (416, 208).
//
// "Winding" is a switch in line with the coil: open, it does what a broken
// winding does. "Rc" is the contacts' own resistance: 4 mΩ when they are
// clean, ohms when they are burnt.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 192 96 0
w 192 96 288 96 0
w 288 96 496 96 0
s 192 96 192 208 0 1 false
s 192 208 288 208 0 0 false
178 288 176 416 176 22 1 0.2 0 1e-9 1000000 0.075 120 0.03 0.005 0
w 288 96 288 176 0
w 416 208 416 320 0
r 416 192 496 192 0 0.004
p 496 96 496 192 2 0 0 0
w 496 192 560 192 0
r 560 192 560 320 0 4
w 560 320 416 320 0
w 416 320 128 320 0
x 212 130 268 133 4 18 Button
x 207 242 273 245 4 18 Winding
x 445 226 467 229 4 18 Rc
x 516 150 538 153 4 18 Vc
x 580 234 592 237 4 18 R`;

export const relay: Lesson = {
    id: "relay",
    title: "The relay",
    summary: "How a small current in a coil switches a large one through a relay's contacts, and how to tell burnt contacts from a broken winding.",
    job: {
        title: "The set that clicks but stays dark",
        customer: "Giorgos, with a remote-control television",
        request: "I press the button on the handset and it clicks inside, the same as it always has. But the screen stays dark, and there's not a sound out of it.",
        thanks: "A new relay, and the picture comes up the moment it clicks. I thought the click meant it was working.",
    },
    circuit,
    parts: {
        button: { type: "Switch", nth: 0 },
        winding: { type: "Switch", nth: 1 },
        rc: { type: "Resistor", nth: 0 },
        meter: { type: "Probe" },
        load: { type: "Resistor", nth: 1 },
    },
    quantities: {
        button: { label: "Button", part: "button", switch: true },
        winding: { label: "Winding", part: "winding", switch: true },
        coil: { label: "Through coil", symbol: "Ic", unit: "A", part: "winding", measure: "current" },
        rc: { label: "Contacts", symbol: "Rc", unit: "Ω", part: "rc", setting: "Resistance" },
        vc: { label: "Across contacts", symbol: "Vc", unit: "V", part: "meter", measure: "voltage" },
        load: { label: "Through load", symbol: "I", unit: "A", part: "load", measure: "current" },
    },
    // The relay takes about 7 ms to pull in and 5 ms to let go.
    settle: 0.05,
    steps: [
        {
            kind: "read",
            title: "Meet the relay",
            set: { button: 0, winding: 1, rc: 0.004 },
            reset: true,
            text: "The box in the middle is a **relay**: a switch worked by a coil. Inside, the coil is wound on an iron core, beside an iron arm held back by a spring. Current in the coil makes it a magnet, and it pulls the arm across: click.\n\n"
                + "The arm carries the relay's **contacts**, the metal points that touch to close its switch. They feed the load, **R**. The **Button** works the coil. Winding and Rc are for faults, later.",
        },
        {
            kind: "explore",
            title: "Press the button",
            set: { button: 0, winding: 1, rc: 0.004 },
            reset: true,
            text: "Press the button on the screen. Watch the relay's arm, and the two currents: **Ic** through the coil, **I** through the load.",
            controls: [],
            goal: { button: 1 },
            success: "Click: the arm swings across and shuts the contacts. The coil takes only {coil}, and the contacts pass {load} to the load.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 1, rc: 0.004 },
            question: "The coil takes 100 mA and the load takes 3 A. Where do the load's 3 A come from?",
            options: ["Through the coil", "From the battery", "The relay makes them"],
            answer: 1,
            explain: "A relay only switches: it supplies nothing. The load's amps come from the battery, round the right-hand loop and through the contacts. None pass through the coil: its 100 mA only pull the arm.",
        },
        {
            kind: "read",
            title: "Two loops, one magnet",
            set: { button: 1, winding: 1, rc: 0.004 },
            text: "Inside the relay, nothing joins the coil to the contacts: only the magnet's pull crosses over. So the two loops needn't share a battery, or even a voltage: a 12 V coil can switch the mains.\n\n"
                + "Relays sit where a small switch meets a heavy load. In a car, the starter and the horns work through them, so the key and the horn button carry only a coil's current. A remote-control set switches its mains with one.",
            note: "A relay's coil kicks when it is switched off, like any coil, so a diode goes across it.",
        },
        {
            kind: "read",
            title: "Normally open, normally closed",
            set: { button: 0, winding: 1, rc: 0.004 },
            reset: true,
            text: "With the coil off, the arm rests on the top contact, clear of the bottom one. The load is wired to the bottom one: the **normally open** contact, shut only while the coil pulls.\n\n"
                + "The top one is the **normally closed** contact: shut until the coil pulls, then open. Nothing is wired to it here. Normally means at rest, coil off, as the relay sits on the shelf. It doesn't mean usually.",
        },
        {
            kind: "choice",
            set: { button: 0, winding: 1, rc: 0.004 },
            reset: true,
            question: "You want a lamp lit only while the button is up. Which contact should feed it?",
            options: ["Normally closed", "Normally open", "Either will do"],
            answer: 0,
            explain: "Button up, coil off: the arm rests on the normally closed contact, so the lamp is lit. Press the button and the arm leaves it, and the lamp goes out. Wire a load to each, and one relay swaps them over.",
        },
        {
            kind: "read",
            title: "What the case says",
            set: { button: 1, winding: 1, rc: 0.004 },
            text: "A relay's case gives two ratings. The coil's is one voltage, such as 12 V: the voltage it is made to work on. Its resistance, read on the meter, gives its current by Ohm's law.\n\n"
                + "The contact rating is a group of figures: the amps the closed contacts may carry, and the volts the open ones may stand. It holds for a plain load. A cold lamp takes many times its running current at switch-on, so give it contacts to spare.",
            formula: "Ic = V ÷ Rcoil",
            note: "Here the coil reads 120 Ω: 12 V ÷ 120 Ω = 0.1 A, which is 100 mA. Check it against Ic.",
        },
        {
            kind: "explore",
            title: "Burnt contacts",
            set: { button: 0, winding: 1, rc: 2 },
            reset: true,
            text: "Contacts are the part that wears. Each time they open, a spark pits and burns them, and their resistance rises. A heavy spark can even weld them shut, so the load never goes off. Here **Rc** is up at **2 Ω**. Press the button, and watch **I** and **Vc**, the meter across the contacts.",
            controls: [],
            goal: { button: 1 },
            success: "Click, the same as ever. But the load gets only {load}, and the closed contacts drop {vc}: a third of the battery's 12 V.",
        },
        {
            kind: "read",
            title: "Volts across the contacts",
            set: { button: 1, winding: 1, rc: 2 },
            text: "Burnt contacts have resistance of their own, **Rc**, in series with the load. They take a share of the 12 V, so the load gets less, and the current falls:",
            formula: "I = V ÷ (Rc + R)",
            note: "Here: 12 V ÷ (2 Ω + 4 Ω) = 2 A, and the contacts drop 2 A × 2 Ω = 4 V. Clean contacts drop only millivolts.",
        },
        {
            kind: "number",
            set: { button: 1, winding: 1, rc: 8 },
            question: "Burnt contacts of 8 Ω feed a 4 Ω load from 12 V. With the relay pulled in, what does the meter read across the contacts?",
            solveFor: "vc",
            answer: 8,
            explain: "I = 12 V ÷ (8 Ω + 4 Ω) = 1 A, so Vc = 1 A × 8 Ω = 8 V",
        },
        {
            kind: "number",
            set: { button: 1, winding: 1, rc: 12 },
            question: "A relay feeds a 4 Ω load from 12 V. Pulled in, its contacts have 9 V across them. How much resistance have they?",
            solveFor: "rc",
            answer: 12,
            explain: "The load gets 12 V − 9 V = 3 V, so I = 3 V ÷ 4 Ω = 0.75 A, and Rc = 9 V ÷ 0.75 A = 12 Ω",
        },
        {
            kind: "read",
            title: "No click",
            set: { button: 1, winding: 0, rc: 0.004 },
            reset: true,
            text: "Now the **Winding** switch is open: it does what a broken winding does. The button is pressed, yet the coil takes {coil}, and the full 12 V sits across the break. No click: the contacts stay open, with {vc} across them.\n\n"
                + "So listen first. No click, with volts on the coil: an open winding. Out of the set, its pins show no continuity. A click proves only that the arm moved: then read the volts across the contacts, under load.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 1, rc: 0.004 },
            question: "Out of the set, with the relay pulled in, your meter on ohms reads 0.6 Ω across its contacts. What does that prove?",
            options: ["They are burnt", "They are good", "Nothing either way"],
            answer: 2,
            explain: "A meter on ohms passes only a tiny current, too small to break through the tarnish on the contacts. Good ones can read high on it, and burnt ones can pass. Only the volts across them under load can tell.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 1, rc: 20 },
            question: "Giorgos's set clicks but stays dark. With it on, Rita's meter finds volts across the closed contacts. What is wrong?",
            options: ["The winding is open", "Burnt contacts", "No drive to the coil"],
            answer: 1,
            explain: "The click proves the coil is driven and pulls the arm across, so the winding is whole. Clean contacts drop millivolts. Volts across them mean they are burnt, and they starve the set. A new relay mends it.",
        },
    ],
};
