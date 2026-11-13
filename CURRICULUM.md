# Curriculum

The course in order: what each job teaches, what it relies on, and what comes
after. The lessons themselves are data in [`src/lessons/`](src/lessons/), and
their order is set in [`src/lessons/index.ts`](src/lessons/index.ts). A job's
number is its place in that list.

Keep this file in step with the lessons: when a job is added, moved or
rewritten, change its entry here in the same commit.

## How the course is built

The order is the one most introductory circuits courses use: what a circuit
is, then voltage, current and resistance, then Ohm's law, power, series,
parallel, dividers and Kirchhoff's laws. Parts other than the resistor come
only after all of that.

Every job follows the same rules:

1. **One new idea per job.** A job uses only what earlier jobs taught, plus
   its own idea.
2. **See it, then name it.** The learner changes the circuit and watches the
   readings first. The rule and its formula come after.
3. **Start from known numbers.** 12 V, 6 Ω and 2 A run from №0001 to №0003, so
   each new reading stands out against ones the learner already trusts.
4. **End at the fault.** The last question explains what was wrong with the
   customer's set, using the idea of the job.
5. **The simulator decides.** Every stated answer must agree with the
   simulator (`tests/lessons.test.ts`).
6. **Progress is which jobs are done.** No points, streaks, lives or levels.

## Part 1: Fundamentals (written)

| № | Job | Lesson (`id`) | New idea | Formula |
|---|---|---|---|---|
| 0001 | First day on the bench | The closed loop (`closed-loop`) | Current flows only round a complete loop | |
| 0002 | Three numbers | Ohm's law (`ohms-law`) | Voltage and resistance set the current | V = I × R |
| 0003 | The smell of burning | Power (`power`) | Parts turn energy into heat, and have a limit | P = V × I |
| 0004 | The dead string | Series circuits (`series`) | One path: one current, shared voltage | V = V1 + V2, R = R1 + R2 |
| 0005 | The fuse that keeps blowing | Parallel circuits (`parallel`) | Side by side: full voltage each, currents add | I = I1 + I2 |
| 0006 | The crackling knob | Voltage dividers (`voltage-divider`) | A series pair picks off part of a voltage | Vout = V × R2 ÷ (R1 + R2) |
| 0007 | The numbers that don't add up | Kirchhoff's laws (`kirchhoff`) | Currents balance at a junction, voltages round a loop | I1 = I2 + I3, V = V1 + V2 |

### №0001 First day on the bench: the closed loop

- **Customer:** Rita, who runs the shop. **Needs:** nothing.
- **Circuit:** a 12 V battery, a switch and a lamp in one loop.
- **Teaches:** source, load and switch; the schematic and its symbols;
  current, in amperes; the circuit as a complete loop; current is the same all
  round the loop and is not used up; closed circuit and open circuit.
- **The learner:** closes the switch (the lamp lights, 2 A flows), then opens
  it (the current stops in every wire).
- **Checks:** where the current is biggest (the same all round); whether
  current flows in the far wire with the switch open (none); the likeliest
  fault when a good lamp on a good battery stays dark (a gap in the loop).
- **Hands on:** 12 V and 2 A, the numbers №0002 starts from.

### №0002 Three numbers: Ohm's law

- **Customer:** Rita. **Needs:** №0001.
- **Circuit:** a battery and one resistor (12 V, 6 Ω, 2 A).
- **Teaches:** the resistor; voltage as how hard the battery pushes, in volts;
  resistance as how hard the resistor pushes back, in ohms; V = I × R and its
  two other forms; the short circuit.
- **The learner:** doubles the voltage to 24 V (the current doubles), doubles
  the resistance to 12 Ω (the current halves), and takes the resistance down
  to 1 Ω (12 A).
- **Checks:** one number question for each form of the law: I from V and R,
  V from I and R, R from V and I.

### №0003 The smell of burning: power

- **Customer:** Mr. Okafor, with a kitchen radio. **Needs:** №0002.
- **Circuit:** the same loop, with a power reading on the resistor.
- **Teaches:** power as how fast a part turns electrical energy into heat, in
  watts; P = V × I; twice the voltage is four times the power; on the same
  voltage, more resistance means less power; the prefixes milli and kilo; the
  power rating of a part.
- **The learner:** turns the voltage up to 24 V (96 W) and the resistance up
  to 12 Ω (12 W).
- **Checks:** P from V and I; I from P and V; ¼ W as 250 mW; the power in the
  radio's resistor (9 V × 0.1 A = 0.9 W).
- **The fault:** a ¼ W resistor turning 0.9 W into heat. It needs a 1 W part.

### №0004 The dead string: series circuits

- **Customer:** Mrs. Papadaki, with a string of lights. **Needs:** №0002.
- **Circuit:** a battery with R1 (2 Ω) and R2 (4 Ω) in one loop.
- **Teaches:** series; the same current through every part; the battery's
  voltage shared out in proportion to resistance, V = V1 + V2; resistances in
  series add, R = R1 + R2.
- **The learner:** makes R1 equal to R2 (6 V each), then raises R2 to 10 Ω
  (12 Ω in all, 1 A).
- **Checks:** the current from two resistances; V2 from V and V1; R2 from V, I
  and R1; six equal lamps on 12 V (2 V each).
- **The fault:** one burnt-out lamp opens the only path, so the whole string
  goes dark.

### №0005 The fuse that keeps blowing: parallel circuits

- **Customer:** Lena, with a camper van. **Needs:** №0004.
- **Circuit:** a battery with two branches: R1 (6 Ω), and a switch with
  R2 (4 Ω).
- **Teaches:** branches and parallel; each branch has the full voltage and
  takes its own current; the battery supplies the sum, I = I1 + I2; every
  added branch raises the battery's current; the fuse.
