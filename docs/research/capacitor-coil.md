# Research: the capacitor and the coil as parts

Gathered on 20 November 2026 for the one-lesson-per-component plan. This adds
to `RESEARCH.md` (№0012 Capacitors, №0017 Coils) and does not repeat it: nothing
here is about charging curves or time constants except where a fault test rests
on them. It covers what is inside the part, what it is for, where it sits in a
set, how it is rated and marked, and how a faulty one differs from a good one.

## How far to trust this

- HTML pages were read through a summarising fetch, so they are reported in
  substance, not wording. Kuphaldt's worksheet PDFs, his two ModEL modules, the
  two NEETS modules and the Chemi-Con note were downloaded and read directly as
  text. Four worksheet pages were also rendered as images to read diagrams and a
  fault table that the text extraction lost.
- Every numeric answer under "Exercises found" was recomputed by me. Each
  exercise says so.
- **"Unverified"** marks anything that did not come from a loaded page. That
  includes my own working (fault variants I derived on a source's circuit, and
  places where I join two sources into one conclusion). These are labelled
  "Unverified (my working)".
- Two long pages were read only in part: Goldwasser's TV repair notes (the first
  200,000 of 665,725 characters) and Wikipedia's "Aluminum electrolytic
  capacitor" (the first 100,000 of 185,682).

### Pages that would not load, or gave nothing

| Page | What happened |
|---|---|
| NSWC Crane, capacitor failure modes PDF (`navsea.navy.mil/.../CapacitorsFailureRevA.pdf`) | HTTP 403. Its failure percentages appeared in a search summary only, so they are **not** used here |
| Mouser copy of a manufacturer's aluminium-electrolytic technical note (`mouser.com/pdfDocs/al-technical-note_en.pdf`) | Timed out |
| RF Cafe copies of NEETS Module 21 (`rfcafe.com/references/electrical/neets-modules/NEETS-Module-21-1-11-1-20.htm` and `...-1-21-1-26.htm`) | HTTP 404. The same module was read from archive.org instead |
| All About Circuits worksheet mirror | Loads, but shows only one page of questions per address (page 1 of 5). The ibiblio PDFs were used for the full sets |
| `tpub.com/neets/book6/20h.htm` and `20i.htm` | Loaded, but are about valve biasing. Nothing used |
| Kuphaldt `trouble1.pdf`, `trouble2.pdf`, `filter.pdf` | Read. No capacitor or coil fault questions at DC. Nothing used |
| Sencore tech tips on ringing tests, Rubycon and Nichicon notes | Seen in search results only. Not opened, not used |
| learnabout-electronics PDF `Downloads/ac_theory_module02.pdf` | Downloaded, not read. The site's HTML pages were read instead |
| The sites `RESEARCH.md` lists as not loading (Physics Classroom, SparkFun, Khan Academy, BBC Bitesize, HyperPhysics, MIT OCW) | Not retried |

Two electronics-notes.com addresses I guessed returned 404. The right pages
were then found by search and are in the lists below.

### Licences, as each page states them

| Source | Licence as stated | Suggested use |
|---|---|---|
| Kuphaldt, Socratic worksheets (PDFs) | CC BY 1.0, stated on each worksheet. The index page itself says "Creative Commons Attribution 3.0 United States" | Exercises adapted, with credit |
| Kuphaldt, *Modular Electronics Learning* modules | CC BY 4.0 (both dated 29 October 2026) | Exercises adapted, with credit |
| Kuphaldt, *Lessons in Electric Circuits*, ibiblio copy | "under the terms and conditions of the CC BY License" | Ideas and order of teaching |
| Same book, All About Circuits copy | Design Science License | Ideas |
| NEETS Modules 2 and 21 (US Navy) | "DISTRIBUTION STATEMENT A: Approved for public release; distribution is unlimited" | Ideas, facts |
| US Army subcourse SS0602 and Navy *Construction Electrician Basic*, as rehosted by tpub.com | The host states "© Copyright Integrated Publishing, Inc. All Rights Reserved". The original documents' own statements were not on the pages | Ideas only |
| Electronics-Tutorials.ws | © AspenCore, all rights reserved | Ideas only |
| electronics-notes.com | "© electronics-notes.com", no licence | Ideas only |
| learnabout-electronics.org | © Eric Coates, all rights reserved | Ideas only |
| All About Circuits video lecture | © EETech Group, all rights reserved | Ideas only |
| Goldwasser, repairfaq.org | © Samuel M. Goldwasser, all rights reserved. Reproduction allowed with the notice and at no charge | Ideas only |
| Phil's Old Radios | © Philip I. Nelson, all rights reserved | Ideas only |
| Chemi-Con technical note | None stated | Ideas only |
| Wikipedia | CC BY-SA 4.0 | Ideas only |
| OpenStax *University Physics* vol. 2 | CC BY-NC-SA 4.0, with the notice that it may not be used in generative-AI products without written permission | Ideas only. No text or problems taken |
| LibreTexts (Cañada College lab) | CC BY-NC-SA 4.0 | Ideas only |
| Washington University Physics 321 page | None stated | Ideas only |
| gammaelectronics.xyz (two chapters of 1963 and 1964 Sams books) | None stated, no author given. Unverified: these look like scans of commercially published books, so treat as all rights reserved | Ideas only |

---

# Part 1: the capacitor

## Sources

Loaded and read. Tags in square brackets are used below.

**Kuphaldt (worksheets, CC BY 1.0)**

- [K-caps] "Capacitors", <https://www.ibiblio.org/kuphaldt/socratic/output/caps.pdf>. Mirror, first page only: <https://www.allaboutcircuits.com/worksheets/capacitors/>
- [K-cap] "Capacitance", <https://www.ibiblio.org/kuphaldt/socratic/output/cap.pdf>
- [K-supply] "Basic AC-DC power supplies", <https://www.ibiblio.org/kuphaldt/socratic/output/supply1.pdf>
- [K-bjt] "BJT amplifier troubleshooting", <https://www.ibiblio.org/kuphaldt/socratic/output/trouble_bjtamp.pdf>
- [K-classA] "Class A BJT amplifiers", page 7 of the mirror, <https://www.allaboutcircuits.com/worksheets/class-a-bjt-amplifiers/7/>
- [K-ohm] "Basic ohmmeter use", <https://www.ibiblio.org/kuphaldt/socratic/output/ohm_m.pdf>
- [K-xc] "Capacitive reactance" (one question used), <https://www.ibiblio.org/kuphaldt/socratic/output/xc.pdf>
- Index pages used to find these: <https://www.ibiblio.org/kuphaldt/socratic/> and <https://www.ibiblio.org/kuphaldt/socratic/doc/topical.html>

**Kuphaldt (other)**

- [ModEL-C] *Capacitors and Capacitive Circuits*, CC BY 4.0, <https://www.ibiblio.org/kuphaldt/socratic/model/mod_capacitor.pdf>
- [LIEC-13] *Lessons in Electric Circuits* vol. I ch. 13, CC BY, <https://www.ibiblio.org/kuphaldt/electricCircuits/DC/DC_13.html>
- [LIEC-R8] vol. V ch. 8, "Troubleshooting: theory and practice", CC BY, <https://www.ibiblio.org/kuphaldt/electricCircuits/Ref/REF_8.html>
- [LIEC-coupling] "Input and output coupling", Design Science License, <https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/input-and-output-coupling/>

**US military training texts**

- [NEETS-2] NEETS Module 2, NAVEDTRA 14174, ch. 3, <https://archive.org/download/NEETSModules/NEETS%20Module%2002%20-%20Introduction%20to%20Alternating%20Current%20and%20Transformers.pdf>
- [NEETS-21] NEETS Module 21, *Test Methods and Practices*, NAVEDTRA 14193, ch. 1, <https://ia600504.us.archive.org/0/items/NEETSModules/NEETS%20Module%2021%20-%20Test%20Methods%20and%20Practices.pdf> (listing: <https://archive.org/download/NEETSModules>)
- [Army] Army subcourse SS0602 (TV test equipment), "Learning Event 9: match ohmmeter reading to capacitor or inductor conditions", <https://armycommunications.tpub.com/SS0602/SS06020037.htm>

**Tutorial sites (all rights reserved)**

