import type { Lesson } from "../lesson/types";

// A voltage divider on 12 V: R1 along the top, and a thermistor, Rt, down the
// right. A meter (the gauge) reads Vout across the thermistor and the wire
// that runs out to it. Two fault switches: "Wire", in line with the
// thermistor along the top (closed: the wire is whole), and "Short", across
// the thermistor (open: no short). ("$" line: as in voltage-divider.ts, but
// with colours scaled to 12 V. "p" line: the meter, as in real-battery.ts.
// "s" lines: as in parallel.ts; the first is closed, position 0.)
//
// "350" line: CircuitJS1's NTC thermistor. After the flags: 10 kΩ at 25 °C,
// 4 kΩ at 50 °C, a slider running from 0 °C to 100 °C, standing at 25 °C,
// and the slider's name. The simulator rounds its resistance to whole ohms:
// it is exactly 10 kΩ at 25 °C, 4 kΩ at 50 °C and 1.2 kΩ at 90 °C, so Vout
// is 10 V, 8 V and 4.5 V there. At other temperatures the readings are not
// round. The slider's left end is 1 °C, not 0 °C: keep sliders at 10 or more.
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
    summary: "A thermistor's resistance falls as it warms, so in a voltage divider it turns a temperature into a voltage a gauge can read.",
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
        r1: { label: "Resistor R1", symbol: "R1", unit: "Ω", part: "r1", setting: "Resistance" },
        wire: { label: "Wire", part: "wire", switch: true },
        short: { label: "Short", part: "short", switch: true },
    },
    steps: [
        {
            kind: "read",
            title: "The sender",
            set: { temp: 25, r1: 2000, wire: 1, short: 0 },
            text: "The part with a bent line through it is a **thermistor**: a resistor made to change with temperature. Inside is a bead of metal oxides, pressed from powder and baked hard, with a lead on each side. The sender in Yusuf's engine is one.\n\n"
                + "Here it is Rt, under R1 (2 kΩ), on 12 V. The circle marked V stands for his gauge, reading Vout across the sender: {vout} at {temp}. The two switches come later.",
        },
        {
            kind: "explore",
            title: "Warm it up",
            set: { temp: 25, r1: 2000, wire: 1, short: 0 },
            text: "Guess first: as the engine warms, will Vout rise or fall? Then drag the **temperature** up to **50 °C** and watch the gauge.",
            controls: [{ quantity: "temp", min: 10, max: 100, step: 5 }],
            goal: { temp: 50 },
            success: "Vout has fallen from 10 V to {vout}. Warmer, and the gauge reads less.",
        },
        {
            kind: "choice",
            set: { temp: 50, r1: 2000, wire: 1, short: 0 },
            question: "The thermistor warmed from 25 °C to 50 °C, and Vout fell from 10 V to 8 V. Why did it fall?",
            options: ["Its resistance rose", "Heat used up volts", "Its resistance fell"],
            answer: 2,
            explain: "At 50 °C it is 4 kΩ, down from 10 kΩ, so it gets a smaller share of the 12 V. In the bead little charge is free to move, and heat shakes more of it loose: the warmer, the easier the current.",
        },
        {
            kind: "read",
            title: "A voltage, not a resistance",
            set: { temp: 50, r1: 2000, wire: 1, short: 0 },
            text: "The common kind of thermistor, like this one, loses resistance as it warms. But a gauge can't read a resistance: like any circuit, it reads a voltage. So the thermistor goes in a divider, and its share of the supply is Vout. Used like this, to measure something, it is a **sensor**.\n\n"
                + "Rt takes the place of R2 in the divider rule:",
            formula: "Vout = V × Rt ÷ (R1 + Rt)",
            note: "At 50 °C: 12 V × 4 kΩ ÷ 6 kΩ = 8 V. A heavy load would pull Vout down, as on Mrs. Adeyemi's lead, and the gauge would read too hot.",
        },
        {
            kind: "number",
            set: { temp: 90, r1: 2000, wire: 1, short: 0 },
            question: "The engine is warm: the thermistor is at 90 °C, where it is 1.2 kΩ. R1 is 2 kΩ on 12 V. What does Vout read?",
            solveFor: "vout",
            answer: 4.5,
            explain: "Vout = 12 V × 1.2 kΩ ÷ 3.2 kΩ = 4.5 V",
        },
        {
            kind: "number",
            set: { temp: 50, r1: 4000, wire: 1, short: 0 },
            question: "R1 is now 4 kΩ on 12 V, and Vout reads 6 V. The thermistor is 10 kΩ at 25 °C, 4 kΩ at 50 °C and 1.2 kΩ at 90 °C. How hot is it?",
            solveFor: "temp",
            answer: 50,
            explain: "6 V is half of 12 V, so the thermistor matches R1: 4 kΩ, which it is at 50 °C.",
        },
        {
            kind: "choice",
            set: { temp: 50, r1: 2000, wire: 1, short: 0 },
            question: "Swap the two over: the thermistor on top, R1 below, and Vout across R1. Now, as the engine warms, what does Vout do?",
            options: ["It rises", "It falls, as before", "It stays the same"],
            answer: 0,
            explain: "The thermistor still loses resistance as it warms, so R1 becomes a bigger share of the total and gets more of the 12 V. Which way Vout moves depends on where the sensor sits.",
        },
        {
            kind: "read",
            title: "Where you meet it",
            set: { temp: 25, r1: 2000, wire: 1, short: 0 },
            text: "A car engine's temperature sender is a thermistor that feeds the dashboard gauge. In a colour television, a thermistor disc in the mains input heats itself: cold, it holds back the rush of current at switch-on; hot, it has almost no resistance.\n\n"
                + "Another kind rises as it warms. In a colour set, one feeds a coil round the picture tube. As it warms, the current dies away, wiping the tube of magnetism: the hum at switch-on.",
        },
        {
            kind: "read",
            title: "On the meter",
            set: { temp: 25, r1: 2000, wire: 1, short: 0 },
            text: "A thermistor is known by its resistance at 25 °C: a 10 k thermistor, like this one, is 10 kΩ at 25 °C. Out of the set, on your meter, it should read near that, though a room is seldom exactly 25 °C.\n\n"
                + "Then hold it between finger and thumb. A good one falls, slowly, over some seconds. No reading at all: it is open. A reading that won't move: it is dead.",
            note: "Slow is the tell: heat takes time to soak in. A reading that jumps at once is not the heat.",
        },
        {
            kind: "choice",
            set: { temp: 20, r1: 2000, wire: 1, short: 0 },
            question: "The shop is at 20 °C. Out of the set, a 10 k thermistor reads 12.2 kΩ on your meter. What do you make of it?",
            options: ["Faulty: it isn't 10 kΩ", "About right for 20 °C", "Faulty: should be less"],
            answer: 1,
            explain: "10 kΩ is its value at 25 °C. Cooler means more resistance: about 12 kΩ at 20 °C, as on the screen. Now warm it in your fingers. A slow, steady fall says it is good.",
        },
        {
            kind: "explore",
            title: "The wire comes off",
            set: { temp: 25, r1: 2000, wire: 1, short: 0 },
            text: "The **Wire** switch does what a broken wire or an open thermistor does. Press it on the screen to open it, then drag the temperature up to **90 °C** and watch the gauge.",
            controls: [{ quantity: "temp", min: 10, max: 100, step: 5 }],
            goal: { wire: 0, temp: 90 },
            success: "Vout is {vout}, the whole supply, and the temperature no longer moves it. No current flows, so R1 drops nothing.",
        },
        {
            kind: "explore",
            title: "A short across it",
            set: { temp: 90, r1: 2000, wire: 1, short: 0 },
            text: "The wire is mended. The **Short** switch does what a shorted thermistor does. Press it on the screen to close it, then drag the temperature down to **25 °C**.",
            controls: [{ quantity: "temp", min: 10, max: 100, step: 5 }],
            goal: { short: 1, temp: 25 },
            success: "Vout is {vout}, whatever the temperature. A short has no resistance, so it gets no share of the 12 V.",
        },
        {
            kind: "read",
            title: "Stuck readings",
            set: { temp: 25, r1: 2000, wire: 1, short: 0 },
            text: "In the set, watch Vout as the thermistor warms. A good one moves it. **Stuck at the full supply**, hot or cold: the thermistor or its wire is open, and the gauge reads colder than cold. **Stuck at 0 V**: it is shorted, and reads hotter than hot.\n\n"
                + "Before you blame the thermistor, check R1: open, it gives 0 V too, and shorted, the full supply.",
            note: "A light-dependent resistor is the same trick with light: more light, less resistance. In a divider, it tells a street lamp when dusk comes.",
        },
        {
            kind: "choice",
            set: { temp: 90, r1: 2000, wire: 1, short: 0 },
            question: "A good sender at 90 °C gives 4.5 V, as on the screen. Yusuf's gauge sits on cold, and his Vout reads the full 12 V, hot or cold. What is wrong?",
            options: ["The sender is shorted", "The engine runs cold", "Sender or wire open"],
            answer: 2,
            explain: "12 V is the whole supply: no current flows, so R1 drops nothing and the gauge reads colder than cold. The sender or its wire is open. His wire had come off the sender.",
        },
    ],
};
