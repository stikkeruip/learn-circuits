# Research: the diode, the LED and the Zener diode

For the component lessons (№0013 Diodes, №0014 LEDs, and a Zener job that has
no number yet). Gathered on 20 November 2026. It adds to `RESEARCH.md` and does
not repeat it: the one-way valve, the 0.7 V drop, the LED series resistor and
the exercises already listed there are left out on purpose.

## How far to trust this

- Web pages were read through a summarising fetch, so what is reported is the
  substance of a page, not its wording. Sixteen PDFs were read directly as text:
  Kuphaldt's worksheets *Rectifying diodes*, *Zener diodes*, *Special diodes*,
  *Miscellaneous diode applications*, *Optoelectronic devices*, *PN junctions*,
  *Regulated power sources* and *Basic AC-DC power supplies*; his ModEL module
  *PN Junctions and Diodes*; the onsemi Zener handbook; two University of Kansas
  handouts; and four Vishay datasheets.
- Every number in an exercise was recomputed by me (a short Python script).
  Where a source's own answer could not be read (it was a picture), that is said.
- "Unverified" marks anything that did not come from a page I loaded.
  "Mine" marks a figure or a deduction I worked out from the sources' rules,
  which the lesson's simulator should confirm before it is used.
- Only one phrase in this file is quoted from a source (in the Zener section).
  Everything else is paraphrase.

### Pages that would not load, or were only partly read

| Page | What happened |
|---|---|
| RF Cafe copies of NEETS Module 7 (`rfcafe.com/.../NEETS-Module-07-1-31-1-40.htm` and `...-1-41-1-47.htm`) | HTTP 404. NEETS was read from the tpub.com copy instead |
| radiomuseum.org page for the ZTK33 | HTTP 403. Nothing here comes from it |
| University of Maryland ENEE 206 lecture 9 (`classweb.ece.umd.edu`) | Certificate error |
| George Washington University lab 3b PDF (`www2.seas.gwu.edu`) | Certificate error |
| All About Circuits copy of the Zener worksheet | Loaded, but it is split over 8 pages and only 3 of 23 questions came through. The ibiblio PDF was read in full instead |
| Goldwasser's TV repair FAQ | 665,000 characters long. Only the first 300,000 were read (safety, adjustments, low-voltage supply, deflection, high voltage) |
| Wikipedia: *Light-emitting diode*, *Diode*, *Seven-segment display* | Only the first 100,000 characters of each were read |
| Electronics-Tutorials worked answers (Zener example, LED with 100 Ω) | The answers are pictures. The questions were read; the answers given below are mine |
| NEETS Module 7, Zener pages | The breakdown theory and review questions loaded. Two pages were figure captions only, and no page describing a Zener shunt regulator with values was found |
| Not retried | The Physics Classroom, SparkFun, Khan Academy, BBC Bitesize, HyperPhysics, MIT OpenCourseWare: `RESEARCH.md` records that these do not load |

### Licences, as each page states them

| Source | Licence as stated | Use here |
|---|---|---|
| Kuphaldt, *Socratic Electronics* worksheet PDFs (ibiblio) | Each PDF says CC BY 1.0. Note: the project's index page now says CC BY 3.0 United States for the project as a whole | Exercises adapted, with credit |
| Kuphaldt, *Modular Electronics Learning*, "PN Junctions and Diodes" | CC BY 4.0 | Exercises adapted, with credit |
| Kuphaldt, *Lessons in Electric Circuits* on All About Circuits | Design Science License; page footer also says © EETech Group, all rights reserved | Ideas and order of teaching |
| OpenStax, *University Physics* vol. 3 §9.7 | CC BY-NC-SA 4.0, with a notice forbidding use in generative-AI products without written permission | Ideas only. Nothing taken |
| Electronics-Tutorials.ws | © AspenCore, all rights reserved | Ideas only |
| learnabout-electronics.org | © Eric Coates, all rights reserved | Ideas only |
| electronics-notes.com | "© electronics-notes.com", no licence stated | Ideas only |
| electronicsclub.info | © John Hewes, no licence stated | Ideas only |
| S. M. Goldwasser, repairfaq.org | © the author, all rights reserved; copying allowed if the notice is kept whole and no charge is made | Ideas only |
| NEETS Module 7 (tpub.com copy) | The host states © Integrated Publishing, all rights reserved. No public-domain statement on the pages. (That NEETS is a US Navy text free of copyright: Unverified) | Ideas only |
| Fluke | None stated in the text read | Ideas only |
| Vishay datasheets | None stated beyond the maker's disclaimers | Facts (ratings) only |
| onsemi, *Zener Theory and Design Considerations Handbook* HBD854/D | © SCILLC 2017, all rights reserved | Ideas only |
| University of Kansas, J. Stiles, EECS 312 handouts | None stated | Ideas only |
| CALCE (University of Maryland) LED page | © 2012 CALCE, all rights reserved | Findings only |
| Wikipedia | CC BY-SA 4.0 | Ideas and facts only |

---

## 1. The diode (rectifier and signal diode)

### Sources

Kuphaldt (worksheets CC BY 1.0, ModEL CC BY 4.0):

- *Rectifying diodes* worksheet, PDF: <https://www.ibiblio.org/kuphaldt/socratic/output/diode1.pdf>
- *Miscellaneous diode applications* worksheet, PDF: <https://www.ibiblio.org/kuphaldt/socratic/output/diodeapp.pdf>
- *PN junctions* worksheet, PDF: <https://www.ibiblio.org/kuphaldt/socratic/output/pnj.pdf>
- *Basic AC-DC power supplies* worksheet, PDF: <https://www.ibiblio.org/kuphaldt/socratic/output/supply1.pdf>
- Worksheet index (the list of PDFs): <https://www.ibiblio.org/kuphaldt/socratic/doc/topical.html>
- ModEL, *PN Junctions and Diodes*, PDF: <https://www.ibiblio.org/kuphaldt/socratic/model/mod_pn.pdf> (index: <https://www.ibiblio.org/kuphaldt/socratic/model/>)

*Lessons in Electric Circuits*, semiconductors chapter 3 (Design Science License):

- [Introduction to diodes and rectifiers](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/introduction-to-diodes-and-rectifiers/)
- [Meter check of a diode](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/meter-check-of-a-diode/)
- [Diode ratings](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/diode-ratings/)
- [Rectifier circuits](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/rectifier-circuits/)
- [Inductor commutating circuits](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/inductor-commutating-circuits/)
- [Diode switching circuits](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/diode-switching-circuits/)

Others:

