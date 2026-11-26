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
   readings first. The rule and its formula come after. Part jobs have no
   formulas and no sums: see Part 2.
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

Part jobs teach repairing, not designing, so the learner never works out a
number. They come away with a picture of the part, and the readings and signs
that tell a technician at a glance that one is good, open, shorted or leaky:
the way a repairer can tell a shorted capacitor, a dead diode or a blown fuse
on sight. (Until 26 November 2026 each part job had a formula and number
questions. They were taken out on the course owner's view that a first
meeting with a part should be about how it works and how it fails.)

| № | Job | Lesson (`id`) | New idea |
|---|---|---|---|
| 0011 | The radio that ate fuses | The fuse (`fuse`) | A weak link put in on purpose: a thin wire that melts before the wiring burns, with next to nothing across it when good and the full supply when blown |
| 0012 | The gauge that stays cold | The thermistor (`thermistor`) | A resistor whose resistance falls as it warms turns heat into a reading on a gauge, and a reading stuck at either end marks it open or shorted |
| 0013 | The flash that's never ready | The capacitor (`capacitor`) | A capacitor stores charge: it fills ever more slowly, then holds it and passes no steady current, so a leaky or shorted one shows on the meter |
| 0014 | Dead either way round | The diode (`diode`) | Current one way only, with about 0.6 V across it when it conducts; good, open and shorted each read differently, in the set and on ohms |
| 0015 | The dark stereo light | The LED (`led`) | A diode that gives light: its light follows the current, so it needs a resistor in series to hold that current down |
| 0016 | Worse with every rev | The Zener diode (`zener`) | A diode fitted backwards on purpose holds a line steady, and the line's reading tells a good one from an open, shorted or backwards one |
| 0017 | The silent chime | The coil (`coil`) | A coil resists any change in its current: slow to build, and a kick when it is cut off, which a diode across it tames |
| 0018 | The set that clicks but stays dark | The relay (`relay`) | A coil's pull shuts contacts in another loop; the click, the volts on the coil and the volts across the closed contacts tell which part has failed |
| 0019 | The bell that rings at once | The transistor (`transistor`) | A small current into the base lets a large one flow from collector to emitter: a switch worked by a current, which a good one shows by sitting fully off or fully on |
| 0020 | The flasher that went dark | The MOSFET (`mosfet`) | A switch worked by the voltage on its gate, which takes no current: a gate that does take current has been holed |

Two fault signs from Part 1 run through all ten: an open part has the full
supply across it and passes no current, and a shorted part has 0 V across it.
Each drawing has its fault built in, as a switch across or in line with the
part, or as a resistor drawn as part of it.

### №0011 The radio that ate fuses: the fuse

- **Customer:** Mr. Brennan, with a car radio. **Needs:** №0003, №0004 and
  №0005.
- **Circuit:** a 12 V battery, a 3 A fuse along the top and the radio, R
  (6 Ω, 2 A), down the right, with a reading across the fuse. Under the fuse,
  joined to both its ends, a switch named Foil: closed, it does what his
  silver paper did. The fuse is CircuitJS1's own: it really melts, and stays
  blown until a step resets it.
- **Teaches:** what is inside a fuse; heat climbs far faster than the
  current, so a fuse sits cool in use and goes fast in a fault; blown; it is
  the thinnest wire in the loop, so it goes before the wiring burns; next to
  nothing across a good one, the full supply across a blown one; it guards
  the wiring and the set against fire, not people against shock; where fuses
  sit in car radios, televisions and mains plugs; its rating, and fitting
  the one the set calls for, never bigger, whatever was in the holder;
  slow-blow; how it dies (open only: a fault beyond it, and a new one goes
  too; age or a surge, and a new one holds; one new fuse is a fair test); by
  eye (a gap, wire melted onto the glass, a fuse blown to vapour by a hard
  short, a fine wire that hides its break); the meter in the set (switched
  on, or 0 V proves nothing) and on ohms out of the holder (continuity);
  foil reads like a good fuse; never a bridge.
- **The learner:** lowers R to 3 Ω. With 4 A through it the fuse glows and
  blows in about two seconds, the current stops, and the reading across it
  jumps to 12 V. Then, with R at 1 Ω and the fuse gone, closes Foil: 12 A
  flows, and the fuse reads 0 V, like a good one.
