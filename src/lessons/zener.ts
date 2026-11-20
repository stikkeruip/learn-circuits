import type { Lesson } from "../lesson/types";

// The loaded divider of loaded-divider.ts, with R2 swapped for a Zener diode:
// a 12 V battery, Rs (400 Ω) along the top, the Zener down the middle, and a
// switch and the load, RL (560 Ω), down the right. A meter across the output
// on the far right, as in real-battery.ts. ("$" and "v" lines: see
// ohms-law.ts; "s" and "x" lines: see parallel.ts; "p" line: see
// real-battery.ts.)
//
// "$" line: current-dot speed 60, for the milliamps that flow here.
// "z" line: the Zener, its arrow from (352, 320) up to (352, 192), so its
// cathode is at the top, on the + side: the battery pushes it in reverse.
// Flags 2: the next word names its model, CircuitJS1's "default-zener", which
// holds about 5.6 V (5.60 V at 6 mA, 5.63 V at 16 mA, 5.64 V at 23 mA) and,
// like the plain diode, leaks about 171 nA below that. Forward it drops about
// 0.62 V. So every sum with it in is "about" (see `tolerance`).
// "Break", the switch above the Zener, is a fault, named on the drawing. It
// is closed: opened, it does what a Zener that has failed open does. The
// meter spans both the Break switch and the Zener, so it reads the output
// whatever the Zener is doing.
// With 400 Ω and 560 Ω, 12 V gives 16 mA in Rs, 10 mA in the load and 6 mA
// in the Zener, and without the Zener Rs and the load give exactly 7 V.
const circuit = `$ 1 0.000005 10.2 60 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 352 96 0 400
s 352 96 352 192 0 0 false
z 352 320 352 192 2 default-zener
w 352 96 448 96 0
s 448 96 448 208 0 1 false
r 448 208 448 320 0 560
w 448 96 544 96 0
p 544 96 544 320 2 0 0 0
w 544 320 448 320 0
w 448 320 352 320 0
w 352 320 128 320 0
x 229 130 251 133 4 18 Rs
x 372 122 394 125 4 18 Break
x 468 242 490 245 4 18 RL`;

