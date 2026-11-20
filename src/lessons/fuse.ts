import type { Lesson } from "../lesson/types";

// A 12 V battery, a fuse along the top and the car radio, R, down the right.
// ("v" line: see ohms-law.ts; "x" lines: see parallel.ts.)
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
// The fuse's label: flag 4 means its text is escaped, and "\s" is a space.
const circuit = `$ 1 0.001 12.5 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
404 128 96 352 96 0 0.001 27 0 false
r 352 96 352 320 0 6
w 352 320 128 320 0
x 226 130 254 133 4 18 3\\sA
x 372 186 394 189 4 18 R`;

export const fuse: Lesson = {
    id: "fuse",
    title: "The fuse",
    summary: "A thin wire put in to melt: how a fuse guards the wiring, how to choose one, and how to tell a good one from a blown one.",
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
        load: { type: "Resistor" },
    },
    quantities: {
        voltage: { label: "Battery", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        load: { label: "Radio", symbol: "R", unit: "Ω", part: "load", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "load", measure: "current" },
        fusev: { label: "Across fuse", symbol: "Vf", unit: "V", part: "fuse", measure: "voltage" },
    },
    // The slowest blow in the job, 4 A, takes 3.9 s: past that, a fuse over
    // 3 A has gone and one at 3 A or under never will.
    settle: 5,
    steps: [
        {
            kind: "read",
            title: "The weak link",
            set: { voltage: 12, load: 6 },
            reset: true,
            text: "Mr. Brennan's car radio is **R**, on the car's 12 V battery. The wavy line along the top is its fuse: a short, thin wire inside a glass tube, in line with the radio. All the radio's current goes through it: {current}.\n\n"
                + "The last readout is a meter across the fuse. It reads {fusev}, a couple of thousandths of a volt: next to nothing, as across any short piece of wire.",
            note: "Some drawings show a fuse as a box with a line through it. Same part.",
        },
        {
            kind: "explore",
            title: "More than it's made for",
            set: { voltage: 12, load: 6 },
            reset: true,
            text: "This fuse is made for **3 A**, and the radio takes 2 A. Guess first: what will the fuse do with more? Then drag **R** down to **3 Ω**, and keep your eye on the fuse.",
            controls: [{ quantity: "load", min: 1, max: 10, step: 1 }],
            goal: { load: 3 },
            success: "That's 4 A through a fuse made for 3 A. Watch the wire warm and glow: in a second or two it melts and is gone. Then look at the readouts.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 3 },
            question: "At 2 A the fuse stayed cool. At 4 A it melted. With twice the current, how much more heat does the fuse wire make each second?",
            options: ["Four times as much", "Twice as much", "The same: still 12 V"],
            answer: 0,
            explain: "The wire's resistance stays put, so twice the current means twice the voltage across it. Power is V × I: four times the heat. So a fuse sits cool in normal use and goes fast in a fault.",
        },
        {
            kind: "read",
            title: "Blown",
            set: { voltage: 12, load: 3 },
            text: "A fuse whose wire has melted open is **blown**. The gap opens the loop, so the current stops, and it stays stopped: a fuse works once. The meter across it reads {fusev} now, the full supply, as across any open part.\n\n"
                + "Every wire warms as current passes. The fuse is the thinnest wire in the loop, so it melts first, before the wiring gets hot enough to burn.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 6 },
            reset: true,
            question: "Mr. Brennan's radio has a 3 A fuse in its lead. What is the fuse there to guard against?",
            options: ["A shock to him", "Too high a voltage", "Fire in the wiring"],
            answer: 2,
            explain: "Too much current heats wire, and hot wire starts fires: the fuse melts first and saves the wiring and the set. It does nothing about voltage, and nothing for him: a current far too small to blow any fuse can kill.",
        },
        {
            kind: "read",
            title: "The rating",
            set: { voltage: 12, load: 6 },
            reset: true,
            text: "The number marked on a fuse is its **rating**: the current it will carry for good. It takes more than that to blow it, and the further over, the sooner it goes.\n\n"
                + "Choose one a little above the set's normal current, so that the set takes no more than three-quarters of the rating: his radio takes 2 A of its fuse's 3 A. Then everyday use won't blow it, and a fault will.",
            note: "A **slow-blow** fuse has more metal to warm: it rides out a television's rush of current at switch-on, but goes if too much current lasts.",
        },
        {
            kind: "number",
            set: { voltage: 12, load: 4 },
            reset: true,
            question: "His radio runs on 12 V, through a fuse rated 3 A. Below what resistance would the radio take more than the fuse's rating?",
            solveFor: "load",
            answer: 4,
            explain: "R = V ÷ I = 12 V ÷ 3 A = 4 Ω",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 6 },
            reset: true,
            question: "A car cassette player takes 1.5 A. The drawer has fuses rated 1.5 A, 2 A and 5 A. Which one belongs in its lead?",
            options: ["1.5 A", "2 A", "5 A"],
            answer: 1,
            explain: "2 A: the player takes three-quarters of it, and no more. A 1.5 A fuse would run at its limit, and a fuse run hot goes early. A 5 A one would let a fault burn the wiring before it went.",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { voltage: 12, load: 6 },
            reset: true,
            text: "A car radio has a fuse of its own, in a holder in its supply lead. A car's own fuses are glass tubes or, in many European cars, ceramic ones coded by colour: yellow 5 A, white 8 A, red 16 A.\n\n"
                + "A television has one where the mains comes in, and a British mains plug has one more. Each fuse guards the wire beyond it, so the one nearest a fault should be the one that goes.",
            note: "Careful with old Lucas fuses in British cars: they are marked with the current that blows them, twice their rating.",
        },
        {
            kind: "number",
            set: { voltage: 24, load: 2 },
            reset: true,
            question: "A lorry's radio runs on 24 V, and its fuse has blown. What does a meter across the fuse read?",
            solveFor: "fusev",
            answer: 24,
            // Blown, the simulator's fuse is 1 GΩ, not a true gap: it reads 23.99999995 V.
            tolerance: 0.001,
            explain: "No current, so the radio drops 0 V, and the gap has the rest: 24 V − 0 V = 24 V",
        },
        {
            kind: "read",
            title: "Good or blown",
            set: { voltage: 12, load: 6 },
            reset: true,
            text: "By eye, a blown fuse may show a gap in its wire, or the wire melted onto the glass. But a fine wire can hide its break, so trust the meter.\n\n"
                + "In the set, a meter across a good fuse reads next to nothing, and across a blown one the full supply. Out of the set, a meter on ohms sends a little current through it. A good fuse shows **continuity**, an unbroken path: about 0 Ω. A blown one gives no reading at all.",
            note: "Take the fuse out of its holder first. Left in, the meter can find a way round through the set.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 6 },
            reset: true,
            question: "You take a fuse out of a set and test it on ohms. The meter reads 0 Ω. What do you do with it?",
            options: ["Put it back: it's good", "Bin it: it's shorted", "Fit a bigger one"],
            answer: 0,
            explain: "0 Ω is continuity: an unbroken wire, which is all a good fuse is. A fuse can't fail short. It fails one way only: open, and then the meter shows no reading at all.",
        },
        {
            kind: "read",
            title: "Two rules of the trade",
            set: { voltage: 12, load: 1 },
            reset: true,
            text: "One: a fuse can die of old age, so one new fuse is a fair test. If that one blows too, the fault is still there: find it before you fit another.\n\n"
                + "Two: never fit a bigger fuse, and never bridge one with wire or foil. Then the fuse can't be the weak link, and the wiring melts in its place.",
            note: "On the screen, a set gone short, at 1 Ω: the new fuse went the moment it was in.",
        },
        {
            kind: "choice",
            set: { voltage: 12, load: 1 },
            reset: true,
            question: "A new 3 A fuse in Mr. Brennan's radio lead goes the moment he switches on. On ohms, the radio reads 1 Ω. What has been blowing his fuses?",
            options: ["A batch of weak fuses", "Too many volts", "A short in the radio"],
            answer: 2,
            explain: "12 V ÷ 1 Ω = 12 A, four times the rating: a short in the radio. Each fuse was the messenger. In foil, the last couldn't melt, so the wire behind the dashboard did.",
        },
    ],
};