- **Checks:** why 4 A melted it when 2 A did not (heat climbs steeply); what
  a fuse guards against; what goes back in a holder marked 2 A slow-blow that
  held a 5 A; a dead lorry radio with 24 V across its fuse (blown); how to
  tell foil, a 10 A and the right 3 A apart (look at it); what to do with a
  fuse that reads 0 Ω (put it back); what has been blowing his fuses.
- **The fault:** a short in the radio, told by a new fuse that goes the
  instant he switches on and a radio that reads next to nothing on ohms. The
  fuse was the messenger. Wrapped in silver paper, the last one could not
  open the loop, so the wire behind the dashboard burnt.
- **Left out:** the three-quarters rule (a designer's sum), car fuse colours
  and Lucas markings, the fuse holder's own faults.

### №0012 The gauge that stays cold: the thermistor

- **Customer:** Yusuf, with a taxi. **Needs:** №0006 and №0011.
- **Circuit:** 12 V across R1 (a fixed 2 kΩ) and a thermistor (10 kΩ at 25 °C)
  with a temperature slider. A meter stands for the gauge and reads Vout
  across the thermistor and its wire, and a readout gives the current round
  the loop. A "Wire" switch is in line with the thermistor, and a "Short"
  switch across it.
- **Teaches:** the thermistor, a bead of baked metal oxides whose resistance
  falls as it warms; why it sits in a divider (a gauge reads a voltage, not a
  resistance), in words: the bigger part keeps the bigger share; the sensor;
  which way the reading moves depends on where the sensor sits; where it is
  met (a car's temperature sender, and the surge limiter and the degaussing
  thermistor, the kind that rises, in a colour set); its marking, the
  resistance at 25 °C, and replacing like with like; how a colour set's
  thermistors die (a surge limiter runs hot by design, and a dead one is
  cracked, pinholed or burnt, often shorted, and open leaves the set dead;
  the degaussing one shorts across the mains and blows the fuse at
  switch-on); in the set, stuck at the full supply is open and stuck at 0 V
  is shorted, and check R1 too; on the bench, near its marking and a slow
  fall in the fingers, no reading is open, no movement is dead, next to
  nothing is shorted, and a jump at once is the fingers; a surge limiter is
  tested cold; the light-dependent resistor as the same trick with light.
- **The learner:** warms it from 25 °C to 90 °C (the gauge falls from 10 V
  to 4.5 V as the current rises from 1 mA to 3.75 mA). Opens the wire and
  warms it to 90 °C (the gauge stays at 12 V, no current). Closes the short
  and cools it to 25 °C (the gauge stays at 0 V, 6 mA).
- **Checks:** why the gauge fell; which way it moves with the two parts
  swapped; what a sender stuck at 0 V reads on ohms (next to nothing);
  whether 12.2 kΩ at 20 °C is a fault (no); a surge limiter that reads next
  to nothing straight out of a playing set (still hot: let it cool); Yusuf's
  12 V reading.
- **The fault:** the wire to the sender has come off. With no current, R1
  drops nothing, so the gauge sees the whole supply and reads colder than
  cold.
- **Left out:** the divider rule as a formula, and any reading worked out
  from it; which way a car sender most often fails (no verified source).

### №0013 The flash that's never ready: the capacitor

- **Customer:** Mrs. Nakamura, with a camera flashgun. **Needs:** №0002,
  №0004 and №0011.
- **Circuit:** a 12 V battery, a switch and R (10 kΩ) along the top, and the
  capacitor C (100 µF) down the right. Beside C, two branches across it: a
  switch and RL (20 kΩ), and a switch marked Short. With the battery's switch
  open, RL empties C. With both closed, RL stands for a leak inside C. Short
  does what a shorted capacitor does. It runs in real time: C fills in about
  five seconds.
- **Teaches:** two plates and an insulator that nothing crosses; charging,
  and why the current dies away (C's voltage leaves R less); it fills fast,
  then ever more slowly; a full capacitor passes no steady current;
  capacitance, the farad and micro; a bigger capacitor or resistor fills more
  slowly; smoothing, coupling and the flash; the electrolytic, its stripe and
  why polarity matters; working voltage, and choosing a replacement; it holds
  its charge when cut off; discharging, and making a set safe before touching
  it; how it dies (drying out, leaky after years unused, a short likelier
  than an open) and what you see (a domed or split top, a bung pushed out, a
  brown crust, a burnt smell, or nothing at all); in the set, the full
  voltage across a good one, less across a leaky one, 0 V across a shorted
  one with the resistor feeding it hot, and an open one reading like a good
  one; on ohms, kick and fall back, held at 0 Ω, stops short, no kick;
  swapping in a known good one.
- **The learner:** closes the switch (C climbs to 12 V as the current falls
  from 1.2 mA to nothing). Opens it (C holds 12 V), then puts RL across C (it
  empties). With C full, closes RL's switch (C sinks to 8 V, and 400 µA keeps
  flowing). Closes Short (0 V across C, and 1.2 mA through R for good).
- **Checks:** why the current falls; a supply capacitor at 0 V with a
  scorched feed resistor (shorted); whether a right reading in the set proves
  a capacitor good (no: an open one reads the same); the flashgun.
- **The fault:** the flashgun's big electrolytic went leaky after years in a
  drawer, though it looks like new. The leak drains it as fast as it fills,
  so the ready light never comes on, and on ohms it kicks, then stops at a
  low reading.
- **Left out:** a dried-out electrolytic's hum and ripple, which need AC (the
  power supply job); the time constant; an open capacitor on the screen,
  which would need a third fault switch and a meter, and reads like a good
  one in the set anyway.

