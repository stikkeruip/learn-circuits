import type { Lesson } from "../lesson/types";

// A 12 V battery, a switch and R along the top, and the capacitor, C, down
// the right. Beside C, a second branch across it: a switch and RL. With the
// battery's switch open, RL empties C. With both switches closed, RL stands
// for a leak inside C: R and RL are then a voltage divider, and C stops at
// RL's share of the 12 V. ("v" line: see ohms-law.ts; "s" and "x" lines:
// see parallel.ts.)
//
// "$" line: 1 ms timestep at about 1,000 steps a second, which is real time.
// R × C is 10 kΩ × 100 µF = 1 s, so C is two-thirds full after a second and
// as good as full after five: slow enough to watch the voltage climb and the
// current die away. Current-dot speed 64, a little above the 60 used for
// milliamps, so the 1.2 mA that starts the filling moves the dots at the
// course's usual pace, and they slow as the current dies. Voltage colours
// scaled to 12 V.
// "c" line: the capacitor, flags 0. Then its capacitance, 100 µF (kept under
// 1000 µF, which CircuitJS1 would write as "1 mF": the trade never uses milli
// for farads); the voltage across it now, 0; and the voltage a reset leaves on
// it, 0 (CircuitJS1's default is 1 mV).
const circuit = `$ 1 0.001 6.25 64 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
s 128 96 240 96 0 1 false
r 240 96 352 96 0 10000
c 352 96 352 320 0 0.0001 0 0
w 352 96 448 96 0
s 448 96 448 208 0 1 false
r 448 208 448 320 0 10000
w 448 320 352 320 0
w 352 320 128 320 0
x 285 130 307 133 4 18 R
x 372 186 394 189 4 18 C
x 468 242 490 245 4 18 RL`;

