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
only after all of that: one job for each part, from the fuse to the MOSFET.

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

## Part 2: Parts (written)

One job for each part a repairer meets in a set. Every part job answers the
same four things: how the part works, what it is for, where you meet it, and
how to tell a good one from a dead one. The arc is in
[`LESSON_BLUEPRINT.md`](LESSON_BLUEPRINT.md), section 6a.

| № | Job | Lesson (`id`) | New idea | Formula |
|---|---|---|---|---|
| 0011 | The radio that ate fuses | The fuse (`fuse`) | A weak link put in on purpose: a thin wire that melts when the current stays above its rating, and opens the loop before the wiring burns | |
| 0012 | The gauge that stays cold | The thermistor (`thermistor`) | A resistor whose resistance falls as it warms turns a temperature into a voltage in a divider | Vout = V × Rt ÷ (R1 + Rt) |
| 0013 | The flash that's never ready | The capacitor (`capacitor`) | A capacitor stores charge: through a resistor it fills ever more slowly until it has the supply's voltage, then holds it | I = (V − Vc) ÷ R, T = R × C, Vc = V × RL ÷ (R + RL) |
| 0014 | Dead either way round | The diode (`diode`) | Current one way only, and a nearly fixed forward drop when it conducts | V = Vd + VR |
| 0015 | The dark stereo light | The LED (`led`) | A diode that gives light, and needs a resistor in series to set its current | R = (V − VLED) ÷ I |
| 0016 | Worse with every rev | The Zener diode (`zener`) | A diode fitted backwards on purpose holds a steady voltage, whatever the supply and the load do, within limits | Is = (V − Vout) ÷ Rs |
| 0017 | The silent chime | The coil (`coil`) | A coil resists any change in its current: slow to build, and a kick when it is cut off | I = V ÷ Rw, V = I × R |
| 0018 | The set that clicks but stays dark | The relay (`relay`) | A small current in a coil pulls shut contacts that carry a large current in another loop | Ic = V ÷ Rcoil, I = V ÷ (Rc + R) |
| 0019 | The bell that rings at once | The transistor (`transistor`) | A small current into the base lets a large one flow from collector to emitter: a switch worked by a current, with nothing that moves | Ib = (V − 0.7) ÷ Rb |
| 0020 | The flasher that went dark | The MOSFET (`mosfet`) | A switch worked by the voltage on its gate, which takes no current | Vds = I × Ron |

Two fault signs from Part 1 run through all ten: an open part has the full
supply across it and passes no current, and a shorted part has 0 V across it.
Each drawing has its fault built in, as a switch across or in line with the
part, or as a resistor drawn as part of it.

### №0011 The radio that ate fuses: the fuse

- **Customer:** Mr. Brennan, with a car radio. **Needs:** №0003, №0004 and
  №0005.
- **Circuit:** a 12 V battery, a 3 A fuse along the top and the radio, R
  (6 Ω, 2 A), down the right, with a reading across the fuse. The fuse is
  CircuitJS1's own: it really melts, and stays blown until a step resets it.
- **Teaches:** what is inside a fuse; twice the current makes four times the
  heat in its wire; blown; it is the thinnest wire in the loop, so it goes
  before the wiring burns; it guards the wiring and the set against fire, not
  people against shock; its rating, and choosing one so the set takes no more
  than three-quarters of it; slow-blow; where fuses sit in car radios, cars,
  televisions and mains plugs; good or blown, by eye, in the set (next to
  nothing across a good one, the full supply across a blown one) and on ohms
  (continuity); one new fuse is a fair test, a second blow means the fault is
  still there; never a bigger fuse, never a bridge.
- **The learner:** lowers R to 3 Ω. With 4 A through it the fuse glows and
  blows in about two seconds, the current stops, and the reading across it
  jumps to 12 V.
- **Checks:** how much more heat twice the current makes; what a fuse guards
  against; the least resistance a 3 A fuse allows on 12 V (4 Ω); which fuse
  for a 1.5 A player (2 A); a meter across a blown fuse on 24 V (24 V); what
  to do with a fuse that reads 0 Ω (put it back); what has been blowing his
  fuses.
- **The fault:** a short in the radio (1 Ω, so 12 A) blew every fuse. The
  fuse was the messenger. Wrapped in silver paper, the last one could not
  melt, so the wire behind the dashboard did.

### №0012 The gauge that stays cold: the thermistor

