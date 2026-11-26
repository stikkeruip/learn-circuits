import type { Lesson } from "../lesson/types";

// A voltage divider on 12 V: R1 (a fixed 2 kΩ) along the top, and a
// thermistor, Rt, down the right. A meter (the gauge) reads Vout across the
// thermistor and the wire that runs out to it. Two fault switches: "Wire", in
// line with the thermistor along the top (closed: the wire is whole), and
// "Short", across the thermistor (open: no short). ("$" line: as in
// voltage-divider.ts, but with colours scaled to 12 V. "p" line: the meter,
// as in real-battery.ts. "s" lines: as in parallel.ts; the first is closed,
// position 0.)
//
// "350" line: CircuitJS1's NTC thermistor. After the flags: 10 kΩ at 25 °C,
// 4 kΩ at 50 °C, a slider running from 0 °C to 100 °C, standing at 25 °C,
// and the slider's name. The simulator rounds its resistance to whole ohms,
// and writes it on the drawing beside the temperature. The readings the job
// uses, which the learner recognises and never works out:
//
//   25 °C   10 kΩ     gauge 10 V    1 mA
//   20 °C   12.2 kΩ   (the bench question: a good part, off its marking)
//   90 °C   1.2 kΩ    gauge 4.5 V   3.75 mA
//   Wire open         gauge 12 V    0 A, whatever the temperature
//   Short closed      gauge 0 V     6 mA, more than at any temperature
//
// The slider's left end is 1 °C, not 0 °C: keep sliders at 10 or more.
// "x" lines: the names written on the drawing, in 18 px text.
const circuit = `$ 1 0.000005 10.2 60 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
r 128 96 256 96 0 2000
p 256 96 256 320 2 0 0 0
s 256 96 352 96 0 0 false
350 352 96 352 320 0 10000 4000 0 100 0.2525 Temperature
w 352 96 448 96 0
s 448 96 448 320 0 1 false
w 448 320 352 320 0
w 352 320 256 320 0
w 256 320 128 320 0
x 181 130 203 133 4 18 R1
x 285 130 323 133 4 18 Wire
x 372 186 394 189 4 18 Rt
x 468 262 512 265 4 18 Short`;