### №0014 Dead either way round: the diode

- **Customer:** Dev, with a walkie-talkie. **Needs:** №0004, №0007, №0010,
  №0011 and №0013.
- **Circuit:** a battery (−12 V to 12 V), R (1 kΩ, standing for the set) and
  a diode in one loop, with a meter across the diode. Two fault switches:
  Break, in line with the diode, and Short, across it.
- **Teaches:** the diode, silicon in two halves with a thin blocking layer
  between; anode and cathode; the arrow and bar of the symbol, and the band
  on the part; forward and reverse; the forward drop, about 0.6 V in this
  simulator (books say 0.7 V), nearly fixed because current pays the same
  toll to cross, and shifting a little with current, heat and make; where it
  is met (mains supplies and coils, named only; the protection diode in a
  battery lead); known by its number; its two ratings (current, and the
  reverse voltage it stands), and a replacement that matches or beats both,
  fitted band to band; how it dies (outright, not slowly; shorted most often,
  above all in mains supplies, where it blows the fuse; open now and then,
  mostly small glass ones; leaky now and then); heat kills it most; the signs
  (a blown fuse, a cooked look, a smoked electrolytic beside it); in the set,
  about 0.6 V across a good one, the full supply across an open one, 0 V
  across a shorted one, and backwards reads like open; on ohms, with one end
  lifted, low one way and high the other is good, low both ways shorted, high
  both ways open, and a backwards one still reads low one way; the black lead
  positive on ohms.
- **The learner:** drags the battery from −12 V up to 12 V (backwards nothing
  flows and the diode has it all; the right way Vd stops near 0.57 V while R
  takes the rest). Closes Short (0 V across the diode, R takes the whole
  supply).
- **Checks:** what flows backwards; what Vd did as the battery rose; which
  part replaces a 1N4004; what the meter reads across an open diode on 9 V
  (the full 9 V); whether 0.56 V across a conducting diode is a fault (no); a
  television that blows every new fuse, with a mains diode low both ways
  (shorted); Dev's fault.
- **The fault:** the protection diode in the battery lead has gone open: 9 V
  across it and 0 V across the set, and on ohms it reads high both ways, so it
  is not just in backwards.
- **Left out:** rectifying the mains, which needs AC (№0024); germanium; the
  diode-test range of later meters.

### №0015 The dark stereo light: the LED

- **Customer:** Miss Abara, with a hi-fi tuner. **Needs:** №0003, №0007 and
  №0014.
- **Circuit:** the diode's loop with a red LED in the diode's place: a 9 V
  battery, R (680 Ω) along the top, a meter across the LED, and two fault
  switches. Break, in line with the LED, stands for its hair-thin wire burnt
  through; Short, across it, for a shorted chip. The battery has no readout,
  to leave room for both switches.
- **Teaches:** the LED, a diode whose material gives light; inside, a speck
  of it in a cup with a hair-thin wire to the other lead; the material sets
  the colour (red, yellow and green in 1984); it keeps about 1.8 V for itself
  (red), about 2 V (yellow, green); the light follows the current, not the
  voltage; the series resistor holds the current down, and without one an
  LED burns out at once; 10 to 15 mA lights an indicator, about 20 mA is the
  most; where LEDs sit (panel lights, seven-bar figures); replacing one
  (colour and size, the flat marks the cathode, lead length is no guide on a
  used part, a failed resistor gets the same value); how LEDs die (most fade,
  so judge one by its light; too much current burns it open; over about 5 V
  backwards harms the chip, which shorts or leaks); in the set, open and
  backwards both read the full supply, and 0 V across it means the LED
  shorted or its resistor open; the shop meter on ohms can call a good LED
  open, and a battery and 1 kΩ settle it.