- **The learner:** closes the switch (I1 stays at 2 A, R2 takes 3 A of its
  own), then lowers R2 to 2 Ω (6 A in that branch, 8 A from the battery).
- **Checks:** the battery's current from two branches; I2 from I and I1; R2
  from V, I and I1.
- **The fault:** 2 A + 3 A + 4 A = 9 A through an 8 A fuse. The cool box needs
  a circuit of its own.
- **Left out:** the formula for resistances in parallel. See Part 2, №0008.

### №0006 The crackling knob: voltage dividers

- **Customer:** Ines, with a portable radio. **Needs:** №0004, and the
  prefixes from №0003.
- **Circuit:** 9 V across R1 (2 kΩ) and R2 (1 kΩ), with the output taken
  across R2.
- **Teaches:** working in kilohms and milliamps (volts ÷ kilohms = milliamps);
  the voltage divider; the share depends on how the resistances compare, not
  on their size; Vout = V × R2 ÷ (R1 + R2); the volume control as a divider
  with a sliding contact, the wiper.
- **The learner:** sets R1 to 1 kΩ (half: 4.5 V), then to 5 kΩ (a sixth:
  1.5 V).
- **Checks:** Vout for two pairs of resistors; the battery's voltage from
  Vout; which way the wiper moves for more volume.
- **The fault:** a worn strip makes poor contact with the wiper.

### №0007 The numbers that don't add up: Kirchhoff's laws

- **Customer:** Rita. **Needs:** №0004 and №0005.
- **Circuit:** a battery, R1 (2 Ω) in series with it, then R2 (6 Ω) and
  R3 (3 Ω) side by side.
- **Teaches:** junction and loop; the current law, I1 = I2 + I3; the voltage
  law, V = V1 + V2; parts joined to the same two points have the same voltage;
  using both laws to catch a wrong reading.
- **The learner:** changes R3 to 6 Ω and sees that the junction still
  balances (2.4 A in, 1.2 A and 1.2 A out).
- **Checks:** the voltage across R3 from a second loop; I3 from I1 and I2; V2
  from V and V1; V from V1 and V2; two sets of pencilled readings that do not
  balance.
- **The fault:** not in the set. A reading was wrong: measure again before
  changing a part.

## Where each term comes in

| Job | Terms |
|---|---|
| №0001 | source, load, switch, schematic, current, ampere (A), circuit, closed circuit, open circuit |
| №0002 | resistor, voltage, volt (V), resistance, ohm (Ω), Ohm's law, short circuit |
| №0003 | power, watt (W), milli (m), kilo (k), power rating |
| №0004 | series |
| №0005 | branch, parallel, fuse |
| №0006 | voltage divider, Vout, wiper |
| №0007 | junction, loop, Kirchhoff's current law, Kirchhoff's voltage law |

A job may use a term only if it comes in at that job or an earlier one.

## Part 2: Parts (planned, not written)

A proposed order. Nothing here is fixed: change it when a better one turns up.

The first four jobs fill gaps Part 1 leaves, and the rest bring in one new
part at a time.

| № | Lesson | New idea | Needs |
|---|---|---|---|
| 0008 | Combining resistors | Resistances in parallel: 1/R = 1/R1 + 1/R2. Boiling a mixed network down to one resistance, a step at a time | №0005, №0007 |
| 0009 | Voltage at a point | Voltage is always between two points. Ground as the point everything is measured from. Meter across a part for volts, in line for amps | №0007 |
| 0010 | The real battery | Internal resistance: why a tired battery reads full with nothing connected and sags under load | №0006 |
| 0011 | The loaded divider | Whatever is connected to Vout is a branch across R2, so it pulls Vout down | №0006, №0008 |
| 0012 | Capacitors | A part that stores charge. Charging and discharging through a resistor. The time constant, R × C | №0002 |
| 0013 | Diodes | Current one way only. The forward drop of about 0.7 V | №0007 |
| 0014 | LEDs | A diode that lights. Working out its series resistor | №0013, №0003 |
| 0015 | Alternating current | Voltage that swings both ways. Frequency, peak and RMS | №0009 |
| 0016 | The power supply | Diode and capacitor together turn AC into steady DC. Ripple, and the hum of a worn-out capacitor | №0012, №0013, №0015 |
| 0017 | Coils and relays | The inductor resists changes in current. A coil as a magnet that works a switch | №0012 |
| 0018 | The transistor as a switch | A small current turns a large one on and off | №0013, №0009 |
| 0019 | The transistor as an amplifier | A small change in makes a large change out | №0018, №0006 |

### What the lesson player lacks for Part 2

- **Readings that change with time** (№0012, №0015, №0016, №0017). A number
  question's answer has to match the simulator exactly, and readouts show one
  value at a time. These jobs need a trace of a reading over time, and
  questions about a moment or a settled state.
- **Readings at a point** (№0009). Measures are taken across or through a
  two-ended part. Voltage at a point against ground is not a quantity yet.
- **Three-legged parts** (№0018, №0019). A transistor has three currents and
  three voltages, so a measure needs to say which.
- **Peak and RMS** (№0015, №0016). There is no averaged reading.

## Adding a job

[`LESSON_BLUEPRINT.md`](LESSON_BLUEPRINT.md) says how to write one, in full.
In short:

1. Write the lesson in `src/lessons/`, in the format of
   [`src/lesson/types.ts`](src/lesson/types.ts), and put it in its place in
   `src/lessons/index.ts`.
2. Run `npm test`: it checks every answer against the simulator, and that
   every goal can be reached.
3. Play it through in the browser, on a wide screen and a phone.
4. Add its entry here, and move its row out of Part 2 if it was planned.
5. Update the lessons row in the [README](README.md).
