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
| 0008 | The silent speaker | Combining resistors (`combining-resistors`) | A group of resistors acts as one: its equivalent resistance | R = R2 × R3 ÷ (R2 + R3) |
| 0009 | The tape that won't turn | The loaded divider (`loaded-divider`) | Whatever a divider feeds is a branch across R2, and pulls Vout down | Vout = V × R ÷ (R1 + R) |
| 0010 | The batteries that read fine | The real battery (`real-battery`) | A battery has resistance inside it, so its voltage sags under load | Vout = V × R ÷ (Ri + R), Ri = (V − Vout) ÷ I |

№0001 to №0007 are the fundamentals. №0008 to №0010 fill gaps those leave,
still with nothing but batteries, resistors and switches.

### №0001 First day on the bench: the closed loop

- **Customer:** Rita, who runs the shop. **Needs:** nothing.
- **Circuit:** a 12 V battery, a switch and a lamp in one loop.
- **Teaches:** source, load and switch; the schematic and its symbols;
  current, in amperes; the circuit as a complete loop; current is the same all
  round the loop and is not used up; closed circuit and open circuit.
- **The learner:** closes the switch (the lamp lights, 2 A flows), then opens
  it (the current stops in every wire).
- **Checks:** where the current is biggest (the same all round); what a flat
  battery has run out of (energy, not charge or current); whether current
  flows in the far wire with the switch open (none); whether a switch after
  the lamp would still put it out (yes); the likeliest fault when a good lamp
  on a good battery stays dark (a gap in the loop).
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
  V from I and R, R from V and I. Then one in two steps: the current on 18 V,
  from a reading taken on 6 V (the resistance stays what it was).

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
  and R1; six equal lamps on 12 V (2 V each); what the meter reads across the
  dead lamp (the full supply).
- **The fault:** one burnt-out lamp opens the only path, so the whole string
  goes dark. With no current the good lamps drop nothing, so the meter finds
  the dead one: it has the whole supply across it.

### №0005 The fuse that keeps blowing: parallel circuits

- **Customer:** Lena, with a camper van. **Needs:** №0004.
- **Circuit:** a battery with two branches: R1 (6 Ω), and a switch with
  R2 (4 Ω).
- **Teaches:** branches and parallel; each branch has the full voltage and
  takes its own current; the battery supplies the sum, I = I1 + I2; every
  added branch raises the battery's current; the fuse.
- **The learner:** closes the switch (I1 stays at 2 A, R2 takes 3 A of its
  own), then lowers R2 to 2 Ω (6 A in that branch, 8 A from the battery).
- **Checks:** whether all the current takes the easier branch (no: both carry
  some); the battery's current from two branches; I2 from I and I1; R2 from V,
  I and I1; what a gap in one branch does to the others (nothing).
- **The fault:** 2 A + 3 A + 4 A = 9 A through an 8 A fuse. The cool box needs
  a circuit of its own.
- **Left out:** the formula for resistances in parallel. See №0008.

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
  1.5 V), then doubles the battery to 18 V (Vout doubles, and is still a
  third).
- **Checks:** Vout for two pairs of resistors; the battery's voltage from
  Vout; Vout with the wiper a quarter of the way up the strip; which way the
  wiper moves for more volume.
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
- **Checks:** the voltage across R3 from a second loop; why a change to R3
  alone moves the current in R2 (R1 drops less, so the branches get more);
  I3 from I1 and I2; V2 from V and V1; V from V1 and V2; where the 2 V missing
  between a battery and its lamp have gone (across the wiring); two sets of
  pencilled readings that do not balance.
- **The fault:** not in the set. A reading was wrong: measure again before
  changing a part.

### №0008 The silent speaker: combining resistors

- **Customer:** Tomasz, with a hi-fi amplifier. **Needs:** №0005 and №0007.
- **Circuit:** the one from №0007: R1 (2 Ω) in series with a 12 V battery,
  then R2 (6 Ω) and R3 (3 Ω) side by side. The battery stays at 12 V.
- **Teaches:** equivalent resistance; two resistors side by side act as one
  smaller one, R = R2 × R3 ÷ (R2 + R3); two checks to carry about (a pair is
  always less than its smaller resistor, and an equal pair is half); boiling
  a circuit down a pair at a time, then working back out to every reading.
- **The learner:** makes R3 equal to R2, and sees the pair take twice the
  current of one, so act as half the resistance.
- **Checks:** what an equal pair acts as; an estimate for 12 Ω beside 6 Ω;
  which two to combine first (R2 and R3: a branch leaves between R1 and R2);
  I1 from three resistances; I3 from the current into a pair; what goes
  beside a 3 Ω to make 2 Ω; which pair from the drawer stands in for a 5 Ω.
- **The fault:** a 5 Ω resistor has burnt open, and the drawer has none. Two
  10 Ω side by side do its job.

### №0009 The tape that won't turn: the loaded divider

- **Customer:** Mrs. Adeyemi, with a cassette player. **Needs:** №0006 and
  №0008.
- **Circuit:** the divider of №0006 (9 V, R1 2 kΩ, R2 1 kΩ), with a switch
  and a load, RL, across R2.
- **Teaches:** a load is a branch across R2, so the bottom of the divider is
  R2 and the load side by side, and Vout falls; Vout = V × R ÷ (R1 + R), with
  the pair's equivalent resistance as R; loading; the rule of thumb (a load
  of ten times R2 or more barely moves Vout); as Vout falls, the voltage
  across R1 rises; a meter is a very light load, so measure an output with
  its load connected.
