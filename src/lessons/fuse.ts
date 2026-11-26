import type { Lesson } from "../lesson/types";

// A 12 V battery, a fuse along the top and the car radio, R, down the right.
// Under the fuse, joined to both its ends, a switch named Foil: closed, it
// does what Mr. Brennan's silver paper did, and carries the current round the
// fuse. ("v" line: see ohms-law.ts; "s" line: see parallel.ts, open, position
// 1; "x" lines: see parallel.ts.)
//
// "$" line: 1 ms timestep at about 2,000 steps a second, so the circuit runs
// at twice real time: 4 A through the fuse takes about 3.9 simulated seconds
// to melt it, which is two real seconds to watch it glow and go, and a short
// takes it in a blink. Current-dot speed 38 (amps), colours scaled to 12 V.
// "404" line: CircuitJS1's fuse, drawn as a wavy line. Then its resistance,
// 1 mΩ: small enough that every current reads round (12 V ÷ 6.001 Ω reads
// 2 A), while a good fuse reads a few millivolts across it, which the course
// can name. Then its I²t, 27: the fuse heats with the square of its current
// and cools by 9 a second, so it blows once the current stays above
// √(27 ÷ 3) = 3 A, its rating. Then the heat it has so far (0), and not
// blown. A blown fuse stays blown, at 1 GΩ, until a step has `reset: true`.
// With Foil closed, the fuse's two ends are one point: it carries nothing,
// so it neither heats nor blows, and reads 0 V.
// The fuse's label: flag 4 means its text is escaped, and "\s" is a space.
const circuit = `$ 1 0.001 12.5 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 176 96 0
404 176 96 304 96 0 0.001 27 0 false
w 304 96 352 96 0
w 176 96 176 192 0
s 176 192 304 192 0 1 false
w 304 192 304 96 0
r 352 96 352 320 0 6
w 352 320 128 320 0
x 226 130 254 133 4 18 3\\sA
x 222 226 258 229 4 18 Foil
x 372 186 394 189 4 18 R`;

