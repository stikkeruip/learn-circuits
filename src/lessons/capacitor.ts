import type { Lesson } from "../lesson/types";

// A 12 V battery, a switch and R along the top, and the capacitor, C, down
// the right. Beside C, two more branches across it. The first is a switch and
// RL: with the battery's switch open, RL empties C; with both switches
// closed, RL stands for a leak inside C, and C stops at 8 V (R and RL share
// the 12 V as a divider does, a third and two-thirds). The second is a switch
// named Short: closed, it does what a shorted capacitor does, so C has 0 V
// across it and R carries 1.2 mA for good. ("v" line: see ohms-law.ts; "s"
// and "x" lines: see parallel.ts and thermistor.ts.)
//
// "$" line: 1 ms timestep at about 1,000 steps a second, which is real time.
// R × C is 10 kΩ × 100 µF = 1 s, so C is two-thirds full after a second and
// as good as full after five: slow enough to watch the voltage climb and the
// current die away. RL empties it in about ten seconds, most of it in the
// first four. Current-dot speed 64, a little above the 60 used for
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
r 448 208 448 320 0 20000
w 448 96 544 96 0
s 544 96 544 320 0 1 false
w 544 320 448 320 0
w 448 320 352 320 0
w 352 320 128 320 0
x 285 130 307 133 4 18 R
x 372 186 394 189 4 18 C
x 468 242 490 245 4 18 RL
x 564 262 608 265 4 18 Short`;

export const capacitor: Lesson = {
    id: "capacitor",
    title: "The capacitor",
    summary: "A part that stores charge: how it fills and holds its charge, why a big one is emptied before you touch it, and how to tell a good one from a leaky, shorted or open one, by eye and on the meter.",
    job: {
        title: "The flash that's never ready",
        customer: "Mrs. Nakamura, with a camera flashgun",
        request: "Fresh batteries, and it whines away just as it always did, but the little ready light never comes on. It used to be ready in a few seconds. It's been in a drawer since our last holiday.",
        thanks: "Ready in a few seconds, the way it used to be. It's coming out of that drawer more often.",
    },
    circuit,
    parts: {
        switch: { type: "Switch", nth: 0 },
        r: { type: "Resistor", nth: 0 },
        cap: { type: "Capacitor" },
        rlSwitch: { type: "Switch", nth: 1 },
        shortSwitch: { type: "Switch", nth: 2 },
    },
    quantities: {
        switch: { label: "Switch", part: "switch", switch: true },
        vc: { label: "Across C", symbol: "Vc", unit: "V", part: "cap", measure: "voltage" },
        current: { label: "Through R", symbol: "I", unit: "A", part: "r", measure: "current" },
        rlSwitch: { label: "RL switch", part: "rlSwitch", switch: true },
        shortSwitch: { label: "Short switch", part: "shortSwitch", switch: true },
    },
    // C still remembers and takes time, so the tests let each step's circuit
    // run this long. The slowest change is C emptying through RL,
    // 20 kΩ × 100 µF = 2 s at a time: in 10 s it is down to under 0.1 V.
    settle: 10,
    steps: [
        {
            kind: "read",
            title: "Meet the capacitor",
            set: { switch: 0, rlSwitch: 0, shortSwitch: 0 },
            reset: true,
            text: "The new part is **C**, a **capacitor**: two metal plates face to face, with an insulator between them. The plates never touch, and nothing crosses the insulator. Its symbol shows just that: two equal plates and a gap.\n\n"
                + "C sits in a loop with the 12 V battery, a switch and **R**, 10 kΩ. Leave the two branches on the right open for now: **RL** with its switch, and the switch marked **Short**. C is empty: {vc} across it.",
            note: "Don't mix it up with the battery: its two plates are one long, one short.",
        },
        {
            kind: "explore",
            title: "Fill it",
            set: { switch: 0, rlSwitch: 0, shortSwitch: 0 },
            reset: true,
            text: "Guess first: with a gap between its plates, will any current flow at all? Then press the switch on the top wire, and watch **Across C** and **Through R**.",
            controls: [],
            goal: { switch: 1 },
            success: "It does, for a while: {current} through R and dying away, as C climbs to {vc}, ever more slowly.",
        },
        {
            kind: "choice",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            question: "When you closed the switch, 1.2 mA flowed through R, then less and less as C filled. Why did the current fall?",
            options: ["The battery ran down", "C's voltage opposes it", "C used the current up"],
            answer: 1,
            explain: "Round the loop, C's voltage faces the battery's, so R is left only the difference. Less voltage across R, less current, and C fills more slowly still. The battery gives 12 V throughout.",
        },
        {
            kind: "read",
            title: "Charging",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            text: "Filling a capacitor is **charging** it: charge piles onto one plate and as much leaves the other, so current flows round the loop though none crosses the gap. It fills fast, then ever more slowly. Full, C has all 12 V and R none: a capacitor passes no steady current.\n\n"
                + "How much charge it holds for each volt is its **capacitance**, in **farads** (F). Most hold far less than a farad, so they are marked in µF: C is 100 µF. A bigger capacitor, or a bigger resistor feeding it, fills more slowly.",
            note: "Through R fell into µA: **micro** (µ) means a millionth, so 1 mA is 1000 µA.",
        },
        {
            kind: "read",
            title: "What it is for",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            text: "Across a set's supply, a big capacitor keeps the voltage steady: it fills at each pulse from the mains and feeds the set between them. Between two stages of an amplifier, a small one passes the signal and blocks the steady voltage. A flashgun fills a big one slowly and empties it in a flash.\n\n"
                + "The big ones are **electrolytics**: their value comes from an extremely thin film grown on aluminium foil. One works only one way round: a stripe of minus signs marks its negative lead, and fitted backwards it can burst.",
            note: "The can gives its working voltage: the most it may have across it. MFD means µF. Fit the same value, rated for the same voltage or more, never less.",
        },
        {
            kind: "explore",
            title: "Unplug it, then empty it",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            text: "Opening the switch on the top wire cuts C off from the battery, as unplugging cuts off a set. Open it, and watch C. Then press the switch beside **RL** to put RL across C.",
            controls: [],
            goal: { switch: 0, rlSwitch: 1 },
            success: "Cut off, C kept its charge. With RL across it, the charge has a way round from plate to plate: {vc}, and falling.",
        },
        {
            kind: "read",
            title: "Safe before you touch",
            set: { switch: 0, rlSwitch: 1, shortSwitch: 0 },
            text: "Emptying a capacitor is **discharging** it. A big one can hold its charge for hours after the set is unplugged, and at a high voltage that charge can kill. Many sets have a resistor across it to empty it, as RL did, but that resistor can fail open.\n\n"
                + "So before you touch: meter across it, empty it through a resistor on insulated leads, and meter it again.",
            note: "Never a screwdriver: a dead short pits the metal. The second reading matters: a big one can win back some charge.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            text: "Every electrolytic dries out in the end and holds less: in a set, that shows as hum, not as a wrong reading. One left unused for years can go **leaky**: its insulator lets a little current through, as if a resistor had grown across it. When one fails outright, a short is likelier than an open.\n\n"
                + "Look first: a domed or split top, a rubber bung pushed out so the can sits crooked, a brown crust where the paste inside has leaked, a burnt smell as the back comes off. But many die looking like new.",
            note: "The grooves across the top are there to split first, not the side. Dark glue down the side is usually only glue.",
        },
        {
            kind: "explore",
            title: "A leaky one",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            text: "Now let RL stand for a leak inside C. Once C is full, press the switch beside **RL**, and watch **Across C** and **Through R**.",
            controls: [],
            goal: { rlSwitch: 1 },
            success: "C settles at {vc}, short of the 12 V, and {current} keeps flowing, through R and on through the leak. A leaky capacitor never fills.",
        },
        {
            kind: "explore",
            title: "A shorted one",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            text: "The switch marked **Short** does what a shorted capacitor does: its insulator has been punctured, and current goes straight through. Press it, and watch the same two readings.",
            controls: [],
            goal: { shortSwitch: 1 },
            success: "C has {vc} across it, and R carries {current} for good: as much as at switch-on, and it never dies away. In a set, the resistor feeding a shorted capacitor runs hot, and the fuse may blow.",
        },
        {
            kind: "choice",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 1 },
            question: "With the set on, a supply capacitor reads 0 V, and the resistor feeding it is scorched. What has the capacitor done?",
            options: ["It has shorted", "It has gone open", "It's simply empty"],
            answer: 0,
            explain: "With the set on, a good one and an open one both read the full supply. 0 V, with the resistor feeding it running hot, is a short. The fuse often goes next.",
        },
        {
            kind: "read",
            title: "On ohms",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            reset: true,
            text: "Out of the set, a meter on ohms is a small battery and a resistor, like the battery and R here, and its needle shows the current, as Through R does. Across a good capacitor it kicks towards 0 Ω, then falls back as it fills: watch Through R.\n\n"
                + "A shorted one sends it to 0 Ω and holds it there. A leaky one kicks, then stops at a low reading. An open one never kicks, and in the set it reads like a good one: neither passes a steady current.",
            note: "Empty it first. A good one under about 0.01 µF gives no kick either. Test an electrolytic both ways round, and trust the higher reading.",
        },
        {
            kind: "choice",
            set: { switch: 1, rlSwitch: 0, shortSwitch: 0 },
            question: "With the set switched on, the meter across a capacitor reads just what the service sheet says. Can you be sure it is good?",
            options: ["Yes: it reads right", "No: it may be leaky", "No: it may be open"],
            answer: 2,
            explain: "A leak would read low, and a short 0 V. An open one passes no steady current, like a good one, so it reads the same. On ohms it gives no kick. In doubt, swap in a known good one and see if the fault goes.",
        },
        {
            kind: "choice",
            set: { switch: 1, rlSwitch: 1, shortSwitch: 0 },
            reset: true,
            question: "Her flashgun's capacitor looks like new. It fills only part way, as C does here, and on ohms it kicks, then stops at a low reading. What is wrong?",
            options: ["It has shorted", "It has gone leaky", "It's too big, so slow"],
            answer: 1,
            explain: "A short reads 0 V, and a big one is slow but gets there. A leak drains C as fast as R fills it, so the ready light never comes on. Years in a drawer can do that.",
        },
    ],
};