export const capacitor: Lesson = {
    id: "capacitor",
    title: "The capacitor",
    summary: "A part that stores charge: how it fills and empties through a resistor, why a big one is emptied before you touch it, and how to tell a good one from a leaky one.",
    job: {
        title: "The flash that's never ready",
        customer: "Mrs. Nakamura, with a camera flashgun",
        request: "Fresh batteries, and it whines away just as it always did, but the little ready light never comes on. It used to be ready in a few seconds. It's been in a drawer since our last holiday.",
        thanks: "Ready in a few seconds, the way it used to be. It's coming out of that drawer more often.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        switch: { type: "Switch", nth: 0 },
        r: { type: "Resistor", nth: 0 },
        cap: { type: "Capacitor" },
        rlSwitch: { type: "Switch", nth: 1 },
        rl: { type: "Resistor", nth: 1 },
    },
    quantities: {
        r: { label: "Resistor R", symbol: "R", unit: "Ω", part: "r", setting: "Resistance" },
        switch: { label: "Switch", part: "switch", switch: true },
        rl: { label: "Resistor RL", symbol: "RL", unit: "Ω", part: "rl", setting: "Resistance" },
        rlSwitch: { label: "RL switch", part: "rlSwitch", switch: true },
        vc: { label: "Across C", symbol: "Vc", unit: "V", part: "cap", measure: "voltage" },
        current: { label: "Through R", symbol: "I", unit: "A", part: "r", measure: "current" },
    },
    // The number questions ask where C comes to rest, with the leak in. The
    // slowest of them (R 10 kΩ, RL 50 kΩ) closes its gap with a time constant
    // of 0.83 s, and 20 s brings it to rest to the nine places the tests
    // compare.
    settle: 20,
    steps: [
        {
            kind: "read",
            title: "Meet the capacitor",
            set: { r: 10000, switch: 0, rl: 10000, rlSwitch: 0 },
            reset: true,
            text: "The new part is **C**, a **capacitor**: two metal plates face to face, with an insulator between them. The plates never touch, and nothing crosses the insulator. Its symbol shows just that: two equal plates and a gap.\n\n"
                + "C sits in a loop with the 12 V battery, a switch and **R**, 10 kΩ. Leave the branch on the right, a switch and **RL**, open for now. C is empty: {vc} across it.",
            note: "Don't mix it up with the battery: its two plates are one long, one short.",
        },
        {
            kind: "explore",
            title: "Fill it",
            set: { r: 10000, switch: 0, rl: 10000, rlSwitch: 0 },
            reset: true,
            text: "Guess first: with a gap between its plates, will any current flow at all? Then press the switch on the top wire, and watch **Across C** and **Through R**.",
            controls: [],
            goal: { switch: 1 },
            success: "It does, for a while: {current} through R and dying away, as C climbs to {vc}, ever more slowly.",
        },
        {
            kind: "choice",
            set: { r: 10000, switch: 1, rl: 10000, rlSwitch: 0 },
            question: "When you closed the switch, 1.2 mA flowed through R, then less and less as C filled. Why did the current fall?",
            options: ["The battery ran down", "C's voltage opposes it", "C used the current up"],
            answer: 1,
            explain: "Round the loop, C's voltage faces the battery's, so R is left only the difference. Less voltage across R, less current, and C fills more slowly still. The battery gives 12 V throughout.",
        },
        {
            kind: "read",
            title: "Charging",
            set: { r: 10000, switch: 1, rl: 10000, rlSwitch: 0 },
            text: "Filling a capacitor is **charging** it: charge piles onto one plate, and as much leaves the other, so current flows round the loop though none crosses the gap.\n\n"
                + "As C fills, R is left less of the 12 V, so less current flows. Full, C has all 12 V and R none, so the current stops: a capacitor passes no steady current. At every moment:",
            formula: "I = (V − Vc) ÷ R",
            note: "Empty: 12 V ÷ 10 kΩ = 1.2 mA. Then it read µA: **micro** (µ) means a millionth, so 1 mA is 1000 µA.",
        },
        {
            kind: "explore",
            title: "Unplug it, then empty it",
            set: { r: 10000, switch: 1, rl: 10000, rlSwitch: 0 },
            text: "Opening the switch on the top wire cuts C off from the battery, as unplugging cuts off a set. Open it, and watch C. Then press the switch beside **RL** to put RL across C.",
            controls: [],
            goal: { switch: 0, rlSwitch: 1 },
            success: "Cut off, C kept its charge. With RL across it, the charge has a way round from plate to plate: {vc}, and falling.",
        },
        {
            kind: "read",
            title: "Safe before you touch",
            set: { r: 10000, switch: 0, rl: 10000, rlSwitch: 1 },
            text: "Emptying a capacitor is **discharging** it. A big one can hold its charge for hours after the set is unplugged, and at a high voltage that charge can kill. Many sets have a resistor across it to empty it, as RL did, but that resistor can fail open.\n\n"
                + "So before you touch: meter across it, empty it through a resistor on insulated leads, and meter it again.",
            note: "Never a screwdriver: a dead short pits the metal. The second reading matters: a big one can win back some charge.",
        },
        {
            kind: "read",
            title: "Farads and electrolytics",
            set: { r: 10000, switch: 1, rl: 10000, rlSwitch: 0 },
            text: "How much charge a capacitor holds for each volt is its **capacitance**, in **farads** (F). Most hold far less than a farad, so they are marked in µF: C is 100 µF. Each has a working voltage too: the most it may have across it.\n\n"
                + "An **electrolytic** gets its big value from an extremely thin film grown on aluminium foil. It works only one way round: a stripe of minus signs marks the negative lead, and fitted backwards it can burst.",
            note: "Some are marked MFD: that means µF. Fit a replacement rated for the same voltage or more, never less.",
        },
        {
            kind: "read",
            title: "What it is for",
            set: { r: 10000, switch: 1, rl: 10000, rlSwitch: 0 },
            reset: true,
            text: "Across a set's supply, a big electrolytic keeps the voltage steady: it fills at each pulse from the mains and feeds the set between them. Between one stage of an amplifier and the next, one passes the changing signal and blocks the steady voltage.\n\n"
                + "A flashgun fills a big one slowly, then empties it in an instant. And with a resistor, a capacitor measures out time: how long it takes to fill is set by R and C together:",
            formula: "T = R × C",
            note: "Here: 10 kΩ × 100 µF = 1 s. In 1 s, C gets about two-thirds full. In five, it is as good as full.",
        },
        {
            kind: "read",
            title: "A leaky capacitor",
            set: { r: 10000, switch: 1, rl: 20000, rlSwitch: 1 },
            reset: true,
            text: "Now let RL stand for a fault inside C. A **leaky** capacitor's insulator lets a little current through, as if a resistor had grown across a good one. Watch: C stops at {vc}, and {current} keeps flowing.\n\n"
                + "R and the leak are a voltage divider, so C gets only RL's share of the 12 V:",
            formula: "Vc = V × RL ÷ (R + RL)",
            note: "Here: 12 V × 20 kΩ ÷ 30 kΩ = 8 V. A good one reaches all 12 V, and a shorted one has 0 V across it.",
        },
        {
            kind: "number",
            set: { r: 10000, switch: 1, rl: 50000, rlSwitch: 1 },
            reset: true,
            question: "On 12 V, R is 10 kΩ, and a leak of 50 kΩ has grown across C. What voltage does C stop at?",
            solveFor: "vc",
            answer: 10,
            explain: "Vc = 12 V × 50 kΩ ÷ 60 kΩ = 10 V",
        },
        {
            kind: "number",
            set: { r: 20000, switch: 1, rl: 10000, rlSwitch: 1 },
            reset: true,
            question: "Another capacitor charges through 20 kΩ on 12 V, but stops at 4 V. How big is its leak?",
            solveFor: "rl",
            answer: 10000,
            explain: "R has 12 V − 4 V = 8 V, twice the leak's 4 V, so the leak is half of R: 20 kΩ ÷ 2 = 10 kΩ",
        },
        {
            kind: "read",
            title: "Good or faulty",
            set: { r: 10000, switch: 1, rl: 20000, rlSwitch: 0 },
            reset: true,
            text: "Every electrolytic dries out with age and holds less, and one left unused for years can go leaky. Old paper ones go leaky too. When one fails outright, a short is likelier than an open.\n\n"
                + "Out of the set, the meter on ohms charges it, as the battery and R charge C. A good one kicks the needle towards 0 Ω, then lets it fall back as it fills. A short stays at 0 Ω, a leak stops at a low reading, and an open one gives no kick.",
            note: "Nor does a good one under about 0.01 µF. Test an electrolytic both ways round, and trust the higher reading.",
        },
        {
            kind: "choice",
            set: { r: 10000, switch: 1, rl: 20000, rlSwitch: 0 },
            question: "With the set switched on, the meter across a capacitor reads just what the service sheet says. Can you be sure it is good?",
            options: ["Yes: it reads right", "No: it may be leaky", "No: it may be open"],
            answer: 2,
            explain: "A leak would read low, and a short 0 V. An open one passes no steady current, like a good one, so it reads the same. On ohms it gives no kick. In doubt, swap in a known good one and see if the fault goes.",
        },
        {
            kind: "choice",
            set: { r: 10000, switch: 1, rl: 20000, rlSwitch: 1 },
            reset: true,
            question: "Her flashgun's capacitor fills only part way, as C does on the screen. On ohms it kicks, then stops at a low reading. What is wrong?",
            options: ["It has gone leaky", "It has shorted", "It's too big, so slow"],
            answer: 0,
            explain: "A short would read 0 V, and a big one fills slowly but gets there. A leak shares the voltage, as RL does with R, so it never fills. Years in a drawer can do that.",
        },
    ],
};
