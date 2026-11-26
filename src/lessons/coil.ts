import type { Lesson } from "../lesson/types";

// A 12 V battery and the main switch along the top, then three columns side
// by side: R (120 Ω) down the left; a switch and a diode down the middle; and
// the coil down the right, its winding's resistance Rw (24 Ω) drawn as a
// resistor above it, as Ri is in real-battery.ts. A second switch on the top
// wire, marked "break", is in line with the coil: open, it does what a
// winding that has parted does. ("v" line: see ohms-law.ts; "s" and "x"
// lines: see parallel.ts.)
//
// "$" line: 0.1 ms timestep at 1500 steps a second, so the circuit runs at
// about a seventh of real time. The coil's current rises over about 0.8
// simulated seconds (five real ones), and the kick at switch-off, 60 V and
// back under the battery's 12 V in 45 simulated milliseconds, stays on the
// readout for a third of a real second.
// "d" line: a diode with its arrow from (384, 320) up to (384, 208), so it is
// turned against the battery and passes nothing while the main switch is
// closed. At switch-off the coil's push is the other way round, forward for
// the diode.
// "l" line: the coil, 4 H, no current now. Flags 2 makes CircuitJS1 use its
// backward-Euler step for it, which does not ring when a switch opens.
//
// CircuitJS1 shows no kick when a switch opens the only loop a coil is in:
// the current simply stops. Here it always has somewhere to go: through R,
// which stands for whatever the kick would otherwise jump through, or through
// the diode. Opening "break" is the exception, on purpose: it stands for the
// wire itself parting, and the current just stops.
const circuit = `$ 1 0.0001 9.375 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
s 128 96 256 96 0 1 false
r 256 96 256 320 0 120
w 256 96 384 96 0
s 384 96 384 208 0 1 false
d 384 320 384 208 2 default
s 384 96 512 96 0 0 false
r 512 96 512 208 0 24
l 512 208 512 320 2 4 0 0 0
w 512 320 384 320 0
w 384 320 256 320 0
w 256 320 128 320 0
x 276 186 298 189 4 18 R
x 426 130 470 133 4 18 break
x 532 130 554 133 4 18 Rw
x 532 242 554 245 4 18 L`;