- OpenStax, *University Physics* vol. 3, [§9.7 Semiconductor devices](https://openstax.org/books/university-physics-volume-3/pages/9-7-semiconductor-devices) (CC BY-NC-SA 4.0, AI notice)
- NEETS Module 7 on tpub.com (host: all rights reserved): [index](https://electriciantraining.tpub.com/14179/), [diode identification](https://tpub.com/neets/book7/24k.htm), [diode maintenance and testing](https://tpub.com/neets/book7/24l.htm), [troubleshooting, component problems](https://electriciantraining.tpub.com/14179/css/Component-Problems-225.htm)
- learnabout-electronics.org (all rights reserved): [2.0 Introduction to diodes](https://learnabout-electronics.org/Semiconductors/diodes_20.php), [2.1 Silicon rectifiers](https://learnabout-electronics.org/Semiconductors/diodes_21.php), [2.3 Small signal diodes](https://learnabout-electronics.org/Semiconductors/diodes_23.php), [2.8 Testing diodes](https://learnabout-electronics.org/Semiconductors/diodes_28.php), [2.9 Diode quiz](https://learnabout-electronics.org/Semiconductors/diodes_29.php)
- Electronics-Tutorials (all rights reserved): [Signal diode](https://www.electronics-tutorials.ws/diode/diode_4.html), [Power diodes and rectifiers](https://www.electronics-tutorials.ws/diode/diode_5.html)
- Electronics Notes (no licence stated): [How to test a diode with a multimeter](https://www.electronics-notes.com/articles/test-methods/meters/multimeter-diode-transistor-test.php), [Analogue multimeter](https://www.electronics-notes.com/articles/test-methods/meters/analogue-multimeter.php)
- Electronics Club (© John Hewes): [Diodes](https://electronicsclub.info/diodes.htm)
- S. M. Goldwasser (all rights reserved, free copying with notice): [Basic testing of semiconductor devices](https://repairfaq.org/sam/semitest.htm), [TV repair FAQ](https://repairfaq.org/sam/tvfaq.htm) (first 300,000 characters)
- Fluke (none stated): [How to test diodes with a digital multimeter](https://www.fluke.com/en-us/learn/blog/digital-multimeters/how-to-test-diodes)
- Vishay datasheets (maker's disclaimers only): [1N4148](https://www.vishay.com/docs/81857/1n4148.pdf), [1N4001 to 1N4007](https://www.vishay.com/docs/88503/1n4001.pdf)
- Wikipedia (CC BY-SA 4.0): [Diode](https://en.wikipedia.org/wiki/Diode) (first part), [1N4148 signal diode](https://en.wikipedia.org/wiki/1N4148_signal_diode), [1N400x rectifier diode](https://en.wikipedia.org/wiki/1N400x_rectifier_diode), [Flyback diode](https://en.wikipedia.org/wiki/Flyback_diode), [Detector (radio)](https://en.wikipedia.org/wiki/Detector_(radio)), [Pro Electron](https://en.wikipedia.org/wiki/Pro_Electron)

### How it works

- A diode is one piece of silicon made in two halves. One half (N) has had a
  trace of another element added that leaves it with spare electrons free to
  move. The other half (P) has had a different trace added that leaves gaps,
  called holes, which electrons can hop into. Either half alone conducts.
  (ModEL; learnabout 2.0.)
- Where the halves meet, the spare electrons next to the join drop into the
  holes next to it. That leaves a very thin layer with nothing free to move:
  an insulator inside the part. All the sources call it the depletion region
  or layer. (LIEC; ModEL; OpenStax; Kuphaldt *PN junctions* Q1.)
- A voltage one way round squeezes that layer away and current flows. The
  other way round pulls the layer wider and nothing flows. That is the whole
  one-way action. LIEC's picture is a check valve opened by pressure the right
  way. OpenStax uses the same one-way valve.
- Squeezing the layer away costs a fixed toll: about 0.6 to 0.7 V in silicon,
  0.2 to 0.3 V in germanium. ModEL puts it well for beginners: every charge
  that crosses pays the same energy penalty, however many cross. That is why
  the drop barely changes with current, and why a diode is not a resistor.
- The switch-on is sharp. ModEL's simulated silicon diode passes 0.12 mA at
  0.6 V, 5.7 mA at 0.7 V and 271 mA at 0.8 V. So in a real circuit the diode
  fixes the voltage and the resistor fixes the current.
- Two things a repairer should know beyond that. Heat lowers the drop, by
  about 2 mV for each degree (learnabout says 2 to 3; Wikipedia says about 2),
  and roughly doubles the tiny backward leakage for every 10 °C (learnabout).
  And too much voltage backwards breaks the layer down: in an ordinary diode
  that is normally the end of it (LIEC).

### What it is for, and where it is found

- **Turning AC into DC (rectifying).** The main job in every mains set. One
  diode gives half the wave, four in a bridge give all of it at the cost of
  two diode drops, about 1.4 V (LIEC, rectifier circuits). Goldwasser's TV FAQ
  says the main bridge in a television is often four separate diodes of the
  1N400x kind, and that their usual failure is to short. Today: every mains
  adaptor (Wikipedia, 1N400x).
- **Protection against a reversed supply.** A diode in series with the supply
  lead passes nothing if the batteries or the plug go in backwards (Wikipedia,
  *Diode*). The price is the 0.7 V drop. Kuphaldt's version is a generator
  charging a battery: the diode stops the battery driving the generator as a
  motor when the engine stops (*Rectifying diodes* Q14; ModEL 6.1.3).
- **Catching the kick of a coil.** A diode wired backwards across a relay or
  solenoid coil does nothing while the coil is on. At switch-off the coil's
  current has somewhere to go, so the voltage is held near 0.7 V above the
  supply, not hundreds of volts (LIEC; Kuphaldt *Misc. diode applications* Q1).
  Wikipedia gives a measured case: a 24 V solenoid kicked to about −300 V
  bare, and to about −1.4 V with a 1N4007 across it. The cost: the relay
  lets go more slowly. This belongs with №0017 and №0018.
- **Detecting radio.** The diode cuts off one half of the radio wave; a
  capacitor and resistor then leave the slow audio outline. In a superhet this
  stage is called the second detector, after the IF stages (Wikipedia,
  *Detector*). Germanium diodes, whose drop is only 0.2 to 0.3 V, were the
  usual detectors (Electronics Club names the OA90; Wikipedia names the 1N34
  of 1946 and the AA119). That the low drop is the reason: implied by these
  pages, not stated. Before that came the crystal and cat's whisker (ModEL's
  history chapter; Wikipedia).
- **Steering.** Two supplies each feed a set through its own diode: whichever
  is higher does the work and neither can feed the other. A mains supply with
  a standby battery is the plain case (LIEC, diode switching; Kuphaldt *Misc.
  diode applications* Q5).
- **Limiting.** Two diodes back to back across a meter movement or a pair of
  headphones do nothing below about 0.6 V and clamp anything above it
  (Kuphaldt *Misc. diode applications* Q3 and its note about a kit multimeter).
- **In a 1970s or 80s television,** from the part of Goldwasser's FAQ that was
  read: the mains bridge, the damper diode beside the line output transistor,
  the high-voltage rectifiers built into the flyback transformer, and
  rectifiers on the flyback's low-voltage windings. A shorted mains rectifier
  blows the fuse at once.
- Unverified, from memory and not from a loaded page: named European types in
  sets of the period (BY127 and BY133 mains rectifiers, OA91 and 1N60
  detectors, BA-series signal diodes). Wikipedia lists BY127 and AA119 only as
  examples of the numbering scheme.

### Ratings and markings

- **The band marks the cathode**, the end current leaves by, the bar of the
  symbol. Vishay's 1N400x sheet says the colour band is the cathode end, and
  its 1N4148 sheet says the cathode band is black. NEETS adds the other marks
  a 1984 bench would meet: a `k`, a `+` or the word `cath`, a colour dot, or a
  shaped end. Electronics Club: on diagrams the leads are `a` and `k`.
- **Coloured bands can spell the number.** NEETS: bands at the cathode end read
  like resistor colours, so brown, orange, white is 1N139.
- **What the number means.** American (JEDEC) `1N…`: one junction, N for
  semiconductor (NEETS). Japanese `1S…` (Wikipedia). European (Pro Electron):
  first letter A germanium, B silicon; second letter A signal diode, Y
  rectifier, Z Zener (Wikipedia). Electronics Club: codes starting `OA` are
  germanium, and need a heat-shunt clip when soldered.
- **1N4148**, the glass signal diode (Vishay): 100 V peak reverse, 75 V steady
  reverse, 300 mA steady forward (150 mA average), 500 mW, drop at most 1 V at
  10 mA, leakage 25 nA at 20 V, switches off in 4 to 8 ns. Registered 1968; the
  near-identical 1N914 dates from 1960 (Wikipedia).
- **1N4001 to 1N4007**, the 1 A plastic rectifiers (Vishay): the only thing
  that differs along the series is the reverse voltage, 50, 100, 200, 400, 600,
  800 and 1000 V. All carry 1 A average, survive a 30 A surge for one
  half-cycle, drop about 1.1 V at full current, leak about 5 µA, and must stay
  below 150 °C. Registered by Motorola in 1963. The 3 A cousins are 1N5400 to
  1N5408 (Wikipedia).
- **The ratings that matter to a repairer** (LIEC; ModEL): most forward
  current (a heat limit), surge current, peak inverse voltage, leakage, and for
  fast circuits the recovery time. A replacement must match or beat the first
  three. Goldwasser warns that a slow 1N4007 put where a fast diode was will
  misbehave or burn.
- **Peak inverse voltage catches people.** Behind a smoothing capacitor a
  half-wave rectifier's diode faces twice the peak. learnabout's case is 230 V
  mains: peak 325 V, so 650 V across the diode, so fit an 800 or 1000 V part.
- **Signal against rectifier.** Electronics-Tutorials: signal diodes are small,
  glass, fast, good for a few hundred milliamps at most. Rectifiers are big,
  slow, and built to shed heat. (Electronics-Tutorials puts the 1N4148's limit
  near 150 mA and Electronics Club gives 100 mA for signal diodes in general.
  Vishay's sheet is the one to trust.)

### How they teach it (only what `RESEARCH.md` lacks)

- **How it works inside comes second, or not at all.** ModEL is the one source
  that puts the inside first, and it reaches the depletion region in a few
  paragraphs by way of the valve (vacuum tube) diode: an empty gap that needs
  energy before charge will cross it. That comparison would suit a 1984 shop
  with valve sets still coming in.
- **Kuphaldt's fault questions go in a fixed order**: first tell the learner
  the fault and ask for the readings, and only later give the readings and ask
  for the fault. His note to instructors says the first kind is the foundation
  for the second.
- **Misconceptions the sources name.**
  - That silicon always drops exactly 0.7 V. Kuphaldt (*PN junctions*, note 15)
    says textbooks press this so hard that learners do not question a reading
    that differs. It moves with current, temperature and the make of diode.
  - That the ohmmeter's figure is the diode's resistance. LIEC: the number is
    meaningless and changes from meter to meter. NEETS: do not condemn a diode
    because two meters disagree.
  - That the red lead is positive. On many analogue meters the black lead is
    positive on the ohms ranges (LIEC; learnabout; Goldwasser).
  - That a diode can be told by its looks. Kuphaldt's trick question
    (*Special diodes* Q7): only the part number identifies it.
  - That parts in parallel or series share fairly. Three 1 A diodes in
    parallel do not safely carry 3 A without small series resistors (Kuphaldt
    *Rectifying diodes* Q15). He leaves the reason to the student. It is that
    the warmest diode drops least and so takes most (mine).

### Faulty or working

**How they fail, and how often.**

- **Shorted** is the common failure. learnabout calls it the commonest diode
  fault, most of all in power supplies. ModEL remarks that junctions fail
  shorted more often than many other kinds of part, such as resistors.
  Goldwasser's TV FAQ says
  the same of mains rectifiers. Electronics Notes: most failures are total, and
  slow drift is very rare.
- **Open** happens now and then, mostly in small signal diodes (learnabout).
- **Leaky** (conducts a little backwards) happens sometimes in small signal
  diodes. A power diode seldom stays merely leaky: the backward current heats
  it until it shorts (learnabout).
- **What kills them** (NEETS): too much current, too much reverse voltage, and
  above all heat, which raises the current, which raises the heat (thermal
  runaway). Kuphaldt's example of the first: a solder bridge across the series
  resistor. NEETS also warns against fitting or pulling a diode with the set
  switched on, and against static from fingers on signal diodes.
- **Signs before the meter comes out**: a blown fuse or a cooked-looking body
  (learnabout), white smoke from a nearby electrolytic that died with it
  (Goldwasser).

**In circuit, set switched on, voltmeter across the diode** (Kuphaldt
*Rectifying diodes* Q5 and Q6; LIEC):

| Diode | Across the diode | Across the series resistor | Current |
|---|---|---|---|
| Good, forward | About 0.6 to 0.7 V (silicon); 0.2 to 0.3 V (germanium) | The rest of the supply | Normal |
| Open | The full supply | 0 V | None |
| Shorted | About 0 V | The full supply | A little more than normal |
| Good, but fitted backwards | The full supply | 0 V | None |

- The last row is mine, from the rule and from ModEL's challenge about a
  reversed supply. It matters: **in circuit, a backwards diode and an open
  diode read exactly alike.** Only the out-of-circuit test, or the stripe,
  tells them apart.
- Mine, by the same rule: a reading well above 0.7 V but below the supply,
  across a diode that should be conducting, means it is not conducting
  properly, so treat it as open.
- Mine also: a diode that is *meant* to be reverse-biased (a coil's catch
  diode) should have the supply across it. 0 V across one of those means it
  has shorted.

**Out of circuit, analogue ohmmeter, both ways round** (LIEC; ModEL; NEETS;
learnabout; Goldwasser):

| Reading one way | Reading the other way | Verdict |
|---|---|---|
| Low | Very high (needle does not move) | Good |
| Low | Low | Shorted |
| High | High | Open |
| Low | High, but the needle moves a little | Leaky (germanium does this even when good, on a high range) |

- Goldwasser: on a low ohms range a good diode reads around two-thirds of
  full scale, a couple of hundred ohms. Not near zero, and not open both ways.
- NEETS's rule of thumb is the ratio of the two readings: several hundred to
  one for a signal diode; a power rectifier can still work at ten to one.
- Goldwasser's TV FAQ gives bench thresholds: still in circuit, one direction
  should read over 100 Ω and anything near 0 to 5 Ω is suspect; with one lead
  lifted, one direction should read over 1 MΩ; any semiconductor reading under
  10 Ω is most likely dead.
- The test also finds which end is the cathode on an unmarked diode, once you
  know which meter lead is positive.

**On a diode-test range** (Fluke; Goldwasser; LIEC): the meter shows the
forward drop, 0.5 to 0.8 V for silicon and 0.2 to 0.4 V for germanium, a
little under the textbook figure because the test current is tiny (LIEC's
example reads 0.548 V). Reversed: over-range. Open: over-range both ways.
Shorted: the same low reading both ways. (Fluke says about 0.4 V both ways;
Goldwasser says zero. Teach "the same both ways".) Whether a 1984 shop would
own a meter with this range: Unverified. The analogue test is the safe one to
set the story on.

**Limits of these tests.**

- The ohms figure means nothing in itself and differs between meters and
  between ranges (LIEC; Electronics Notes; NEETS).
- Lead polarity on the ohms ranges may be the reverse of the lead colours.
  Check the meter once on a known-good, marked diode (Goldwasser suggests a
  1N4007 or 1N4148). learnabout's own page contradicts itself on which lead
  goes where, which shows how easy the slip is.
- Some meters put out too little voltage on ohms to open a junction at all,
  so a good diode reads open both ways (LIEC gives under 0.3 V for some
  meters; ModEL says digital meters do this on purpose, so that resistors can
  be measured in circuit).
- The meter tests at a volt or so. A diode can pass and still break down at
  working voltage (NEETS). Peak inverse voltage cannot be checked this way
  (LIEC; Electronics Notes). NEETS's last resort is to swap in a known-good
  part, after checking that nothing else in the circuit will kill it.
- In circuit, other parts in parallel pull the readings down. Lift one lead
  (learnabout; Fluke; NEETS; Goldwasser). Leakage can only be judged with the
  diode out.
- Goldwasser: the lowest ohms range of an analogue meter can push enough
  current to hurt a small device. Use the next range up.

**Common beginner mistakes.**

- Measuring ohms with the set switched on, or with a capacitor still charged
  (Fluke; Goldwasser).
- Testing one way only. Low one way proves nothing until the other way reads
  high.
- Trusting the lead colours on an analogue meter.
- Fitting the replacement backwards (NEETS lists checking direction as a
  precaution). In a bridge rectifier that puts a short across the transformer
  (mine).
- Testing a signal diode with a lamp and battery: the lamp's current destroys
  it (Electronics Club).
- Replacing by looks, not by number, or with a lower voltage rating.
- Replacing the shorted diode and nothing else, when a dead capacitor beside
  it was the cause or went with it (Goldwasser).

### Exercises found

Kuphaldt's, CC BY 1.0 unless marked. All answers recomputed.

1. **Two resistors and a diode in a row** (*Rectifying diodes* Q6; ModEL
   6.3.1). For each single fault, say what every voltage and the current do:
   diode open; diode shorted; R1 open; R2 open. *Answer:* whichever part is
   open has the full supply across it and everything else has none, with no
   current. Diode shorted: slightly more current, slightly more across each
   resistor, about nothing across the diode.
2. **The supply is turned round** (ModEL 6.2.3, challenge; CC BY 4.0). What do
   the readings become? *Answer (mine):* no current, full supply across the
   diode, nothing across the resistor: the same as an open diode.
3. **The table** (*Rectifying diodes* Q3). 12 V, 470 Ω, a diode dropping
   0.65 V. *Answer:* 11.35 V across the resistor, 24.15 mA, 274 mW in the
   resistor, 15.7 mW in the diode, 290 mW in all. Worth noticing: 274 mW is
   too much for a ¼ W resistor. (Second set: 16 V, 920 Ω, 0.72 V gives
   15.28 V, 16.61 mA, 253.8 mW, 11.96 mW, 265.7 mW.)
4. **A tester with two lamps** (*Rectifying diodes* Q10; ModEL 6.3.2). On AC,
   a resistor feeds the diode under test in series with two LEDs wired back to
   back. What shows for a good, a shorted and an open diode? *Answer:* one LED
   lit; both lit; neither lit. Which one lights tells you which end is the
   cathode. A DC form for this course: a battery, a resistor and a lamp, with
   the diode tried both ways round. Lit one way only: good. Both ways:
   shorted. Neither: open.
5. **Draw the faults** (*Rectifying diodes* Q12). A good diode's graph of
   current against voltage is flat to the left and climbs steeply on the
   right. Draw it for a shorted diode and for an open one. *Answer:* shorted
   is a vertical line through the middle (current with no voltage, both
   ways); open is flat along zero current, both ways. (The worksheet's answer
   is a drawing that did not come through as text; this is what it must show.)
6. **What differs along the 1N4001 to 1N4007 series?** (*Rectifying diodes*
   Q2.) *Answer:* only the reverse voltage it will block. Follow-up from the
   notes: why might a shop stock only the 1N4007?
7. **Not enough rating** (*Rectifying diodes* Q15 and Q16). Only 1 A diodes to
   hand and 2.5 A to carry: three in parallel, but one will overheat unless
   each has a small resistor in series. Only 100 V diodes and 480 V AC to
   block: the peak is 679 V, so seven in series, with a high resistor across
   each so they share. The idea, more than the sums: parts do not share evenly
   on their own.
8. **An ammeter across a diode** (*Misc. diode applications* Q4). 12 V, 2 kΩ
   and 1 kΩ in series with a diode. An ammeter of 0.5 Ω is clipped *across*
   the diode. What does it read, and why is that allowed here? *Answer:*
   4.00 mA (12 V ÷ 3000.5 Ω). The meter leaves only 2 mV across the diode, far
   too little to open it, so every bit of the current goes through the meter.
   (The circuit is a drawing; the series layout is my reading of it, and the
   worksheet's 4 mA agrees.)
9. **Three supplies, one load** (*Misc. diode applications* Q5). One supply
   shorts inside and drags the others down. Where do diodes go to stop it?
   *Answer:* one in series with each supply, pointing at the load.
10. **Measure the drop yourself** (*PN junctions* Q10 and Q17). Design a
    circuit to read a diode's forward voltage without a diode-test meter, then
    warm the diode in your fingers. *Answer:* battery, resistor, diode, and a
    voltmeter across the diode. Warmed, the reading falls a little (about
    2 mV per degree, by learnabout and Wikipedia; Kuphaldt withholds the
    answer on purpose).
11. **The diode that keeps dying** (*Basic AC-DC power supplies* Q29). A 50 V
    diode on a transformer giving 30 V (42 V peak) fails again and again.
    *Answer:* it needs about 85 V: behind the smoothing capacitor it faces
    twice the peak. (AC: for №0016.)
12. **NEETS review** (Q35, Q36). What is the greatest danger to a diode?
    Heat. What do two high ohmmeter readings mean? Open. And from the colour
    bands: orange, blue, grey is 1N368 (mine, from the resistor code).

### Build the lesson round

- **One circuit, four diodes in the drawer**: good, shorted, open, and a good
  one fitted backwards. A voltmeter across the diode sorts them into three
  piles (about 0.7 V, 0 V, full supply), and the learner finds that the last
  pile holds two different things.
- **Then the ohmmeter, both ways, to split that pile.** Make "both ways" the
  habit. Have the bench meter's black lead be the positive one, and make the
  learner find that out on a marked diode first.
- **A job with a DC story**: a battery set that died after the customer fitted
  the batteries backwards and "something got hot". Or the kinder version: a
  set with a series protection diode that survived, and now runs on 0.7 V
  less than the battery gives.
- **The stripe and the number as part of the repair**: the drawer holds
  1N4148, 1N4001 and 1N4007. Which will do as a replacement, and which way
  round does it go?
- **Say what the ohms figure is not.** One step where two meters give two
  different "resistances" for the same good diode would kill the idea that a
  diode has a resistance.

---

## 2. The LED

### Sources

- Kuphaldt, *Optoelectronic devices* worksheet, PDF (CC BY 1.0): <https://www.ibiblio.org/kuphaldt/socratic/output/photod.pdf>
- Kuphaldt, *Special diodes* worksheet, PDF (CC BY 1.0): <https://www.ibiblio.org/kuphaldt/socratic/output/diode2.pdf>
- Kuphaldt, ModEL *PN Junctions and Diodes*, question 6.2.4 (CC BY 4.0): <https://www.ibiblio.org/kuphaldt/socratic/model/mod_pn.pdf>
- *Lessons in Electric Circuits*, [special-purpose diodes](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/special-purpose-diodes/), LED section (Design Science License)
- Electronics-Tutorials, [the light emitting diode](https://www.electronics-tutorials.ws/diode/diode_8.html) (all rights reserved)
- learnabout-electronics.org, [2.5 LEDs](https://learnabout-electronics.org/Semiconductors/diodes_25.php) and [2.8 Testing diodes](https://learnabout-electronics.org/Semiconductors/diodes_28.php) (all rights reserved)
- Electronics Club, [LEDs](https://electronicsclub.info/leds.htm) (© John Hewes)
- NEETS Module 7, [optoelectronic devices](https://electriciantraining.tpub.com/14179/css/Optoelectronic-Devices-141.htm) (host: all rights reserved)
- S. M. Goldwasser, [Basic testing of semiconductor devices](https://repairfaq.org/sam/semitest.htm)
- Vishay, [TLUR5400 red 5 mm LED datasheet](https://www.vishay.com/docs/83055/tlur540.pdf) (found through its [product page](https://www.vishay.com/en/product/83055/))
- CALCE, University of Maryland, [LED failure mechanisms](https://web.calce.umd.edu/LED/pof.htm) (all rights reserved)
- Wikipedia (CC BY-SA 4.0): [Light-emitting diode](https://en.wikipedia.org/wiki/Light-emitting_diode) (first part), [List of LED failure modes](https://en.wikipedia.org/wiki/List_of_LED_failure_modes), [Seven-segment display](https://en.wikipedia.org/wiki/Seven-segment_display) (first part)

### How it works

- An LED is a diode, with the same join of two halves and the same one-way
  action. It lights only when current flows forward.
- When an electron drops into a hole at the join it gives up energy. In
  silicon that comes out as heat. In the compounds an LED is made of
  (gallium with arsenic and phosphorus, for red) it comes out as light
  (LIEC; Electronics-Tutorials; learnabout; Kuphaldt *Optoelectronic devices*
  Q1).
- The material sets the colour, and nothing else does: not the current, not
  the voltage, and not the colour of the plastic (Kuphaldt Q2; LIEC, with the
  neon lamp as its comparison; Electronics Club; learnabout).
- The bigger the drop of energy, the bluer the light and the higher the
  forward voltage. That is why an LED's drop is 1.6 V and up, not 0.7 V, and
  why it differs by colour (LIEC; learnabout).
- The chip is a speck in a reflecting cup on one lead, and the plastic dome is
  a lens that throws the light forward (Electronics-Tutorials; learnabout). A
  hair-thin bond wire joins the chip to the other lead (named in CALCE's and
  Wikipedia's failure lists). That wire matters when it comes to faults.
- It works backwards too: light on an LED makes a small voltage (LIEC;
  Kuphaldt Q5 sets it as an experiment and withholds the answer).

### What it is for, and where it is found

- **The indicator lamp.** NEETS, a text of the period, says LEDs were brought
  in to replace fragile, short-lived panel bulbs as power-on lamps, and gives
  the figures of the day: about 1.6 V, about 10 mA, a life over 100,000 hours.
  Wikipedia: Monsanto and Hewlett-Packard brought the price under five cents
  in the 1970s.
- **Number displays.** Seven bars, each an LED, with all the anodes or all the
  cathodes joined: common anode or common cathode. In calculators, digital
  meters and counters (NEETS), widely through the 1970s and 80s (Wikipedia),
  then pushed out by liquid crystal. Many-digit displays light one digit at a
  time, fast (Wikipedia).
- **Colours in 1984.** Red first and commonest; then green, yellow, orange or
  amber, and infrared (LIEC; NEETS lists red, green and amber). Two-colour
  red/green parts were on sale in the 1980s (LIEC). Blue arrived in the early
  1990s and white in 1996 (Wikipedia). So the shop's drawer holds red, green,
  yellow and perhaps orange.
- **Infrared.** In sensors and remote-control handsets (learnabout). You
  cannot see whether one works: Goldwasser says it needs an infrared detector.
- **Inside an opto-coupler**, an LED shines on a light-sensitive transistor so
  that one circuit can signal another with no wire between them, across up to
  5000 V (Electronics-Tutorials; Kuphaldt Q8).
- **A two-colour LED as a polarity tester**: two chips back to back in one
  body, red one way and green the other (Electronics-Tutorials).
- **Why LEDs beat small bulbs** (LIEC; Kuphaldt Q9): far more light per watt,
  cool, nothing to shake loose, and they switch in a flash, which a filament
  cannot. Today: lighting, screens, optical links.

### Ratings and markings

- **Which lead is which.** The cathode is the shorter lead, and the rim of the
  body has a small flat beside it (Electronics-Tutorials; Electronics Club;
  learnabout). learnabout warns that leads are often cut, so length cannot be
  trusted on a used part. Inside a clear LED the bigger piece of metal is
  usually the cathode, but Electronics Club says plainly that this is not an
  official mark. When in doubt, test.
- **Forward voltage, by colour.** Sources of the era and of today do not
  agree to a tenth of a volt, and makers differ. For a 1984 shop:

  | Colour | LIEC range | Goldwasser typical | NEETS |
  |---|---|---|---|
  | Infrared | 1.2 to 1.7 V | 1.2 V | |
  | Red | 1.5 to 2.4 V | 1.85 V (1.5 to 2.1) | about 1.6 V |
  | Yellow | 1.7 to 2.8 V | 2.0 V | |
  | Green | 1.7 to 2.8 V | 2.15 V | |

  Beware Electronics-Tutorials' table, which gives 3.5 V for green: that is a
  modern kind of green, not the 1984 kind.
- **Current.** About 20 mA is the usual top for a standard 5 mm LED and 10 to
  15 mA is plenty (Electronics Club; Kuphaldt Q3; NEETS says 10 mA).
- **One real part** (Vishay TLUR5400, red, gallium arsenide phosphide, 5 mm):
  drop typically 2 V and at most 3 V at 20 mA; most steady current 20 mA; most
  power 60 mW; reverse voltage 6 V at most; brightness measured at 10 mA.
  (Read from an extracted table whose columns ran together: the pairing of
  the 20 mA and 60 mW figures with their rows is my reading.)
- **The weak spot: reverse voltage.** About 5 V is the limit for an ordinary
  LED (LIEC; learnabout; Wikipedia). A rectifier stands 50 V at the very
  least. On AC an LED needs an ordinary diode across it, pointing the other
  way (LIEC).
- **Flashing LEDs** have a chip inside and go straight across their rated
  supply with no resistor (Electronics Club). An exception worth one line, so
  that the rule is not broken by surprise.

### How they teach it (only what `RESEARCH.md` lacks)

- **Rule first, in capitals.** Electronics Club opens with the two rules: an
  LED needs a series resistor, and never goes straight across a battery. The
  sum comes later.
- **A rough-and-ready voltage.** Electronics Club tells beginners to call it
  2 V for red, yellow and green and not to worry further. With a 9 V supply the
  error is small. That suits a first lesson better than a table.
- **Round up, and say what it costs.** Already in `RESEARCH.md`. Electronics
  Club adds the reason a beginner can feel: a bigger resistor means a dimmer
  lamp and a longer battery life.
- **Series, not parallel.** One resistor can serve several LEDs in series
  (they share one current). One resistor must not serve several in parallel:
  the LED with the lowest drop takes the lot and dies (Electronics Club; LIEC
  says each parallel LED needs its own resistor).
- **Misconceptions the sources name.**
  - Forgetting to take the LED's own drop off the supply before dividing.
    ModEL calls it a very common mistake and sets a question on it (below).
  - That the plastic's colour is the light's colour (three sources).
  - That an LED is a small lamp, so any way round and any voltage up to its
    "rating" will do.
  - That brightness goes with voltage. It goes with current; the voltage
    hardly moves.

### Faulty or working

**How they fail.**

- **Slowly dimmer** is the normal end: Wikipedia says LEDs mostly fade and do
  not die suddenly as bulbs do. Heat and hard driving speed it up (Wikipedia's
  failure list; CALCE). Goldwasser's warning follows from this: a tired LED
  can pass every electrical test and still be too dim to use. **An LED is
  judged by its light.**
- **Open, and dark**: the hair of bond wire burns through or pulls off, from
  too much current, a surge, or the plastic swelling with heat (CALCE;
  Wikipedia's list). This is the fault a missing or too-small resistor
  produces. Electronics-Tutorials says an LED put straight across a supply
  above its forward voltage is destroyed almost at once.
- **Shorted or leaky, and dark or dim**: damage in the chip itself, from
  reverse voltage, static or gross overload (CALCE lists short circuit and
  raised backward leakage; Wikipedia's list). Whether open or shorted is the
  commoner end for a small indicator LED: no loaded source gives figures.
- **Killed by reverse voltage**: anything much over 5 V backwards (Wikipedia;
  learnabout). An LED fitted backwards on a 9 V or 12 V rail is not just dark,
  it is being harmed.
- **Yellowed plastic** from heat or age cuts the light (Wikipedia's list;
  CALCE).

**In circuit, set switched on** (the first row and rule are Kuphaldt's fault
signs; the rest is mine, by the same rule, for a supply through one resistor):

| What you see | Across the LED | Across its resistor | Likely cause |
|---|---|---|---|
| Lit | About 1.6 to 2.2 V (red, yellow, green) | The rest | Good |
| Dark | Full supply | 0 V | LED open, *or* LED in backwards |
| Dark | 0 V | Full supply | LED shorted, *or* resistor open |
| Dark | 0 V | 0 V | No supply reaching it: look upstream |
| Dim | Normal | Less than expected, or normal | Resistor gone high, low supply, or a tired LED |

- Row three needs one more test to split it. A shorted LED lets current flow
  (more than normal: 9 V through 470 Ω is 19 mA, against 15 mA), so the
  resistor is working and warm. An open resistor passes nothing. Switch off
  and measure the resistor.
- `RESEARCH.md` already has row two as an exercise, with only "LED open" as
  the answer. "Or fitted backwards" should be added to it.

**Out of circuit.**

- **Analogue ohmmeter or diode range**: like any diode, low one way and high
  the other, and a good LED may glow faintly on the low reading (learnabout).
  But the meter has to supply more than the LED's forward voltage, and many
  do not (Goldwasser). Then a perfectly good LED reads open both ways.
  learnabout says a meter that puts out around 3 V will light one, and that a
  digital meter can show over-range on a good LED. Its rule: if either test
  says good, it very probably is; only if both say bad is it probably bad.
- Electronics Notes says higher ohms ranges of an analogue meter may use a
  higher-voltage battery than the low ranges. That the low ranges of a typical
  1984 analogue meter run from a single 1.5 V cell, too little for any LED:
  Unverified (it is what I would expect, but no loaded page says it).
- **The test that always works** (Electronics Club; Goldwasser): a battery of
  up to 12 V and a 1 kΩ resistor in series. It lights one way round or it is
  dead, and you see how bright it is. On 9 V that is about 7 mA.
- Mine: a seven-segment display can be tested one bar at a time the same way,
  from the common pin.

**Common beginner mistakes.**

- No resistor.
- Backwards. Dark, and above about 5 V of supply, damaged.
- Dividing the whole supply by the current, forgetting the LED's share.
- One resistor for several LEDs in parallel.
- Condemning a good LED because the meter read open.
- Passing a dim LED because the meter read right.
- Trusting lead length on a part pulled from a board.
- Running a 1984 LED at 20 mA "because that is the figure", when 20 mA is its
  limit.

### Exercises found

All answers recomputed.

1. **The classic slip** (ModEL 6.2.4, CC BY 4.0). An LED needs 1.65 V and
   22 mA. Find the resistor on 15 V, 24 V and 48 V. *Answer:* 607 Ω, 1016 Ω and
   2107 Ω. ModEL then shows three wrong answers a beginner often gives, 682 Ω,
   1091 Ω and 2182 Ω, and asks what went wrong: they divided the whole supply
   by the current. Powers in the resistor: 294 mW, 492 mW and 1.02 W.
2. **Three in a row** (Electronics Club, idea only). 9 V, three 2 V LEDs in
   series, 15 mA. *Answer:* 3 V is left for the resistor, so 200 Ω, next value
   up 220 Ω, giving 13.6 mA. Follow-on: how many 2 V LEDs can 9 V run in one
   string, if the resistor should keep about 2 V? Three. (One LED alone: 467 Ω,
   so 470 Ω, 14.9 mA.)
3. **Too small a resistor** (Electronics-Tutorials, idea only). 5 V, an amber
   LED of 2 V, 10 mA wanted. *Answer:* 300 Ω, so 330 Ω, giving 9.1 mA. Then:
   what flows with 100 Ω? 30 mA, more than the LED may take. (The page's own
   answer to the second part is a picture; 30 mA is mine.)
4. **What sets the colour?** (Kuphaldt *Optoelectronic devices* Q2, CC BY
   1.0.) *Answer:* the material of the junction. A good wrong option to offer:
   the colour of the plastic.
5. **The trick question** (Kuphaldt *Special diodes* Q7). What kind of diode
   always comes in a clear body? *Answer:* none. Looks prove nothing; only the
   part number does.
6. **Light in, volts out** (Kuphaldt *Optoelectronic devices* Q5). Shine a
   lamp on an LED with a voltmeter across it. *Answer:* a small voltage
   appears (LIEC confirms it; the worksheet leaves it to be found).
7. **Why an LED and not a bulb for sending signals?** (Kuphaldt Q9.)
   *Answer:* it switches on and off enormously faster.
8. **One fails in a string** (learnabout, idea only). Several LEDs in series
   on one resistor. One goes open: what happens? All go dark. One shorts: the
   rest get brighter, because the resistor now has one more LED's worth of
   voltage across it. (The page says 25 % more current for its four-LED
   example. That depends on the supply: it is right when the resistor
   normally drops four LEDs' worth. Check the numbers before using it.)
9. **Why not one resistor for two LEDs side by side?** (Electronics Club,
   idea only.) *Answer:* the one with the lower drop takes nearly all the
   current.
10. **Two faults, one reading** (mine, from Kuphaldt's fault rule). An
    indicator is dark, with 0 V across the LED and the full supply across the
    resistor. Name the two faults that fit and the test that separates them.
    *Answer:* LED shorted or resistor open; switch off and measure the
    resistor, or feel whether it is warm.
11. **On AC** (LIEC, for №0015 or later). An LED on AC with an ordinary diode
    across it backwards: why the diode? To keep the reverse voltage across the
    LED down to 0.7 V. With a second LED in place of the diode each is lit
    half the time, so each averages half the current.

### Build the lesson round

- **Keep the diode lesson's circuit and swap the part.** Same battery, same
  resistor, same meter. The drop is now about 2 V, and there is light. The
  learner already knows where to put the probes.
- **Make the fault table the job.** A dark power lamp on a set that otherwise
  works. Two voltmeter readings name the fault. Offer the four dark cases one
  at a time, ending with the pair that reads alike.
- **Which way round, on a part with cut leads.** The flat, the short lead, the
  look inside, and then the only sure way: a battery and a 1 kΩ resistor.
- **Let the meter mislead once.** The bench meter says "open" on a good LED.
  Then the battery-and-resistor test lights it. One step, and the limit of
  the test is learnt for good.
- **Stay in 1984.** Red, yellow and green only; about 2 V; run it at 10 mA.
  A customer asking for a blue lamp is a line for the story, not a part in
  the drawer.

---

## 3. The Zener diode

`RESEARCH.md` has no section for this part, so it is covered in full.

### Sources

Kuphaldt (CC BY 1.0 unless marked):

- *Zener diodes* worksheet, PDF, all 23 questions with answers and notes: <https://www.ibiblio.org/kuphaldt/socratic/output/zener.pdf> (mirror, first page only: <https://www.allaboutcircuits.com/worksheets/zener-diodes/>)
- *Regulated power sources* worksheet, PDF: <https://www.ibiblio.org/kuphaldt/socratic/output/supply2.pdf>
- *Special diodes* worksheet, PDF: <https://www.ibiblio.org/kuphaldt/socratic/output/diode2.pdf>
- ModEL, *PN Junctions and Diodes*, §2.7 (CC BY 4.0): <https://www.ibiblio.org/kuphaldt/socratic/model/mod_pn.pdf>
- *Lessons in Electric Circuits*, [Zener diodes](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/zener-diodes/) (Design Science License), and the Zener remark in [meter check of a diode](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/meter-check-of-a-diode/)

Others:

- Electronics-Tutorials, [the Zener diode](https://www.electronics-tutorials.ws/diode/diode_7.html) (all rights reserved)
- Electronics Notes, [Zener diode circuits and design](https://www.electronics-notes.com/articles/electronic_components/diode/zener-diode-circuits-design.php) (no licence stated)
- learnabout-electronics.org, [2.4 Zener diodes](https://learnabout-electronics.org/Semiconductors/diodes_24.php) and [2.8 Testing diodes](https://learnabout-electronics.org/Semiconductors/diodes_28.php) (all rights reserved)
- Electronics Club, [Diodes](https://electronicsclub.info/diodes.htm), Zener section (© John Hewes)
- University of Kansas, J. Stiles, EECS 312 handouts (no licence stated): [The shunt regulator](http://www.ittc.ku.edu/~jstiles/312/handouts/The%20Shunt%20Regulator.pdf), [section 3.4 package, Zener diodes](http://ittc.ku.edu/~jstiles/312/handouts/section_3_4_Zener_Diodes_package.pdf)
- NEETS Module 7 on tpub.com (host: all rights reserved): [special devices, diodes](https://electriciantraining.tpub.com/14179/css/Diodes-116.htm), [Zener and avalanche effects](https://electriciantraining.tpub.com/14179/css/Conduction-Band-117.htm), [Zener use and review questions](https://electriciantraining.tpub.com/14179/css/Figure-3-4E-Schematic-Symbols-For-Zener-Diodes-121.htm), [shunt regulators](https://electriciantraining.tpub.com/14179/css/Series-And-Shunt-Voltage-Regulators-209.htm)
- S. M. Goldwasser, [Basic testing of semiconductor devices](https://repairfaq.org/sam/semitest.htm), [TV repair FAQ](https://repairfaq.org/sam/tvfaq.htm) (part)
- onsemi, [*Zener Theory and Design Considerations Handbook*, HBD854/D](https://www.onsemi.com/pub/Collateral/HBD854-D.PDF) (all rights reserved)
- Vishay, [BZX55 series datasheet](https://www.vishay.com/docs/85604/bzx55.pdf)
- Wikipedia (CC BY-SA 4.0): [Zener diode](https://en.wikipedia.org/wiki/Zener_diode), [BZX79 voltage regulator diodes](https://en.wikipedia.org/wiki/BZX79_voltage_regulator_diodes), [Pro Electron](https://en.wikipedia.org/wiki/Pro_Electron)

### How it works

- Every diode gives way if enough voltage is put across it backwards. In a
  rectifier that is a flaw and usually the death of the part. A Zener is a
  diode built so that it gives way at a low, chosen voltage, and is not harmed
  by it as long as it does not overheat (LIEC; ModEL; NEETS).
- So a Zener is used **backwards**. Below its voltage it passes nothing, like
  any reversed diode. At its voltage it starts to conduct, and from there it
  takes almost any current while the voltage across it hardly moves (LIEC;
  Electronics-Tutorials).
- The maker sets the voltage by how heavily the two halves are doped. Heavier
  doping makes the depletion layer thinner, and a thinner layer gives way
  sooner (learnabout; ModEL; Wikipedia).
- Forwards, it is an ordinary diode and drops 0.7 V (LIEC;
  Electronics-Tutorials). A Zener fitted the wrong way round gives 0.7 V, not
  its marked voltage.
- It is the mirror of the first diode lesson. There, the voltage across a
  conducting diode stuck at 0.7 V whatever the current. Here it sticks at the
  Zener voltage. Kuphaldt's worksheet makes the link itself, by asking how
  ordinary diodes in a row could stand in for a Zener.
- Left out of a first lesson by nearly everyone, and worth one sentence at
  most: there are two ways of giving way (the Zener effect below about 5 V,
  avalanche above), which drift opposite ways with temperature and cancel near
  5 to 6 V. NEETS draws the line at 5 V, Wikipedia at 5.6 V. It is why 5.1 V
  and 5.6 V parts are the steady ones.

### What it is for, and where it is found

- **A fixed voltage from a supply that wanders.** The Zener goes across the
  load, with a resistor between the supply and the pair of them. The resistor
  drops whatever is left over; the Zener takes whatever current the load does
  not want (LIEC; Kuphaldt Q7; Kansas). NEETS says regulating voltage is the
  Zener's most widespread use.
- **A reference for a bigger regulator.** A plain Zener regulator wastes
  power: LIEC compares it to holding a car's speed with the brake while the
  throttle stays down. So in a set it usually feeds only the base of a
  transistor that does the heavy work (Kuphaldt *Regulated power sources*;
  Electronics Notes), or it is the yardstick inside a regulator chip. This is
  where a repairer of 1984 will mostly meet it.
- **A clamp against over-voltage.** A Zener across a line does nothing until
  the voltage passes its rating, then holds it there (Electronics-Tutorials;
  Wikipedia). With a thyristor it makes a "crowbar": on over-voltage the Zener
  fires the thyristor, which shorts the supply and blows the fuse on purpose
  (Electronics Notes). This crowbar guards the set against a failed regulator
  transistor.
- **A trip wire.** From the part of Goldwasser's TV FAQ that was read: in a
  television's safety shutdown, a Zener in a divider conducts only if the
  monitored voltage goes too high, and that stops the set. A leaky Zener there
  shuts down a healthy set.
- **Clipping a signal** to a fixed height, and shifting a voltage down by a
  fixed amount (LIEC; Electronics-Tutorials; Wikipedia).
- **Before Zeners there were gas tubes.** Kuphaldt Q18: a neon-like stabiliser
  tube did the same shunt job in valve equipment, by the same kind of
  steep curve. A 1984 shop still sees those sets.
- **Today:** references, protection against static on inputs, simple
  low-current regulators (Wikipedia).
- Unverified (seen only in search-result snippets; the page itself would not
  load): that the 33 V tuning-voltage stabiliser of 1970s and 80s varicap
  television tuners (TAA550, ZTK33) is a Zener-like part and a well-known
  failure. Worth checking before it goes in a story.

### Ratings and markings

- **Two numbers define a Zener: its voltage and its power.** Most current is
  simply power divided by voltage (Vishay). For a 500 mW part: 98 mA at 5.1 V,
  42 mA at 12 V, 15 mA at 33 V (computed).
- **BZX55 series** (Vishay): small glass body, 500 mW, values from 2.4 V to
  75 V in the same steps as resistor values, voltage measured at a test current
  of 5 mA (2.5 mA from 39 V up). A BZX55C5V1 is guaranteed between 4.8 V and
  5.4 V. The cathode is marked on the body. The BZX79 is the same class of part
  (Wikipedia).
- **BZX85 series**: the 1.3 W size (Electronics-Tutorials). Electronics Club
  gives 400 mW and 1.3 W as the common sizes and 2.4 V as the lowest voltage.
- **Reading the number** (Pro Electron, per Wikipedia; Electronics Club):
  B silicon, Z Zener, then a serial part, then a letter for tolerance (A 1 %,
  B 2 %, C 5 %, D 10 %), then the voltage with V for the decimal point.
  BZY88-C5V6: 5 %, 5.6 V. 4V7 is 4.7 V.
- American numbers (1N47xx 1 W, 1N52xx 500 mW): Unverified here; no loaded
  page listed them.
- **Tolerance.** Ordinary parts are 5 % or 10 % (LIEC; Wikipedia), so a 5.1 V
  rail measuring 4.9 V or 5.3 V is healthy. Electronics-Tutorials' claim of
  better than 1 % is true only of special parts.
- **It needs a minimum current to hold its voltage.** Below the knee the
  voltage sags. Electronics Notes: keep at least about 5 mA through a small
  Zener, and design for no more than about half its rated power.
- **The band is the cathode, as on any diode, but the cathode goes to
  positive.** That is the opposite of a rectifier's forward direction and the
  thing a beginner gets wrong.
- **Symbol:** a diode whose bar has bent ends. Kuphaldt's note: it is easily
  mixed up with the Schottky diode's symbol.

### How they teach it

**The order, in the fullest treatments.**

- *LIEC*: (1) a forward diode already holds about 0.7 V, so it is a crude
  regulator; (2) ten in a row give 7 V, which is clumsy; (3) the backward
  breakdown voltage is just as steady and much bigger; (4) a diode made to
  live there is a Zener; (5) one circuit with numbers, with no load; (6) add a
  load and watch the Zener's current fall by what the load takes; (7) make
  the resistor too big and watch regulation fail; (8) the rule for failure and
  the brake-and-throttle picture.
- *Kuphaldt's worksheet*: (1) the graph of a diode, with the cliff on the
  backward side; (2) how a Zener differs from a rectifier; (3) **you** are the
  regulator: with a rheostat in series with the load, and then with one across
  it, what must you do when the load takes more? (4) now a Zener does the
  second job by itself; (5) tables of Zener current for a changing load, then
  for a changing supply; (6) the same without numbers: up, down or unchanged?;
  (7) the load at which it stops regulating; (8) what was used before.
- *Kansas (Stiles)*: starts from the obvious wrong answer. To get 10 V from
  20 V, put a resistor equal to the load in series. The handout calls that a
  very bad solution and leaves the reason for the lecture: it holds for one
  load and one supply only. Then the Zener as the cure, with two captions on the
  circuit: when the supply rises, the extra current goes into the Zener; when
  the load takes more, the extra comes out of the Zener's share.
- *Electronics Notes*: a six-step recipe (voltage across the resistor; choose a
  Zener current; check Zener power; add the load current; Ohm's law; resistor
  power).
- *NEETS*: a shunt regulator first as a variable resistor across the load,
  with whole-number amps; the Zener appears only afterwards, as the reference
  in a transistor regulator.

**Pictures and analogies.**

- The helper who takes up the slack: Kuphaldt's person at the rheostat;
  NEETS's variable resistor. The Zener is that person, automated.
- The brake held against the throttle (LIEC, and Kuphaldt's note 6): it works,
  and it wastes.
- The cliff on the graph: almost vertical, so a big change of current is a
  tiny change of voltage (all sources that show a graph).
- Kuphaldt's note 17 gives a thinking tool worth passing on: when unsure which
  way a limit runs, imagine the load at 0 Ω and then at infinite ohms.

**The one test that settles whether it is regulating** (LIEC; Kansas gives it
as a formula). Take the Zener out in your head. What is left is the plain
loaded divider of №0009. If that divider would give *more* than the Zener
voltage, the Zener conducts and pins the output. If it would give *less*, the
Zener does nothing and the output is just the divider's. LIEC: a Zener
"cannot make up for a lack of voltage".

**Misconceptions the sources point at.**

- That the Zener supplies or tops up the voltage. It can only take current
  away. It is a load, not a source.
- That when the load takes more, more current comes through the resistor.
  It does not: the resistor's current stays the same and the Zener gives up
  some of its own (Kuphaldt Q13; Kansas).
- That the output is exactly the marked voltage (tolerance; and Kuphaldt's
  notes say real Zeners taper off near the limit, so sums made with a perfect
  Zener are a little out there).
- That it is fitted like any other diode. It is fitted backwards.
- That an idle regulator is a cool one. With the load unplugged the Zener
  takes all the current and runs hottest (Electronics-Tutorials).
- That more supply voltage is harmless because the output does not change.
  The output does not, but the Zener's current and heat do (Kuphaldt Q12, Q14).

### Faulty or working

**How they fail.**

- **Shorted** is the usual end. LIEC: a Zener that has been overheated usually
  fails shorted, and then drops almost nothing either way, like a piece of
  wire. Goldwasser: short is the likeliest, open the next.
- **Voltage gone low, or a soft knee.** Goldwasser: when a Zener's voltage
  changes it almost always falls, and the corner of its curve gets less sharp.
  onsemi's surge tests found the same: most failures were shifts in the Zener
  voltage. Wikipedia lists a shifted voltage as the result of part-damage.
- **Open**, less often.
- **Noisy**: learnabout says a Zener can start to hiss, a fast flutter on the
  voltage that upsets whatever runs from that line; the cure is to try a new
  one. (onsemi confirms there is always some noise at the knee, less at higher
  current.)
- **What kills them**: heat. Too much current because the series resistor has
  shorted or is too small, the supply has risen, or the load has gone and left
  the Zener to take everything. Kuphaldt (*Regulated power sources* Q6): with
  the series resistor shorted the Zener sees the whole supply and will most
  likely overheat and fail.

**In circuit, set switched on, voltmeter across the Zener (which is the
output).** Kuphaldt's fault answers (*Regulated power sources* Q6, Q14, Q15),
with numbers of mine for one example: 12 V supply, 470 Ω, a 5.1 V Zener, a
1 kΩ load. Normal: 14.7 mA in the resistor, 5.1 mA in the load, 9.6 mA in the
Zener, 101 mW in the resistor.

| Fault | Output | Across the series resistor | Other signs |
|---|---|---|---|
| None | 5.1 V (4.8 to 5.4 V) | 6.9 V | |
| Zener open | **High**: 8.2 V, what the divider gives | 3.8 V | Output now moves with load and supply |
| Zener shorted | **0 V** | 12 V, the full supply | Resistor passes 25.5 mA and burns 306 mW: a ¼ W part cooks |
| Zener fitted backwards | **0.7 V** | 11.3 V | Resistor nearly as hot as with a short |
| Zener low or leaky | Low but not zero, even with the load unplugged | More than normal | |
| Series resistor open | 0 V | Full supply | Resistor stone cold |
| Series resistor shorted | 12 V | 0 V | Zener overheats, then usually shorts |
| Load too heavy (under 347 Ω) | Low: 3.8 V with 220 Ω | High | Unplug the load and the output comes back to 5.1 V |
| Supply too low (under 7.5 V) | Low, and follows the supply | | Check the supply first |

- learnabout gives the first rule in one line: if the voltage across a working
  Zener measures **higher** than its marked value, the Zener is faulty,
  probably open.
- Mine: an output of 0 V with the full supply across the resistor has two
  causes. A shorted Zener leaves the resistor hot; an open resistor is cold.
  The pair is told apart by heat, by current, or with the power off and an
  ohmmeter.
- In a transistor regulator the same faults are magnified. Kuphaldt Q14: the
  reference Zener open sends the output up to nearly the raw supply; shorted
  sends it to zero. Q15: no output at all points to the feed resistor open or
  the Zener shorted.

**Out of circuit.**

- **Ohmmeter or diode range**: it tests as an ordinary diode. Low or about
  0.7 V forward, open backwards, because the meter's voltage is below the
  Zener's (Goldwasser; Electronics Notes says the go/no-go check works for
  Zeners). This finds a short (low both ways) or an open (high both ways).
  It says nothing about the Zener voltage.
- Exception: a meter whose ohms voltage is higher than a low-voltage Zener's
  rating will show it conducting both ways. That is not a fault (Goldwasser).
- **To read the Zener voltage** (LIEC; Goldwasser): a DC supply higher than the
  Zener's rating, a series resistor to hold the current to a few milliamps,
  and a voltmeter across the Zener. Goldwasser's values: 24 V and 2 kΩ, good
  for Zeners up to about 20 V. That passes 9.5 mA through a 5.1 V part and
  2 mA through a 20 V part (computed). It is the lesson's own circuit, used as
  a tester, and it also identifies a Zener whose markings have rubbed off.

**Common beginner mistakes.**

- Fitting it the forward way and finding 0.7 V.
- Calling a good Zener dead because the output is low, when the load is too
  heavy or the supply has dropped. Unplug the load first.
- Replacing a shorted Zener and not asking what cooked it. Measure the series
  resistor, which has probably been overheated too.
- Replacing by size and looks. A glass Zener and a glass signal diode look the
  same (Kuphaldt's trick question).
- Fitting the right voltage in too small a wattage.
- Sizing the series resistor for the Zener alone and forgetting the load's
  current, or the other way about.
- Expecting the marked voltage to the last digit.

### Exercises found

Kuphaldt's *Zener diodes* worksheet unless marked (CC BY 1.0). All answers
recomputed; his agree to the last figure.

1. **The load changes** (Q8). 15 V supply, 500 Ω, 5.1 V Zener. Find the Zener
   current for loads of 1 kΩ, 910 Ω, 680 Ω, 470 Ω and 330 Ω. *Answer:* the
   resistor always carries 19.8 mA. Zener: 14.7, 14.2, 12.3, 8.95 and 4.35 mA.
   What the load gains, the Zener loses. Follow-up: what load leaves the Zener
   with nothing? 258 Ω. Below that, regulation is lost. (Two more sets: Q9,
   24 V, 1.2 kΩ, 7.9 V, loads 1.5 k, 1 k, 910, 780 Ω give 8.15, 5.52, 4.74,
   3.29 mA, limit 589 Ω. Q10, 30 V, 2.2 kΩ, 12.5 V, loads 2, 3, 4, 5 kΩ give
   1.705, 3.788, 4.830, 5.455 mA, limit 1.57 kΩ. Q10's follow-up says 5.1 V by
   a slip of copying; it means 12.5 V.)
2. **The supply changes** (Q12). 470 Ω, 5.1 V Zener, 6 kΩ load (0.85 mA).
   Zener current at 25, 20, 15, 10 and 5 V? *Answer:* 41.49, 30.85, 20.21,
   9.58 and 0 mA. At 5 V the Zener is out of it and the load gets only 4.64 V.
   Regulation begins once the supply passes 5.50 V.
3. **Heat in the Zener** (Q11). 12 V battery, 50 Ω, a 5 V Zener across a small
   motor. Zener power when the motor takes 20, 50, 90, 120 and 150 mA?
   *Answer:* the resistor carries 140 mA. Zener: 600, 450, 250, 100 and 0 mW.
   It works hardest when the motor takes least. Follow-up: is the motor held
   at 5 V over the whole range? No. At 150 mA the resistor would drop 7.5 V,
   leaving 4.5 V.
4. **No numbers** (Q13, Q14). The load suddenly takes less. Resistor current:
   unchanged. Zener current: up. The supply suddenly rises. Load current:
   unchanged. Zener current: up.
5. **Where it gives up** (Q17). 24 V, 5 kΩ, 18 V Zener. At what load does
   regulation stop, and is it lost above or below that value? *Answer:* 15 kΩ;
   lost for any load *lower* than that. With a 30 kΩ load: 7.2 mW in the
   resistor, 10.8 mW in the Zener, 10.8 mW in the load, 28.8 mW from the
   supply.
6. **You are the regulator** (Q5, Q6). With a rheostat in series with the load,
   what do you do when the load takes more? Turn the resistance down. With the
   rheostat across the load? Turn it up, so that it takes less. In both, the
   supply must be higher than the voltage you are holding.
7. **No Zener in the drawer** (Q15, Q16). Hold about 4.5 V with ordinary
   diodes. *Answer:* a string of them forward, across the load: six give about
   4.2 V and seven about 4.9 V (0.7 V each; mine). Why not one diode backwards?
   Its breakdown is far too high and would wreck it.
8. **Faults** (*Regulated power sources* Q6). For the plain regulator, say what
   every voltage and current does when the Zener shorts, the Zener opens, the
   resistor opens, the resistor shorts. *Answer:* in the table above.
9. **Same Zener, two resistors** (LIEC, idea only). 45 V, 12.6 V Zener. With
   1 kΩ: 32.4 mA, about 1.05 W in the resistor and 408 mW in the Zener, and a
   500 Ω load still leaves the Zener 7.2 mA. With 100 kΩ: 324 µA, cool, but
   any load under 38.9 kΩ defeats it; a 500 Ω load gets 224 mV. The trade: a
   small resistor regulates heavy loads and runs hot; a big one runs cool and
   regulates almost nothing.
10. **Choosing the resistor** (Kansas, idea only). 25 V, 15 V Zener, load up
    to 20 mA. *Answer:* the resistor must pass more than 20 mA with 10 V
    across it, so under 500 Ω. With 500 Ω and a 1.5 kΩ load: 20 mA in, 10 mA
    to the load, 10 mA in the Zener. (At exactly 20 mA of load the Zener has
    nothing left, so in practice go lower.)
11. **The recipe** (Electronics Notes, idea only). 12 V to 5.1 V at 2 mA,
    with 15 mA chosen for the Zener. *Answer:* 6.9 V ÷ 17 mA = 406 Ω, so
    390 Ω. Then 17.7 mA flows; the Zener takes 15.7 mA loaded and all 17.7 mA
    (90 mW) unloaded; the resistor burns 122 mW, so ¼ W will do.
12. **The limits of one part** (Electronics-Tutorials, idea only). 12 V
    supply, a 5 V, 2 W Zener, 1 kΩ load. *Answer (mine; the page's are
    pictures):* most Zener current 400 mA; smallest series resistor 17.5 Ω;
    load current 5 mA; Zener current then 395 mA.
13. **Whole-number amps** (NEETS, idea only). A shunt regulator holds 100 V
    with 10 A through a 2 Ω series resistor (so 120 V in), shared 5 A and 5 A.
    The load drops to 4 A: before the regulator reacts, 9 A flows, the
    resistor drops 18 V and the output rises to 102 V. The regulator takes
    6 A and the output is back to 100 V. The load rises to 6 A: 11 A, 22 V,
    98 V, until the regulator backs off to 4 A. (The starting 5 A and 5 A are
    worked back from the page, whose opening lines did not load.)
14. **A Zener with no markings** (Goldwasser, idea only). How would you find
    its voltage with a 24 V supply, a 2 kΩ resistor and a voltmeter? *Answer:*
    resistor in series, Zener backwards, meter across the Zener. It reads the
    Zener voltage, for anything up to about 20 V.
15. **NEETS review** (Q2 to Q4). Two ways a junction breaks down: Zener effect
    and avalanche. Which acts in a heavily doped junction below 5 V? Zener
    effect. How is an avalanche diode doped by comparison? More lightly. (The
    NEETS answer page was not loaded; the last answer is from learnabout and
    Wikipedia.)

### Build the lesson round

- **Begin with the loaded divider of №0009, and let it fail.** Supply, series
  resistor, load. The output is wrong as soon as the load or the supply
  changes. Then put the Zener across the load and the output is pinned. The
  learner already owns the circuit; the lesson adds one part to it.
- **Run the supply up from zero, as the diode lesson does.** The output climbs
  with the supply, reaches the Zener voltage, and stops. Same picture as the
  0.7 V that stuck, at a different voltage and the other way round.
- **Three ammeters and one rule.** Resistor current = Zener current + load
  current (the junction rule of №0007). Change the load and watch the Zener's
  share move the opposite way while the resistor's does not move at all.
- **Break it twice on purpose.** A load too heavy, then a supply too low. Both
  times the output drops and the Zener's current is zero. Give the learner the
  test: without the Zener, would the divider reach the Zener voltage?
- **Then the fault job.** A regulated rail reads high (Zener open), or reads
  nothing and a resistor is scorched (Zener shorted), or reads 0.7 V (last
  repairer fitted it backwards). One reading each. The 12 V, 470 Ω, 5.1 V,
  1 kΩ numbers above would do; a simulator run should confirm them.

---

## Things that cut across all three lessons

- **Kuphaldt's two fault signs carry all three parts.** Open: full supply
  across it, no current. Shorted: 0 V across it, more current. The Zener adds
  a third sign that the others do not have: an open Zener makes its voltage go
  *up*.
- **"Open" and "backwards" look the same in circuit** for the diode and the
  LED. For the Zener, backwards looks like "nearly shorted" (0.7 V). No source
  says this in so many words; it follows from their rules, and each lesson
  could use it once.
- **Each part's meter test has its own blind spot.** Diode: the ohms figure is
  meaningless and the leads may be reversed. LED: the meter may not have the
  voltage to turn it on, and cannot see dimness. Zener: the meter cannot reach
  its voltage at all. In every case the fix is the same small circuit: a
  battery, a resistor and a voltmeter.
- **Shorted is the common way for the diode and the Zener to die of
  overload.** An LED may go open instead, when its bond wire burns. After any
  shorted semiconductor, look for the resistor that had to carry the fault
  current.
- **A suggested order**: diode, LED, then the Zener after the loaded divider is
  fresh, and before №0016 The power supply, where the rectifier and the
  regulator meet.
- **Source disagreements to keep in mind**: germanium's drop is 0.2 V
  (Electronics Club), 0.2 to 0.3 V (Electronics-Tutorials, Fluke) or 0.3 V
  (LIEC); the Zener/avalanche line is 5 V (NEETS), 5 to 6 V (learnabout) or
  5.6 V (Wikipedia); a shorted diode on a diode-test range reads 0 (Goldwasser)
  or about 0.4 V both ways (Fluke); a small Zener is 400 mW (Electronics Notes,
  Electronics Club) or 500 mW (Vishay BZX55).
