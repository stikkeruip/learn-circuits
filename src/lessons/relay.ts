import type { Lesson } from "../lesson/types";

// One 12 V battery feeding two loops. On the left, the coil's loop: the
// Button, the Winding switch and the relay's coil. A meter, Vcoil, reads the
// coil's pins: across the Winding switch and the coil together, so a broken
// winding still shows the full volts, as a real one does. On the right, the
// contacts' loop: the relay's normally open contact, Rc and the load, R. A
// meter, Vc, reads across the contacts and Rc together. ("$" and "v" lines:
// see ohms-law.ts; "s" and "x" lines: see parallel.ts; "p" lines: see
// real-battery.ts.)
//
// "178" line: CircuitJS1's relay, read with its old text format. Flags 22:
// a box drawn round it (2), the coil drawn along its length (4), and a
// 1 MΩ pull-down on each fixed contact (16), so an open contact passes no
// current at all. Then: one pole; a coil of 0.2 H; no coil current now;
// 1 nΩ across closed contacts (so Rc is all the contacts' resistance there
// is); 1 MΩ across open ones (not used with the pull-downs); it pulls in
// above 75 mA (9 V on its coil) and lets go below 30 mA; a coil of 120 Ω;
// 5 ms to swing across; and it starts let go. Its five ends: the common at
// (288, 176), where the arm is hinged; the normally closed contact at
// (416, 160), wired to nothing; the normally open one at (416, 192); and the
// coil's two at (288, 208) and (416, 208).
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
p 192 208 192 320 2 0 0 0
r 416 192 496 192 0 0.004
p 496 96 496 192 2 0 0 0
w 496 192 560 192 0
r 560 192 560 320 0 4
w 560 320 416 320 0
w 416 320 192 320 0
w 192 320 128 320 0
x 212 130 268 133 4 18 Button
x 207 242 273 245 4 18 Winding
x 212 280 252 283 4 18 Vcoil
x 445 226 467 229 4 18 Rc
x 516 150 538 153 4 18 Vc
x 580 234 592 237 4 18 R`;

export const relay: Lesson = {
    id: "relay",
    title: "The relay",
    summary: "How a coil pulls a relay's contacts shut, and how the click, the volts on the coil and the volts across the contacts tell a broken coil from burnt contacts.",
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
        coilMeter: { type: "Probe", nth: 0 },
        rc: { type: "Resistor", nth: 0 },
        meter: { type: "Probe", nth: 1 },
        load: { type: "Resistor", nth: 1 },
    },
    quantities: {
        button: { label: "Button", part: "button", switch: true },
        winding: { label: "Winding", part: "winding", switch: true },
        vcoil: { label: "Across coil", symbol: "Vcoil", unit: "V", part: "coilMeter", measure: "voltage" },
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
            text: "Press the button on the screen and watch the relay's arm. Watch its two meters too: **Vcoil** on the coil, and **Vc** across the contacts.",
            controls: [],
            goal: { button: 1 },
            success: "Click: the arm swings across and shuts the contacts. The coil has {vcoil} on it, Vc has dropped to next to nothing, {vc}, and the load gets {load}.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 1, rc: 0.004 },
            question: "The coil needs only a tenth of an amp, but the load takes 3 A. Where do the load's amps come from?",
            options: ["Through the coil", "From the battery", "The relay makes them"],
            answer: 1,
            explain: "A relay only switches: it supplies nothing. The load's amps come from the battery, round the right-hand loop and through the contacts. None pass through the coil: its current only pulls the arm.",
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
            question: "On the bench, coil off, you put the meter on ohms from the arm to each contact. Which should show continuity?",
            options: ["Normally closed", "Normally open", "Neither, coil off"],
            answer: 0,
            explain: "At rest the arm sits on the normally closed contact, so only that one shows continuity. Feed the coil and the two swap. If the normally open one has continuity with the coil off, it has welded shut.",
        },
        {
            kind: "read",
            title: "Two loops, one magnet",
            set: { button: 1, winding: 1, rc: 0.004 },
            text: "Nothing inside joins the coil to the contacts: only the magnet's pull crosses over. So a small switch can work a heavy load. Cars work their starters and horns through relays, and a remote-control set switches its mains with one.\n\n"
                + "The case gives two ratings: one voltage for the coil, such as 12 V, and a group of amps and volts for the contacts. Fit the same coil voltage, and contacts rated as high or higher.",
            note: "In a television they carry the mains: unplug it before testing on ohms, and leave mains readings to Rita.",
        },
        {
            kind: "read",
            title: "How relays fail",
            set: { button: 1, winding: 1, rc: 0.004 },
            text: "Contacts are the part that wears. Each time they open, a spark burns them, leaving a pit on one and a pip on the other. Burnt contacts have resistance of their own. Lamps and motors, which take far more at switch-on, burn them fastest.\n\n"
                + "A big spark can weld them shut, and the set won't switch off. Dirty or sticking ones make a set come and go as it pleases. And the coil's fine wire can break: then there's no click at all.",
        },
        {
            kind: "explore",
            title: "No click",
            set: { button: 0, winding: 0, rc: 0.004 },
            reset: true,
            text: "The **Winding** switch is open now: it does what a coil's broken wire does. Press the button on the screen, and watch the arm, **Vcoil** and **Vc**.",
            controls: [],
            goal: { button: 1 },
            success: "No click. The coil has {vcoil} on its pins, but no current can cross the break, so the arm never moves. The contacts stay open, with {vc} across them.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 0, rc: 0.004 },
            reset: true,
            question: "The button is pressed and the coil has its full 12 V on it, but there's no click. What has failed?",
            options: ["The button", "Burnt contacts", "The coil's winding"],
            answer: 2,
            explain: "The 12 V on the coil prove the button did its job, and burnt contacts still click. Volts on the coil but no click: the winding has parted. Out of the set, its pins show no continuity.",
        },
        {
            kind: "explore",
            title: "Burnt contacts",
            set: { button: 0, winding: 1, rc: 2 },
            reset: true,
            text: "The winding is whole again, but **Rc** is up at **2 Ω**: burnt contacts. Press the button on the screen. Watch for the click, then watch **Vc** and **I**.",
            controls: [],
            goal: { button: 1 },
            success: "Click, with {vcoil} on the coil, the same as ever. But the closed contacts have {vc} across them where good ones had next to nothing, and the load gets only {load}.",
        },
        {
            kind: "read",
            title: "Click, coil, contacts",
            set: { button: 1, winding: 1, rc: 2 },
            text: "That's the whole method. Listen for the click. No click: read the volts on the coil. None means the fault is in whatever drives it. Full volts mean the coil is broken, or the arm is stuck.\n\n"
                + "A click proves only that the arm moved. So then read the volts across the closed contacts, with the load on. Next to nothing is good. Volts mean they're burnt.",
            note: "Out of the set, on ohms, a good coil reads tens to hundreds of ohms, and a broken one shows no continuity.",
        },
        {
            kind: "choice",
            set: { button: 0, winding: 1, rc: 0.004 },
            reset: true,
            question: "Another set won't come on. Switched on, there's no click, and 0 V on its relay's coil. Where is the fault?",
            options: ["The relay's coil", "Whatever drives it", "Burnt contacts"],
            answer: 1,
            explain: "A broken coil would still show its full volts, and burnt contacts still click. No volts means nothing is telling the relay to pull: look back at the wiring and whatever drives it. A new relay won't help.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 1, rc: 0.004 },
            question: "Out of the set, with the coil fed, your meter on ohms reads 0.6 Ω across the closed contacts. What does that prove?",
            options: ["Nothing either way", "They are good", "They are burnt"],
            answer: 0,
            explain: "A meter on ohms passes only a tiny current, too small to break through the film on the contacts. Good ones can read high on it, and burnt ones can read fine. Only the volts across them under load can tell.",
        },
        {
            kind: "choice",
            set: { button: 1, winding: 1, rc: 20 },
            question: "Giorgos's set clicks but stays dark. Rita finds full volts on the coil, and volts across the closed contacts. What's wrong?",
            options: ["The winding is open", "No drive to the coil", "Burnt contacts"],
            answer: 2,
            explain: "The click says the coil pulls in. Good contacts show next to nothing: volts across them mean they're burnt, and starve the set. A new relay mends it.",
        },
    ],
};