- [ET-intro] <https://www.electronics-tutorials.ws/capacitor/cap_1.html>
- [ET-types] <https://www.electronics-tutorials.ws/capacitor/cap_2.html>
- [ET-char] <https://www.electronics-tutorials.ws/capacitor/cap_3.html>
- [ET-charge] <https://www.electronics-tutorials.ws/capacitor/cap_4.html>
- [ET-codes] <https://www.electronics-tutorials.ws/capacitor/cap_5.html>
- [EN-elec] <https://www.electronics-notes.com/articles/electronic_components/capacitors/electrolytic.php>
- [EN-codes] <https://www.electronics-notes.com/articles/electronic_components/capacitors/capacitor-codes-markings.php>
- [EN-esr] <https://www.electronics-notes.com/articles/basic_concepts/capacitance/esr-dissipation-factor-loss-tangent-q.php>
- [EN-uses] <https://www.electronics-notes.com/articles/electronic_components/capacitors/capacitor-uses.php>
- [LAE-cap] <https://learnabout-electronics.org/ac_theory/capacitors01.php>
- [LAE-psu] <https://learnabout-electronics.org/PSU/psu12.php>

**Repair practice**

- [Sam-cap] S. Goldwasser, "Capacitor Testing, Safe Discharging and Other Related Information", <https://www.repairfaq.org/sam/captest.htm>
- [Sam-tv] S. Goldwasser, "Notes on the Troubleshooting and Repair of Television Sets" (part read), <https://www.repairfaq.org/sam/tvfaq.htm>
- [Phil] P. Nelson, "Replacing Capacitors in Old Radios and TVs", <https://antiqueradio.org/recap.htm>
- [Sams-64] "Understanding Capacitors and Their Uses (1964)", ch. 6, capacitor testing, <https://gammaelectronics.xyz/sams_cap-1_6.html>

**Manufacturer and reference**

- [ChemiCon] Chemi-Con technical note, reliability and failure modes, <https://chemi-con.com/wp-content/uploads/2021/04/Failure-modes.pdf>
- [Wiki-plague] <https://en.wikipedia.org/wiki/Capacitor_plague>
- [Wiki-alu] <https://en.wikipedia.org/wiki/Aluminum_electrolytic_capacitor> (part read)

**University and textbook pages**

- [OS-8.1] OpenStax *University Physics* vol. 2, 8.1, <https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance>
- [Libre] Cañada College lab, "Component Identification", <https://eng.libretexts.org/Courses/Canada_College/Circuits_and_Electronics_Laboratory/01%3A_Lab_Introduction/1.05%3A_Component_Identification>
- [WUSTL] Washington University Physics 321, component codes, <https://web.physics.wustl.edu/classinfo/321/Pages/codes.php>

## How it works

- **Two plates and a gap.** Two metal plates face each other across an
  insulator, the dielectric. The plates never touch. Push electrons onto one
  plate and the same number leave the other, so the part as a whole stays
  neutral while a voltage builds between the plates [LIEC-13, OS-8.1, ET-intro].
- **Three things set the value:** more plate area, a thinner gap, and a
  dielectric that helps more (higher permittivity) [K-cap, LIEC-13]. Kuphaldt's
  sum shows why real capacitors are rolled foil and not flat plates: two plates
  of 2 m² in air would need to sit 17.7 µm apart to make 1 µF [K-cap].
- **Why the voltage rating exists.** The thinner the dielectric, the more
  capacitance, and the less voltage it stands before it breaks down and
  conducts. So for one kind of dielectric, more capacitance or more voltage
  both mean a bigger can, and size alone tells you neither [LIEC-13, ModEL-C,
  NEETS-2].
- **Film, paper, mica and ceramic** are foil or metal film with a solid
  insulator between: waxed paper in old sets, plastic film later, mica or
  ceramic for small values. They work either way round [NEETS-2, ET-types].
- **An electrolytic gets its large value from an extremely thin dielectric.**
  One aluminium foil carries an oxide film grown on it electrically. Paper
  soaked in a conducting paste (the electrolyte) lies against the oxide and is
  the real second plate, and a second foil only makes contact with the paste.
  The layers are rolled up in a can [NEETS-2, EN-elec, LAE-cap]. The oxide is
  about 1.4 nm thick per volt of rating, and the foil is etched rough to
  multiply its area [Wiki-alu].
- **That is also why it is polarised.** The oxide was formed with one polarity
  and only survives with that polarity. Reversed, the film dissolves, the
  capacitor conducts, gas and heat build up, and it can burst [K-caps, NEETS-2,
  LAE-cap]. The paste is why it ages: it slowly dries out through the seal
  [ChemiCon].

A real capacitor is modelled as the ideal one plus a small resistance in series
(ESR: leads, plates and, in an electrolytic, the paste) and a very large one in
parallel (leakage through the dielectric) [LIEC-13, ModEL-C, K-caps Q14]. Both
faults that matter most in a repair shop are these two resistances going wrong:
the series one rising, the parallel one falling.

## What it is for, and where it is found

| Purpose | What the capacitor does | Where, about 1975 to 1985 | Where today |
|---|---|---|---|
| **Reservoir / smoothing** | Fills from the rectifier at each peak and feeds the set between peaks [LAE-psu, K-supply Q12] | The main filter electrolytic of every mains set, several hundred to a few thousand µF. A TV's can be 1000 µF at 160 V [LAE-psu, Sam-tv]. Older sets use one can holding several sections, marked with a half-moon, triangle and square beside the lugs [NEETS-2] | Every power supply. Large "stiffening" capacitors across car-audio amplifiers [K-caps Q5]. Supercapacitors as short-term backup [EN-uses, ModEL-C] |
| **Coupling / blocking DC** | In series with the signal. Passes the changing part, holds off the steady part, so one stage's DC cannot upset the next stage's bias [LIEC-coupling, K-classA Q21] | Between every pair of amplifier stages, at microphone and speaker. Kuphaldt's two-transistor intercom uses 0.47 µF at the microphone and 33 µF at the speaker [K-bjt Q5] | Audio inputs and outputs. A capacitor in series with headphones to protect them from DC [K-xc Q14] |
| **Decoupling / bypass** | Across a supply rail or a bias resistor. Holds the voltage steady while current is drawn in gulps [ModEL-C 2.4, K-caps Q5] | 47 µF across the 9 V rail of the same amplifier, 4.7 µF across the emitter resistor. Without the rail capacitor the amplifier can hum or oscillate [K-bjt Q5] | A small ceramic beside the supply pins of every chip [ModEL-C 3.3, K-caps Q5] |
| **Timing** | With a resistor, sets a delay (№0012) | Oscillators and timebases [EN-uses]. Bad electrolytics in a TV's vertical stage shrink the picture's height [Sam-cap] | Timers, oscillators [EN-uses] |
| **Tuning** | With a coil, picks one frequency | The air-spaced variable capacitor behind the tuning knob of an AM radio, its plates meshing as the knob turns, plus small trimmers set at the factory [NEETS-2, LAE-cap, OS-8.1] | Mostly replaced by varicap diodes [LAE-cap] |
| **Suppressing interference and sparks** | Shorts out high-frequency noise, soaks up a spark | Across the mains input. Mains-rated parts carry X and Y class marks because a short there is dangerous [ModEL-C 5.2, K-supply Q26]. The car ignition "condenser" that cuts sparking at the points [LIEC-13] | The same mains filter in every supply |
| **Storing energy for a burst** | Charges slowly, empties fast | Camera flash [OS-14.2] | Defibrillators [OS-8.1, ModEL-C 7.2.4] |

Which kind goes where [EN-uses, ET-types]: electrolytics for reservoir and
bulk decoupling because nothing else reaches the capacitance. Film, mica or
stable ceramic for timing and tuning, where the value must stay put.
Electrolytics are poor at very high-resistance points because they leak, and
poor above about 100 kHz.

The picture tube acts as a capacitor too. Goldwasser calls it the tube's
high-voltage capacitor, discharged between the anode connector and the outer
coating, and it can hold a charge for days or weeks [Sam-cap, Sam-tv].
(Unverified: that the glass is the dielectric and the inner and outer coatings
are the plates. No loaded page said so in those words.)

## Ratings and markings

