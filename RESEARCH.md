# Research: how others teach each job

What reputable courses, textbooks and worksheets do with each topic in
[`CURRICULUM.md`](CURRICULUM.md), the exercises they set, and what this course
took from them. Gathered on 19 November 2026.

Read a job's section here before writing or rewriting that job. Each section
lists the sources, how they teach the topic, exercises worth adapting, and
either what went into the lesson (Part 1) or what to build the lesson round
(Part 2).

## How far to trust this

- Pages were opened and read through a summarising fetch, so what is reported
  is the substance of a page, not its wording. Kuphaldt's worksheet PDFs and
  the two IOP PDFs were read directly.
- Every worked answer below was recomputed. Answers for lessons are checked
  again by the simulator (`npm test`).
- These would not load, so nothing here comes from them: The Physics
  Classroom, SparkFun Learn, Khan Academy, BBC Bitesize, HyperPhysics, MIT
  OpenCourseWare, the PhET simulation pages (navigation only), and the IOP
  Spark web pages (its PDFs did load). NEETS was seen only as a copy of one
  module. McDermott and Shaffer's 1992 papers were not opened: their findings
  are reported here only as the DIRECT paper restates them.
- "Unverified" marks anything that did not come from a loaded page.

## Sources, and what may be done with them

| Source | Licence, as the page states it | How it is used here |
|---|---|---|
| Tony Kuphaldt, *Socratic Electronics* worksheets ([ibiblio.org/kuphaldt/socratic](https://www.ibiblio.org/kuphaldt/socratic/), mirrored at [allaboutcircuits.com/worksheets](https://www.allaboutcircuits.com/worksheets/)) | CC BY 1.0 | Exercises adapted, with credit |
| Tony Kuphaldt, *Lessons in Electric Circuits* ([ibiblio copy](https://www.ibiblio.org/kuphaldt/electricCircuits/)) | CC BY on the ibiblio pages. Design Science License on the All About Circuits copy | Ideas and order of teaching |
| Tony Kuphaldt, *Modular Electronics Learning* (ModEL) | CC BY 4.0 | Exercises adapted, with credit |
| OpenStax, *College Physics 2e* and *University Physics vol. 2* | CC BY-NC-SA 4.0, with a notice that the books may not be used in generative-AI products without written permission | Ideas only. No text or problems taken |
| IOP Spark diagnostic and "think again" questions (PDFs) | None stated. One is marked for private and institutional use | Ideas only |
| Engelhardt and Beichner, the DIRECT concept test ([arXiv physics/0304040](https://arxiv.org/pdf/physics/0304040), [PhysPort](https://www.physport.org/assessments/DIRECT)) | Research paper | Findings on what learners get wrong |
| *European Journal of Educational Research* 12(3), 1269 ([PDF](https://pdf.eu-jer.com/EU-JER_12_3_1269.pdf)) | CC BY 4.0 | Findings |
| Electronics-Tutorials.ws, All About Circuits technical articles, learnabout-electronics.org | All rights reserved | Ideas only |
| Spinning Numbers (Willy McAllister) | CC BY-NC-SA 4.0 | Ideas only |
| Open University, OpenLearn Create | Not read | Ideas only |
| Wikipedia | CC BY-SA 4.0 | Ideas only |

The rule followed: **every question added to a lesson is written fresh**, in
this course's voice, on this course's circuit, with numbers the simulator
confirms. A source supplies the idea of a question, never its words. Where the
idea is Kuphaldt's, the section says so: his licence asks for credit, and he
has earned it.

## What holds across every topic

**What learners get wrong.** The DIRECT study, and a 2023 study of 531
first-year engineers that confirms it, find the same few beliefs behind most
wrong answers:

| Belief | What it sounds like | Where the course meets it |
|---|---|---|
| Current is used up | "Less comes out of the lamp than went in" | №0001, №0004, №0007 |
| The battery gives a fixed current | "Add a branch and the others get less" | №0005 |
| Sequential reasoning | "A change only affects what comes after it" | №0001 (switch after the lamp), №0007 (R3 moves R2's current) |
| Local reasoning | "Current splits equally at a junction" | №0005 (path of least resistance) |
| Judging by the drawing | "They look side by side, so they are parallel" | №0007, and №0008 when written |
| One resistor "is" the total | Treating an equivalent resistance as a real part | №0008 when written |

The loop rule is the hardest item of all in DIRECT, harder than the junction
rule. Go slowly there.

**How good courses ask.**

- **Predict, then look.** IOP's questions ask for a prediction, then separately
  for the reason. The explore steps here now say "guess first" where it helps.
- **Ask why, not only how much.** Kuphaldt's teaching notes say more than once
  that a question with no numbers in it is harder, and tells you more, than a
  sum. Most of what was added to Part 1 is of that kind.
- **Fault signs.** Kuphaldt's troubleshooting worksheets and textbook rest on
  two readings a technician learns early: a part that has gone open has the
  **full supply** across it and no current, and a part that has shorted has
  **0 V** across it and too much current. Both follow from the rules in
  Part 1, and both are worth a question wherever they fit.

## Part 1: the written jobs

### №0001 The closed loop

**Sources**

- Kuphaldt, *Lessons in Electric Circuits*, [DC chapter 1](https://www.ibiblio.org/kuphaldt/electricCircuits/DC/DC_1.html)
- OpenStax College Physics 2e, [20.1 Current](https://openstax.org/books/college-physics-2e/pages/20-1-current)
- IOP Spark, [Diagnostic questions on circuits](https://spark.iop.org/sites/default/files/media/documents/Diagnostic%20questions%20on%20circuits.pdf) and [Think again questions](https://spark.iop.org/sites/default/files/media/documents/Think%20again%20questions_0_0.pdf)
- Open University, [teaching electric circuits](https://www.open.edu/openlearncreate/mod/oucontent/view.php?id=64826&printable=1)

**How they teach it**

- Kuphaldt: a steady flow needs an unbroken loop. A break stops the flow all
  round, wherever it is. A switch is a break made on purpose, and can sit
  anywhere in the loop. The current is the same at every point. Which way the
  current "really" goes is left to the very end.
- IOP's diagnostic questions go after four beliefs: the lamp uses all the
  current up, the lamp uses some of it up, two currents meet at the lamp, and
  the battery is a store of charge that runs out.
- The Open University's advice: show equal readings either side of a lamp, and
  keep current, energy and voltage apart as words.

**Exercises found**

- A lit lamp on a battery: which picture of the current is right? (The same
  both sides.) IOP.
- A lamp left on for some minutes: which has gone down, the charge, the
  current, or the energy in the battery? (Only the energy.) IOP.
- A 12 V battery, an open switch and a lamp: what does a meter read across the
  switch, and across the lamp? (12 V and 0 V.) Kuphaldt.
- A switch in the far wire, after the lamp: does it still work? Kuphaldt.

**Taken into the lesson**

- *What has a flat battery run out of?* Energy, not charge or current. After
  IOP's question.
- *Would the switch still put the lamp out if it were after the lamp?* Yes.
  After Kuphaldt. This is the first meeting with sequential reasoning.

**Left out, and why**

- The meter across the open switch: voltage is not taught until №0002. The
  same idea went into №0004.
- Which way the current flows. Kuphaldt leaves it late, and so does this
  course.

### №0002 Ohm's law

**Sources**

- Kuphaldt, [Ohm's law worksheet](https://www.ibiblio.org/kuphaldt/socratic/output/ohm.pdf) ([web copy, with answers](https://www.allaboutcircuits.com/worksheets/ohms-law/))
- Kuphaldt, *Lessons in Electric Circuits*, [DC chapter 2](https://www.ibiblio.org/kuphaldt/electricCircuits/DC/DC_2.html)
- OpenStax College Physics 2e, [20.2 Ohm's law](https://openstax.org/books/college-physics-2e/pages/20-2-ohms-law-resistance-and-simple-circuits)
- IOP Spark, Think again questions (above)

**How they teach it**

- Kuphaldt's worksheet starts from measured pairs of voltage and current and
  has the learner find that their ratio never changes. The formula comes after.
  His note to teachers: learn one form of the law and work the other two out.
- OpenStax: current rises with voltage, falls with resistance, and the two
  combine. It says plainly that the law is an observation about resistors,
  not a law of nature, and that a lamp does not obey it.
- Kuphaldt on the short circuit: the sum says the current is without limit,
  and the real measurement in his question is 8 A. Something else in the loop
  limits it. (The battery's own resistance: №0010.)

**Exercises found** (Kuphaldt, CC BY 1.0, unless marked)

- 12 V across 470 Ω: 25.5 mA.
- A meter reads 12.3 V and 4.556 mA: 2.7 kΩ.
- A table of readings from 0.66 V at 0.22 A up to 7.49 V at 2.51 A: what is the
  pattern, and what is R? (A straight line, about 3 Ω.)
- 10 V across a 250 Ω and across an 800 Ω: 40 mA and 12.5 mA. It does not all go
  through the smaller.
- Prefix practice: 20 mA × 5 kΩ = 100 V. 24 V ÷ 3.3 MΩ = 7.3 µA.
- A small resistance swapped for a large one: the reading falls, but not to
  nothing. IOP.

**Taken into the lesson**

- *On 6 V a resistor passes 0.5 A. What will it pass on 18 V?* The resistance
  belongs to the part and does not change with the voltage. After Kuphaldt's
  table of readings.

**Left out, and why**

- The graph of voltage against current: the player has no graph.
- "The path of least resistance": it needs two branches, so it went into
  №0005.
- The battery's own resistance: that is №0010.

### №0003 Power

**Sources**

- Kuphaldt, *Lessons in Electric Circuits*, [DC chapter 2](https://www.ibiblio.org/kuphaldt/electricCircuits/DC/DC_2.html), and the Ohm's law worksheet, questions 14 to 23
- OpenStax College Physics 2e, [20.4 Electric power and energy](https://openstax.org/books/college-physics-2e/pages/20-4-electric-power-and-energy)

**How they teach it**

- Kuphaldt runs the lesson's own experiment: 18 V across a 3 Ω lamp is 6 A and
  108 W, and 36 V is 12 A and 432 W. Four times, because the voltage and the
  current both double. He then goes to ratings: they are about heat, and a
  ¼ W part is the usual size in small sets.
- OpenStax goes on to P = V² ÷ R and P = I² × R, marked as true for resistors
  only, and then to energy: E = P × t, and the kilowatt-hour on a bill.

**Exercises found**

- 4 A through 1 Ω, 2 Ω and 3 Ω in series: 16 W, 32 W and 48 W. The largest runs
  hottest. Kuphaldt.
- 24 V across each of 1 Ω, 2 Ω and 3 Ω: 576 W, 288 W and 192 W. Now the smallest
  runs hottest. Kuphaldt.
- A lamp drops 20 V at 5 A, with a 2 Ω dimmer in series: 100 W in the lamp, 50 W
  wasted in the dimmer. Kuphaldt.
- A cold filament has a small part of its hot resistance, so a lamp takes
  many times its running current at the moment of switch-on. OpenStax works
  an example. Why lamps fail at switch-on.

**Taken into the lesson**

Nothing new. The lesson already runs Kuphaldt's doubling experiment and ends
on a rating, and it is at thirteen steps.

**Left out, and why**

- The other two formulas, and energy over time: each is a second idea.
- "Which runs hotter?" for a series pair and for a parallel pair. A good pair
  of questions with opposite answers, but each lesson that could carry one
  is full. Worth a place if either is ever shortened.

### №0004 Series circuits

**Sources**

- Kuphaldt, [Series DC circuits worksheet](https://ham.v4.si/books/SocraticElectronics/dc_s.pdf)
- *Lessons in Electric Circuits*, [what are series and parallel circuits](https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/what-are-series-and-parallel-circuits/) and [component failure analysis](https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/component-failure-analysis/)
- OpenStax, [College Physics 2e 21.1](https://openstax.org/books/college-physics-2e/pages/21-1-resistors-in-series-and-parallel) and [University Physics vol. 2, 10.2](https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel)

**How they teach it**

- OpenStax: the same current, then the voltages add, then put I × R in place
  of each voltage and the resistances add. It ends with a check: the total is
  bigger than any one part.
- Kuphaldt asks which things are *guaranteed* equal and which only *happen* to
  be. In a series string the current is guaranteed. The voltages match only
  if the parts do.
- His fault page, on a series string: an open part has about the full supply
  across it and no current. A shorted part has about 0 V across it, and the
  current rises. Resistors fail open far more often than short.

**Exercises found** (Kuphaldt, CC BY 1.0)

- 36 V across 1.5 kΩ, 10 kΩ and 4.7 kΩ: 2.22 mA, and 3.33 V, 22.2 V and 10.4 V.
- 9 V across 2 kΩ, 3 kΩ and 5 kΩ: 1.8 V, 2.7 V and 4.5 V. Double the battery and
  every one doubles.
- Three 6 V lamps in series on one 6 V battery: how bright? (Dim: 2 V each.)
- 6 V across 10 kΩ and 4.7 kΩ, and the meter reads 0 V across each resistor:
  what is wrong? (No current: a break in the wire between them.)
- A 500 W heater on leads of 3 Ω each way gives only 321 W.

**Taken into the lesson**

- *Forty lamps, all dark. What does the meter read across the dead one?* The
  full supply. After Kuphaldt's fault page. It is now the last step, so the
  job ends on how the fault is found, not only on what it is.

**Left out, and why**

- "Guaranteed or only happens to be": the lesson's own steps (even the
  resistors up, then make them unequal) show it without the words.
- The heater on a long lead. A fine story for №0010 or №0011, where a hidden
  resistance is the whole point.

### №0005 Parallel circuits

**Sources**

- Kuphaldt, [Parallel DC circuits worksheet](https://ham.v4.si/books/SocraticElectronics/dc_p.pdf)
- *Lessons in Electric Circuits*, [simple parallel circuits](https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/simple-parallel-circuits/) and component failure analysis (above)
- OpenStax 21.1 and 10.2 (above)
- Engelhardt and Beichner, and the EU-JER study (see the table of sources)

**How they teach it**

- Kuphaldt's key step is finding the points that are joined by wire alone.
  Every branch is tied to the same two, and that is why they share a voltage.
- *Lessons in Electric Circuits* finds the branch currents, adds them, and only
  then works out the resistance of the whole (625 Ω, less than the smallest
  branch). The formula comes last.
- Faults: an open branch changes only itself and the total. A shorted branch
  takes the voltage away from every other.
- An honest line from Kuphaldt: closing a switch changes nothing for the other
  branches *with an ideal battery*. A real one sags a little. That is №0010.

**Exercises found** (Kuphaldt, CC BY 1.0)

- 24 V across 2.2 kΩ and 4.7 kΩ: 10.9 mA and 5.11 mA, 16.0 mA in all.
- Two 500 Ω on 10 V: 20 mA each, 40 mA, so 250 Ω. Why half, without the sum?
- A lamp with a switched resistor beside it: what happens to the lamp when the
  switch closes? (Nothing.)
- Three switches bring in three loads one at a time: predict every reading at
  each stage.
- Pick two resistors so that one branch takes 25% of the current and the other
  75%. (The second has a third of the resistance.)

**Taken into the lesson**

- *R2 is the easier path. Does all the current take it?* No: both carry some.
  After Kuphaldt's 250 Ω and 800 Ω question. It meets "local reasoning" and
  the proverb at once.
- *The lamp burns out. What happens to the fan?* Nothing. After the fault page.
  It is set against the string of lights from the job before.

**Left out, and why**

- Two equal branches halve the resistance. It is the natural way in to №0008,
  so it is kept for there.
- The shorted branch: it needs the real battery of №0010 to make sense.

### №0006 Voltage dividers

**Sources**

- Kuphaldt, [Voltage divider circuits worksheet](https://www.ibiblio.org/kuphaldt/socratic/output/e_divide.pdf) and the [four-channel audio mixer worksheet](https://www.allaboutcircuits.com/worksheets/four-channel-audio-mixer)
- *Lessons in Electric Circuits*, [voltage divider circuits](https://www.allaboutcircuits.com/textbook/direct-current/chpt-6/voltage-divider-circuits/)
- Electronics-Tutorials, [voltage divider](https://www.electronics-tutorials.ws/dccircuits/voltage-divider.html)

**How they teach it**

- *Lessons in Electric Circuits* solves the series circuit the long way, then
  raises the supply four times and shows every share still the same fraction.
  Only then does it give the formula. The potentiometer follows: the share
  depends on where the wiper is and on nothing else.
- Kuphaldt's mixer worksheet warns against saying "turning it up raises the
  resistance". Two resistances change at once, in opposite directions. It
  also notes that a volume control's strip is not even along its length,
  because hearing is not.

**Exercises found** (Kuphaldt, CC BY 1.0)

- Design a divider that splits a supply 25% and 75%.
- 15 V across 1 kΩ, 8.1 kΩ and an unknown, with 0.2 V across the 1 kΩ: the
  unknown is 65.9 kΩ.
- A 5 kΩ control on 10 V, with the wiper at 0, 25, 50, 75 and 100% of its
  travel: 0 V, 2.5 V, 5 V, 7.5 V and 10 V.
- A divider feeds three loads meant for 25 V, 14 V and 5 V, and the readings are
  25 V, 0 V and 0 V. Which resistor is open?

**Taken into the lesson**

- *Drag the battery up to 18 V.* Vout doubles and is still a third. After
  *Lessons in Electric Circuits*. The share now shows as a fact about the
  resistors before the rule is stated.
- *The wiper sits a quarter of the way up a 4 kΩ strip with 8 V across it.* 2 V.
  After Kuphaldt's wiper question.

**Left out, and why**

- What a load does to the output: that is №0011.
- The uneven strip of a volume control: true, but a second idea.

### №0007 Kirchhoff's laws

**Sources**

- Kuphaldt, [Kirchhoff's laws worksheet](https://www.ibiblio.org/kuphaldt/socratic/output/kvl.pdf)
- *Lessons in Electric Circuits*, [the voltage law](https://www.allaboutcircuits.com/textbook/direct-current/chpt-6/kirchhoffs-voltage-law-kvl/) and [the current law](https://www.allaboutcircuits.com/textbook/direct-current/chpt-6/kirchhoffs-current-law-kcl/)
- OpenStax University Physics vol. 2, [10.3 Kirchhoff's rules](https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules)

**How they teach it**

- *Lessons in Electric Circuits* teaches the voltage law with nothing but meter
  readings taken round a loop, and the current law with a pipe tee: 2 mA and
  3 mA in, 5 mA out.
- Kuphaldt has the learner step a meter round the loop and add the readings,
  so the rule is measured, not told. His picture for voltage is a walker with
  an altimeter: back where you started, the climbs and drops cancel.
- OpenStax goes on to several loops, unknown directions and simultaneous
  equations. All of that is beyond this course, and its signs are where most
  learners come unstuck.

**Exercises found**

- A supply's output is steady, but the voltage at the board it feeds has
  fallen. What does the voltage law say? (Something else in the loop is taking
  the rest: a wire or a joint.) Kuphaldt, CC BY 1.0.
- A junction with 2 mA and 3 mA arriving: what leaves?

**Taken into the lesson**

- *You changed only R3, yet the current through R2 rose. Why?* The voltage
  across the branches rose, because R1 dropped less. This is the plainest
  case in Part 1 of a change that reaches back up the circuit, which is what
  sequential and local reasoning both miss.
- *The battery reads 12 V and the lamp gets 10 V. Where are the other 2 V?*
  Across the wiring. After Kuphaldt. The voltage law as a way to find a bad
  joint.

**Left out, and why**

- Stepping the meter round the loop: it needs a reading at a point, which the
  player cannot take yet. It belongs to №0009.
- Signs and assumed directions.

## Part 2: the planned jobs

None of these is written. Each section is what to start from.

### №0008 Combining resistors

**Sources**

- Kuphaldt, Parallel DC circuits (above) and [Series-parallel DC circuits](https://ham.v4.si/books/SocraticElectronics/dc_sp.pdf)
- *Lessons in Electric Circuits*, [conductance](https://www.allaboutcircuits.com/textbook/direct-current/chpt-5/conductance/), [analysis technique](https://www.allaboutcircuits.com/textbook/direct-current/chpt-7/analysis-technique/) and [re-drawing complex schematics](https://www.allaboutcircuits.com/textbook/direct-current/chpt-7/re-drawing-complex-schematics/)
- Electronics-Tutorials, [resistors in parallel](https://www.electronics-tutorials.ws/resistor/res_4.html)
- OpenStax 21.1 and 10.2 (above)

**How they teach it**

- **Where the formula comes from.** OpenStax: each branch takes V ÷ R, the
  battery supplies the sum, and dividing through by V gives
  1/R = 1/R1 + 1/R2. The learner already has every step of that from №0005.
- **Before the formula.** Kuphaldt asks what a meter will read across two
  equal resistors side by side, and lets the learner find the pattern: half,
  then a third, then a quarter. He allows a lot of time for it.
- **Checks to carry about.** The total is always less than the smallest
  branch. Two equal ones make half. For two, product over sum.
- **Boiling a network down.** *Lessons in Electric Circuits*: find a pair that
  is plainly series or plainly parallel, put one resistor in its place, draw
  the circuit again, and repeat. Then work back out, and check every reading.
  A reader found a slip in the book's own redrawing, which says how easily
  it goes wrong.
- **What goes wrong.** The series rule used on a parallel pair. Stopping at
  the sum of the reciprocals (0.5 given as the answer). Pairing two parts
  that only look in series, when a branch joins between them.

**Exercises to adapt**

- 100 Ω, 100 Ω and 50 Ω side by side: 50 Ω, then 25 Ω. Kuphaldt.
- Two 3.3 kΩ side by side: 1.65 kΩ. Three: 1.1 kΩ. Four: 825 Ω. Kuphaldt.
- 6 Ω beside 3 Ω: is it 1.5 Ω, 2 Ω, 4.5 Ω or 9 Ω? Each wrong answer is a known
  mistake: half the smaller, the average, and the series rule.
- A 3 Ω is fitted and 2 Ω is wanted. What goes beside it? (6 Ω.) Kuphaldt.
- 24 V across a parallel pair in series with another parallel pair
  (100 Ω and 250 Ω, then 350 Ω and 200 Ω): 198.7 Ω, 120.8 mA, 8.63 V and 15.4 V.
  Use other values.

**Build the job round**

- The circuit of №0007: 2 Ω, then 6 Ω beside 3 Ω, on 12 V. The pair is 2 Ω, the
  whole is 4 Ω, and the battery supplies 3 A: readings the learner has already
  seen and can now predict.
- See it first. Start with R3 equal to R2 and watch the pair behave as half.
- One "which two can be combined first?" question before any sum.
- Work back out at the end and check against both of Kirchhoff's laws.
- The player cannot swap a pair for one resistor on the screen. The lesson
  has to say it in words, or the player has to learn to.

### №0009 Voltage at a point

**Sources**

- Kuphaldt, [Basic circuit troubleshooting worksheet](https://www.ibiblio.org/kuphaldt/socratic/output/trouble1.pdf) and [basic ammeter use](https://www.allaboutcircuits.com/worksheets/basic-ammeter-use/)
- *Lessons in Electric Circuits*, [ammeter usage](https://www.allaboutcircuits.com/textbook/experiments/chpt-2/ammeter-usage/) and [troubleshooting techniques](https://www.allaboutcircuits.com/textbook/reference/chpt-8/specific-troubleshooting-techniques/)
- Tufts, [circuits and schematics](https://www.ece.tufts.edu/en/1EK/textbook/circuits_schematics.html); Michigan, [the water analogy](https://web.eecs.umich.edu/~aey/eecs210/lectures/water.html)
- OpenStax College Physics 2e, [21.4 Voltmeters and ammeters](https://openstax.org/books/college-physics-ap-courses-2e/pages/21-4-dc-voltmeters-and-ammeters)

**How they teach it**

- Tufts says it outright: there is no voltage *at* a point, only between two.
  Ground is the point everyone agrees to measure from.
- Michigan's picture is height, not pressure. Ground is sea level, a voltage
  is a height above it, and the voltage law says the climb is the same
  whichever path you take.
- Meters, as a matter of consequences: a voltmeter has a very high resistance,
  so it can go across anything. An ammeter is nearly a wire, so across a
  battery it is a short, and it blows its fuse.
- Fault-finding: know what each test point should read, and cut the circuit
  in half with each measurement.

**Exercises to adapt** (Kuphaldt, CC BY 1.0)

- A battery, a switch and a lamp on a terminal strip: which pairs of points
  should read the full voltage with the switch on, and with it off?
- A corroded terminal: where does the odd reading show? (Across the bad joint:
  nearly the whole battery.)
- Four readings on a dead lamp circuit: 0 V along the top wire, 12 V across
  the supply, 0 V along the return, 12 V across the lamp. What has failed?
  (The lamp is open.) Which readings were not needed?
- True or false: "0 V between two points means they are joined".
- Moving the ground changes the voltage at every point and the voltage across
  no part.

**Build the job round**

- Height above the floor as the picture, said once.
- End on a fault found by readings at test points. The two fault signs from
  Part 1 are now measured: full volts across a part that should be passing
  current, and no volts across a switch that is on.
- The stepping-round-a-loop exercise left out of №0007.

### №0010 The real battery

**Sources**

- Kuphaldt, [Ideal and real sources](https://www.ibiblio.org/kuphaldt/socratic/model/mod_idealsource.pdf) (CC BY 4.0)
- OpenStax, [College Physics 2e 21.2](https://openstax.org/books/college-physics-ap-courses-2e/pages/21-2-electromotive-force-terminal-voltage) and [University Physics vol. 2, 10.1](https://openstax.org/books/university-physics-volume-2/pages/10-1-electromotive-force)
- Carleton SERC, [a PhET activity on internal resistance](https://serc.carleton.edu/19605.1146)

**How they teach it**

- OpenStax opens with headlamps dimming as a battery runs down, then models
  the battery as a perfect source with a resistor hidden inside it.
- Kuphaldt gives tables of real readings first. A car battery: 13.50 V with
  nothing connected, 12.80 V at 20 A, 11.75 V at 50 A (about 0.035 Ω inside). A
  dying 6 V dry cell: 6.33 V open, 5.33 V across 15 kΩ, 4.48 V across 6.8 kΩ
  (about 2.8 kΩ inside).
- His point for a repair shop: a battery wears out in two ways, and a meter
  with nothing else connected sees only one of them. Test it under load.

**Exercises to adapt**

- 14.8 V with nothing connected and 13.5 V across 50 Ω: 0.27 A flows, 1.3 V is
  lost inside, so 4.8 Ω. What would a 20 Ω load get? (11.9 V.) Kuphaldt.
- The dying dry cell above: find the resistance inside, and the most current
  it could ever give (about 2.3 mA). Kuphaldt.
- Why does a voltage check alone not tell a good cell from a worn one?

**Build the job round**

- The puzzle first: the battery reads fine on the meter, and the radio is dead.
- It is a voltage divider: the resistance inside is R1, the set is R2. The
  learner already owns the rule.
- A slider for the hidden resistance, a switch for the load.

### №0011 The loaded divider

**Sources**

- Kuphaldt, Voltage divider circuits worksheet (above)
- Spinning Numbers, [voltage divider design](https://spinningnumbers.org/a/voltage-divider-design.html)
- *Lessons in Electric Circuits*, [voltmeter impact on the measured circuit](https://www.allaboutcircuits.com/textbook/direct-current/chpt-8/voltmeter-impact-measured-circuit)

**How they teach it**

- The load is a branch across R2, so the bottom of the divider is now R2 and
  the load side by side, which is less than R2.
- The rule of thumb is worded three ways in three places: the load should be
  ten times R2, ten times R1 and R2 side by side, or should take a tenth of
  the divider's current. **Pick one and test it.** Ten times R2 is the easiest
  to say, and gives a sag of about 4% for a half-way divider.
- A meter is a load too: 24 V across two 250 MΩ resistors should read 12 V on
  each, and a 10 MΩ meter reads 0.9 V.

**Exercises to adapt**

- This course's own divider, 9 V on 2 kΩ and 1 kΩ, gives 3 V. With a 1 kΩ load:
  1.8 V. With 10 kΩ: 2.81 V. With 100 kΩ: 2.98 V.
- Two dividers on 50 V, one of 22 kΩ pairs and one of 47 kΩ pairs. Both give
  25 V. Which holds up better under the same load, and what does the other
  have going for it? Kuphaldt.
- A 5 kΩ control on 10 V feeding a 1 kΩ load: 0 V, 1.29 V, 2.22 V, 3.87 V and
  10 V at the quarter points. No longer even. Kuphaldt.
- A load goes across R2. What happens to the voltage across R1? (It rises.)

**Build the job round**

- A switch that brings the load in, and a slider for its size.
- The fault: a reading that is right until the next stage is plugged in.

### №0012 Capacitors

**Sources**

- Kuphaldt, [time constants 1](https://www.ibiblio.org/kuphaldt/socratic/output/time1.pdf), [time constants 2](https://www.ibiblio.org/kuphaldt/socratic/output/time2.pdf) and [capacitors](https://www.ibiblio.org/kuphaldt/socratic/output/caps.pdf)
- OpenStax College Physics 2e, [21.6 RC circuits](https://openstax.org/books/college-physics-2e/pages/21-6-dc-circuits-containing-resistors-and-capacitors)
- Electronics-Tutorials, [RC charging](https://www.electronics-tutorials.ws/rc/rc_1.html)

**How they teach it**

- Kuphaldt: the curve can be reasoned out with no formula. As the voltage on
  the capacitor rises, less is left across the resistor, so less current
  flows, so the voltage rises more slowly.
- OpenStax's wording, which needs no exponential: in each time constant the
  capacitor closes 63% of the gap that is left.
- OpenStax's way in is a camera flash: slow to charge, gone in an instant.
- A picture that works: a tank divided by a rubber sheet. Nothing crosses the
  sheet, and pushing water in one side pushes it out of the other.

**Exercises to adapt**

- What are the voltage across the capacitor, the voltage across the resistor,
  and the current, at three moments: before the switch closes, the instant
  it closes, and long after? (0, 0, 0. Then 0, all of it, the most. Then all
  of it, 0, 0.) Kuphaldt.
- Is a bigger resistor faster or slower? A bigger capacitor? (Both slower.)
- 33 µF and a time constant of 10 s: 303 kΩ. Kuphaldt.
- A capacitor at 100 V let down through a resistor: 36.8 V, 13.5 V, 5 V, 1.8 V and
  0.7 V after one to five time constants.
- A 0.75 µF capacitor at 3000 V must be safe within 15 s: about 4 MΩ across it.
  Kuphaldt. The safety resistor in every old set.

**Build the job round**

- Watch the current as well as the voltage. At the first instant the capacitor
  passes current like a wire, and at the end it is a gap.
- The 63% as something read off the trace, then matched to R × C.
- Say that a charged capacitor in a television can kill.

### №0013 Diodes

**Sources**

- *Lessons in Electric Circuits*, [introduction to diodes](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/introduction-to-diodes-and-rectifiers/) and [meter check of a diode](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/meter-check-of-a-diode/)
- Kuphaldt, [rectifying diodes worksheet](https://www.allaboutcircuits.com/worksheets/rectifying-diodes/)

**How they teach it**

- A battery, a lamp and a diode. Turn the diode round and the lamp goes out.
  A one-way valve, worked by which way the voltage pushes.
- Then the drop: about 0.7 V whatever the current, so treat it as fixed.
- The symbol last: the arrow is the way current may go, and the stripe on the
  part is the bar.
- Left out of a first lesson by all of them: how it works inside.

**Exercises to adapt** (Kuphaldt, CC BY 1.0)

- A diode and a resistor on a supply. What do the readings do if the diode
  fails open? (No current, the full supply across it.) Fails short? (More
  current, 0 V across it.) If the resistor is bridged? (The diode dies.)
- 9 V, 2 kΩ, 0.7 V: 4.15 mA.
- Does a diode that is passing current behave like a resistor? (No: more like
  a 0.7 V battery turned against the supply.)

**Build the job round**

- Raise the supply from 0 V and watch the diode's voltage stick near 0.7 V
  while the resistor takes the rest. The drop is found, not told.
- The meter test: a reading one way, none the other. Both ways or neither
  means a dead diode.

### №0014 LEDs

**Sources**

- *Lessons in Electric Circuits*, [special-purpose diodes](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/special-purpose-diodes/)
- Adafruit, [all about LEDs](https://learn.adafruit.com/all-about-leds/forward-voltage-and-kvl?view=all)
- Electronics-Tutorials, [the LED](https://www.electronics-tutorials.ws/diode/diode_8.html)

**How they teach it**

- Adafruit uses the voltage law the learner already has: the LED takes its
  share, and the resistor must take what is left. Then Ohm's law on the
  resistor.
- Drops by colour, at 20 mA: red about 1.8 V, yellow about 2.2 V, blue and
  white 3 V or more. (A note for the story, not from these sources: blue and
  white LEDs are later than 1984. The shop has red, yellow and green.)
- Round the resistor *up* to the next value sold. A little less light, and a
  longer life.

**Exercises to adapt**

- 6 V, a 1.6 V LED, 20 mA: 220 Ω, and 88 mW in the resistor. On 24 V: 1.12 kΩ and
  448 mW, too much for a ¼ W part. *Lessons in Electric Circuits*. A use for
  №0003.
- 12 V, a 1.8 V LED, 15 mA: 680 Ω exactly, 153 mW.
- An indicator is dark, with the full supply across the LED and 0 V across its
  resistor. Which has failed? (The LED, open.)
- Beware Electronics-Tutorials' example of three red LEDs on 5 V: it
  contradicts its own table.

### №0015 Alternating current

**Sources**

- Kuphaldt, [waveforms worksheet](https://www.ibiblio.org/kuphaldt/socratic/output/wave.pdf)
- *Lessons in Electric Circuits*, [AC waveforms](https://www.allaboutcircuits.com/textbook/alternating-current/chpt-1/ac-waveforms/) and [measurements of AC magnitude](https://www.allaboutcircuits.com/textbook/alternating-current/chpt-1/measurements-ac-magnitude/)
- OpenStax College Physics 2e, [20.5 Alternating current](https://openstax.org/books/college-physics-2e/pages/20-5-alternating-current-versus-direct-current)

**How they teach it**

- Period first, read off a trace. Frequency is how many of those fit in a
  second.
- RMS as a matter of heat: the steady voltage that would warm a resistor as
  much. 10 V DC and 10 V RMS both put 50 W into 2 Ω.
- Kuphaldt uses the ear: two tones from a loudspeaker, and the lower one has
  the longer period.
- What learners believe: that 240 V mains never goes above 240 V.

**Exercises to adapt**

- A trace 10 V high that repeats every 20 ms: 50 Hz, 10 V peak, 20 V from top to
  bottom. Kuphaldt.
- 350 Hz: 2.86 ms. A 1.4 ms period: 714 Hz. Kuphaldt.
- 240 V mains peaks at about 340 V. 120 V mains at about 170 V.
- The same 10 V peak as a sine, a triangle and a square wave: 7.07 V, 5.77 V and
  10 V RMS. Same height, different heat.

**Build the job round**

- Start at 1 Hz, slow enough to watch the current turn round, then speed up.
- Have the learner raise an AC source until a resistor runs as hot as it does
  on DC, and read off the peak.

### №0016 The power supply

**Sources**

- Kuphaldt, [power supply circuits](https://www.ibiblio.org/kuphaldt/socratic/output/supply1.pdf) and [rectifier circuits](https://www.ibiblio.org/kuphaldt/socratic/output/rectify.pdf)
- *Lessons in Electric Circuits*, [rectifier and filter experiment](https://www.allaboutcircuits.com/textbook/experiments/chpt-5/rectifier-filter-circuit/)
- All About Circuits, [troubleshooting a bridge rectifier](https://allaboutcircuits.com/technical-articles/troubleshooting-a-diode-bridge-rectifier)
- *Electronic Servicing*, April 1979, [on bad filter capacitors in televisions](https://gammaelectronics.xyz/electronic-srvc_mag_1979-04_bad.html)

**How they teach it**

- In stages: the diode alone gives humps, the capacitor holds the top of each
  hump, and the load lets it sag before the next one. That sag is ripple.
- More load, more ripple. More capacitance, less.
- **The frequency of the ripple is the clue.** A bridge gives ripple at twice
  the mains frequency. One dead diode drops it to the mains frequency and
  roughly doubles it. A tired capacitor leaves the frequency alone and makes
  the ripple bigger.
- From the 1979 repair bench: a failing filter shows as hum in the sound and
  dark bars drifting up the picture. A DC meter reads nearly right. The test
  is to bridge the suspect with a known good capacitor, with the set off.

**Exercises to adapt** (Kuphaldt, CC BY 1.0)

- 119 V mains, an 8 to 1 transformer, a bridge and a capacitor, no load:
  19.6 V.
- A supply gives 6.1 V without its capacitor and 9.3 V with it. Why?
- Two traces of ripple: which was taken under the heavier load?
- Test points on a dead supply: mains at the fuse and nothing after it. Mains
  in and 0.5 V out of the transformer. Find each fault.

### №0017 Coils

This and №0018 were one job, "Coils and relays", which was two ideas. This
one is how a coil behaves over time.

**Sources**

- Kuphaldt, [inductors](https://www.ibiblio.org/kuphaldt/socratic/output/inds.pdf) and time constants 1 (above)
- OpenStax, [College Physics 2e 23.10](https://openstax.org/books/college-physics-2e/pages/23-10-rl-circuits)
- Electronics-Tutorials, [the inductor](https://www.electronics-tutorials.ws/inductor/inductor.html)

**How they teach it**

- A coil does not hold current back, it holds back *changes* in current.
  Current cannot start or stop at once. The time constant is L ÷ R, and the
  63% rule is the capacitor's over again.
- The surprise for learners: a bigger resistor makes a capacitor slower and a
  coil faster.
- On a steady current a coil is only a length of wire: it reads a low
  resistance on the meter.
- Switch a coil off and its current has nowhere to go, so the voltage across
  it leaps. By the textbook formula, a 0.5 H coil that loses 4 A in 10 ms makes
  200 V.

**Exercises to adapt** (Kuphaldt, CC BY 1.0)

- 75 mH and a time constant of 20 µs: 3.75 kΩ.
- The current in a 5 H coil rises by 4.5 A every second: 22.5 V across it.
- A lamp in series with a coil: how does it come on? (Slowly. With a bigger
  coil, more slowly.)

**Build the job round**

- Set it beside №0012: the same curve, with current where the voltage was.
- Show the kick at switch-off on the trace, then fit a diode across the coil
  and watch it go. That is the diode fitted across every relay coil.

### №0018 Relays

**Sources**

- Kuphaldt, [relays](https://www.ibiblio.org/kuphaldt/socratic/output/relay1.pdf) and time constants 1 (above)
- Electronics-Tutorials, [relay switch circuits](https://www.electronics-tutorials.ws/blog/relay-switch-circuit.html)

**How they teach it**

- Kuphaldt teaches the relay as a switch worked by a current, in steady DC,
  with no word about how a coil behaves over time.
- Two circuits that never touch: the coil, and the contacts it pulls.
  Normally open, normally closed.
- A diode goes across the coil of a relay worked from DC, to take the kick
  when it is switched off.

**Exercises to adapt** (Kuphaldt, CC BY 1.0)

- A relay coil of 250 Ω made for 5 V, on a 24 V supply: 20 mA, so 950 Ω in series.
- A push-button, a relay and two lamps: green only while the button is down,
  red only while it is up. Which contacts?
- An alarm loop with a broken wire. Wired one way the break goes unnoticed.
  Wired through a relay's normally closed contact, the break sounds the alarm.
- A relay lets go late once a lamp is wired across its coil. Why? (The lamp
  gives the coil's current somewhere to go on flowing.) The diode from №0017
  does the same.

**Build the job round**

- The coil's circuit first: Ohm's law says whether it pulls in. Then the
  contacts' circuit: which lamp is lit with the coil off?
- It sets up №0019: a small current switching a large one. The transistor
  does the same with nothing that moves.

### №0019 The transistor as a switch

**Sources**

- *Lessons in Electric Circuits*, [the transistor as a switch](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/transistor-switch-bjt/) and [the experiment](https://www.allaboutcircuits.com/textbook/experiments/chpt-5/transistor-as-a-switch/)
- Kuphaldt, [transistors as switches worksheet](https://www.allaboutcircuits.com/worksheets/bipolar-junction-transistors-as-switches/)
- Electronics Notes, [transistor switch design](https://www.electronics-notes.com/articles/analogue_circuits/transistor/transistor-switch.php)

**How they teach it**

- *Lessons in Electric Circuits* takes a lamp with an ordinary switch and puts
  the transistor where the switch was. It insists on one thing: the lamp's
  power comes from the battery, not from the signal that turns it on.
- Off, and fully on. Fully on leaves about 0.2 V across the transistor.
- The base resistor: work out the base current the load needs, then round the
  resistor *down*, so there is current to spare.
- Its experiment: a wet finger across the base resistor lights an LED.

**Exercises to adapt**

- A 4 mA load, a gain of 200, a 2.5 V signal: 20 µA into the base, 90 kΩ, so fit
  82 kΩ.
- Six push-button lamp circuits. Three have no base resistor. Which will burn
  out? Kuphaldt.
- A lamp that never lights: 24 V at one test point, and 23.5 V across the
  transistor whether the button is pressed or not. What could it be? Kuphaldt.

### №0020 The transistor as an amplifier

**Sources**

- Kuphaldt, [transistors in active mode](https://www.ibiblio.org/kuphaldt/socratic/output/bjt2.pdf)
- University of Washington, [a single-stage amplifier lab](https://staff.washington.edu/kd1uj/BEE332/Lab2/BEE%20332%20Lab%202%20single%20stage%20amplifiers.pdf)
- Electronics-Tutorials, [the common emitter amplifier](https://www.electronics-tutorials.ws/amplifier/amp_2.html)

**How they teach it**

- The gentlest way across from the switch is the wet finger again: between off
  and fully on there is a middle, where a little more in gives a lot more out.
- Then bias: a divider holds the base so that the output rests half-way, with
  room to move both ways.
- The gain is roughly the collector resistor over the emitter resistor, and
  hardly depends on the transistor.
- The lab's habit: read the three voltages before anything else. Emitter
  lowest, base 0.7 V above it, collector highest.

**Exercises to adapt**

- 10 V supply, base held at 1.5 V by a divider passing 150 µA: 10 kΩ below and
  56 kΩ above. 0.8 V across a 1 kΩ emitter resistor, a 5 kΩ collector resistor,
  the collector at 6 V. Gain about 5.
- Raise the input until the output flattens. Which side flattens first, and
  why?
- The base reads 0 V. The collector reads the full supply. What has failed?

**Leave out of a first job:** capacitors, frequency, and every other way of
wiring a transistor.

## What this changed in the plan

1. **№0008 comes next, and can open on something seen**: two equal branches
   acting as half. The formula follows from №0005 in one line.
2. **"Coils and relays" was two ideas and is now two jobs**: coils (№0017)
   and relays (№0018). The transistor jobs moved to №0019 and №0020.
3. **№0009 ends on fault-finding by voltage.** Every source that teaches
   repair teaches the two signs: the full supply across an open part, and
   nothing across a shorted one. №0004 and №0007 already ask about them, so
   №0009 measures them, and no separate job repeats them.
4. **№0010 is taught as a voltage divider.**
5. **Nothing in the course covers energy over time** (E = P × t, the unit on
   an electricity bill). OpenStax treats it as part of power. It is not
   needed for repair work, so it is left out on purpose until someone
   decides otherwise.