- **Customer:** Yusuf, with a taxi. **Needs:** №0006 and №0009.
- **Circuit:** 12 V across R1 (2 kΩ) and a thermistor (10 kΩ at 25 °C, 4 kΩ
  at 50 °C) with a temperature slider. A meter stands for the gauge and reads
  Vout across the thermistor and its wire. A "Wire" switch is in line with
  the thermistor, and a "Short" switch across it.
- **Teaches:** the thermistor, a bead of baked metal oxides whose resistance
  falls as it warms; the other kind, which rises; why it sits in a divider (a
  gauge reads a voltage, not a resistance); the sensor;
  Vout = V × Rt ÷ (R1 + Rt); which way Vout moves depends on where the sensor
  sits; where it is met (a car's temperature sender, and the surge limiter
  and degaussing part of a colour set); its marking, the resistance at 25 °C;
  the bench test (near its marking, then a slow fall in the fingers); in the
  set, stuck at the full supply is open and stuck at 0 V is shorted; the
  light-dependent resistor as the same trick with light.
- **The learner:** warms it from 25 °C to 50 °C (Vout falls from 10 V to
  8 V). Opens the wire and warms it to 90 °C (Vout stays at 12 V). Closes the
  short and cools it to 25 °C (Vout stays at 0 V).
- **Checks:** why Vout fell; Vout at 90 °C (4.5 V); the temperature from a
  reading (50 °C); which way Vout moves with the two parts swapped; whether
  12.2 kΩ at 20 °C is a fault (no); Yusuf's 12 V reading.
- **The fault:** the wire to the sender has come off. With no current, R1
  drops nothing, so the gauge sees the whole supply and reads colder than
  cold.

### №0013 The flash that's never ready: the capacitor

- **Customer:** Mrs. Nakamura, with a camera flashgun. **Needs:** №0002,
  №0004 and №0006.
- **Circuit:** a 12 V battery, a switch and R (10 kΩ) along the top, and the
  capacitor C (100 µF) down the right. Across C, a second branch: a switch
  and RL. With the battery's switch open, RL empties C. With both closed, RL
  stands for a leak inside C. It runs in real time: R × C is 1 s.
- **Teaches:** two plates and an insulator that nothing crosses; charging,
  and why the current dies away, I = (V − Vc) ÷ R; a full capacitor passes
  no steady current; it holds its charge when cut off; discharging, and
  making a set safe before touching it; capacitance, the farad and micro;
  working voltage; the electrolytic, its stripe and why polarity matters;
  smoothing, coupling, timing and the flash, T = R × C; a leaky capacitor as
  a good one with a resistor across it, Vc = V × RL ÷ (R + RL); good or
  faulty in the set and on ohms (kick and fall, stays at zero, stops short,
  no kick); swapping in a known good one.
- **The learner:** closes the switch (Vc climbs to 12 V as the current falls
  from 1.2 mA to nothing). Opens it (C holds 12 V), then puts RL across C (it
  empties).
- **Checks:** why the current falls; Vc with a 50 kΩ leak (10 V); the leak
  from Vc = 4 V through 20 kΩ (10 kΩ); whether a right reading in the set
  proves a capacitor good (no: an open one reads the same); the flashgun.
- **The fault:** the flashgun's big electrolytic went leaky after years in a
  drawer. The leak shares the voltage, so it never fills.
- **Left out:** a dried-out electrolytic's hum and ripple, which need AC
  (the power supply job).

### №0014 Dead either way round: the diode

- **Customer:** Dev, with a walkie-talkie. **Needs:** №0004, №0007 and
  №0010.
- **Circuit:** a battery (−12 V to 12 V), R (1 kΩ) and a diode in one loop,
  with a meter across the diode. Two fault switches: Break, in line with the
  diode, and Short, across it.
- **Teaches:** the diode, anode and cathode; the arrow and bar of the symbol,
  and the band on the part; forward and reverse; the forward drop, about
  0.6 V in this simulator (books say 0.7 V); V = Vd + VR; where it is met
  (mains supplies and coils, named only; the protection diode in a battery
  lead); known by its number; its two ratings (current, and the reverse
  voltage it stands); how it fails, shorted first; in the set, about 0.6 V
  across a good one, the full supply across an open one, 0 V across a
  shorted one, and backwards reads like open; on ohms, a reading one way
  only.
- **The learner:** turns the battery round (the current stops, with 12 V
  across the diode). Raises it from 0 V to 12 V (Vd creeps to 0.57 V while R
  takes the rest). Closes Short (0 V across the diode).