**Units.** Farad, but practical parts are microfarads (µF), nanofarads (nF) or
picofarads (pF) [NEETS-21, ET-char]. Milli is never used. Period and American
parts print "MFD", "mfd", "M" or "U" for micro, never mega [ModEL-C, EN-codes,
Phil]. 1960s service literature writes "mmf" (micro-microfarad) for pF
[Sams-64].

**Reading the value** [ModEL-C 3.6 and 5.2, K-caps, ET-codes, EN-codes]:

- A number with a decimal point and nothing else is microfarads: `.33` is
  0.33 µF. European parts may print a comma: `0,68`.
- A whole number of two digits and nothing else is picofarads: `47` is 47 pF.
- Three digits are digit, digit, number of zeros, in picofarads: `103` is
  10 000 pF = 10 nF = 0.01 µF. `104` is 0.1 µF.
- A letter can stand in for the decimal point: `2n2` is 2.2 nF, `2p2` is 2.2 pF.
- A letter after the number is tolerance. Kuphaldt's table: D ±0.5%, F ±1%,
  G ±2%, H ±3%, J ±5%, K ±10%, M ±20%, P +100/−0%, Z +80/−20% [K-caps notes].
  (The sources disagree on the smallest letters: electronics-notes gives B, C
  and D as percentages, Electronics-Tutorials and ModEL give them in
  picofarads for values under 10 pF.)
- Electrolytics are big enough to print everything in full: `4700 MFD 36 V`.
  Their tolerance is wide, typically −20% to +80% [ET-char, EN-elec].
- Older parts use coloured dots or bands in picofarads, in the resistor colour
  order [NEETS-2, ET-codes, Phil].
- Letters or digits in front of the code are often only the maker's part
  number [ModEL-C].

**Working voltage.** Printed as `25 V`, `100 WVDC` and so on: the most that may
sit across the part continuously [K-caps Q3, NEETS-2]. Exceed it and the
dielectric breaks down and the part shorts, violently in an electrolytic.

- Rule for choosing: at least 50% above the highest voltage it will see
  [NEETS-2, ET-intro].
- A DC rating is not an AC rating: 500 V rms peaks at 707 V [NEETS-2].
- A replacement may have a higher voltage rating than the original, never a
  lower one [Phil, ET-char]. For an electrolytic the value may be up to about
  double. For other kinds stay within about 20% [Phil].
- Usual steps: 10, 16, 25, 35, 50, 63, 100, 160, 250, 400, 1000 V [ET-char].
- Electrolytics also print a temperature, 85 °C or 105 °C [Wiki-plague, EN-elec].

**Polarity.**

- Modern aluminium electrolytic: a stripe of minus signs, or arrows, down the
  side nearest the **negative** lead [LAE-cap, EN-codes, ModEL-C, Phil].
- Can types in older sets: the can is negative, the lugs underneath are
  positive [NEETS-2].
- Tantalum beads are marked on the **positive** lead instead [ET-types,
  EN-codes].
- In the symbol the curved plate is the negative one [OS-8.1, ModEL-C].
- A stripe on a film or paper capacitor is not polarity. It marks the lead
  joined to the outside foil [ModEL-C, Phil].
- Grooves across the top of the can are a deliberate weak point, so a failing
  capacitor splits there and not sideways [LAE-cap, Sam-cap].

## Faulty or working

### The failure modes

| Fault | What has happened inside | How common, and why |
|---|---|---|
| **Short** | The dielectric is punctured: too much voltage, a mains surge, an electrolytic fitted backwards, or an old oxide film giving way | Kuphaldt, from reliability data, gives "shorted" as the likelier of the two hard failures for capacitors [K-bjt A8], and puts shorted capacitors, electrolytics above all, at the head of the passive parts likely to fail in a set that used to work [LIEC-R8]. A shorted supply capacitor can rupture [Sam-cap] |
| **Leaky** | The dielectric conducts a little: a resistor has appeared across the capacitor | The usual fate of waxed-paper and moulded-paper capacitors in old sets: damp gets in, and they look perfect [Phil]. In electrolytics, leakage is less common than drying out but upsets more, and makes the part run hot [Sam-cap]. Electrolytics left unused for years leak until the oxide re-forms [EN-elec, Wiki-alu] |
| **Open** | A lead or internal tab has come away [ChemiCon], or the paste is gone altogether | Less common than a short for capacitors in general [K-bjt A8]. Chemi-Con lists it as one of the two sudden failures, with poor connection and mechanical stress as causes |
| **Dried out: low value, high ESR** | The paste has evaporated through the rubber seal. Capacitance falls and series resistance rises [ChemiCon] | This is how every electrolytic ends. Chemi-Con calls them wear-out parts. Heat sets the pace: life roughly halves for every 10 °C hotter [EN-elec]. A consumer part rated 2000 hours at 85 °C lasts about six years at 40 °C, and is counted worn out when capacitance is down to 70% and ESR has doubled [Wiki-plague]. One repair shop treats any electrolytic over five years old as suspect [Sam-cap] |
| **Bulged or vented** | Gas pressure inside, from reverse voltage, over-voltage, ripple heating or bad electrolyte | Famous from the faulty batches of 1999 to 2007 [Wiki-plague]. In old radio electrolytics it is rare: a dead one usually looks like new [Phil] |
| **Rarely fail at all** | | Mica and ceramic [Phil] |

Unverified (my working): the sources seem to disagree, Kuphaldt saying
"shorted" and Chemi-Con and Goldwasser saying "dried out". They are answering
different questions. Of the two sudden failures, a short is likelier than an
open. But an electrolytic usually never gets that far: it wears out gradually
first. For a 1984 shop both are true at once: paper capacitors leak or short,
electrolytics dry out.

### (a) In circuit, with a voltmeter on DC

A good capacitor passes no steady current. So:

- **In series (coupling):** the whole DC difference sits across it and the far
  side shows none of the near side's DC. In Kuphaldt's amplifier the
  microphone side of the input capacitor and the speaker side of the output
  capacitor are at exactly 0 V, the only two points besides the supply rail
  whose voltage can be known exactly [K-bjt Q6].
- **Across a rail (reservoir, decoupling, bypass):** the rail reads what the
  circuit was designed for.

| Fault | Capacitor across a rail | Capacitor in series |
|---|---|---|
| **Short** | 0 V across it. The rail is dragged to zero, a large current flows, and whatever feeds it runs hot: resistor, rectifier diodes, transformer. Fuse blows, burnt smell [K-supply Q17 and Q24]. A shorted emitter-bypass capacitor puts that emitter at 0 V and pulls the collector far down [K-bjt Q7]. The transistor saturates and there is no signal [K-classA Q19] | 0 V across it, so the DC that should be blocked reaches the far side. A low-resistance source then shorts out the next stage's bias [LIEC-coupling] |
| **Leaky** | The rail reads low and the feed resistor drops more than it should (Unverified, my working). The capacitor runs warm [Sam-cap] | Some DC on the far side. A 1964 service book's test: set on, no signal, meter from the far end of the coupling capacitor to chassis. More than about 2 to 3 V there is too much. Start on a high range in case it is a dead short [Sams-64] |
| **Open** | In a steady DC circuit, nothing changes (Unverified, my working). As a reservoir after a rectifier: the DC output falls and hum appears. Kuphaldt's supply reads 9.3 V with its capacitor and 6.1 V without [K-supply Q12] | Every DC voltage is normal on both sides, and no signal gets through [K-classA Q19] |
| **Dried out** | The signs are ripple, not a wrong DC reading: hum bars drifting through the picture, hum in the sound, a narrow picture, a set that will not start until warm or that shuts down. The main filter can lose three quarters of its value before it shows [Sam-tv] | Unverified: weak or thin sound. No loaded page described this case |

Where a cell says "0 V across it" or "DC reaches the far side" without a
source, it is the short-circuit rule of `RESEARCH.md` applied by me:
Unverified (my working).

**Limits of the voltmeter.**

- A DC reading cannot tell a good capacitor from an open one. Both pass no
  steady current.
- A voltage of 0 V across a capacitor means "shorted" only if the circuit
  should be putting a voltage there.
- For an open or dried-out capacitor, the in-circuit test is to bridge it:
  power off, discharge, clip a known-good capacitor across the suspect, power
  on. If the fault goes, the old one is open or dry [Sam-tv]. This cannot find
  a short or a leak.
