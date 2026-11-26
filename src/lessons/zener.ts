import type { Lesson } from "../lesson/types";

// The loaded divider of loaded-divider.ts, with R2 swapped for a Zener diode:
// a 12 V battery, Rs (400 Ω) along the top, the Zener down the middle, and a
// switch and the load, RL (560 Ω), further right. A meter across the output
// on the far right, as in real-battery.ts. ("$" and "v" lines: see
// ohms-law.ts; "s" and "x" lines: see parallel.ts; "p" line: see
// real-battery.ts.)
//
// "$" line: current-dot speed 60, for the milliamps that flow here.
// "z" line: the Zener, its arrow from (352, 320) up to (352, 192), so its
// cathode is at the top, on the + side: the battery pushes it in reverse.
// Flags 2: the next word names its model, CircuitJS1's "default-zener", which
// holds about 5.6 V (5.60 V at 6 mA, 5.63 V at 16 mA) and, like the plain
// diode, leaks about 171 nA below that. Forward it drops about 0.62 V.
// The two switches beside it are faults, named on the drawing, as in
// diode.ts. "Break" is in line with the Zener, closed: opened, it does what a
// Zener that has failed open does. "Short" is across the Zener, open: closed,
// it does what a shorted Zener does. The meter spans both, so it reads the
// output whatever the Zener is doing.
// With 400 Ω and 560 Ω, 12 V gives about 16 mA in Rs, load or no load, and
// 30 mA with the Zener shorted. With the Zener open, Rs and the load give
// exactly 7 V on 12 V, and on 6 V the Zener lets go and they give 3.5 V.
const circuit = `$ 1 0.000005 10.2 60 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 352 96 0 400
s 352 96 352 192 0 0 false
z 352 320 352 192 2 default-zener
w 352 192 448 192 0
s 448 192 448 320 0 1 false
w 352 96 544 96 0
s 544 96 544 208 0 1 false
r 544 208 544 320 0 560
w 544 96 640 96 0
p 640 96 640 320 2 0 0 0
w 640 320 544 320 0
w 544 320 448 320 0
w 448 320 352 320 0
w 352 320 128 320 0
x 229 130 251 133 4 18 Rs
x 372 122 394 125 4 18 Break
x 468 234 490 237 4 18 Short
x 564 242 586 245 4 18 RL`;