export const thermistor: Lesson = {
    id: "thermistor",
    title: "The thermistor",
    summary: "A resistor that loses resistance as it warms: how it turns heat into a reading on a gauge, and how to tell a good one from an open or a shorted one.",
    job: {
        title: "The gauge that stays cold",
        customer: "Yusuf, with a taxi",
        request: "All day in traffic, and the bonnet's hot enough to fry an egg on. But the temperature needle never leaves cold. I've stopped believing it.",
        thanks: "The needle climbs as she warms up now, and sits in the middle. One wire, after all that.",
    },
    circuit,
    parts: {
        r1: { type: "Resistor" },
        gauge: { type: "Probe" },
        wire: { type: "Switch", nth: 0 },
        sender: { type: "ThermistorNTC" },
        short: { type: "Switch", nth: 1 },
    },
    quantities: {
        temp: { label: "Temperature", symbol: "T", unit: "°C", part: "sender", slider: { min: 0, max: 100 } },
        vout: { label: "Gauge", symbol: "Vout", unit: "V", part: "gauge", measure: "voltage" },
        current: { label: "Current", symbol: "I", unit: "A", part: "r1", measure: "current" },
        wire: { label: "Wire", part: "wire", switch: true },
        short: { label: "Short", part: "short", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "The sender",
            set: { temp: 25, wire: 1, short: 0 },
            text: "The part with a bent line through it is a **thermistor**: a resistor made to change with temperature. Inside is a bead of metal oxides, pressed from powder and baked hard, with a lead on each side. The sender in Yusuf's engine is one.\n\n"
                + "Here it is Rt, under R1, a fixed resistor, on 12 V. The circle marked V stands for his gauge: it reads {vout} across the sender at {temp}, with {current} round the loop. The switches come later.",
        },
        {
            kind: "explore",
            title: "Warm it up",
            set: { temp: 25, wire: 1, short: 0 },
            text: "Guess first: as the engine warms, will the gauge rise or fall? Then drag the **temperature** up to **90 °C**, a warm engine, and watch the gauge.",
            controls: [{ quantity: "temp", min: 10, max: 100, step: 5 }],
            goal: { temp: 90 },
            success: "The gauge has fallen from 10 V to {vout}, and the current has risen to {current}. Warmer, and the gauge reads less.",
        },
        {
            kind: "choice",
            set: { temp: 90, wire: 1, short: 0 },
            question: "The sender warmed from 25 °C to 90 °C, and the gauge fell from 10 V to 4.5 V. Why did it fall?",
            options: ["Its resistance rose", "Heat used up volts", "Its resistance fell"],
            answer: 2,
            explain: "It fell from 10 kΩ to 1.2 kΩ, as the drawing shows, so it keeps a smaller share of the 12 V. In the bead little charge is free to move, and heat shakes more of it loose: the warmer, the easier the current.",
        },
        {
            kind: "read",
            title: "A voltage, not a resistance",
            set: { temp: 90, wire: 1, short: 0 },
            text: "This is the common kind: it loses resistance as it warms. But a gauge can't read a resistance, only a voltage. So the sender shares the 12 V with R1, and the bigger takes the bigger share: cold, it keeps most of it; hot, less. A part used like this, to measure something, is a **sensor**.\n\n"
                + "A good sender keeps the gauge between 12 V and 0 V, and moves it as the engine warms. Stuck hard on either end means trouble.",
            note: "A light-dependent resistor does the same with light: more light, less resistance. In a divider, it tells a street lamp when dusk comes.",
        },
        {
            kind: "choice",
            set: { temp: 90, wire: 1, short: 0 },
            question: "Some sets fit it the other way up: thermistor on top, gauge across R1. As the engine warms, what does the gauge do?",
            options: ["It rises", "It falls, as before", "It stays the same"],
            answer: 0,
            explain: "The thermistor still loses resistance as it warms, so R1 keeps more of the 12 V. Know where the sensor sits before you call a reading high or low.",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { temp: 25, wire: 1, short: 0 },
            text: "A car's temperature sender is one, feeding the gauge. A colour set has a **surge limiter**: a thermistor disc where the mains comes in. Cold, it holds back the rush of current at switch-on; then it heats itself to almost no resistance.\n\n"
                + "Another kind rises as it warms. In a colour set, one feeds a loop of wire round the picture tube: as it warms, the current dies away, wiping the tube of magnetism. That is the hum at switch-on.",
            note: "A thermistor is known by its resistance at 25 °C: a 10 k one is 10 kΩ at 25 °C. Replace it with the same value, and the same kind.",
        },
        {
            kind: "read",
            title: "How it dies",
            set: { temp: 25, wire: 1, short: 0 },
            text: "A surge limiter runs hot whenever the set is on: that is normal. A failed one often shows it: cracked, pinholed or burnt. Many fail shorted, some after lightning on the mains. Open, it cuts off the mains, and the set is dead.\n\n"
                + "The kind that wipes the tube most often fails shorted, straight across the mains: the fuse blows the moment the set is switched on. Taken out, the set plays, but its colours can go patchy. Fit a new one.",
        },
        {
            kind: "explore",
            title: "The wire comes off",
            set: { temp: 25, wire: 1, short: 0 },
            text: "The **Wire** switch does what a broken wire or an open thermistor does. Press it on the screen to open it, then drag the temperature up to **90 °C** and watch the gauge.",
            controls: [{ quantity: "temp", min: 10, max: 100, step: 5 }],
            goal: { wire: 0, temp: 90 },
            success: "The gauge reads {vout}, the whole supply, whatever the temperature: colder than cold. The current is {current}, so R1 drops nothing.",
        },
        {
            kind: "explore",
            title: "A short across it",
            set: { temp: 90, wire: 1, short: 0 },
            text: "The wire is mended. The **Short** switch does what a shorted thermistor does. Press it on the screen to close it, then drag the temperature down to **25 °C**.",
            controls: [{ quantity: "temp", min: 10, max: 100, step: 5 }],
            goal: { short: 1, temp: 25 },
            success: "The gauge reads {vout}, whatever the temperature: hotter than hot. The current is {current}, more than even a hot sender passes. A short has no resistance, so it gets no share of the 12 V.",
        },
        {
            kind: "choice",
            set: { temp: 25, wire: 1, short: 1 },
            question: "This sender gives 0 V in the set, hot or cold, and the gauge sits hard over on hot. You take it out and set your meter to ohms. What will it read?",
            options: ["No reading at all", "About 10 kΩ", "Next to nothing"],
            answer: 2,
            explain: "0 V, hot or cold, is a short, and on ohms a short reads next to 0 Ω, like a good fuse. If it reads right, look at R1 instead: open, it gives 0 V too.",
        },
        {
            kind: "read",
            title: "On the bench",
            set: { temp: 25, wire: 1, short: 0 },
            text: "Out of the set, on ohms, a thermistor should read near its marking, though a room is seldom exactly 25 °C. Then hold its body, not the probes, between finger and thumb. A good one falls, slowly, over some seconds; one of the other kind climbs.\n\n"
                + "No reading at all: it is open. A reading that won't move with heat: it is dead. A surge limiter reads a few ohms or tens cold, and next to nothing once a hair dryer has warmed it.",
            note: "Slow is the tell: heat takes time to soak in. A reading that jumps at once is your fingers, not the heat.",
        },
        {
            kind: "choice",
            set: { temp: 20, wire: 1, short: 0 },
            question: "The shop is at 20 °C. Out of the set, a 10 k thermistor reads 12.2 kΩ on your meter. What do you make of it?",
            options: ["Faulty: it isn't 10 kΩ", "About right for 20 °C", "Faulty: should be less"],
            answer: 1,
            explain: "10 kΩ is its value at 25 °C. Cooler means more resistance: about 12 kΩ at 20 °C, as on the drawing. Now warm it in your fingers. A slow, steady fall says it is good.",
        },
        {
            kind: "choice",
            set: { temp: 25, wire: 1, short: 0 },
            question: "A colour set was playing a minute ago. You lift out its surge limiter, and on ohms it reads next to nothing. What do you make of it?",
            options: ["Still hot: let it cool", "Shorted: fit a new one", "Good, like a fuse"],
            answer: 0,
            explain: "Hot, a surge limiter is meant to be next to nothing: that is how it lets the set run. Let it cool a minute or two and test again. A good one reads some ohms cold. Next to nothing cold is a short.",
        },
        {
            kind: "choice",
            set: { temp: 90, wire: 1, short: 0 },
            question: "Yusuf's gauge sits on cold, and across his sender you read the full 12 V, hot engine or cold. What is wrong?",
            options: ["The sender is shorted", "Sender or wire open", "The engine runs cold"],
            answer: 1,
            explain: "No current flows, so R1 drops nothing and the gauge reads colder than cold: the sender or its wire is open. His wire had come off the sender.",
        },
    ],
};