- Kuphaldt asks, without answering, how to measure ripple with only a
  multimeter [K-bjt A3]. The usual answer, the meter's AC range, is Unverified
  here.

### (b) Out of circuit, with an analogue ohmmeter

An ohmmeter is a battery, a resistor and a meter in series [K-ohm Q1]. Put it
across a capacitor and it charges the capacitor, so the needle shows the
charging current of №0012 dying away.

| Capacitor | What the needle does |
|---|---|
| **Good** | Kicks toward zero ohms, then falls back toward infinity as the capacitor charges [Army, Sam-cap, K-caps Q12]. The kick is in proportion to the capacitance, so it can be compared with the kick of a known-good part of the same value [NEETS-21]. (Unverified, from a search summary only: reverse the leads and it kicks again.) |
| **Good electrolytic** | Kicks and climbs to a high reading. An electrolytic has a lower leakage resistance than other kinds [NEETS-2], so it need not reach the end of the scale. Take a reading, swap the leads, take another. The higher of the two is the true one [Army] |
| **Good, but small** | Below about 0.01 µF the kick is too small to see: the needle just stays at infinity. On the 100 kΩ range a 0.01 µF part starts near 500 kΩ and drifts up, and a 330 pF part gives only a flicker [Sam-cap, Sams-64] |
| **Short** | Drops to zero at once and stays there [Army, Sam-cap] |
| **Leaky** | Kicks, starts back, and stops short at a reading lower than it should [Army, Sam-cap]. For a paper, film, mica or ceramic part, any steady reading at all means leakage [Phil] |
| **Open** | No kick. Infinity straight away [Army, Sam-cap]. For a small capacitor this looks the same as good |

**Limits of the ohmmeter.**

- It tests at the low voltage of its own battery. Capacitors that leak only at
  working voltage, often over 100 V, pass it. A proper capacitor checker
  applies working voltage [Phil].
- It says nothing reliable about value, and nothing about ESR. An ageing
  electrolytic's capacitance can still measure normal while its ESR has risen,
  so a healthy-looking kick proves little. Substitution is the sure test
  [Sam-cap, Sams-64].
- In circuit the meter reads everything in parallel with the capacitor. Lift
  one lead first [Sam-cap, Phil, K-ohm Q4].
- Kuphaldt's verdict: not a complete test, but far better than none, and it
  catches the commoner faults [K-caps notes 12].

### Visual signs

- Bulged top or split vent, rubber bung pushed out so the can sits crooked,
  brown or rusty crust of dried electrolyte [Wiki-plague, Sam-cap].
- Dark glue down the side of a can is usually only glue [Wiki-plague].
- Burnt smell on opening the back [K-supply Q24, LIEC-R8]. Unverified: a
  cracked body, wax that has run, a burnt resistor beside the capacitor.
- No sign at all is common. Old electrolytics and paper capacitors fail
  looking perfect [Phil], and bad electrolyte can fail with no visible mark
  [Wiki-plague].

### Safety

- A capacitor holds its charge after the set is switched off and unplugged.
  NEETS puts it in capitals: "CHARGED CAPACITORS CAN KILL" [NEETS-21]. A good
  one can hold for years on a shelf [LIEC-13].
- Do not trust the bleed resistor: it can have failed open. A set that looks
  dead may hold its low-voltage charge for hours and its tube charge for days
  [Sam-cap].
- **Measure first.** Voltmeter across the main filter capacitor before
  touching anything [Sam-tv].
- **Discharge through a resistor, not a screwdriver.** A dead short welds and
  pits the metal and jolts the capacitor. Goldwasser's rule is a high-wattage
  resistor of about 5 to 50 Ω for each volt of working voltage, held on
  insulated leads [Sam-cap]. Then measure again to confirm.
- Navy practice: clip the earth end on first, then touch the probe to the
  terminal, and do it several times [NEETS-21]. Large capacitors recover part
  of their charge after one discharge [Sam-cap, Wiki-alu].
- Rough scale: under 0.01 µF is not a hazard, over 0.1 µF can be felt, a large
  one at high voltage can kill [ET-char]. 1000 µF at 160 V holds about 13
  joules [Sam-tv].
- Discharge before using the ohmmeter too, or the capacitor empties through
  the meter and can wreck it [NEETS-21, Sam-cap].
- A reversed or over-voltaged electrolytic can explode [K-caps Q3, LAE-cap,
  Libre]. Unverified (my advice): keep your face away from a newly fitted one
  at first switch-on.
- Many old TVs have no mains transformer, so the metal chassis is live
  [Sam-tv, K-supply notes 2, Phil].

### Common beginner mistakes

- Fitting an electrolytic backwards [Phil, NEETS-2, LAE-cap]. One sign in an
  old radio: a loud hum that the volume control does not change [Phil].
- Reading the stripe as "positive". On an aluminium electrolytic it is
  negative, on a tantalum bead the mark is positive [EN-codes, ET-types].
- Fitting a replacement with a lower working voltage [Phil, NEETS-2].
- Fitting a far bigger reservoir capacitor "to cure hum". The charging pulses
  get larger and can overload the rectifier or transformer [LAE-psu]. In a
  valve set it can also push the supply voltage too high [Phil].
- Reading "MFD" or "M" as mega or milli, or `47` (pF) as 47 µF [ModEL-C,
  K-caps notes 11].
- Testing in circuit and condemning a good part because something in parallel
  conducts [K-ohm Q4, Sam-cap].
- Holding both leads with the fingers: the meter reads the body as well. A
  technician doing this read 1.5 MΩ on a far larger resistor [K-ohm Q7].
- Expecting a kick from a small capacitor and calling it open [Sam-cap,
  Sams-64].
- Putting the ohmmeter on a charged capacitor [NEETS-21].
- Ignoring the meter's own battery and polarity. On many analogue meters the
  red lead is the negative one on the ohms ranges [Sam-cap], and a 22.5 V
  ohmmeter battery can ruin a 3 V capacitor [Sams-64].
- Trusting a good ohmmeter result on an electrolytic, or replacing a
  capacitor because it "looks old" while the real fault is elsewhere. Check
  simple things first: connections, fuse [Sam-tv, LIEC-R8].

## Exercises found

All numbers recomputed by me.

1. **The needle.** [K-caps Q12] How should a healthy capacitor answer an
   ohmmeter? *As an open circuit, once the first charging period is over. With
   a large value that period is long enough to watch.* Follow-up: which way
   does a capacitor more often fail, open or short? *Short* [K-bjt A8]. No
   numbers.

2. **Match the needle to the fault.** [Army, Learning Event 9] Four meters,
   four capacitors: (a) drops to zero and stays, (b) kicks, returns, and stops
   lower than normal, (c) does not move from the high end, (d) kicks and
   returns to a very high reading. *Short, leaky, open, good.* For an
   electrolytic: which of two readings, leads one way then the other, do you
   believe? *The higher.* No numbers.

3. **Read the markings.** [K-caps Q11 and Q15, ModEL-C 7.2.5, ET-codes]
   `103` 25 V, `.33` 1 kV, `47` 100 V, `1.0` 50 V, `4700 MFD` 36 V, `473K`,
   `102J`, `224M`, `331F`, `105K`. *10 000 pF (10 nF); 0.33 µF at 1000 V;
   47 pF; 1 µF; 4700 µF; 47 nF ±10%; 1 nF ±5%; 0.22 µF ±20%; 330 pF ±1%;
   1 µF ±10%.* How do you know `47` is picofarads and `.33` microfarads? *The
   decimal point.* Limits of a `473J` part: *44 650 to 49 350 pF.* Recomputed:
   47×10³ = 47 000 pF; 22×10⁴ = 220 000 pF; 33×10 = 330 pF; 10×10⁵ pF = 1 µF;
   47 000 ± 2350.

4. **The voltage rating.** [K-caps Q3] A capacitor says "100 WVDC". What does
   it mean, and what if you exceed it? *The most it may have across it
   continuously. Beyond that the dielectric fails. In an electrolytic the
   failure can be violent.* [NEETS-2 Q10] What working voltage for a circuit
   at 600 V? *900 V: half as much again.* Recomputed: 600 × 1.5 = 900. NEETS's
   own check that 500 V rms peaks at 707 V: 500 × 1.414 = 707.

