// Circuits written by hand in CircuitJS1's text format, used to compare our
// simulator with Falstad's live site (see README.md in this folder).
//
// Line format: <type> <x1> <y1> <x2> <y2> <flags> <settings...>
//   v = voltage source (waveform 0 = DC, 1 = sine; then frequency, volts)
//   R = one-terminal voltage rail, r = resistor, c = capacitor, l = inductor,
//   d = diode, t = transistor, a = op-amp, w = wire, g = ground
// The "$" line holds the options: timestep 5 µs, and a high simulation speed
// so the runs finish quickly (speed does not change the maths).

const OPTIONS = "$ 1 0.000005 200 50 5 50";

export interface ComparisonCircuit {
    name: string;
    text: string;
}

/** After how many timesteps the values are sampled (20000 steps = 100 ms simulated). */
export const SAMPLE_STEPS = [1, 2, 10, 100, 1000, 5000, 20000];

export const circuits: ComparisonCircuit[] = [
    {
        // 12 V across 1 kΩ + 2.2 kΩ: 3.75 mA, 8.25 V at the midpoint.
        name: "voltage divider (DC)",
        text: `${OPTIONS}
v 96 320 96 96 0 0 40 12 0 0 0.5
r 96 96 288 96 0 1000
r 288 96 288 320 0 2200
w 288 320 96 320 0
g 96 320 96 352 0 0`,
    },
    {
        // Five resistors, unbalanced bridge.
        name: "Wheatstone bridge (DC)",
        text: `${OPTIONS}
v 96 352 96 96 0 0 40 9 0 0 0.5
w 96 96 256 96 0
r 256 96 160 224 0 1000
r 256 96 352 224 0 2200
r 160 224 256 352 0 3300
r 352 224 256 352 0 4700
r 160 224 352 224 0 560
w 256 352 96 352 0`,
    },
    {
        // 5 V charging 1 µF through 1 kΩ: time constant 1 ms.
        name: "RC charging",
        text: `${OPTIONS}
v 96 320 96 96 0 0 40 5 0 0 0.5
r 96 96 288 96 0 1000
c 288 96 288 320 0 0.000001 0
w 288 320 96 320 0`,
    },
    {
        // 10 V step into 10 Ω, 10 mH, 1 µF in series: rings at about 1.6 kHz.
        name: "RLC ringing",
        text: `${OPTIONS}
v 96 320 96 96 0 0 40 10 0 0 0.5
r 96 96 224 96 0 10
l 224 96 352 96 0 0.01 0
c 352 96 352 320 0 0.000001 0
w 352 320 96 320 0`,
    },
    {
        // 60 Hz, 10 V peak, through a diode into 47 µF and a 1 kΩ load.
        name: "diode rectifier with smoothing capacitor",
        text: `${OPTIONS}
v 96 320 96 96 0 1 60 10 0 0 0.5
d 96 96 288 96 2 default
c 288 96 288 320 0 0.000047 0
r 416 96 416 320 0 1000
w 288 96 416 96 0
w 96 320 288 320 0
w 288 320 416 320 0`,
    },
    {
        // Common-emitter NPN stage on 12 V, 20 mV 1 kHz input through 10 µF.
        name: "transistor amplifier (NPN)",
        text: `${OPTIONS}
R 240 48 144 48 0 0 40 12 0 0 0.5
w 240 48 336 48 0
r 240 48 240 208 0 47000
r 240 208 240 352 0 10000
t 240 208 336 208 0 1 0 0 100
w 240 352 336 352 0
g 240 352 240 384 0
r 336 48 336 192 0 4700
r 336 224 336 352 0 1000
c 240 208 160 208 0 0.00001 0
R 160 208 112 208 0 1 1000 0.02 0 0 0.5
c 336 192 416 192 0 0.00001 0
r 416 192 416 272 0 100000
g 416 272 416 304 0`,
    },
    {
        // Inverting amplifier, gain -4.7, 1 V 100 Hz input.
        name: "op-amp inverting amplifier",
        text: `${OPTIONS}
v 96 256 96 112 0 1 100 1 0 0 0.5
g 96 256 96 304 0
r 96 112 192 112 0 1000
r 192 144 336 144 0 4700
w 336 144 336 192 0
w 192 112 192 144 0
w 192 144 192 176 0
w 96 256 192 256 0
w 192 208 192 256 0
a 192 192 336 192 0`,
    },
];