- **Checks:** what flows in reverse; what Vd did as the battery rose; VR on
  9 V (about 8.4 V); which part replaces a 1N4004; the meter across an open
  diode on 9 V (9 V); Dev's fault.
- **The fault:** the protection diode in the battery lead has gone open: 9 V
  across it and 0 V across the set, and on ohms it reads neither way, so it
  is not just in backwards.

### №0015 The dark stereo light: the LED

- **Customer:** Miss Abara, with a hi-fi tuner. **Needs:** №0003, №0007 and
  №0014.
- **Circuit:** a 9 V battery, R (680 Ω) along the top, then a switch S and a
  red LED down the right, with a meter across S and the LED together. S
  stands for the hair-thin wire inside the LED: open, it is the LED gone
  open.
- **Teaches:** the LED, a diode whose material gives light; the material
  sets the colour (red, yellow and green in 1984); its drop, about 1.8 V for
  red; the light follows the current, not the voltage; the series resistor,
  R = (V − VLED) ÷ I, rounded up to the next value in the drawer; the power
  in the resistor on a high supply; where LEDs sit; which lead is the
  cathode; it stands only about 5 V in reverse; how LEDs fail (they fade, or
  go open); the fault signs in the set, and why the meter can call a good one
  open.
- **The learner:** drags R from 3 kΩ to 500 Ω (the LED brightens as the
  current rises six times, and its voltage hardly moves). Opens S (dark, with
  9 V across the LED and 0 V across R).
- **Checks:** what the LED's voltage did; the resistor for 15 mA on 12 V
  (680 Ω); 560 Ω or 680 Ω for a 600 Ω sum (round up); the current on 24 V
  through 1.5 kΩ (about 14.8 mA); whether a ¼ W resistor will do there (no);
  what a good LED fitted backwards reads (the full supply); a dark LED with
  0 V across it (LED shorted, or R open); a good LED the meter calls open;
  her stereo light.
- **The fault:** the LED has gone open: the full supply across it and nothing
  across its resistor.

### №0016 Worse with every rev: the Zener diode

- **Customer:** Mr. Halvorsen, with a CB radio. **Needs:** №0007, №0009 and
  №0014.
- **Circuit:** the loaded divider of №0009 with a 5.6 V Zener diode where R2
  was, cathode to +. A battery with a slider, Rs (400 Ω) along the top, the
  Zener with a Break switch in line with it, and a switch and the load, RL
  (560 Ω), beside it. A meter reads the output.
- **Teaches:** the Zener diode, used in reverse; its Zener voltage (below it
  next to nothing flows, at it any current flows and the voltage barely
  moves); forward, an ordinary diode; the regulator; Rs drops the difference
  and limits the current, Is = (V − Vout) ÷ Rs; the Zener takes what the load
  leaves; the test for whether it can hold (take it out: do Rs and the load
  alone give more than its voltage?); its two ratings and its marking; it
  runs hottest with the load off; where it is met; faults: shorted (0 V, hot
  Rs), open (the output rides up), backwards (about 0.6 V); the meter on
  ohms cannot reach the Zener voltage.
- **The learner:** raises the battery from 0 V (the output follows to about
  5.6 V and stops). Switches the load on (the output stays, and the Zener
  gives up 10 mA). Lowers the battery to 6 V (the Zener lets go). With Break
  open, raises it from 12 V to 14 V (the output follows).
- **Checks:** where the rest of the 12 V is (across Rs); what Is does when
  the load comes on (hardly changes); Is at 14 V (about 21 mA); the output on
  9 V with the load on (5.25 V: the Zener does nothing); a 5V6 line that
  reads 7 V and climbs with the revs.
- **The fault:** the Zener holding one line of the set has failed open. Rs
  and the load are left as a plain divider, so the line follows the car's
  voltage.

### №0017 The silent chime: the coil

- **Customer:** Mrs. Farouk, with a door chime. **Needs:** №0002, №0013 and
  №0014.
- **Circuit:** a 12 V battery and a main switch, then three columns side by
  side: R (120 Ω), which stands for whatever the kick would jump through; a
  switch and a diode in reverse; and the coil, L (4 H), with its winding's
  resistance, Rw (24 Ω), drawn in series. A switch marked "break" is in line
  with the coil. It runs at about a seventh of real time.