export const zener: Lesson = {
    id: "zener",
    title: "The Zener diode",
    summary: "How a Zener diode, fitted backwards on purpose, holds a line steady, and how the line's reading tells you whether it is good, open, shorted or in backwards.",
    job: {
        title: "Worse with every rev",
        customer: "Mr. Halvorsen, with a CB radio",
        request: "Parked with the engine off, my CB is perfect. Start her up and it plays up, and the harder I rev, the worse it gets. The garage says there's nothing wrong with the car.",
        thanks: "Rev as hard as I like now, and it doesn't turn a hair.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        rs: { type: "Resistor", nth: 0 },
        breakSwitch: { type: "Switch", nth: 0 },
        zener: { type: "Zener" },
        shortSwitch: { type: "Switch", nth: 1 },
        switch: { type: "Switch", nth: 2 },
        meter: { type: "Probe" },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        vout: { label: "Output", symbol: "Vout", unit: "V", part: "meter", measure: "voltage" },
        is: { label: "Through Rs", symbol: "Is", unit: "A", part: "rs", measure: "current" },
        switch: { label: "Load switch", part: "switch", switch: true },
        breakSwitch: { label: "Break switch", part: "breakSwitch", switch: true },
        shortSwitch: { label: "Short switch", part: "shortSwitch", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "A diode fitted backwards",
            set: { voltage: 0, switch: 0, breakSwitch: 1, shortSwitch: 0 },
            text: "Mrs. Adeyemi's loaded divider again, with a new part where R2 was: a **Zener diode**. Inside is a silicon chip like a diode's, made to be used in reverse. Its symbol is a diode whose bar has bent ends.\n\n"
                + "See which way round it is: cathode to the top, the + side. Rs (400 Ω) feeds it from the battery, the load RL (560 Ω) waits behind its switch, and the meter reads the output.",
            note: "The battery is at 0 V for now. Break and Short are faults for later: leave them as they are.",
        },
        {
            kind: "explore",
            title: "Turn the battery up",
            set: { voltage: 0, switch: 0, breakSwitch: 1, shortSwitch: 0 },
            text: "The load is off. Guess first: will the output keep up with the battery? Then drag the battery up to **12 V**, a volt at a time, and watch the output.",
            controls: [{ quantity: "voltage", min: 0, max: 15, step: 1 }],
            goal: { voltage: 12 },
            success: "The output followed the battery up to about 5.6 V, then stopped: {vout}. Rs passes {is}, and with the load off all of it goes down through the Zener: a diode, passing current in reverse.",
        },
        {
            kind: "choice",
            set: { voltage: 12, switch: 0, breakSwitch: 1, shortSwitch: 0 },
            question: "The battery gives 12 V, but the output stopped at about 5.6 V. Where is the rest of the battery's voltage?",
            options: ["Blocked by the Zener", "Left in the battery", "Across Rs"],
            answer: 2,
            explain: "The voltages round the loop still add up to the battery's. The Zener holds its 5.6 V and Rs takes the rest. To drop it, Rs must pass current, {is}, and all of it flows on down through the Zener.",
        },
        {
            kind: "read",
            title: "The Zener voltage",
            set: { voltage: 12, switch: 0, breakSwitch: 1, shortSwitch: 0 },
            text: "Push any diode hard enough in reverse and it gives way, and an ordinary one is usually ruined. A Zener is made to give way at one low voltage, its **Zener voltage**, unharmed as long as it stays cool: about 5.6 V for this one.\n\n"
                + "Below it, the Zener does nothing, and the output follows the battery. At it, the Zener passes whatever current comes and holds the output steady: {vout}. Rs takes the rest of the supply, and keeps the current down: without Rs, the Zener would burn.",
            note: "It can hold a line down, never push it up. Forward, a Zener is an ordinary diode, and keeps about 0.6 V.",
        },
        {
            kind: "explore",
            title: "Switch the load on",
            set: { voltage: 12, switch: 0, breakSwitch: 1, shortSwitch: 0 },
            text: "On Mrs. Adeyemi's divider, a load pulled the output down. Guess first: will it here? Then press the switch above RL on the screen, and watch the output and the current through Rs.",
            controls: [],
            goal: { switch: 1 },
            success: "The output has barely moved: {vout}. Rs still passes about {is}. The load's share came out of the Zener's: see how its dots have slowed.",
        },
        {
            kind: "choice",
            set: { voltage: 12, switch: 1, breakSwitch: 1, shortSwitch: 0 },
            question: "The load came on and took about 10 mA. What did the current through Rs do?",
            options: ["Hardly changed", "Rose by 10 mA", "Fell by 10 mA"],
            answer: 0,
            explain: "Rs has the same voltage across it, load or no load, so it passes the same {is}. The load's share came out of the Zener's: the Zener takes whatever the load leaves, and the output stays put.",
        },
        {
            kind: "read",
            title: "In the drawer and in the set",
            set: { voltage: 12, switch: 1, breakSwitch: 1, shortSwitch: 0 },
            text: "Holding a line steady, whatever the supply and the load do, makes this a **regulator**. In a set a Zener often just sets the voltage a bigger regulator copies, or stands guard in a television: it conducts only if a voltage climbs too high, and that shuts the set down.\n\n"
                + "Its number gives its voltage, with V for the point: a BZX55C5V6 holds 5.6 V, give or take 5 %, and stands 500 mW. A band marks the cathode, which goes to the + side.",
            note: "Replace one with the same voltage, and the same power or more.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { voltage: 12, switch: 1, breakSwitch: 1, shortSwitch: 0 },
            text: "Zeners die of heat: too much current, when the supply climbs, the load goes, or Rs shorts. Most fail shorted: the output reads 0 V, and Rs, with the whole supply across it, runs hot and may scorch. Next comes open, and the output rides up. Some drift low, or turn noisy, putting a hiss on the line.\n\n"
                + "On ohms, out of the set, a Zener reads like any diode: one way round, not the other. The meter's small battery can't reach 5.6 V, so it finds a short or an open, never the voltage.",
            note: "After a shorted Zener, check Rs: it has probably cooked too.",
        },
        {
            kind: "explore",
            title: "A shorted Zener",
            set: { voltage: 12, switch: 1, breakSwitch: 1, shortSwitch: 0 },
            text: "Closed, the Short switch joins the Zener's two ends, as a shorted Zener does. Rs passes about 16 mA now. Press the Short switch on the screen, and watch the output and the current through Rs.",
            controls: [],
            goal: { shortSwitch: 1 },
            success: "The output reads {vout}. Rs has the whole supply across it and passes {is}, nearly twice as much: it runs hot. 0 V on the line and a hot Rs: shorted.",
        },
        {
            kind: "choice",
            set: { voltage: 12, switch: 1, breakSwitch: 1, shortSwitch: 1 },
            question: "Lifted out and tried on ohms, this shorted Zener gives a reading both ways round. What would a good 5V6 give?",
            options: ["A reading both ways", "A reading one way", "No reading either way"],
            answer: 1,
            explain: "Forward, a Zener is an ordinary diode, so the meter reads. Backwards, its small battery can't reach 5.6 V, so nothing. That finds a short or an open, never the voltage: for that, try it in a circuit like this one.",
        },
        {
            kind: "choice",
            set: { voltage: 6, switch: 1, breakSwitch: 1, shortSwitch: 0 },
            question: "The battery has sagged to 6 V, and a line that a 5V6 Zener should hold reads 3.5 V. What is wrong?",
            options: ["The supply is low", "Zener drifted low", "Zener shorted"],
            answer: 0,
            explain: "A Zener needs a supply well above its own voltage: Rs must pass enough for the load, with some to spare. At 6 V it has let go, and the output just follows the battery. Put the supply right first: a Zener gone low reads low on a good supply too.",
        },
        {
            kind: "choice",
            set: { voltage: 12, switch: 1, breakSwitch: 1, shortSwitch: 0 },
            question: "You fit a new 5V6. Now its line reads about 0.6 V instead of 5.6 V, and Rs runs hot. What has gone wrong?",
            options: ["New one is shorted", "Fitted backwards", "Wrong value fitted"],
            answer: 1,
            explain: "Forward, a Zener is an ordinary diode and keeps about 0.6 V, so Rs runs nearly as hot as with a short. Shorted, it would read 0 V. Turn it round: band to the + side.",
        },
        {
            kind: "explore",
            title: "Rev the engine",
            set: { voltage: 12, switch: 1, breakSwitch: 0, shortSwitch: 0 },
            text: "The Break switch is open: it does what a Zener that has failed open does. The output reads {vout}, above the 5.6 V it should hold. Drag the battery up to **14 V**, as when Mr. Halvorsen revs, and watch the output.",
            controls: [{ quantity: "voltage", min: 0, max: 15, step: 1 }],
            goal: { voltage: 14 },
            success: "The output has followed the battery up to {vout}. With the Zener open, nothing holds the line down: Rs and the load are a plain divider again, and its output moves with the supply.",
        },
        {
            kind: "choice",
            set: { voltage: 14, switch: 1, breakSwitch: 0, shortSwitch: 0 },
            question: "In Mr. Halvorsen's CB, a line held by a 5V6 Zener reads 7 V with the engine off, and climbs as he revs. What has happened?",
            options: ["Zener shorted", "Zener in backwards", "Zener gone open"],
            answer: 2,
            explain: "A Zener can only hold a line down, never push it up. Above 5.6 V and following the car, this one is doing nothing: it has gone open. Shorted, the line would read 0 V; backwards, about 0.6 V. A new 5V6 mends it.",
        },
    ],
};