5. **Four capacitors, four jobs.** [K-bjt Q5 and Q6] A two-transistor
   amplifier on 9 V has 0.47 µF at the microphone, 4.7 µF across the first
   emitter resistor, 33 µF to the speaker and 47 µF across the supply. Name
   each one's job. *Coupling in, bypass, coupling out, decoupling.* With no
   signal, what DC voltage is on each side of the input and output capacitors?
   *Microphone side 0 V and base side 0.98 V. Emitter side 6.4 V and speaker
   side 0 V.* So each has a steady voltage across it (0.98 V and 6.4 V) and
   passes no current. Recomputed from the 220 kΩ / 27 kΩ divider, 0.7 V
   junctions, 1.5 kΩ and 10 kΩ: base 0.984 V, first emitter 0.284 V, first
   collector 7.11 V, second emitter 6.41 V.

6. **The bypass capacitor shorts.** [K-bjt Q7, read from the rendered answer
   table] In a similar amplifier the capacitor across the first emitter
   resistor fails shorted. Which DC test-point readings change? *That emitter
   goes to 0 V. The base falls a little. The collector, and the next
   transistor's emitter that follows it, fall a great deal. The microphone
   side of the input capacitor and the supply rail do not change.* The same
   table's row "short from base to ground" gives base 0 V, emitter 0 V,
   collector and following emitter up near the supply.
   Unverified (my working): that row is also what a shorted **input coupling
   capacitor** does when the source is a low-resistance microphone, since
   [LIEC-coupling] says a direct low-impedance source shorts out the bias. So:
   "the coupling capacitor has gone short: the next stage loses its bias, cuts
   off, and its collector sits near the full supply."

7. **The fault a voltmeter cannot see.** [K-classA Q19] In a one-transistor
   amplifier, the input coupling capacitor fails open. What happens to the
   DC currents and to the output? *The DC values do not move at all. There is
   simply no signal.* The bypass capacitor fails shorted? *The transistor
   saturates: all currents rise sharply, and again no signal.* No numbers.

8. **The shorted reservoir.** [K-supply Q17 and Q24] A supply has a
   transformer, bridge rectifier, series choke and a capacitor across the
   output. The capacitor shorts. Predict everything. *Almost no voltage at the
   output and almost no load current. Much more current in both transformer
   windings, the diodes and the choke. Capacitor and diodes get hot.* A supply
   that worked for years gives nothing, and the case smells burnt. What do you
   suspect? *A shorted capacitor; a transformer winding burnt open as a
   result; shorted diodes and a blown fuse.* No numbers.

9. **Low and humming.** [K-supply Q12, turned round] A simple supply reads
   9.3 V DC with its filter capacitor connected and 6.1 V without. Why does
   one capacitor make such a difference? *It catches the peak of each pulse
   from the rectifier and holds it until the next.* As a fault question: the
   set's rail reads about two thirds of what the service sheet says, and it
   hums. *Reservoir capacitor open or dried out.* Recomputed: 6.1 ÷ 9.3 =
   0.66, close to the 0.637 that [LAE-psu] gives for the average of a
   full-wave rectified peak. (Belongs with №0016 as well.)

10. **A divider with a capacitor across the lower arm.** [ModEL-C 2.9] 11 V
    supply, 2.2 kΩ, then 3.9 kΩ to the negative side with 47 µF across the
    3.9 kΩ. At switch-on, what current flows into the capacitor, and where
    does its voltage end? *5 mA at first, falling to nothing. 7.03 V in the
    end.* Recomputed: 11 ÷ 2200 = 5.0 mA; 11 × 3.9 ÷ 6.1 = 7.03 V; time
    constant (2.2 kΩ ∥ 3.9 kΩ) × 47 µF = 66 ms, which reproduces the module's
    own 2.5655 V at 30 ms. Switch off and it empties through the 3.9 kΩ alone:
    183 ms, starting at 1.80 mA.
    Unverified (my working), the same circuit as a fault-finding job, steady
    readings at the junction:

    | Capacitor | Junction reads | Other sign |
    |---|---|---|
    | Good | 7.03 V | |
    | Open | 7.03 V | None on DC. The voltmeter cannot tell |
    | Leaky, as if 39 kΩ across it | 6.79 V | Slightly low |
    | Leaky, as if 3.9 kΩ across it | 5.17 V | Low. 2.65 mA from the supply where 1.80 mA is right |
    | Short | 0 V | All 11 V across the 2.2 kΩ, 5 mA, 55 mW in it |

11. **Propping up a tired battery.** [ModEL-C 2.4] A load takes 500 mA for
    2 ms at a time from a battery with internal resistance. What capacitor
    across the battery keeps the dip under 0.25 V? *About 4000 µF, so fit
    4700 µF.* Recomputed: C = I × t ÷ ΔV = 0.5 × 0.002 ÷ 0.25 = 0.004 F. This
    is decoupling shown with nothing but DC, and it follows straight on from
    №0010.

12. **Making it safe.** [Sam-cap, Sam-tv] A 400 µF capacitor charged to 350 V
    is discharged through 2 kΩ. How long? *About 4 seconds.* Recomputed:
    2000 × 0.0004 = 0.8 s, five of those is 4 s. And 400 µF at 200 V through
    5 kΩ: *about 10 seconds* (time constant 2 s). Both resistors fit the rule
    of 5 to 50 Ω per volt (1.75 to 17.5 kΩ, and 1 to 10 kΩ). Unverified (my
    working): the first instant puts 350² ÷ 2000 = 61 W into the first
    resistor and 200² ÷ 5000 = 8 W into the second, which is why the source
    asks for high-wattage parts. [K-caps Q6] Charge in 10 µF at 20 V:
    *200 µC.* [Sam-tv] Energy in 1000 µF at 160 V: *about 13 joules*
    (½ × 0.001 × 160² = 12.8 J). Different numbers from the 0.75 µF, 3000 V
    question already in `RESEARCH.md`.

13. **Devise the test.** [ModEL-C 7.3.1] A common failure is breakdown of the
    dielectric. Devise a simple test for it. Which is likelier to cause it,
    too much voltage or too much current? The module gives no answer.
    Unverified (my working): out of circuit, an ohmmeter that reads low and
    never climbs; in circuit, 0 V across a capacitor that should have voltage
    on it. Voltage, since it is the field across the dielectric that punctures
    it [K-caps Q3 says the same of the rating].

## Build the lesson round

№0012 already teaches the charging curve. This lesson is the part itself.

1. **One circuit, four capacitors.** The divider of exercise 10 (or the course's
   own supply, a feed resistor, and a capacitor across the load). The learner
   reads one junction voltage and sorts good / leaky / short, then meets the
   open one, where the voltmeter reads exactly right. The single idea: at DC a
   good capacitor is a gap, a short has 0 V across it, a leak is a resistor
   that should not be there, and an open is invisible.
2. **The ohmmeter kick as the bench test.** Model the ohmmeter as what it is,
   a cell, a resistor and a meter. The kick-and-fall is then the charging
   current of №0012 seen on a needle. Four parts from the box give four needle
   movements (exercise 2). Include one small good capacitor that gives no kick.
3. **Blocking DC.** One series capacitor between a point at some volts and a
   resistor to the negative side. Good: the far side reads 0 V, and the
   capacitor has the whole voltage across it. Shorted: the far side reads the
   DC. That is "what the next stage sees" without needing a transistor.
4. **Choosing the replacement.** Three parts on the shelf: right value but
   too low a voltage, right in both but drawn the wrong way round, and right.
   Markings, the 50% rule, and the stripe.
5. **Safe before you touch.** After switch-off the meter still reads the
   capacitor's voltage. Discharge it through a resistor and watch it fall,
   then confirm near 0 V before the ohmmeter goes on. Say that the tube is a
   capacitor too.

---

# Part 2: the coil (inductor, choke)

Transformers and relays are left out, except where a test for a winding is the
same test.

## Sources

Loaded and read.

**Kuphaldt (worksheets, CC BY 1.0)**