- **Teaches:** the coil, or inductor, and its winding; a current makes it a
  magnet, and it pushes back against any change; the rise follows the
  capacitor's curve; inductance, in henries; on a steady current a coil is
  only its winding, I = V ÷ Rw; the kick, V = I × R, up to thousands of volts
  as a spark; it burns switches and kills transistors; the diode across the
  coil that tames it; chokes and tuning coils; markings; an open winding (the
  full supply across it, no current, no continuity); shorted turns, which the
  meter cannot find.
- **The learner:** closes the switch (the current climbs to 0.5 A over some
  seconds). Opens it (the voltage across the coil leaps to several times the
  battery's for an instant). Brings the diode in and opens it again (under a
  volt, and the current dies away gently).
- **Checks:** what held the current back; the steady current through a 40 Ω
  winding (0.3 A); where the high voltage came from; the current from a 48 V
  kick across 120 Ω (0.4 A); why the diode stops the kick; the chime.
- **The fault:** the chime's coil has an open winding: the full supply across
  it with the button pressed, and no current.
- **Left out:** the time constant L ÷ R, and a trace of the rise and the
  kick: the player has none yet.

### №0018 The set that clicks but stays dark: the relay

- **Customer:** Giorgos, with a remote-control television. **Needs:** №0004,
  №0011 and №0017.
- **Circuit:** one 12 V battery and two loops. The coil loop: a button, a
  switch named Winding (open, it is a broken winding) and the relay's 120 Ω
  coil. The contact loop: the normally open contact, Rc (the contacts' own
  resistance: 4 mΩ clean, ohms when burnt) and a 4 Ω load, R. A meter, Vc,
  reads across the contacts and Rc.
- **Teaches:** the relay and its contacts: a coil on an iron core, a sprung
  iron arm, the click; the two loops share only the magnet's pull, so a
  small switch or a low voltage can work a heavy or a mains load; the relay
  supplies nothing, it only switches; normally open and normally closed;
  ratings on the case; where relays sit (a car's starter and horns, the
  mains switch of a remote-control set); the diode across the coil; burnt
  contacts as a resistance in series with the load; the method: listen for
  the click, read volts on the coil, read volts across the contacts under
  load; a meter on ohms cannot judge a contact.
- **The learner:** presses the button (100 mA in the coil, 3 A in the load).
  Presses it with Rc at 2 Ω (a click, but 2 A, and 4 V across the closed
  contacts).
- **Checks:** where the load's amps come from (the battery); which contact
  lights a lamp only while the button is up (normally closed); Vc across 8 Ω
  contacts (8 V); Rc from 9 V across the contacts (12 Ω); what 0.6 Ω on ohms
  proves (nothing); Giorgos's set.
- **The fault:** the coil pulls in, which is the click, but the burnt
  contacts drop the volts that should reach the set.

### №0019 The bell that rings at once: the transistor

- **Customer:** Carmen, with a burglar alarm. **Needs:** №0004, №0014 and
  №0018.
- **Circuit:** 12 V. A switch, standing in for the alarm, and a base
  resistor, Rb (10 kΩ), feed the base of an NPN transistor with a gain of
  100. The bell, a 120 Ω resistor, runs from the supply to the collector. A
  meter reads across collector and emitter, and a switch marked Short is
  across them too.
- **Teaches:** the transistor as a switch worked by a current; base,
  collector and emitter; base to emitter is a diode, so a resistor must set
  the base current; the bell's current comes from the battery, not the base;
  gain as a ceiling, not a promise; base current to spare, so it turns fully
  on with about 0.2 V left across it, Ib = (V − 0.7) ÷ Rb; where transistor
  switches sit, and two type numbers of the time; good or faulty by three
  readings; on ohms, two diodes joined at the base, and the collector to
  emitter pair checked too.
- **The learner:** closes the switch (1.13 mA into the base, 98.6 mA through
  the bell, 0.17 V across the transistor). Lowers Rb to 1 kΩ (ten times the
  base current, and the bell hardly moves). Closes Short with the base
  switch open (the bell rings with 0 V across the transistor).
- **Checks:** where the bell's current comes from; why ten times the base
  current hardly moved it; the base current through 4.7 kΩ (about 2.4 mA);
  the largest Rb for a 100 mA bell (11.3 kΩ, so fit 10 kΩ); an open
  transistor from its readings; Carmen's bell.
- **The fault:** the transistor has shorted collector to emitter. 0 V base
  to emitter says nothing is calling for the bell, and 0 V across the
  transistor says it is on anyway.