export const zener: Lesson = {
    id: "zener",
    title: "The Zener diode",
    summary: "A diode fitted backwards on purpose, which holds a steady voltage whatever the supply and the load do, within limits.",
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
        switch: { type: "Switch", nth: 1 },
        meter: { type: "Probe" },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        vout: { label: "Output", symbol: "Vout", unit: "V", part: "meter", measure: "voltage" },
        is: { label: "Through Rs", symbol: "Is", unit: "A", part: "rs", measure: "current" },
        iz: { label: "Through Zener", symbol: "Iz", unit: "A", part: "zener", measure: "current" },
        switch: { label: "Load switch", part: "switch", switch: true },
        breakSwitch: { label: "Break switch", part: "breakSwitch", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "A diode fitted backwards",
            set: { voltage: 0, switch: 0, breakSwitch: 1 },
            text: "The divider you loaded for Mrs. Adeyemi, with a new part where R2 was: a **Zener diode**, a diode built to be used in reverse. Its symbol is a diode whose bar has bent ends.\n\n"
                + "See which way round it is: cathode to the top, the + side. **Rs**, the series resistor (400 Ω), feeds it from the battery, the load **RL** (560 Ω) waits behind its switch, and the meter reads the output.",
            note: "The battery is at 0 V for now. The switch marked Break is for later: leave it closed.",
        },
        {
            kind: "explore",
            title: "Turn the battery up",
            set: { voltage: 0, switch: 0, breakSwitch: 1 },
            text: "The load is off. Guess first: will the output keep up with the battery? Then drag the battery up to **12 V**, a volt at a time, and watch the output.",
            controls: [{ quantity: "voltage", min: 0, max: 15, step: 1 }],
            goal: { voltage: 12 },
            success: "The output followed the battery up to about 5.6 V, then stopped. It reads {vout}, and the Zener passes {iz}: a diode, passing current in reverse.",
        },
        {
            kind: "choice",
            set: { voltage: 12, switch: 0, breakSwitch: 1 },
            question: "The battery gives 12 V, but the output stopped at about 5.6 V. Where is the rest of the battery's voltage?",
            options: ["Across Rs", "Blocked by the Zener", "Left in the battery"],
            answer: 0,
            explain: "The drops round the loop still add up to 12 V. The Zener holds about 5.6 V, so Rs drops the other 6.4 V, and to drop it Rs must pass current: {is}, all of it down through the Zener.",
        },
        {
            kind: "read",
            title: "The Zener voltage",
            set: { voltage: 12, switch: 0, breakSwitch: 1 },
            text: "Push any diode hard enough in reverse and it gives way, and an ordinary one is usually ruined. A Zener is made to give way at one low voltage, its **Zener voltage**, without harm as long as it stays cool: about 5.6 V for this one.\n\n"
                + "Below it, the Zener passes next to nothing. At it, it passes whatever current comes, and its voltage barely moves, like a diode's forward drop: {vout} now, with {iz} through it.",
            note: "Forward, a Zener is an ordinary diode, and drops about 0.6 V.",
        },
        {
            kind: "explore",
            title: "Switch the load on",
            set: { voltage: 12, switch: 0, breakSwitch: 1 },
            text: "On Mrs. Adeyemi's divider, a load pulled the output down. Guess first: will it here? Then press the switch above RL on the screen, and watch the output, Is and Iz.",
            controls: [],
            goal: { switch: 1 },
            success: "The output has barely moved: {vout}. Rs still passes about {is}, but the Zener takes only {iz} now. It gave up what the load took.",
        },
        {
            kind: "choice",
            set: { voltage: 12, switch: 1, breakSwitch: 1 },
            question: "The load came on and took 10 mA. What did the current through Rs do?",
            options: ["Rose by 10 mA", "Hardly changed", "Fell by 10 mA"],
            answer: 1,
            explain: "Rs has 12 V − 5.6 V = 6.4 V across it, load or no load, so it still passes about {is}. The load's 10 mA came out of the Zener's share, which fell to {iz}. The junction still balances.",
        },
        {
            kind: "read",
            title: "A regulator",
            set: { voltage: 12, switch: 1, breakSwitch: 1 },
            text: "A circuit that holds a voltage steady, whatever the supply and the load do, is a **regulator**. The Zener takes whatever current the load leaves, so the output stays put.\n\n"
                + "Rs drops the difference between the battery and the Zener voltage. That sets the current, and keeps it down: without Rs, the Zener would burn.",
            formula: "Is = (V − Vout) ÷ Rs",
            note: "Here: (12 V − 5.6 V) ÷ 400 Ω = 16 mA. The load takes 10 mA of it, and the Zener the other 6 mA.",
        },
        {
            kind: "number",
            set: { voltage: 14, switch: 1, breakSwitch: 1 },
            question: "Say the car gives 14 V with its engine running. Rs is 400 Ω, the 560 Ω load is on, and the Zener holds about 5.6 V. What current flows through Rs?",
            solveFor: "is",
            answer: 0.021,
            tolerance: 0.005,
            explain: "Is = (14 V − 5.6 V) ÷ 400 Ω = 8.4 V ÷ 400 Ω = 21 mA, whatever the load takes",
        },
        {
            kind: "explore",
            title: "Too little to hold",
            set: { voltage: 12, switch: 1, breakSwitch: 1 },
            text: "The load is on. Now the other way: drag the battery down to **6 V**, two volts at a time, and watch the output and Iz.",
            controls: [{ quantity: "voltage", min: 0, max: 14, step: 2 }],
            goal: { voltage: 6 },
            success: "The Zener has let go: Iz is next to nothing, and the output, {vout}, falls with the battery. The test: take the Zener out in your head. If Rs and the load alone would give more than 5.6 V, it holds.",
        },
        {
            kind: "number",
            set: { voltage: 9, switch: 1, breakSwitch: 1 },
            question: "The battery sags to 9 V. Rs is 400 Ω, the 560 Ω load is on, and the Zener is rated about 5.6 V. What does the output read?",
            solveFor: "vout",
            answer: 5.25,
            tolerance: 0.001,
            explain: "Without the Zener, 9 V × 560 Ω ÷ (400 Ω + 560 Ω) = 5.25 V. That is under 5.6 V, so the Zener does nothing: Vout = 5.25 V",
        },
        {
            kind: "read",
            title: "In the drawer and in the set",
            set: { voltage: 12, switch: 0, breakSwitch: 1 },
            text: "Two ratings matter: the Zener voltage, and the power it can stand. The number gives the voltage, with V for the point: a BZX55C5V6 holds 5.6 V, give or take 5 %, and stands 500 mW. A band marks the cathode.\n\n"
                + "Besides plain regulators like this, a Zener often just sets the voltage a bigger regulator copies, or guards a television: it conducts only if a voltage climbs too high, and that shuts the set down.",
            note: "It runs hottest with the load off, taking all of Rs's current: here 5.6 V × {iz}, about 90 mW.",
        },
        {
            kind: "read",
            title: "Good or faulty",
            set: { voltage: 12, switch: 1, breakSwitch: 1 },
            text: "Zeners die of heat, and most fail shorted: the output reads 0 V, and Rs, with the whole supply across it, runs hot. Next commonest is open: the output rides up to what Rs and the load give alone. Some drift low. One fitted the wrong way round reads about 0.6 V.\n\n"
                + "Out of the set, the meter on ohms works from a small battery that can't reach the Zener voltage. A good Zener reads like any diode: one way round, not the other.",
            note: "So the meter finds a short or an open, never the voltage. For that, use this very circuit.",
        },
        {
            kind: "explore",
            title: "Rev the engine",
            set: { voltage: 12, switch: 1, breakSwitch: 0 },
            text: "The Break switch is open: it does what a Zener that has failed open does. The output already reads {vout}. Drag the battery up to **14 V**, as when Mr. Halvorsen revs, and watch the output.",
            controls: [{ quantity: "voltage", min: 0, max: 15, step: 1 }],
            goal: { voltage: 14 },
            success: "The output has followed the battery up to {vout}. With the Zener open, Rs and the load are a plain divider, and its output moves with the supply.",
        },
        {
            kind: "choice",
            set: { voltage: 14, switch: 1, breakSwitch: 0 },
            question: "In Mr. Halvorsen's CB, a line held by a 5V6 Zener reads 7 V with the engine off, and climbs as he revs. What has happened?",
            options: ["Zener shorted", "Zener in backwards", "Zener gone open"],
            answer: 2,
            explain: "A Zener can only hold a line down, never push it up. Above 5.6 V and following the car, this one is doing nothing: it has gone open. Shorted, the line would read 0 V; backwards, about 0.6 V. A new 5V6 mends it.",
        },
    ],
};