- [K-inds] "Inductors", <https://www.ibiblio.org/kuphaldt/socratic/output/inds.pdf>. Mirror, first page only: <https://www.allaboutcircuits.com/worksheets/inductors/>
- [K-ind] "Inductance", <https://www.ibiblio.org/kuphaldt/socratic/output/ind.pdf>
- [K-xl] "Inductive reactance" (one follow-up used), <https://www.ibiblio.org/kuphaldt/socratic/output/xl.pdf>
- [K-supply], [K-bjt], [K-ohm] as in Part 1

**Kuphaldt (other)**

- [ModEL-L] *Inductors and Inductive Circuits*, CC BY 4.0, <https://www.ibiblio.org/kuphaldt/socratic/model/mod_inductor.pdf>
- [LIEC-15] *Lessons in Electric Circuits* vol. I ch. 15, CC BY, <https://www.ibiblio.org/kuphaldt/electricCircuits/DC/DC_15.html>
- [LIEC-R8] as in Part 1

**US military training texts**

- [NEETS-2] Module 2 ch. 2, and [NEETS-21] Module 21 ch. 1, as in Part 1
- [Army] as in Part 1 (the same page covers coils)
- [Navy-CE] "Testing Inductors", from *Construction Electrician Basic*, <https://tpub.com/celec/56.htm>

**Tutorial sites (all rights reserved)**

- [ET-ind] <https://www.electronics-tutorials.ws/inductor/inductor.html>
- [EN-ind] <https://www.electronics-notes.com/articles/electronic_components/inductors-transformers/inductor-types.php>
- [LAE-ind] <https://learnabout-electronics.org/ac_theory/inductors.php>
- [LAE-ind3] <https://learnabout-electronics.org/ac_theory/inductors03.php>
- [LAE-psu] as in Part 1
- [AAC-video] "Inductors (Part 3): Troubleshooting", lecture by Tim Fiegenbaum with transcript, <https://www.allaboutcircuits.com/video-lectures/inductors-troubleshooting/>

**Repair practice and reference**

- [Sams-63] "Electronic Component Tests & Measurements (1963)", inductive components, <https://gammaelectronics.xyz/sams_tmm-1_3.html>
- [Sam-tv] as in Part 1
- [Wiki-choke] <https://en.wikipedia.org/wiki/Choke_(electronics)>
- [OS-14.2] OpenStax *University Physics* vol. 2, 14.2, <https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors>
- [Libre] as in Part 1

## How it works

- **A coil is a length of insulated wire wound up.** Current in any wire makes
  a magnetic field round it. Winding the wire into a coil stacks the field of
  every turn on top of the others, so the field is far stronger than a
  straight wire's [LIEC-15, ET-ind, NEETS-21].
- **The insulation is a thin coat of enamel.** The turns lie against each
  other and only the enamel keeps the current going round every turn
  [ModEL-L 2.9 and 5.3]. Some coils look like bare copper but are not
  [Libre]. When a coil fails by shorting, this coat is what has failed
  [AAC-video].
- **Building the field takes energy, and the coil gives it back.** While the
  current is rising the coil takes energy in. When the current falls the
  field collapses and pushes the current on. So the coil opposes any *change*
  in its current and does nothing at all to a steady one [LIEC-15, K-ind Q11].
  (`RESEARCH.md` №0017 has the behaviour over time.)
- **What sets the inductance:** more turns, a wider coil, a shorter coil, and
  a core that carries the field better [K-ind Q7, LIEC-15]. Turns count
  double: three times the turns gives nine times the inductance [K-ind Q5].
- **The core.** Iron or ferrite inside the coil multiplies the field many
  times. Kuphaldt's sum: 22 mH on a 2 cm by 10 cm former takes about 2360
  turns with air inside and about 37 with iron [K-ind Q6]. Iron for mains and
  audio, built from thin insulated sheets. Ferrite, an iron oxide that does
  not conduct, for radio frequencies. Air where little inductance is wanted,
  as in tuners [ModEL-L 5.3, EN-ind, LAE-ind3].
- **A core can be filled up.** Past a certain current it is fully magnetised
  (saturated) and stops helping, so the inductance drops sharply. Air cannot
  saturate [K-inds Q10, ModEL-L 3.6].

A real coil is the ideal one plus the resistance of its own wire in series
[LIEC-15, ModEL-L 5.4, NEETS-2]. At DC that resistance is all there is. It is
easier to make a nearly perfect capacitor than a nearly perfect coil, and for
the same stored energy the coil is bigger, which is why designers use a
capacitor wherever they have the choice [LIEC-15, ModEL-L].

**"Choke"** is the trade name for a coil whose job is to hold back alternating
or high-frequency current while letting DC through. The word comes from radio
practice [LIEC-15, Wiki-choke, LAE-ind].

## What it is for, and where it is found

| Purpose | What the coil does | Where, about 1975 to 1985 | Where today |
|---|---|---|---|
| **Choke / smoothing filter** | In series with the supply. Lets the steady current through with only the small drop of its winding, and resists the ripple riding on it. With the capacitor after it, it removes far more ripple than a resistor could, and wastes less heat. The page's figures: at ripple frequency a choke can have about 4000 times the capacitor's reactance, where a series resistor is limited to about 25 times [LAE-psu] | The iron-cored smoothing choke in valve radios and amplifiers, beside the big electrolytics [Wiki-choke]. Heavy and costly at 50 to 120 Hz [LAE-psu], and later largely replaced by bigger capacitors and regulators [Wiki-choke] | Small ferrite and toroid chokes in every switch-mode supply, where the ripple is at tens of kHz [LAE-psu, Wiki-choke] |
| **Tuning** | With a capacitor, picks one frequency | The ferrite-rod aerial of an AM radio, wound with several coils and tuned by the variable capacitor [LAE-ind3]. Coils in screening cans in the IF strip, each peaked by its core at a set frequency (a 1963 TV example: 43.2 MHz) [Sams-63]. Air coils of a turn or two in VHF and UHF tuners [LAE-ind3]. Small "peaking" coils in the video amplifier [Sams-63] | Filters and oscillators in radio equipment, chip coils a few millimetres long [LAE-ind3, EN-ind] |
| **Energy storage and the kick** | Stores energy in its current and releases it as a high voltage when the current is cut | The ignition coil's spark [LAE-ind]. The TV's line output stage, where the deflection coils are part of the circuit that makes the high voltage [Sam-tv] | Switch-mode converters. The camera-flash voltage booster [OS-14.2] |
| **Suppressing interference** | Blocks radio-frequency noise on a wire that must carry DC or mains | Mains input filter: Kuphaldt's example is two 100 µH coils with 0.022 µF capacitors, which do nothing at 60 Hz and block the noise [K-supply Q26 and Q27]. RF chokes that pass DC and audio and stop radio frequencies [Wiki-choke] | Ferrite beads and clamp-on sleeves on computer and video cables, common-mode chokes [Wiki-choke, EN-ind] |
| **Steadying current** | In series, keeps a current from changing fast | Power-line reactors that slow the rise of a short-circuit current [K-inds Q7, ModEL-L 3.3] | The same |
| **Making a magnetic field on purpose** | The field is the point | The tube's deflection yoke. Width coil in series with the horizontal deflection coils. Degaussing coil round the tube face, about 25 to 30 Ω, fed through a thermistor at switch-on [Sam-tv] | Loops under the road at traffic lights, airport metal detectors [OS-14.2] |

## Ratings and markings

**Units.** Henry (H). Smoothing chokes are whole henries (Kuphaldt's examples
use 4, 5 and 10 H). Radio coils are millihenries (mH) and microhenries (µH)
[NEETS-21, K-inds]. Small colour-banded coils run from about 0.1 µH to 1 mH
[LAE-ind3].

**Markings.**

- Large chokes print the value, and often the current and resistance.
- Small moulded coils look like resistors and use the same colours: digit,
  digit, multiplier, tolerance, read in **microhenries** [K-inds Q8, ModEL-L
  5.2, LAE-ind3]. Yellow, violet, orange, gold is 47 × 10³ µH = 47 mH ±5%.
  No fourth band means ±20%.
- Military coils add a wide silver band first [LAE-ind3].
- Printed codes follow the capacitor pattern, in microhenries: `331` is
  330 µH, `821J` is 820 µH ±5%. `R` is a decimal point (`R01` = 0.01 µH) and
  `N` marks nanohenries (`3N9` = 3.9 nH) [ModEL-L 5.2].