export const fuse: Lesson = {
    id: "fuse",
    title: "The fuse",
    summary: "A thin wire put in to melt: how a fuse guards the wiring, which one to fit, and how to tell a good one from a blown one by eye and on the meter.",
    job: {
        title: "The radio that ate fuses",
        customer: "Mr. Brennan, with a car radio",
        request: "The radio kept eating fuses, so I wrapped the last one in silver paper off my cigarettes. Played for a week. Then a smell of hot plastic behind the dashboard, and now nothing at all.",
        thanks: "New wire behind the dash, the short in the set mended, and a proper 3 A fuse. The silver paper stays with the cigarettes.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        fuse: { type: "Fuse" },
        foil: { type: "Switch" },
        load: { type: "Resistor" },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        load: { label: "Radio", symbol: "R", unit: "Ω", part: "load", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "load", measure: "current" },
        fusev: { label: "Across fuse", symbol: "Vf", unit: "V", part: "fuse", measure: "voltage" },
        foil: { label: "Foil", part: "foil", switch: true },
    },
    // The slowest blow in the job, 4 A, takes 3.9 s: past that, a fuse over
    // 3 A has gone and one at 3 A or under never will.
    settle: 5,
    steps: [
        {
            kind: "read",
            title: "The weak link",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            text: "Mr. Brennan's car radio is **R**, on the car's 12 V battery. The wavy line along the top is its fuse: a short, thin wire inside a glass tube, in line with the radio. All the radio's current goes through it: {current}.\n\n"
                + "The fourth readout is a meter across the fuse. It reads {fusev}, a couple of thousandths of a volt: next to nothing, as across any short piece of wire.",
            note: "Some drawings show a fuse as a box with a line through it. Same part. Leave the switch under it alone for now.",
        },
        {
            kind: "explore",
            title: "More than it's made for",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            text: "This fuse is made for **3 A**, and the radio takes 2 A. Guess first: what will the fuse do with more? Then drag **R** down to **3 Ω**, and keep your eye on the fuse.",
            controls: [{ quantity: "load", min: 1, max: 10, step: 1 }],
            goal: { load: 3 },
            success: "That's 4 A through a fuse made for 3 A. Watch the wire warm and glow: in a second or two it melts and is gone. Then look at the readouts.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 3, foil: 0 },
            question: "At 2 A the fuse stayed cool. At 4 A it glowed and melted within seconds. Why such a difference?",
            options: ["It had worn out", "Heat climbs steeply", "The voltage did it"],
            answer: 1,
            explain: "Heat in a wire climbs far faster than the current: twice the current, four times the heat. So a fuse sits cool in use and goes fast in a fault. The fuse was new, and the battery stayed at 12 V.",
        },
        {
            kind: "read",
            title: "Blown",
            set: { voltage: 12, load: 3, foil: 0 },
            text: "A fuse whose wire has melted open is **blown**. The gap opens the loop, so the current stops, and it stays stopped: a fuse works once. The meter across it reads {fusev} now, the full supply, as across any open part.\n\n"
                + "Every wire warms as current passes. The fuse is the thinnest wire in the loop, so it melts first, before the wiring gets hot enough to burn.",
            note: "Two readings to carry: next to nothing across a good fuse, the full supply across a blown one.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            question: "Mr. Brennan's radio has a 3 A fuse in its lead. What is the fuse there to guard against?",
            options: ["A shock to him", "Too high a voltage", "Fire in the wiring"],
            answer: 2,
            explain: "Too much current heats wire, and hot wire starts fires: the fuse melts first and saves the wiring and the set. It does nothing about voltage, and nothing for him: a current far too small to blow any fuse can kill.",
        },
        {
            kind: "read",
            title: "The rating",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            text: "A car radio has its own fuse, in a holder in its supply lead. A television has one where the mains comes in, and a British mains plug one more. Each guards the wire beyond it.\n\n"
                + "The number marked on a fuse is its **rating**: the current it carries for good. It takes more to blow it, and the further over, the sooner it goes. Fit the rating the set calls for, never bigger.",
            note: "A **slow-blow** fuse has more metal to warm: it rides out a television's rush of current at switch-on, but goes if too much current lasts.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            question: "The board by a television's fuse says 2 A slow-blow. The holder has a 5 A in it. What goes back in?",
            options: ["A 2 A slow-blow", "The 5 A, as it was", "A 2 A, any kind"],
            answer: 0,
            explain: "Fit what the set calls for, not what you took out. A 5 A would let a fault burn before it went. An ordinary 2 A could go at switch-on with nothing wrong.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { voltage: 12, load: 1, foil: 0 },
            reset: true,
            text: "A fuse dies one way only: it goes open. If something beyond it drew too much, a short or a failed part, a new fuse goes too. If it died of age, or of a surge, a new one holds. So one new fuse is a fair test. If that one goes, find the fault.\n\n"
                + "By eye: a gap in the wire, or wire melted onto the glass. One blown to pieces, its wire gone to vapour, met a hard short. But a fine wire can hide its break, so trust the meter.",
            note: "On the screen, a set gone short: the new fuse went the moment it was in.",
        },
        {
            kind: "choice",
            set: { voltage: 24, load: 2, foil: 0 },
            reset: true,
            question: "A lorry radio on 24 V is dead. Switched on, it has 24 V across its fuse. What does that tell you?",
            options: ["The fuse is good", "The radio is open", "The fuse has blown"],
            answer: 2,
            explain: "A good fuse has next to nothing across it. Blown, no current flows, the radio drops nothing, and the gap has the whole supply. An open radio would leave nothing across the fuse.",
        },
        {
            kind: "read",
            title: "On the meter",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            text: "In the set, read across the fuse with the set switched on. Switched off, there is nothing across a blown fuse either, so 0 V then proves nothing.\n\n"
                + "Out of the set, the meter on ohms sends a little current through the fuse. A good one shows **continuity**, an unbroken path: the needle swings right over to 0 Ω. Across a blown one, the needle doesn't stir.",
            note: "Take the fuse out of its holder first. Left in, the meter can find a way round through the set.",
        },
        {
            kind: "explore",
            title: "The silver paper",
            set: { voltage: 12, load: 1, foil: 0 },
            reset: true,
            text: "His fuses kept going, so Mr. Brennan wrapped one in silver paper. The switch marked **Foil** joins the fuse's two ends, as his paper did. Here R is at 1 Ω and the fuse has gone. Press the switch on the screen, and watch the readouts.",
            controls: [],
            goal: { foil: 1 },
            success: "The current is back, at {current}, far more than the fuse was made for. The meter across the fuse reads {fusev}, as across a good one. Nothing in the loop can give way now but the wiring: never bridge a fuse.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 1, foil: 1 },
            question: "Foil, a 10 A fuse and the right 3 A fuse: in a playing set, each reads next to nothing across it. How do you tell which is in?",
            options: ["The meter on ohms", "Look at the fuse", "The current it takes"],
            answer: 1,
            explain: "Each is an unbroken path, so each reads next to nothing, in the set and on ohms, and the set takes the same current through all three. Only your eyes and the marking tell them apart.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 6, foil: 0 },
            reset: true,
            question: "You take a fuse out of a dead set and test it on ohms. The needle swings right over to 0 Ω. What do you do with it?",
            options: ["Put it back: it's good", "Bin it: it's shorted", "Fit a bigger one"],
            answer: 0,
            explain: "0 Ω is continuity: an unbroken wire, which is all a good fuse is. A fuse can't go short. It dies one way only, open, and then the needle doesn't stir. The fault is somewhere else.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 1, foil: 0 },
            reset: true,
            question: "A new 3 A fuse goes the instant he switches on. On ohms, his radio reads next to nothing. What's eating his fuses?",
            options: ["A batch of weak fuses", "A short in the radio", "Too many volts"],
            answer: 1,
            explain: "A set that reads like bare wire has a short in it. Each fuse was the messenger. In foil, the last couldn't open the loop, so the wire behind the dashboard burnt.",
        },
    ],
};