- **The learner:** drags R from 3 kΩ to 500 Ω (the LED brightens as the
  current rises about six times, and its voltage hardly moves). Opens Break
  (dark, with 9 V across the LED and 0 V across R). Closes Short (dark, with
  0 V across the LED, 9 V across R and a little more current).
- **Checks:** what the LED's voltage did; what decided the current (R);
  which lead is the cathode when both are cut (the one by the flat); a dark
  LED with 0 V across it (LED shorted, or R open); what a good LED fitted
  backwards reads (the full supply); a good LED the meter calls open (try
  9 V and 1 kΩ); her stereo light.
- **The fault:** the LED has gone open: the full supply across it and
  nothing across its resistor. It lit for years, so it is not in backwards.
- **Left out:** working out the series resistor, rounding it to a value in
  the drawer, and the power it takes: designing, not repairing.

### №0016 Worse with every rev: the Zener diode

- **Customer:** Mr. Halvorsen, with a CB radio. **Needs:** №0007, №0009 and
  №0014.
- **Circuit:** the loaded divider of №0009 with a 5.6 V Zener diode where R2
  was, cathode to +. A battery with a slider, Rs (400 Ω) along the top, the
  Zener with two fault switches (Break, in line with it, and Short, across
  it), and a switch and the load, RL (560 Ω), beside it. A meter reads the
  output.
- **Teaches:** the Zener diode, used in reverse; its Zener voltage (below it
  the Zener does nothing and the output follows the supply; at it, it passes
  any current and holds the output steady); forward, an ordinary diode
  (about 0.6 V); it can hold a line down, never push it up; Rs takes the rest
  of the supply and keeps the current down, and its current hardly changes
  with the load; the Zener takes what the load leaves; the regulator; where
  it is met (setting the voltage for a bigger regulator, a television's
  shutdown); reading its number (BZX55C5V6: 5.6 V, 5 %, 500 mW) and its
  cathode band, which goes to +; replacing like for like or better; how it
  dies (heat; shorted first, with a hot or scorched Rs; then open; drifting
  low; noisy); the output as the diagnosis: steady at its marking is good,
  0 V with a hot Rs is shorted, riding up with the supply is open, about
  0.6 V is in backwards; a low output on a low supply is the supply, not the
  Zener; on ohms it reads like any diode, and the meter cannot reach its
  voltage.
- **The learner:** raises the battery from 0 V with the load off (the output
  follows to about 5.6 V and stops). Switches the load on (the output stays,
  and the current through Rs hardly moves). Closes Short (0 V, and the
  current through Rs nearly doubles). With Break open, raises the battery
  from 12 V to 14 V (the output follows).
- **Checks:** where the rest of the 12 V is (across Rs); what the current
  through Rs does when the load comes on (hardly changes); what a good Zener
  gives on ohms (a reading one way only); a 5V6 line at 3.5 V on a 6 V
  supply (the supply is low); a new 5V6 that reads about 0.6 V with Rs hot
  (fitted backwards); a 5V6 line that reads 7 V and climbs with the revs.
- **The fault:** the Zener holding one line of the set has failed open. Rs
  and the load are left as a plain divider, so the line follows the car's
  voltage.
- **Left out:** the sums for the current in Rs and for whether the Zener can
  hold (a sagging supply is a sign to recognise instead); the Zener's own
  current as a readout, given up for the Short switch (its dots show it).

### №0017 The silent chime: the coil

- **Customer:** Mrs. Farouk, with a door chime. **Needs:** №0002, №0013 and
  №0014.
- **Circuit:** a 12 V battery and a main switch, then three columns side by
  side: R (120 Ω), which stands for whatever the kick would jump through; a
  switch and a diode in reverse; and the coil, L (4 H), with its winding's
  resistance, Rw (24 Ω), drawn in series. A switch marked "break" is in line
  with the coil: open, it is a winding that has parted. It runs at about a
  seventh of real time.