- In the diagram, lines drawn beside the coil mean an iron or ferrite core. No
  lines mean air [ET-ind, ModEL-L 3.6].
- A coil has no polarity [Libre].
- Many coils in a set carry no marking at all. The service sheet gives their
  resistance [Sams-63].

**DC resistance** (winding resistance, DCR). The plain resistance of the wire.
Ideally zero, never actually [ModEL-L 5.3]. Typical figures:

| Coil | DC resistance |
|---|---|
| RF coil of 10 to 100 turns, up to a few mH | 1 to 20 Ω [Army] |
| Lower-frequency coil of several hundred turns | about 10 to 500 Ω, by wire size [Army] |
| "A good coil" in general | a few ohms, often 2 to 3 Ω [AAC-video] |
| TV degaussing coil | about 25 to 30 Ω [Sam-tv] |
| Examples in a 1963 test book | 60 Ω for a 100 mH coil; 37.7 Ω for 300 mH; 77 Ω for about 0.12 H [Sams-63] |

**Current rating.** Set by whichever comes first: the wire overheating from
its own resistance (I²R, the "copper loss"), or the core saturating [ModEL-L
3.6, LIEC-15, NEETS-2]. A coil for more current or more inductance is bigger
[ModEL-L].

**Insulation.** Between winding and core it should read infinite [K-inds Q9,
Army].

## Faulty or working

### The failure modes

| Fault | What has happened inside | How common, and why |
|---|---|---|
| **Open winding** | The wire has parted. Usual places: where the fine wire is soldered to the lug, a strain or knock during fitting, or burnt through by too much current [Navy-CE, Army] | The Army text calls it the most common coil trouble. Kuphaldt, from reliability data, says a coil is about equally likely to fail open as shorted [K-inds notes 9, K-bjt A8] |
| **Shorted turns** | The enamel between neighbouring turns has failed, so some turns are bypassed. One shorted turn is enough to spoil a coil: the Navy's check deliberately adds a single loop of solder round a good coil, and its ringing collapses [Navy-CE] | The Navy text calls it the most common defect. Causes given: insulation melted by overheating [AAC-video], or broken down by too much voltage [Navy-CE]. The heat it makes can go on to burn the winding open [Army] |
| **Short to the core or frame** | Winding insulation has failed against the iron | Named by Kuphaldt alongside open as the way windings fail [LIEC-R8]. Often found by smell [LIEC-R8] |
| **Leak to core or to another winding** | Insulation conducting a little | In a TV's iron-cored parts it draws extra current that can burn the winding out, and upsets width and height [Sams-63] |
| **Changed value** | Turns shifted by handling, or wire stress relaxing with age [Navy-CE]. Unverified: a core slug moved or cracked | Named as the third coil fault [Navy-CE]. Unverified (my working): shows as mistuning, not as a DC fault |
| **Dry joint at the lead-out** | Reads as open or as intermittent | Check and re-solder before throwing the coil away: it may be perfectly good [Army, Navy-CE] |

Kuphaldt ranks coils and transformers below capacitors and diodes, and above
resistors, in how often they are the passive part at fault. Bad connections
outrank all of them [LIEC-R8].

### (a) In circuit, with a voltmeter on DC

At a steady current a good coil is only its wire [ET-ind]. So:

| Coil | Reading |
|---|---|
| **Good** | Nearly the same voltage at both ends. Only the winding's resistance opposes a steady current [ET-ind], so the difference is current × winding resistance: small, but not zero for a choke of a hundred ohms or so |
| **Open** | The full supply voltage across the coil. Nothing beyond it, no current. With an open choke in Kuphaldt's supply: no voltage at the load, no load current, no current anywhere on that side, only a little in the transformer primary [K-supply Q17] |
| **Shorted turns** | DC readings almost normal: the drop across the coil is a little less than it should be. Overheated windings can be found by smell [LIEC-R8]. The trouble shows where the coil was meant to resist change: lower gain and shifted tuning in a tuned stage [Sams-63], and (Unverified) more hum after a smoothing choke |
| **Shorted end to end** | 0 V across it |
| **Short to core** | If the core is earthed, the rail is pulled down and too much current flows |

Unverified (my working): everything in this table without a source tag. "Full
supply across the open coil" is the open-circuit rule from `RESEARCH.md`
applied to Kuphaldt's answer, which lists only the zero readings downstream.
The last two rows are the short-circuit rule applied the same way.

**Limits.** A DC voltmeter cannot find shorted turns, because at DC the coil's
inductance plays no part. A drop of 0 V across a coil is normal for a
low-resistance coil and proves nothing.

### (b) Out of circuit, with an analogue ohmmeter

| Coil | What the needle does |
|---|---|
| **Good** | Goes straight to a low, steady reading: the winding resistance. No kick and no drift, unlike a capacitor [K-inds Q9 and notes]. Compare it with the service sheet [Sams-63] |
| **Good, winding to core** | Infinity [K-inds Q9, Army, AAC-video] |
| **Open** | Infinity [Army, AAC-video, Sams-63] |
| **Shorted turns** | A little lower than it should be, or apparently normal. A few shorted turns barely change the resistance, and a good coil is only a few ohms to begin with, so the change is a fraction of an ohm [Army, AAC-video, Sams-63]. If the reading *is* clearly low, replace the coil [Army] |
| **Shorted end to end** | Zero [Sams-63] |
| **Short or leak to core** | Any reading at all from winding to core or frame [Army, AAC-video] |

**Limits of the ohmmeter.**

- It finds an open winding and a short to the core. It does not find shorted
  turns [Army, AAC-video, Sams-63].
- Shorted turns need an inductance meter, a comparison with a known-good coil,
  or a ringing test: pulse the coil and count how many swings it makes before
  dying away. Good, ten or more; shorted turns, far fewer; open, none
  [Navy-CE, Sams-63]. The ringing test does not work on iron-cored chokes: the
  laminated core damps them anyway [Navy-CE]. Substitution is the last word
  [Sams-63].
- Test out of circuit, or at least with one end lifted. Anything in parallel
  with a few ohms of coil misleads [Army, Navy-CE]. The reverse trap: a
  low-resistance coil left connected makes other parts look shorted, which is
  why Goldwasser unplugs the degaussing coil before testing a TV's rectifier
  [Sam-tv].
- Zero the meter with the leads shorted each time the range is changed, and
  pick the range that puts the needle near mid-scale. Lead resistance matters
  when the answer is a few ohms [NEETS-21].
- NEETS adds that measuring inductance itself is seldom needed in fault-finding
  [NEETS-21].

### Visual signs and smell

- Darkened, blistered or melted enamel; wax or varnish that has run; a burnt
  smell. Overheated windings can often be found by nose [LIEC-R8, AAC-video].
- A broken lead-out wire at the lug, often a hair-fine wire [Navy-CE].
- A cracked or missing ferrite core or slug.
- A burnt or open resistor or blown fuse upstream of a choke that has shorted
  to its frame.

### Safety

- **The kick.** Break the circuit of a coil carrying current and it produces a
  voltage far above the supply. Kuphaldt got a shock from a 9 V battery and a
  home-made electromagnet by letting go of a wire [K-ind Q14]. The pulse can
  be tens to thousands of volts, enough to destroy a transistor [LAE-ind].
  Unverified (my advice): so switch off before lifting a lead from a coil.
  (`RESEARCH.md` №0017 has the kick on a trace and the diode that tames it.)
- Unverified (my working): a coil stores nothing once the current has
  stopped, so unlike a capacitor it cannot be dangerous on the shelf
  (exercise 8 below).
- A choke with shorted turns or too much current overheats [AAC-video].
- In a TV the coils are reached inside a chassis that holds a charged main
  capacitor and a charged tube. The capacitor rules of Part 1 apply to the
  whole chassis [Sam-tv].

### Common beginner mistakes

- "It has continuity, so it is good." Continuity rules out an open winding and
  nothing else [Army, AAC-video].
- Expecting a kick on the ohmmeter, as with a capacitor [K-inds notes 9].
- Calling a 2 Ω coil shorted. Low is normal. Look up the right figure
  [AAC-video, Sams-63].