### №0020 The flasher that went dark: the MOSFET

- **Customer:** Bea, with a lamp flasher she built from a magazine kit.
  **Needs:** №0006, №0013 and №0019.
- **Circuit:** the transistor's loop with a MOSFET in its place: 12 V, a
  12 Ω lamp and the MOSFET below it (threshold 3 V, 0.5 Ω fully on). A
  second battery, Vg, stands in for the flasher's timer and feeds the gate
  through RG (10 kΩ). Meters read gate to source and drain to source. A
  fault switch puts Rf (2 kΩ) from gate to source: a leak through a holed
  gate film.
- **Teaches:** the MOSFET's gate, drain and source; the gate is a plate on a
  very thin film, a tiny capacitor that takes no current once charged; never
  leave a gate joined to nothing; threshold voltage, where it starts to
  conduct, not where it is on; half on, it heats; fully on, a small
  resistance, Vds = I × Ron; where it is met in 1984; ratings from a data
  sheet; good or faulty in the set; the meter test and its trap (a charged
  gate reads as a short); static.
- **The learner:** raises Vg to 4 V (the lamp starts after 3 V, and RG
  carries nothing), then to 10 V (fully on). Drops it to 0 V. Closes the
  fault switch (RG carries 1 mA, the gate falls to 2 V and the lamp goes
  dark).
- **Checks:** what the gate needs to stay on (only a voltage); Vds from Ron
  and the current (0.48 V); what to do first when a new one reads shorted
  (short gate to source); Vgs through the leak (1.5 V); Bea's flasher.
- **The fault:** static from her fingers holed the gate film. The gate now
  takes current, RG drops 10 V, and the gate never reaches its threshold.

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
| №0011 | rating (of a fuse), blown, slow-blow, continuity |
| №0012 | thermistor, sensor |
| №0013 | capacitor, charging, discharging, capacitance, farad (F), micro (µ), electrolytic, leaky |
| №0014 | diode, anode, cathode, forward, reverse, forward drop |
| №0015 | LED, series resistor |
| №0016 | Zener diode, Zener voltage, regulator |
| №0017 | coil (inductor), winding, inductance, henry (H), the kick, choke |
| №0018 | relay, contacts, normally open, normally closed |
| №0019 | transistor, base, collector, emitter, gain |
| №0020 | MOSFET, gate, drain, source (of a MOSFET), threshold voltage |

A job may use a term only if it comes in at that job or an earlier one.

## Part 3: planned, not written

A proposed order. Nothing here is fixed: change it when a better one turns up.

[`RESEARCH.md`](RESEARCH.md) has a section for each of the first five: how
other courses teach it, exercises to adapt, and what to build the job round.
Read it before writing one.

| № | Lesson | New idea | Needs |
|---|---|---|---|
| 0021 | Voltage at a point | Voltage is always between two points. Ground as the point everything is measured from. The fault is found by readings at test points | №0007 |
| 0022 | Alternating current | Voltage that swings both ways. Frequency, peak and RMS | №0021 |
| 0023 | The transformer | Two coils on one core change an alternating voltage by their turns, and pass nothing steady. An open winding, and shorted turns that run it hot | №0017, №0022 |
| 0024 | The power supply | Transformer, diodes and capacitor together turn the mains into steady DC. Ripple, and the hum of a dried-out capacitor | №0013, №0014, №0023 |
| 0025 | The transistor as an amplifier | A small change in makes a large change out | №0019, №0006 |

Parts with no job yet, and no place in the order: the potentiometer as a part
in its own right (№0006 teaches its divider and its worn strip), the
loudspeaker and the motor, and the chip: a regulator, an amplifier, a timer.

### What the lesson player lacks for Part 3

- **A trace of a reading over time** (№0022, №0024). Readouts show one value
  at a time. The capacitor and the coil make do with readouts that move, and
  questions about the circuit at rest. Alternating current cannot.
- **Readings at a point** (№0021). Measures are taken across or through a
  two-ended part. Voltage at a point against ground is not a quantity yet.
- **Peak and RMS** (№0022 to №0024). There is no averaged reading.
- **Parts with more than two ends** have no reading of their own. The relay,
  the transistor and the MOSFET are read through the two-ended parts round
  them, and a transformer can be too.

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
4. Add its entry here, and move its row out of Part 3 if it was planned.
5. Update the lessons row in the [README](README.md).