- **Teaches:** the coil, or inductor, and its winding; a current makes it a
  magnet, and it pushes back against any change; the rise follows the
  capacitor's curve; inductance, in henries; on a steady current a coil is
  only its winding, so on ohms a good one goes straight to a low, steady
  reading (a few ohms for a radio coil, hundreds for a big one); the kick,
  hundreds of volts as a spark across a parting switch, which pits its
  contacts and kills transistors; the diode across the coil that tames it;
  chokes and tuning coils; markings, and a replacement of the same henries
  and current or more; how it dies: an open winding (often at its tag:
  re-solder first) and shorted turns (hot, a burnt smell, dark or blistered
  varnish, yet near-normal ohms: swap in a known good one); a coil straight
  across the supply has the full voltage good or open, so the ohms tell.
- **The learner:** closes the switch (the current climbs to 0.5 A over some
  seconds). Opens it (the voltage across the coil leaps to five times the
  battery's for an instant). Brings the diode in and opens it again (under a
  volt, and the current dies away gently). Opens the break switch (12 V
  still across the coil, and no current).
- **Checks:** what held the current back; where the high voltage came from;
  why the diode stops the kick; a choke that reads near its figure but runs
  hot and smells burnt (shorted turns); a switch whose contacts keep pitting
  (a diode across the coil); the chime.
- **The fault:** the chime's coil has an open winding: the full supply across
  it with the button pressed, no ding, and no continuity on ohms.
- **Left out:** the time constant L ÷ R, and a trace of the rise and the
  kick: the player has none yet.

### №0018 The set that clicks but stays dark: the relay

- **Customer:** Giorgos, with a remote-control television. **Needs:** №0004,
  №0011 and №0017.
- **Circuit:** one 12 V battery and two loops. The coil loop: a button, a
  switch named Winding (open, it is a broken winding) and the relay's 120 Ω
  coil, with a meter, Vcoil, on the coil's pins (across Winding and the coil
  together). The contact loop: the normally open contact, Rc (the contacts'
  own resistance: 4 mΩ clean, ohms when burnt) and a 4 Ω load, R. A meter,
  Vc, reads across the contacts and Rc.