- **The learner:** switches in a 1 kΩ load (Vout falls from 3 V to 1.8 V),
  then raises it to 10 kΩ (2.81 V).
- **Checks:** what R2 and an equal load make together; Vout under two loads;
  which load barely moves Vout; what the voltage across R1 did, and its
  value; what a 40 Ω player gets from two 2 kΩ resistors on 12 V.
- **The fault:** a home-made divider lead reads 6 V with nothing plugged in.
  The player's 40 Ω pulls that to about 0.2 V. It needs a proper car adaptor.

### №0010 The batteries that read fine: the real battery

- **Customer:** Mr. Castellano, with a portable television. **Needs:** №0006.
- **Circuit:** a 12 V battery with its internal resistance, Ri (20 Ω), drawn
  in series; a meter across the terminals; then a switch and the set, R
  (10 Ω). The meter is CircuitJS1's voltmeter, which draws no current: the
  first lesson with a meter on the drawing.
- **Teaches:** internal resistance; Ri and the set are a voltage divider,
  Vout = V × R ÷ (Ri + R); with no current nothing is lost inside, so a worn
  battery reads full on a meter alone; finding Ri from two readings,
  Ri = (V − Vout) ÷ I; test a battery under load.
- **The learner:** switches the set on (12 V falls to 4 V), lowers Ri to 2 Ω
  (10 V), then switches off and raises Ri again (the meter stays at 12 V).
- **Checks:** where the missing 8 V are; the terminal voltage from Ri and the
  set; why a worn battery reads full; Ri from two readings; why his set is
  still dead.
- **The fault:** the batteries' internal resistance has grown with age. They
  lose 8 V inside and give the set only 4 V.

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
| №0008 | equivalent resistance |
| №0009 | loading |
| №0010 | internal resistance |

A job may use a term only if it comes in at that job or an earlier one.

## Part 2: Parts (planned, not written)

A proposed order. Nothing here is fixed: change it when a better one turns up.

The first job gives voltage a place to be measured from, and the rest bring
in one new part at a time.

[`RESEARCH.md`](RESEARCH.md) has a section for each of these: how other
courses teach it, exercises to adapt, and what to build the job round. Read
it before writing one.

| № | Lesson | New idea | Needs |
|---|---|---|---|
| 0011 | Voltage at a point | Voltage is always between two points. Ground as the point everything is measured from. Meter across a part for volts, in line for amps. The fault is found by readings at test points: the full supply across an open part, 0 V across a shorted one | №0007 |
| 0012 | Capacitors | A part that stores charge. Charging and discharging through a resistor. The time constant, R × C | №0002 |
| 0013 | Diodes | Current one way only. The forward drop of about 0.7 V | №0007 |
| 0014 | LEDs | A diode that lights. Working out its series resistor | №0013, №0003 |
| 0015 | Alternating current | Voltage that swings both ways. Frequency, peak and RMS | №0011 |
| 0016 | The power supply | Diode and capacitor together turn AC into steady DC. Ripple, and the hum of a worn-out capacitor | №0012, №0013, №0015 |
| 0017 | Coils | The inductor resists changes in current: it cannot start or stop at once. The time constant, L ÷ R. The kick when a coil is switched off, and the diode across it that takes the kick | №0012, №0013 |
| 0018 | Relays | A coil as a magnet that works a switch: a small current in one circuit switches a large one in another. Normally open and normally closed contacts | №0005, №0017 |
| 0019 | The transistor as a switch | A small current turns a large one on and off, as the relay did, with nothing that moves | №0013, №0011, №0018 |
| 0020 | The transistor as an amplifier | A small change in makes a large change out | №0019, №0006 |

### What the lesson player lacks for Part 2

- **Readings that change with time** (№0012, №0015, №0016, №0017). A number
  question's answer has to match the simulator exactly, and readouts show one
  value at a time. These jobs need a trace of a reading over time, and
  questions about a moment or a settled state.
- **Readings at a point** (№0011). Measures are taken across or through a
  two-ended part. Voltage at a point against ground is not a quantity yet.
- **Parts with more than two ends** (№0018, №0019, №0020). A relay has a
  coil and a set of contacts, and a transistor has three currents and three
  voltages, so a measure needs to say which.
- **Peak and RMS** (№0015, №0016). There is no averaged reading.
- **Answers that are only nearly round** (№0013, №0014). A diode's drop is
  about 0.7 V, never exactly, and the tests hold every stated answer to the
  simulator's value to nine places. These jobs need number questions that
  accept "about".

## Adding a job

[`LESSON_BLUEPRINT.md`](LESSON_BLUEPRINT.md) says how to write one, in full.
In short:

1. Read the job's section in [`RESEARCH.md`](RESEARCH.md). Then write the
   lesson in `src/lessons/`, in the format of
   [`src/lesson/types.ts`](src/lesson/types.ts), and put it in its place in
   `src/lessons/index.ts`.
2. Run `npm test`: it checks every answer against the simulator, and that
   every goal can be reached.
3. Play it through in the browser, on a wide screen and a phone.
4. Add its entry here, and move its row out of Part 2 if it was planned.
5. Update the lessons row in the [README](README.md).