export const coil: Lesson = {
    id: "coil",
    title: "The coil",
    summary: "How a coil fights every change in its current, why its kick at switch-off burns switches and how a diode tames it, and how to tell a good coil from a dead one.",
    job: {
        title: "The silent chime",
        customer: "Mrs. Farouk, with a door chime",
        request: "Press the button by my front door and nothing. Not a ding, not a dong. I've taken the box down off the hall wall. The postman has given up on us.",
        thanks: "Ding-dong, as loud as the day we fitted it. The postman will be pleased.",
    },
    circuit,
    parts: {
        main: { type: "Switch", nth: 0 },
        r: { type: "Resistor", nth: 0 },
        diodeSwitch: { type: "Switch", nth: 1 },
        breakSwitch: { type: "Switch", nth: 2 },
        rw: { type: "Resistor", nth: 1 },
    },
    quantities: {
        main: { label: "Main switch", part: "main", switch: true },
        diode: { label: "Diode switch", part: "diodeSwitch", switch: true },
        breakSwitch: { label: "Break switch", part: "breakSwitch", switch: true },
        current: { label: "Through coil", symbol: "I", unit: "A", part: "rw", measure: "current" },
        vcoil: { label: "Across coil", symbol: "V", unit: "V", part: "r", measure: "voltage" },
    },
    // The current settles in 4 H ÷ 24 Ω = 1/6 s for each 63% of the way: 5 s
    // is thirty of those.
    settle: 5,
    steps: [
        {
            kind: "read",
            title: "Meet the coil",
            set: { main: 0, diode: 0, breakSwitch: 1 },
            reset: true,
            text: "A **coil**, also called an **inductor**, is a long, thin wire wound round and round, often on iron or ferrite. A coat of enamel stops the current short-cutting from turn to turn. Current through it makes it a magnet.\n\n"
                + "The loops on the right, L, are the coil. Its wire, the **winding**, has resistance of its own, **Rw**, drawn as a resistor in line with it. R, the diode and the switch marked break come in later.",
        },
        {
            kind: "explore",
            title: "Switch it on",
            set: { main: 0, diode: 0, breakSwitch: 1 },
            reset: true,
            text: "Guess first: will the current jump straight to its full value? Then press the main switch, by the battery, and watch **I**, the current through the coil.",
            controls: [],
            goal: { main: 1 },
            success: "V across the coil was 12 V at once, but I climbs: fast at first, then ever more slowly, and settles at 0.5 A. Now: {current}.",
        },
        {
            kind: "choice",
            set: { main: 1, diode: 0, breakSwitch: 1 },
            question: "The switch closed in an instant, but the current took its time to build. What held it back?",
            options: ["The battery warming up", "The coil, pushing back", "Resistance in the wire"],
            answer: 1,
            explain: "While the current rises, the coil is building its magnet, and it pushes back against the change. It's the curve of a capacitor filling: fast at first, then ever more slowly. Rw only sets where the current ends up.",
        },
        {
            kind: "read",
            title: "Only the winding",
            set: { main: 1, diode: 0, breakSwitch: 1 },
            text: "How hard a coil fights a change in its current is its **inductance**, measured in **henries** (H). More turns, or an iron core, give more: this coil is 4 H. Once the current has settled, there is no change left to fight.\n\n"
                + "So on a steady current a coil is only its winding, a length of wire. On ohms, out of the set, a good one sends the needle straight to a low reading, and it stays: a few ohms for a small radio coil, hundreds for a big one.",
        },
        {
            kind: "explore",
            title: "Switch it off",
            set: { main: 1, diode: 0, breakSwitch: 1 },
            text: "Let the current settle at 0.5 A. Then press the main switch to open it, and keep your eye on **V**, across the coil. It happens fast.",
            controls: [],
            goal: { main: 0 },
            success: "Did you catch it? For an instant V leapt far past the battery's 12 V, as the current died. Missed it? Close the switch, let the current build, and open it again.",
        },
        {
            kind: "choice",
            set: { main: 0, diode: 0, breakSwitch: 1 },
            question: "The battery was cut off, yet for an instant the coil had far more than 12 V across it. Where did that come from?",
            options: ["The battery", "Charge stored in R", "The coil's own magnet"],
            answer: 2,
            explain: "As the current falls, the coil's magnet collapses and pushes the current on. Its only way on is through R, so the coil makes whatever voltage that takes, for an instant: here, five times the battery's.",
        },
        {
            kind: "explore",
            title: "Tame the kick",
            set: { main: 1, diode: 1, breakSwitch: 1 },
            text: "That leap is **the kick**. With only a parting switch for a path, it reaches hundreds of volts and jumps the gap as a spark, and each spark pits the contacts. It kills transistors too, the switches with no moving parts of a later job.\n\n"
                + "The cure is a diode across the coil. Its switch is closed now: the diode is in reverse to the battery, so it passes nothing. Let the current settle, then open the main switch and watch V.",
            controls: [],
            goal: { main: 0 },
            success: "No leap this time. V stays under a volt, {vcoil} now, and the current dies away gently: {current}.",
        },
        {
            kind: "choice",
            set: { main: 0, diode: 1, breakSwitch: 1 },
            question: "With the diode across it, the coil had under a volt across it at switch-off. Why no kick this time?",
            options: ["The diode carries it", "No current in the coil", "The diode blocks it"],
            answer: 0,
            explain: "At switch-off the coil pushes the other way, forward for the diode. Its current flows on round through the diode, which drops under a volt, so no kick builds, and the current dies away in the winding.",
        },
        {
            kind: "read",
            title: "Where you'll find one",
            set: { main: 1, diode: 1, breakSwitch: 1 },
            text: "Valve radios and amplifiers smooth their supply with a big iron-cored coil, a **choke**: it lets a steady current through and chokes off changes. Tuning coils pick out a station: a portable's aerial is one, on a ferrite rod.\n\n"
                + "Big chokes print their henries, and often their current. Small coils wear bands like a resistor's, read in microhenries (µH). Many carry nothing: the service sheet gives their resistance. Fit the same henries, and the same current or more.",
            note: "A relay, the next job, is a coil too, and wears the same diode.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { main: 1, diode: 1, breakSwitch: 1 },
            text: "Coils fail two ways. In an open winding the wire has parted, often where the hair-fine wire meets its tag, or it has burnt through. Look at that joint first: a re-solder may save the coil.\n\n"
                + "With **shorted turns**, the enamel between turns has failed and some turns are bypassed. The coil runs hot: it smells burnt, and its varnish darkens or blisters. Yet on ohms it reads near its figure, as little wire is lost. Swap in a known good one.",
        },
        {
            kind: "explore",
            title: "An open winding",
            set: { main: 1, diode: 1, breakSwitch: 1 },
            text: "The coil is on, its current settled. Press the switch marked break, on the top wire, to open it: it does what a winding that has parted does. Watch V and I.",
            controls: [],
            goal: { breakSwitch: 0 },
            success: "V hasn't moved: the coil sits straight across the supply, so it gets the full 12 V, good or open. But the current is gone: {current}. On ohms, out of the set: no continuity, either way round.",
        },
        {
            kind: "choice",
            set: { main: 1, diode: 1, breakSwitch: 0 },
            question: "A smoothing choke reads close to its figure on ohms. But it runs hot, smells burnt, and its varnish has gone dark. What is wrong?",
            options: ["Nothing: it reads fine", "An open winding", "Shorted turns"],
            answer: 2,
            explain: "Shorted turns: the enamel between some turns has failed. So little wire drops out that the ohms barely move, but the coil cooks. Continuity rules out only an open winding. Swap in a known good choke.",
        },
        {
            kind: "choice",
            set: { main: 1, diode: 0, breakSwitch: 1 },
            question: "The switch that works a coil keeps failing, its contacts pitted and black every time. What will stop it?",
            options: ["Clean the contacts", "Diode across the coil", "A heavier switch"],
            answer: 1,
            explain: "Cleaning and a heavier switch only buy time. Each time the contacts part, the coil's kick jumps the gap as a spark and pits them. A diode across the coil stops that. If one is there, test it: gone open, it does nothing.",
        },
        {
            kind: "choice",
            set: { main: 1, diode: 1, breakSwitch: 0 },
            question: "Mrs. Farouk's chime: button pressed, the full 12 V across its coil, and no ding. Out of the set, on ohms, no continuity. What has failed?",
            options: ["An open winding", "The push-button", "Shorted turns"],
            answer: 0,
            explain: "A dead button would leave 0 V at the coil, and shorted turns still read low on ohms. The supply arrives but nothing gets through: the winding has parted. Check the joint at its tag first.",
        },
    ],
};