- Taking a small banded coil for a resistor, or reading its bands in ohms
  [K-inds Q8, Libre, LAE-ind3].
- Measuring in circuit [Army, Navy-CE].
- Scrapping a coil that only has a broken lead-out [Army, Navy-CE].
- Unverified (my working): turning a core slug "to see". Each IF coil is
  peaked at a set frequency [Sams-63], so moving the core mistunes the stage.
- Fitting a replacement choke of the right inductance and too small a current
  rating. The rating is set by wire heating and by core saturation, whichever
  comes first [ModEL-L 3.6 and 5.3].
- Mounting two coils close together and in line, so that one's field couples
  into the other. A fault a capacitor cannot have [ModEL-L 7.3.3, LIEC-15].

## Exercises found

All numbers recomputed by me.

1. **The ohmmeter on a coil.** [K-inds Q9] How should a sound inductor answer
   an ohmmeter? *A very low resistance between its ends. If it has an iron
   core, no continuity at all between either end and the core.* Follow-up:
   which way does a coil more often fail? *Open and shorted are about equally
   likely* [K-inds notes]. Kuphaldt's teaching note asks, and does not answer:
   why is there no "charging" swing as with a capacitor? Unverified (my
   working): the coil's time constant with the meter's resistance is far too
   short for a needle to follow.

2. **Match the reading to the fault.** [Army, Learning Event 9; AAC-video] A
   service sheet gives a coil as 120 Ω. Four coils read: infinity; 118 Ω and
   it ran hot; 120 Ω across the winding but 40 Ω from winding to frame; 120 Ω
   and infinity to frame. *Open; probably shorted turns, which the ohmmeter
   cannot confirm; shorted to the frame; good as far as an ohmmeter can say.*
   The fault conditions and their readings are the sources'. The numbers are
   mine (Unverified).

3. **Read the bands.** [K-inds Q8, ModEL-L 7.2.5] Red green brown gold; white
   orange red silver; green grey black; violet blue orange gold. *250 µH ±5%;
   9300 µH (9.3 mH) ±10%; 58 µH ±20%; 76 mH ±5%.* And blue red brown gold?
   *620 µH ±5%.* How does this differ from the resistor code? *The unit is
   microhenries.* Recomputed: 25×10; 93×100; 58×1; 76×1000 µH; 62×10.

4. **The choke goes open.** [K-supply Q17] In the supply of capacitor exercise
   8, the series choke fails open. Predict everything. *No voltage across the
   load and no current through it. No current in the rectifier or the
   secondary. A little current in the primary.* Where does the voltage go?
   Unverified (my working): all of it sits across the break in the choke.

5. **Three moments.** [ModEL-L 7.2.13 and 7.1.7] 12 V, a switch, 220 Ω and a
   10 H coil in series. Give coil voltage, resistor voltage, switch voltage
   and current just before closing, at the instant of closing, and long after.
   *Before: nothing anywhere except 12 V across the open switch. At the
   instant: no current yet, 0 V on the resistor, all 12 V across the coil.
   Long after: 54.5 mA, 12 V on the resistor, 0 V across the coil.* The module
   gives no answers; these are recomputed: 12 ÷ 220 = 54.5 mA; energy stored
   ½ × 10 × 0.0545² = 14.9 mJ; L ÷ R = 45 ms. This is the coil's mirror of the
   capacitor question in `RESEARCH.md` №0012.
   Unverified (my working), the real-coil version: give the winding 30 Ω and
   the steady state becomes 48 mA with 1.44 V left across the coil for good.
   That 1.44 V is what a voltmeter finds across a healthy choke.

6. **Where the kick's size comes from.** [ModEL-L 7.2.12, diagram read from
   the rendered page] A 10 V supply feeds a coil through 5 kΩ. After a long
   time a changeover switch moves the coil off the supply and onto a 91 kΩ
   resistor instead. What current was flowing, and what voltage appears across
   the coil at that instant? *2 mA, and 182 V.* Recomputed: 10 ÷ 5000 = 2 mA;
   0.002 × 91 000 = 182 V. Why so unlike the 10 V supply? *The coil keeps its
   2 mA going and drives it through whatever resistance it is given.* This
   puts a number on the kick of №0017 using only Ohm's law.

7. **The coil that drops too much.** [K-inds Q2] The current in a 4 H coil is
   raised steadily by 1.5 A every second. What voltage should be across it,
   and will a real coil show more or less? *6 V, and more.* Why? *The winding
   has resistance, which adds its own drop.* Recomputed: 4 × 1.5 = 6 V.

8. **Why you cannot shelve a charged coil.** [ModEL-L 7.1.5] A charged
   capacitor can sit on a shelf and still hold energy later. Why not a coil?
   The module gives no answer. Unverified (my working): its energy is in its
   current. Take it out of the circuit and the current has no path. Join its
   ends and the winding's own resistance turns the energy to heat in
   milliseconds. Only a coil with no resistance at all could do it.

9. **The enamel fails.** [ModEL-L 7.3.1] One way a coil fails is breakdown of
   the insulation on its wire. How would that change the coil, and how would
   you find it? Too much voltage, or too much current? No answer in the
   module. From the other sources: *turns short together; inductance falls;
   resistance falls only slightly; the coil heats. An ohmmeter will probably
   miss it. Compare with a known-good coil, use an inductance meter, or a
   ringing test* [AAC-video, Army, Navy-CE, Sams-63]. On the cause the sources
   split: overheating from current [AAC-video], excess voltage [Navy-CE].
   Both are defensible.

10. **Too much current for the core.** [K-inds Q10, ModEL-L 7.3.5] What
    happens to a coil's inductance as its core saturates? *It falls.* What
    brings that on, and which cores are immune? *Too much current. Air.* No
    numbers.

11. **Turns count double.** [K-ind Q5 and Q6, ModEL-L 2.9] Treble the turns on
    a coil: what happens to its inductance? *Nine times.* How many turns for
    22 mH on an air former 2 cm across and 10 cm long, and how many with an
    iron core of relative permeability 4000? *About 2360 and about 37.*
    Kuphaldt's bench check: one core read 160.16 µH with 10 turns and
    38.93 µH with 5, a ratio of 4.11 for twice the turns. Recomputed:
    N = √(L·l ÷ μA) = 2361; ÷ √4000 = 37.3; 160.16 ÷ 38.93 = 4.114. Also from
    the same module: a core rated 51 nH per turn squared gives 18.4 µH with 19
    turns and 45.9 µH with 30 (51 × 361 and 51 × 900 nH).

12. **For later, on AC.** [K-xl Q4, follow-up] A lamp is in series with an
    iron-cored coil on an AC supply. What fault would make the lamp glow
    brighter than it should? Kuphaldt leaves it open. Unverified (my working):
    shorted turns, a shorted coil, or a missing core, each of which lowers the
    inductance. Not a DC question, so it belongs after №0015.

## Build the lesson round

№0017 already teaches the rise, the L ÷ R time and the kick. This lesson is
the part itself.

1. **One circuit: supply, choke, load.** The set's supply feeds a lamp or
   resistor through a choke with a stated winding resistance. Good: the load
   has nearly the whole supply, and the choke a volt or so (current × its
   resistance, exercise 5). Open: the whole supply across the choke, nothing
   at the load. The single idea: on a steady current a coil is a length of
   wire, so a good one drops almost nothing and an open one takes everything.
2. **The ohmmeter and the service sheet.** Out of circuit, the needle goes
   straight to a low figure and stays. No kick: set it beside the capacitor's
   needle from the other lesson. Three checks: end to end against the sheet,
   each end to the frame, and the lead-out joints.
3. **The fault the meter misses.** Two chokes that read almost the same ohms
   and give the same steady voltages, one with shorted turns. The difference
   only shows on the trace at switch-on: the faulty one reaches its final
   current sooner, because it has less inductance (№0017's L ÷ R). That
   teaches the limit of DC testing honestly, on one circuit, and shows why the
   shop swaps in a known-good part.
4. **Heat is the clue.** The current the choke carries, times itself, times
   the winding resistance, is the heat it must lose (ties to №0003). A choke
   that is too hot to touch, or smells, is carrying too much or has shorted
   turns.
5. **Mind the kick while testing.** Switch off before lifting a lead. One
   line, pointing back to №0017.