- **Teaches:** the relay and its contacts: a coil on an iron core, a sprung
  iron arm, the click; the relay supplies nothing, it only switches; normally
  open and normally closed, and which shows continuity at rest; the two loops
  share only the magnet's pull, so a small switch can work a heavy or a mains
  load; where relays sit (a car's starter and horns, the mains switch of a
  remote-control set); the two ratings on the case, and a replacement with the
  same coil voltage and contacts rated as high or higher; how relays fail
  (contacts burnt and pitted by sparks, worst with lamps and motors; welded
  shut; dirty or sticking; the coil's wire broken); the method: listen for the
  click, read volts on the coil, read volts across the closed contacts under
  load; on ohms, a coil reads tens to hundreds of ohms and a broken one shows
  no continuity, but a meter on ohms cannot judge a contact; unplug a
  television before testing on ohms, and leave mains readings to Rita.
- **The learner:** presses the button (a click, 12 V on the coil, next to
  nothing across the contacts, 3 A in the load). Presses it with Winding open
  (12 V on the coil, no click, 12 V across the open contacts). Presses it with
  Rc at 2 Ω (a click, but 4 V across the closed contacts and 2 A in the load).
- **Checks:** where the load's amps come from (the battery); which contact
  shows continuity at rest (normally closed); full volts on the coil and no
  click (the winding); no click and 0 V on the coil (whatever drives it); what
  0.6 Ω on ohms across closed contacts proves (nothing); Giorgos's set.
- **The fault:** the coil is driven and pulls in, which is the click, but the
  burnt contacts have volts across them where good ones have next to none,
  and starve the set.
- **Left out:** pull-in and drop-out; AC and DC contact ratings; welded
  contacts on the screen (told and asked about in words only: the drawing's
  six readouts are taken).

### №0019 The bell that rings at once: the transistor

- **Customer:** Carmen, with a burglar alarm. **Needs:** №0004, №0014 and
  №0018.
- **Circuit:** 12 V. A switch, standing in for the alarm, and a base
  resistor, Rb (10 kΩ), feed the base of an NPN transistor, its leads
  lettered B, C and E. The bell, a 120 Ω resistor, runs from the supply to
  the collector. Two meters read base to emitter and collector to emitter,
  and a switch marked Short is across collector and emitter.
- **Teaches:** the transistor as a switch worked by a current, with nothing
  that moves; base, collector and emitter; the bell's current comes from the
  battery, not the base; base to emitter is a diode, about 0.7 V when told to
  turn on and 0 V when not, so a resistor feeds it; base current to spare
  turns it fully on, and then the battery and the load set the current; half
  on, it heats; where transistor switches sit, and two type numbers of the
  time; how it dies (outright, open or shorted, mostly from heat; a shorted
  power transistor takes the fuse; look for what killed it); good or faulty
  by three readings, a good one sitting at one end or the other; on ohms,
  two diodes joined at the base, and collector to emitter checked both ways;
  the moving-coil meter's reversed leads and its lowest range.
- **The learner:** closes the switch (0.71 V base to emitter, 98.6 mA
  through the bell, 0.17 V across the transistor). Lowers Rb to 1 kΩ (ten
  times the base current, and the bell hardly moves). Closes Short with the
  base switch open (the bell rings with 0 V on the base and 0 V across the
  transistor).
- **Checks:** where the bell's current comes from; why ten times the base
  current hardly moved it (already fully on); an open transistor from its
  readings (base fed, the full supply across it, the bell proved whole); a
  hot transistor with 6 V across it (half on, its base starved); 0 Ω
  collector to emitter both ways with good diodes (shorted); Carmen's bell.
- **The fault:** the transistor has shorted collector to emitter. 0 V base
  to emitter says nothing is calling for the bell, and 0 V across the
  transistor says it is on anyway.
- **Left out:** the base current worked out from Rb, gain as a number, and
  sizing Rb (design, not repair); PNP and Darlingtons; finding the base and
  the type with the meter.

### №0020 The flasher that went dark: the MOSFET

- **Customer:** Bea, with a lamp flasher she built from a magazine kit.
  **Needs:** №0006, №0013 and №0019.
- **Circuit:** the transistor's loop with a MOSFET in its place: 12 V, a
  12 Ω lamp and the MOSFET below it (threshold 3 V, 0.5 Ω fully on). A
  second battery, Vg, stands in for the flasher's timer and feeds the gate
  through RG (10 kΩ). A meter reads drain to source. Two fault switches:
  one puts Leak (2 kΩ) from gate to source, a hole in the gate film; Short
  joins drain to source.
- **Teaches:** the MOSFET's gate, drain and source; the gate is a plate on a
  very thin film, a tiny capacitor that takes no current, so a voltage alone
  turns it on; never leave a gate joined to nothing; threshold voltage,
  where it starts to conduct, not where it is on; half on, it runs hot;
  fully on, next to nothing across it; where it is met in 1984; ratings from
  a data sheet, and a replacement as good on each; how it dies (static or a
  spike holes the gate film; the usual end is a short, drain to source and
  often the gate too; heat when half on; a coil's kick); in the set, good
  (the full supply when off, next to nothing when on), shorted (0 V whatever
  the gate does) and open (the full supply with the gate fed); a gate that
  takes current is holed; the bench test with a 9 V battery on the gate, and
  its trap (a charged gate reads as a short); static and handling.
- **The learner:** raises Vg to 4 V (the lamp starts after 3 V, dull, and RG
  carries nothing), then to 12 V (fully on, 0.48 V left across it). With the
  timer off, closes Short (the lamp lights, 0 V drain to source). With the
  timer on, closes the Leak switch (RG carries 1 mA and the lamp goes out).
- **Checks:** what the gate needs to put the lamp on (only a voltage); a dull
  lamp and a hot MOSFET with 4 V on the gate (too few volts on the gate);
  what an open one reads with the timer on (12 V, lamp dark); what to do
  first when a new one reads shorted (short gate to source); Bea's flasher.
- **The fault:** static from her fingers holed the gate film. The gate now
  takes current, RG drops most of the timer's 12 V, and the gate never
  reaches its threshold.
- **Left out:** the built-in diode by name (the bench test says only that
  drain to source passes one way), P-channel types and switching speed.

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
| №0012 | thermistor, sensor, surge limiter |
| №0013 | capacitor, charging, discharging, capacitance, farad (F), micro (µ), electrolytic, leaky |
| №0014 | diode, anode, cathode, forward, reverse, forward drop |
| №0015 | LED, series resistor |
| №0016 | Zener diode, Zener voltage, regulator |
| №0017 | coil (inductor), winding, inductance, henry (H), the kick, choke, shorted turns |
| №0018 | relay, contacts, normally open, normally closed |
| №0019 | transistor, base, collector, emitter, fully on, half on |
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
