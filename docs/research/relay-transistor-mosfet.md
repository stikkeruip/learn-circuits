# Research: the relay, the transistor switch, the MOSFET switch

For the one-lesson-per-component jobs. Gathered on 20 November 2026.
It adds to `RESEARCH.md` №0018 (relays) and №0019 (transistor as a switch) and
does not repeat them. The MOSFET has no section there, so it is covered in full.

## How far to trust this

- Web pages were read through a summarising fetch, so what is reported is the
  substance of a page, not its wording. Kuphaldt's worksheet PDFs, his three
  *Modular Electronics Learning* (ModEL) modules, International Rectifier
  AN-936, Vishay AN-910, TI SLUA618A and the Vishay IRF510 data sheet were read
  directly as extracted text.
- Text extraction drops the drawings. Where a Kuphaldt question depends on a
  schematic that I could not see, the entry says **"drawing not seen"** and
  states what I assumed.
- Every numeric answer below was recomputed (a short script, plus by hand).
  Where a source's own arithmetic is loose, that is said.
- **"Unverified"** marks anything that did not come from a page I loaded.
  **"Derived"** marks a reading I worked out from the circuit rules rather than
  found stated on a page.
- One short quotation is used in the whole file (in the MOSFET fault section).

### Pages that would not load, or were empty

| Page | What happened |
|---|---|
| *Lessons in Electric Circuits*, "Enhancement-type IGFETs" and "IGFET Quirks" (allaboutcircuits.com/textbook/semiconductors/chpt-6/…) | Load, but are **stubs**: heading only, no text |
| *Lessons in Electric Circuits*, a "meter check of a transistor (IGFET)" page | Does not exist in the chapter index. The URL I tried returned 404 |
| Nexperia AN11243, power MOSFET failure signatures (assets.nexperia.com) | 403 |
| RF Cafe copy of NEETS Module 7, pages 2-51 to 2-54 | 404. The same module was read on tpub.com instead |
| UMass open textbook, *Fundamentals of EE*, chapter 5.2 (openbooks.library.umass.edu/funee) | 403 |
| S. Goldwasser, *Notes on the Troubleshooting and Repair of Television Sets* (the single big file, repairfaq.org/sam/tvfaq.htm) | Only the first 100,000 of 665,000 characters were read. Three of its sections were read as separate pages instead (listed under the relay and the transistor) |
| allaboutcircuits.com index pages for the Semiconductors and Digital volumes | Read only for their link lists |

### Two notes for `RESEARCH.md`

1. **Licence wording.** Each Socratic worksheet PDF states CC BY **1.0** on its
   first page, as `RESEARCH.md` says. The ibiblio index page was reported by
   the fetch as stating CC BY **3.0 US**, and the All About Circuits mirror
   says only "Creative Commons Attribution License". The ModEL index states
   CC BY 4.0. Credit covers all of them.
2. **A slip in №0019.** The third exercise there says "23.5 V across the
   transistor whether the button is pressed or not". Kuphaldt's question
   (worksheet "BJTs as switches", Q19) reads differently: 24 V from TP4 to
   ground; from **TP2 to ground, 0 V with the switch pressed and about 23.5 V
   with it released**. His answers: lamp burnt out, transistor open at the
   collector, or an open connection either side of the lamp. He adds that the
   resistor and the switch are proved good by those two readings.

### The two fault signs, applied to a switch

`RESEARCH.md` already has them: an **open** part has the full supply across it
and no current; a **shorted** part has 0 V across it. A relay contact, a
transistor and a MOSFET are all switches in series with a load, so:

| The switch is… | Volts across the switch | Volts across the load |
|---|---|---|
| Good and off | Full supply | 0 |
| Good and on | Nearly 0 (contact: millivolts; transistor: 0.1–0.3 V; MOSFET: I × R) | Nearly the full supply |
| Failed open, or never told to turn on | Full supply, always | 0, always |
| Failed short (welded, C–E short, D–S short) | 0, always | Full supply, always |
| Half on (burnt contact, starved base, low gate volts) | Something in between, and the switch runs hot | Low |

The third reading, on the **control** side (coil volts, base volts, gate volts),
tells "failed open" from "never told to turn on". That is the whole method, and
it is the same for all three parts.

---

## 1. The relay

### Sources

| Page | Licence, as stated |
|---|---|
| Kuphaldt, worksheet "Basic electromagnetic relays", [relay1.pdf](https://www.ibiblio.org/kuphaldt/socratic/output/relay1.pdf) | CC BY 1.0 |
| Kuphaldt, ModEL "Electromechanical Relays", [mod_relay.pdf](https://www.ibiblio.org/kuphaldt/socratic/model/mod_relay.pdf) (index: [model/](https://www.ibiblio.org/kuphaldt/socratic/model/)) | CC BY 4.0 |
| *Lessons in Electric Circuits*, [Relay construction](https://www.allaboutcircuits.com/textbook/digital/chpt-5/relay-construction/) | Design Science License |
| same, [Contactors](https://www.allaboutcircuits.com/textbook/digital/chpt-5/contactors/) | Design Science License |
| same, [Switch contact design](https://www.allaboutcircuits.com/textbook/digital/chpt-4/switch-contact-design/) | Design Science License |
| same, [Contact "normal" state and make/break sequence](https://www.allaboutcircuits.com/textbook/digital/chpt-4/contact-normal-state-make-break-sequence/) | Design Science License |
| same, [Inductor commutating circuits](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-3/inductor-commutating-circuits/) | Design Science License |
| Electronics-Tutorials, [Electrical relay](https://www.electronics-tutorials.ws/io/io_5.html) | All rights reserved (AspenCore) |
| Electronics Notes (I. Poole), [What is a relay](https://www.electronics-notes.com/articles/electronic_components/electrical-electronic-relay/what-is-a-relay-basics.php) | © electronics-notes.com, none stated |
| TE Connectivity, white paper [Relay contact life](https://www.te.com/en/products/relays-and-contactors/electromechanical-relays/intersection/relay-contact-life.html) (2020) | © TE Connectivity, all rights reserved |
| Elliott Sound Products (R. Elliott), [Relays, part 2: contact protection schemes](https://sound-au.com/articles/relays2.htm) | © Rod Elliott. Personal use only |
| S. Goldwasser, TV repair FAQ, [Relays in the power circuitry of TVs](https://www.repairfaq.org/samnew/tvfaq/tvrelaysp.htm) | © S. Goldwasser. May be reproduced with the notice, at no charge |
| J. Blair, Morgan electrical primer part 4, [Testing a relay](https://www.gomog.com/BLAIR2/tech/electrical/relay/troubleshoot_relay.html) | © John T. Blair, none stated |
| B. Gaylord, MGAguru, [When and why relays might be a good idea](https://mgaguru.com/mgtech/electric/et200a.htm) | © 2016 Barney Gaylord |
| Wikipedia, [Relay](https://en.wikipedia.org/wiki/Relay) | CC BY-SA 4.0 |
| CMU course 24-354, [Lab 4: BJT switches and relays](https://andrew.cmu.edu/course/24-354/content/Labs/Lab4/Lab4.html) | None stated |

Use as in `RESEARCH.md`: Kuphaldt's questions may be adapted with credit;
everything else is ideas only.

### How it works

- **An electromagnet pulls an iron flap, and the flap pushes a switch.** A coil
  wound on an iron core, a hinged iron armature, a return spring, and one or
  more sets of contacts on a frame (the yoke). Current in the coil makes a
  field; the field pulls the armature; the armature moves the contacts. Take
  the current away and the spring puts them back (Electronics-Tutorials,
  Electronics Notes, Wikipedia, ModEL).
- **Either polarity pulls.** Iron is attracted whichever way the current runs
  (*Lessons in Electric Circuits*). The exception is a relay with a diode
  built in across its coil: its case says to observe polarity (ModEL, from a
  photographed relay).
- **It is all or nothing.** There is no half-on state (ModEL). *Lessons in
  Electric Circuits* calls it an on/off amplifier: a coil taking a fraction of
  a watt can switch hundreds of times that power.
- **It lets go later than it pulls in.** Once the armature has closed the air
  gap, less current holds it. So the drop-out current is well below the
  pull-in current (*Lessons in Electric Circuits*; ModEL uses "pick-up" and
  "drop-out"). A relay fed a little too little may never pull in, yet one
  already pulled in will stay in on the same voltage.
- **Two circuits that never touch.** The coil loop and the contact loop share
  only the magnetic pull. They can differ in voltage, in AC or DC, and in
  where their "ground" is (*Lessons in Electric Circuits*, ModEL,
  Electronics-Tutorials).
- **The coil is a coil.** At switch-off it kicks (№0017). A diode across a DC
  coil clamps the kick to about 0.7 V above the supply, and the relay then
  lets go slightly later (*Lessons in Electric Circuits*, ModEL, TE).

### What it is for, and where it is found

- **A small switch working a heavy load.** *Lessons in Electric Circuits*
  shows a 12 V DC coil switching a 480 V AC circuit.
- **In a car.** The starter relay lets the ignition key's small contacts and
  thin wire command the cranking motor (Wikipedia). Twin horns draw up to
  about 25 A for a moment, and a relay keeps that current out of the
  steering-column switch and its thin wire (Gaylord). Two 60 W main beams
  draw 10 A (recomputed: 120 W ÷ 12 V); a relay with a short heavy feed cuts
  the voltage lost in the wiring, which matters most for added driving or fog
  lamps (Gaylord). Some cars dipped their headlamps with a ratchet relay
  (Wikipedia).
- **In a 1984 television.** A set with remote control cannot use a plain
  mains knob, so a relay switches the mains to the power supply; the control
  circuit drives its coil, typically at 6 to 12 V DC, from a transistor
  (Goldwasser). This is the best single shop story for the job: a part that
  is in the set only because of the handset. A separate degaussing relay:
  **Unverified** (seen in a search result for a Sony service manual, page not
  loaded).
- **Elsewhere.** Telephone exchanges, railway signalling, early computers,
  machine control (Wikipedia, ModEL). A hi-fi amplifier's loudspeaker
  protection relay: Elliott's article mentions loudspeaker DC protection, but
  the relay's use there is otherwise **Unverified**.
- **Today.** Still fitted where the load is mains or heavy, where true
  isolation is wanted, or where surges would kill a semiconductor
  (Electronics Notes, ModEL). Solid-state relays (an LED shining on a
  transistor or triac) replace normally open types but drop 1 to 2 V when on
  and run hotter (Electronics-Tutorials, ModEL).

### Ratings and markings

- **Coil voltage** is printed on the case, AC or DC. A photographed relay in
  ModEL is marked 12 V DC with no current beside it, and that is how to tell
  it is the coil rating and not a contact rating: contact ratings come as a
  group of amps, volts and sometimes horsepower. Nothing on the case says
  "coil" or "contact".
- **Coil resistance** gives the coil current by Ohm's law. Figures met in the
  sources: 250 Ω at 5 V (20 mA, Kuphaldt); 650 Ω at 24 V (37 mA, ModEL);
  about 100 Ω for a 12 V car relay (Blair). Blair also says the coil draws
  about a quarter of an amp, which does not agree with his own 100 Ω:
  recomputed, 100 Ω at 12 V is 120 mA, and a quarter of an amp would be 48 Ω.
- **Pull-in (pick-up) and drop-out** voltage or current, when the maker gives
  them. ModEL's exercise relay: 24 V coil, pick-up 22 V, drop-out 10.5 V.
- **Contact rating**: the volts the open contacts must stand and the amps the
  closed contacts may carry (ModEL). **The DC rating is far lower than the AC
  one.** One relay in ModEL is marked 12 A at 120 or 240 V AC but 12 A at only
  28 V DC. AC current passes through zero 100 or 120 times a second and the
  arc goes out; a DC arc does not (ModEL, *Lessons in Electric Circuits*,
  Elliott, TE). Elliott's rule of thumb: about 30 V DC is the most for the
  full rated current.
- **The printed rating is for a plain resistive load.** A cold lamp filament
  takes about ten times its running current (Wikipedia; Electronics Notes
  says ten to fifteen; Elliott says cold resistance is 7 to 10% of hot). TE's
  example: a 40 W, 120 V lamp runs at 0.33 A but can take 6 A at switch-on,
  and 2 A contacts fail early. Recomputed: 40 ÷ 120 = 0.33 A; hot resistance
  360 Ω; 6 A implies 20 Ω cold, a ratio of 18, at the high end of the other
  sources. Motors take about six times at starting (TE).
- **Contacts by name.** NO (normally open, "make", Form A), NC (normally
  closed, "break", Form B), and COM. A changeover set with all three is
  Form C, or SPDT. Poles count the moving contacts, throws count the fixed
  ones each can touch (ModEL, *Lessons in Electric Circuits*,
  Electronics-Tutorials). "Normal" means **at rest, coil off, as the relay
  sits on a shelf**. It does not mean "usual".
- **Pin diagrams** are printed on the case, in differing styles; plug-in
  "ice cube" relays have 8 or 11 pins (ModEL, Kuphaldt).
- **Car relays** number their terminals to DIN 72552: 85 and 86 the coil, 30
  the common fed from the battery, 87 normally open, 87a normally closed
  (Wikipedia, Blair).
- **Life.** Contacts are rated for about 100,000 operations at full load;
  the mechanism alone lasts 10 million or more (TE, Electronics Notes).
  Wikipedia gives 10,000 to 100,000 against more than 20 million. A lighter
  load lengthens contact life. TE's example: over 100,000 operations at
  25 A, over a million at 5 A.

### How they teach it (only what `RESEARCH.md` lacks)

- **Solenoid first, then relay.** *Lessons in Electric Circuits* introduces a
  coil pulling an armature, then says a relay is one that works a switch.
- **Let the learner ask what a relay is for.** Kuphaldt's teaching note says a
  learner will object that a switch, a battery and a lamp do the same job, and
  that the teacher should not answer for them.
- **The commonest beginner mistake**, per ModEL: expecting the relay to
  **supply** power to the load. A relay is only a switch. Its contacts must
  be wired into a loop that has its own source. ModEL sets a "find the
  mistake" question on exactly this.
- **The second**: reading "normally" as "usually" (ModEL, *Lessons in
  Electric Circuits*).
- **Read the case.** ModEL photographs three makes of the same relay and has
  the learner sort coil rating from contact rating and read the pin diagram.
  Kuphaldt asks students to bring a relay and list coil voltage, coil
  resistance, poles, throws and contact ratings, then work out the coil
  current.
- **A nice picture, though not DC**: on a scope, the coil current rises as an
  ordinary coil's does but with a dip half-way up. The dip is the armature
  moving: the field does work on it. Hold the armature shut by hand and the
  dip is gone (ModEL).

### Faulty or working

**What fails, and why**

- **The contacts are the part that wears.** The life figures above say so:
  contacts last a hundredth or a thousandth as long as the mechanism. No
  loaded page gives a count of coil failures against contact failures, so
  "contacts fail far more often than coils" is an inference from those
  figures.
- **Burnt or pitted contacts.** Each opening draws an arc. Metal melts and
  moves from one contact to the other, leaving a pit on one and a pip on the
  other; contact resistance rises (TE, Electronics-Tutorials, Electronics
  Notes, Elliott). Worst with DC, with coils and motors as loads, and with
  lamp inrush.
- **Welded contacts.** A heavy inrush or a bad arc melts the faces together.
  The spring often breaks a light weld; repeated welding ends in a contact
  that stays shut (Elliott, Electronics-Tutorials, Wikipedia). The load can
  no longer be turned off.
- **Filmed or dirty contacts.** Silver tarnishes into a film that insulates.
  A little arcing cleans it off, so contacts used *below* a minimum
  ("wetting") current go high-resistance and fail early. Low-current signal
  contacts are gold for this reason (*Lessons in Electric Circuits*, TE).
  A relay left unused for years can fail this way.
- **Sticking.** Goldwasser gives contacts that stick or are dirty as the
  television relay fault to expect: the set switches on and off erratically,
  or only part of it comes on. Reed contacts can magnetise and stick
  (Wikipedia).
- **Open coil.** The fine wire breaks or burns out; the coil reads infinite
  (Blair). **Shorted coil** reads near 0 Ω (Blair).
- **Not the relay at all.** No voltage reaching the coil, or a bad earth
  return, is a wiring or driver fault (Blair, Goldwasser).

**(a) In circuit, with a voltmeter**

| What is wrong | Across the coil, when commanded on | Across the contacts that should be closed | The load |
|---|---|---|---|
| Nothing | Rated coil voltage | About 0 V | Works |
| Nothing is driving the coil | 0 V | Full load supply | Dead. Look upstream of the relay |
| Open coil | Rated voltage, **no click**, no coil current | Full load supply | Dead |
| Armature stuck | Rated voltage, no click | Full load supply | Dead. A tap may free it (Goldwasser) |
| Contacts burnt, pitted or filmed | Rated voltage, click heard | **Some volts** where there should be none: from a volt or two up to the full supply | Dim, weak or dead |
| Contacts welded | 0 V (commanded off) | 0 V | **Stays on** |
| Coil voltage too low to pull in (a poor connection in the coil loop) | Present but below pick-up | Full load supply | Dead. This is the loaded divider again |

- The first two rows and the welded row are stated by Goldwasser and Blair.
  Goldwasser's television version: across the mains contacts, 110 to 125 V AC
  with the set off, 0 V with the set on and working; if the set is on but
  dead and the contacts still show mains, the relay has not pulled in, so
  measure the coil voltage next. Blair's car version: terminal 30 should have
  12 V always, terminal 87 only when energised; 12 V on both with the circuit
  off means welded contacts.
- The burnt-contact row is from Electronics-Tutorials: 0.2 Ω of contact
  resistance carrying 10 A loses 2 V, so a 12 V load gets 10 V. Its
  arithmetic holds the current at 10 A. Recomputed for a real load (1.2 Ω,
  which takes 10 A from 12 V): with 0.2 Ω in the contact the current is
  8.57 A, the contact drops 1.71 V and the load gets 10.29 V. With 1 Ω the
  current is 5.45 A, the contact drops 5.45 V and wastes 29.8 W, and the load
  gets 6.55 V.
- **A click proves only that the armature moved**, not that the contacts
  closed (Blair).
- The stuck-armature and low-coil-voltage rows are **derived**.

**(b) Out of circuit, with an ohmmeter**

1. **Coil**: its two pins should read the coil's resistance, tens to hundreds
   of ohms (about 100 Ω for a car relay, Blair). Infinite is an open coil;
   near zero is a shorted one.
2. **Contacts at rest**: COM to NC reads continuity, COM to NO reads open.
3. **Contacts energised** (rated voltage on the coil, from a bench supply):
   the two swap. If NO stays open or NC stays shut, replace it (Blair).
4. **Welded**: NO reads 0 Ω with the coil dead (Blair).

**Limits of those tests**

- **An ohmmeter cannot measure a good contact, and may fail a good one.**
  Elliott read more than 0.6 Ω across a contact on an ohmmeter; the same
  contact carrying 1 A measured about 12 mΩ, and at 10 A about 6 mΩ. A
  meter's tiny test current does not break the surface film. So
  "continuity" does not prove the contact will carry its load, and "a bit
  high" does not prove it will not. **The real test is under load: volts
  across the closed contacts while the load current flows.**
- A relay with a diode inside reads its coil resistance one way round and
  lower the other. **Derived.**
- In circuit, other parts across the coil upset the reading: take it out
  (stated in a search result, page not loaded: **Unverified**).

**Safety**

- A television's power relay switches the mains. Goldwasser warns that this
  is more dangerous than the tube's high voltage. Unplug before putting an
  ohmmeter on it; read mains voltages only with a meter and method fit for
  mains.
- A coil without its diode kicks. The kick can destroy a transistor driving
  it at the first switch-off (ModEL), and it burns a switch's contacts.

**Common beginner mistakes**

- No diode across a DC coil driven by a transistor, or the diode in
  backwards. Backwards, it conducts whenever the coil is on and shorts the
  supply. (**Derived** for DC; ModEL makes the same point about AC.)
- Wiring the lamp to the contacts with no source in that loop (ModEL).
- Reading NO and NC from the wrong state.
- Using the AC contact rating on a DC load; ignoring lamp or motor inrush.
- Paralleling contacts to double the rating. They never close together, so
  one takes it all (TE, Electronics-Tutorials).

### Exercises found

Kuphaldt's may be adapted with credit. All answers recomputed.

1. **Read the case.** Kuphaldt, relay1 Q10; ModEL §3.5. Given a relay's
   markings, say which is the coil rating and which the contact rating, then
   find the coil current from its resistance. *With ModEL's numbers: 24 V
   across 650 Ω is 36.9 mA.*
2. **Find the mistake.** ModEL §6.3.2. A learner wires a push-button, a
   battery and a relay coil correctly, then joins the lamp to the contacts
   and nothing else. Why does the lamp stay dark? *There is no source in the
   lamp's loop. The relay is a switch, not a supply.* (Drawing not seen; the
   module's own introduction says this is the mistake.)
3. **The dead set.** From Goldwasser. A remote-control set will not come on.
   Across the relay's contacts the meter shows the full supply although the
   set is commanded on. What next? *Measure the coil. If its voltage is
   present, the relay is at fault: open coil, stuck armature, or contacts
   not making. If absent, the fault is in whatever drives the coil.* A
   second reading sorts the first.
4. **The dim headlamp.** From Electronics-Tutorials, recomputed. A 12 V lamp
   that should take 10 A is dim. The relay clicks. The meter shows 5.45 V
   across the closed contacts. What is the contact's resistance, and how
   much heat does it make? *The lamp has 6.55 V, so 5.45 A flows; the
   contact is 1 Ω and wastes 29.8 W.* A direct use of №0004 and №0009.
5. **It will not switch off.** From Blair. With the coil dead, both sides of
   the contact are at 12 V and the load runs. *Welded contacts.* 0 V across
   a switch that should be open.
6. **Coil open, coil shorted.** ModEL §6.1.5 (a challenge on a circuit with a
   1 A fuse and 24 V; drawing not seen). What happens to the lamps if the
   coil fails open? If it fails shorted? *Open: the relay never pulls in, so
   the normally closed lamp stays lit and the normally open one never
   lights. Shorted: closing the control switches blows the fuse.* My
   answers; ModEL publishes none.
7. **Pull-in and drop-out.** Kuphaldt, relay1 Q9. Design a test that finds
   both. *A variable supply, or a variable resistor in series with the coil,
   and a meter: raise until it clicks in, lower until it drops out.* The
   second number is the smaller. (My answer; he leaves the design to the
   student.)
8. **A delay from a capacitor.** ModEL §6.2.4. 2700 µF, a 650 Ω coil, 24 V,
   drop-out at 10.5 V. How long does the relay hold after the switch opens?
   *Assuming the capacitor sits straight across the coil (drawing not seen):
   the time constant is 1.755 s and the voltage falls from 24 V to 10.5 V in
   1.755 × ln(24 ÷ 10.5) = 1.45 s.* ModEL publishes no answer. This is №0012
   with a relay as the thing that notices.
9. **The resistor's wattage.** Kuphaldt's teaching note to relay1 Q8, the
   question already in `RESEARCH.md` (950 Ω). He says most students forget
   the power. *19 V × 20 mA = 0.38 W, so a ½ W part at least.*
10. **Why the diode makes it slow.** ModEL §6.1.7, and its challenge: reduce
    the delay without giving up the protection. *A resistor (or a zener) in
    series with the diode lets the coil voltage rise higher, so the current
    dies sooner, at the price of a bigger kick across the switch* (*Lessons
    in Electric Circuits*, TE). `RESEARCH.md` has the lamp-across-the-coil
    form of this already.

### Build the lesson round

- **Two loops and three readings.** A coil loop (push-button, 12 V, coil) and
  a contact loop (its own supply, lamp, NO contact). The one idea: *coil
  volts say whether the relay was told; volts across the contacts say
  whether it obeyed.* Then give the bench a dead lamp and let those two
  readings sort "not driven", "open coil" and "contacts not making".
- **The burnt contact as a resistor.** The lamp is dim; the contact that
  should read 0 V reads volts. It ties the relay straight back to the series
  circuit and the loaded divider, and needs no new rule.
- **Welded.** The lamp will not go out. 0 V across an open switch.
- **Out on the bench.** Coil resistance; continuity NC then NO; energise and
  watch them swap. Close on the limit: the ohmmeter said "fine" but under
  load the contact loses 2 V.
- **Shop framing for 1984**: the remote-control set whose only relay is the
  one that switches its mains. Keep the lesson's own circuit at low-voltage
  DC and leave the mains in the story.

---

## 2. The bipolar transistor as a switch

### Sources

| Page | Licence, as stated |
|---|---|
| Kuphaldt, worksheet "Bipolar junction transistor theory", [bjt0.pdf](https://www.ibiblio.org/kuphaldt/socratic/output/bjt0.pdf) | CC BY 1.0 |
| Kuphaldt, worksheet "Bipolar junction transistors as switches", [bjt.pdf](https://www.ibiblio.org/kuphaldt/socratic/output/bjt.pdf) (already in `RESEARCH.md`; re-read for its fault questions) | CC BY 1.0 |
| Kuphaldt, ModEL "Transistor Switching Circuits", [mod_qswitch.pdf](https://www.ibiblio.org/kuphaldt/socratic/model/mod_qswitch.pdf) | CC BY 4.0 |
| *Lessons in Electric Circuits*, [Introduction to BJTs](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/bipolar-junction-transistors-bjt/) | Design Science License |
| same, [Meter check of a transistor (BJT)](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/meter-check-transistor-bjt/) | Design Science License |
| same, [Transistor ratings and packages (BJT)](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/transistor-ratings-packages-bjt/) | Design Science License |
| same, [BJT quirks](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/bjt-quirks/) | Design Science License |
| Electronics-Tutorials, [Transistor as a switch](https://www.electronics-tutorials.ws/transistor/tran_4.html) | All rights reserved (AspenCore) |
| Electronics Notes, [Transistor circuit fault finding](https://www.electronics-notes.com/articles/test-methods/meters/transistor-circuit-fault-finding.php) and [Testing a transistor and a diode with a multimeter](https://www.electronics-notes.com/articles/test-methods/meters/multimeter-diode-transistor-test.php) | © electronics-notes.com, none stated |
| Learnabout Electronics (E. Coates), module 7: [7.1 Why transistors fail](https://www.learnabout-electronics.org/Semiconductors/tansistor_faults_01.php), [7.2 Meters](https://learnabout-electronics.org/Semiconductors/transistor_faults_02.php), [7.3 Testing transistors](https://learnabout-electronics.org/Semiconductors/transistor_faults_03.php) | © Eric Coates, all rights reserved |
| US Navy NEETS Module 7, on tpub.com: [Transistor testing (lead identification)](https://electriciantraining.tpub.com/14179/css/Transistor-Testing-93.htm), [Testing with an ohmmeter](https://electriciantraining.tpub.com/14179/css/Testing-Transistors-With-An-Ohmmeter-94.htm), [Junction resistance test](https://electriciantraining.tpub.com/14179/css/Transistor-Junction-Resistance-Test-95.htm), [Table 2-2](https://electriciantraining.tpub.com/14179/css/Table-2-2-Possible-Transistor-Problems-From-Ohmmeter-Readings-96.htm) | The host claims © Integrated Publishing. The Navy text's own status is not stated on the page |
| US Navy NEETS Module 21, on tpub.com: [Transistor testing](https://electriciantraining.tpub.com/14193/css/Transistor-Testing-49.htm) | as above |
| S. Goldwasser, [Basic testing of semiconductor devices](https://www.repairfaq.org/sam/semitest.htm) | © S. Goldwasser. May be reproduced with the notice, at no charge |
| S. Goldwasser, TV FAQ: [Brief comments on testing the HOT](https://www.repairfaq.org/samnew/tvfaq/tvbcthot.htm), [Shorted components](https://www.repairfaq.org/samnew/tvfaq/tvshortc.htm), [An interesting TV switch-mode supply](https://www.repairfaq.org/samnew/tvfaq/tvitvsmps.htm) | as above |
| Analog Devices university wiki, [BJT device as a switch](https://wiki.analog.com/university/courses/eps/bjt-switch) | None stated |
| D. Herres, Test & Measurement Tips, [Testing transistors with a voltmeter](https://www.testandmeasurementtips.com/testing-transistors-with-a-voltmeter-faq/) | © Arrowfly, all rights reserved |
| Wikipedia: [BC108 family](https://en.wikipedia.org/wiki/BC108_family), [BC548](https://en.wikipedia.org/wiki/BC548), [2N2222](https://en.wikipedia.org/wiki/2N2222), [2N3055](https://en.wikipedia.org/wiki/2N3055), [Safe operating area](https://en.wikipedia.org/wiki/Safe_operating_area) | CC BY-SA 4.0 |

### How it works

- **Three layers, two junctions.** A sandwich of N, P, N (or P, N, P), with a
  lead on each: emitter, base, collector. The base is the thin middle layer
  (*Lessons in Electric Circuits*, ModEL).
- **A small current controls a large one.** A small current from base to
  emitter lets a much larger current run from collector to emitter. Both
  leave by the emitter, so emitter current = collector current + base
  current (*Lessons in Electric Circuits*; Kuphaldt writes
  I<sub>E</sub> > I<sub>C</sub> >> I<sub>B</sub>). No base current, no
  collector current: an open switch.
- **The control is one-way.** Stop the base current and the collector current
  stops. Stop the collector current and the base current carries on
  (Kuphaldt, bjt Q3; in his circuit it even rises). He names them the
  *controlling* and the *controlled* current, and ModEL draws them as a thin
  arrow and a thick one.
- **The base–emitter junction is a diode.** Conducting, it has about 0.7 V
  across it whatever the current (ModEL). That is why a resistor must set
  the base current: wire the base to the supply and nothing limits it.
- **Gain is a ceiling, not a promise.** The gain (β, or h<sub>FE</sub>) is the
  most collector current the transistor will pass per unit of base current.
  If the load and the supply allow less, less flows (ModEL lists this among
  the ideas most often got wrong). It also varies widely from part to part
  and with current (*Lessons in Electric Circuits*: 15 to 150 for one type).
- **Saturation is the pedal on the floor.** Give the base more current than
  the load needs and the transistor stops limiting. Collector to emitter
  falls to a few tenths of a volt and the load gets nearly everything
  (ModEL: 0.3 V as the usual figure; a simulated case in ModEL gives 0.175 V;
  Wikipedia quotes at most 0.2 V, typically 0.07 V, for a BC108 at 10 mA;
  Analog Devices says 0.2 to 0.4 V).
- **Why collector current hardly depends on collector voltage**: Kuphaldt's
  picture is a person tossing flower petals into a breeze. How many drift
  away depends on how fast they are tossed (base current), not on how hard
  the wind blows (collector voltage).

### What it is for, and where it is found

- **Switching a lamp, an LED, a relay coil or a small motor from a signal too
  weak to do it.** A logic output cannot light a 12 V lamp; a transistor
  between them can (Electronics-Tutorials, Analog Devices). CMU's lab drives
  the relay from a transistor and not from the output pin, because the coil
  wants more than the pin's 20 mA.
- **Sparing a delicate switch.** Kuphaldt's questions use a push-button rated
  for very little current, a light-dependent resistor, even a fingertip, to
  command a motor or a lamp.
- **In the car of the period: electronic ignition.** The contact-breaker
  points wore because they made and broke the coil's whole current.
  A transistor took over the current, with the points (later a magnetic
  pick-up) only switching the transistor (Kuphaldt, bjt Q12 to Q15).
- **In the television of the period.** The horizontal output transistor is a
  switch, rated up to about 1000 V (*Lessons in Electric Circuits*). It and
  the chopper transistor of a switch-mode supply are the two parts that
  short and blow the fuse (Goldwasser). ModEL adds the origin of the word
  "flyback" for the diode across a coil: the line-scan circuit of a CRT set,
  running at 15.75 kHz. The transistor that drives the mains relay
  (Goldwasser) is exactly this lesson's circuit.
- **Logic.** Inside a 7404 inverter the transistors are only ever fully on
  or fully off (Kuphaldt, bjt Q31).
- **Today.** Still the cheap way to switch tens of milliamps. Above that the
  MOSFET has taken over (section 3).

### Ratings and markings

**Part numbers of the period** (all from Wikipedia unless marked)

| Type | Case | Most it stands, collector to emitter | Most collector current | Power | Gain | Notes |
|---|---|---|---|---|---|---|
| BC108 (BC107, BC109) | TO-18 metal can | 20 V (BC107: 45 V) | 100 mA (200 mA peak) | 300 mW | Suffix A, B, C from low to high | Philips and Mullard, introduced 1966. The everyday small NPN of European sets and magazines. PNP partner: BC178 |
| BC548 (BC547, BC549) | TO-92 plastic | 30 V (BC547: 45 V) | 100 mA | 500 mW (some makers 625 mW) | A: 110–220; B: 200–450; C: 420–800, at 2 mA | The BC108 in plastic. PNP partners: BC557, BC558 |
| 2N2222 (2N2222A) | TO-18 metal can; PN2222 in plastic | 40 V | 600 mA | 500 mW | At least 100 at its best current | Motorola, 1962. The everyday American small switch. PNP partner: 2N2907 |
| 2N3055 | TO-3 metal | 60 V | 15 A | 115 W with the case held at 25 °C | **Only 20 to 70, at 4 A** | RCA, early 1960s. Power supplies and audio output stages. PNP partner: MJ2955 |

- **The 2N3055's gain is the teaching point.** At 4 A it may need 200 mA into
  the base (4 A ÷ 20). A power transistor needs a driver, which is why two
  transistors are so often found in a row (the Darlington pair, Kuphaldt and
  Electronics-Tutorials).
- **Leads.** On a TO-18 can the emitter is the lead nearest the tab; seen
  from below and going clockwise from the tab: emitter, base, collector
  (Wikipedia; NEETS). On TO-3 and on TO-220 the metal case or tab is the
  collector (*Lessons in Electric Circuits*, NEETS), so a mica washer goes
  between it and an earthed heat sink. A BC548's leads run collector, base,
  emitter (Wikipedia; which way round the flat faces was not confirmed).
- **Never trust the lead order.** The same type in another case, or from
  another maker, may differ: the P2N2222 has emitter and collector swapped
  against the metal 2N2222, and the BC108's plastic descendants came in at
  least three lead orders (Wikipedia). *Lessons in Electric Circuits* says
  the base is not always the middle lead, and that only the data sheet or
  the meter can be trusted.
- **Other limits that matter in a switch** (*Lessons in Electric Circuits*):
  the voltage it must stand when off (the full supply, plus any coil kick);
  the collector current, which assumes it is saturated; the power, which is
  volts across it × current through it, and so is small when fully on or
  fully off and large in between; the reverse base–emitter voltage, only
  about 7 V on small types.
- **Cases and heat**: TO-92, a few hundred milliwatts; TO-18 and TO-39 cans,
  several hundred; a TO-220 about 1 W in free air and far more on a heat
  sink (*Lessons in Electric Circuits*).

### How they teach it (only what `RESEARCH.md` lacks)

- **Start from the conditions for conduction.** Kuphaldt calls "what exactly
  must be done to turn it on?" the most important question in the topic:
  the base–emitter junction forward biased, and the collector supply the
  right way round.
- **Sourcing and sinking; high side and low side.** ModEL puts the same NPN
  either below the load (emitter to ground, needs a base resistor, can
  saturate, 0.3 V lost) or above it (collector to supply, load in the
  emitter, needs no base resistor, cannot saturate, 0.7 V lost). A first
  lesson wants only the low-side one, but this explains why.
- **A design recipe** (ModEL): pretend the transistor is a dead short and
  find the load current; divide by the *lowest* gain on the data sheet for
  the least base current; choose more than that but less than the base's
  maximum; then work out the heat from 0.3 V × the load current.
- **How to tell saturated from merely on, on the bench**: measure collector
  to emitter with the load running. Negligible means saturated (ModEL).
- **The sand picture for saturation** (ModEL): a rocky plateau with no sand
  is a semiconductor with no carriers. Trickle sand on and the amount that
  blows across depends on the trickle, not the wind. Dump sand on and it is a
  desert: now the wind (the supply and the load) decides.
- **Misconceptions the sources name**: gain as a fixed multiplier (ModEL);
  two diodes back to back make a transistor (they read the same on a meter
  but do nothing: Kuphaldt, *Lessons in Electric Circuits*, Electronics
  Notes); a resistor *somewhere* in the circuit protects the base
  (Kuphaldt's trick circuit, bjt Q10 no. 3); new rules replace Ohm and
  Kirchhoff (ModEL: they do not, the transistor adds only a few facts).

### Faulty or working

**What fails, and why**

- **A transistor usually fails completely**: a junction goes short (near 0 Ω)
  or open (infinite). "Leaky" (resistance a little low) is rare and soon
  turns into a short (Learnabout Electronics; NEETS Table 2-2; Electronics
  Notes says most failures are catastrophic, so simple checks catch them).
- **The collector–emitter short is the one to know.** NEETS Module 21 warns
  that a transistor can be shorted from collector to emitter while both
  junctions still test normal, so all three pairs must be measured.
  Electronics Notes describes the same thing as a base punched right
  through. Goldwasser names the horizontal output transistor and the
  chopper as the parts that short and take the fuse. In a power transistor
  the route to it is second breakdown: current crowds into a hot spot and
  melts a bridge from collector to emitter (Wikipedia). That the C–E short
  is the *commonest* failure of all is **Unverified**: no loaded page ranks
  the modes.
- **Where**: power supplies and output stages first, because that is where
  the heat and the voltage are (Learnabout Electronics, Goldwasser).
- **Why**: heat above all (*Lessons in Electric Circuits*, NEETS); too much
  base current through a missing or bridged base resistor (Kuphaldt); the
  kick from an unclamped coil, enough to kill at the first switch-off
  (ModEL); a load that draws too much; being left half on, where the heat is
  greatest (*Lessons in Electric Circuits*, ModEL).
- **Look for the cause.** After changing a dead transistor, read the voltages
  round it: another part has often drifted and killed it, and will kill the
  new one (Learnabout Electronics).

**(a) In circuit, with a voltmeter**

For an NPN below its load (emitter to ground, lamp from collector to supply,
base fed through a resistor). A working switch, from Electronics Notes: **on,
collector near 0 V and base about 0.6 V; off, collector near the supply and
base at 0 V.**

| What is wrong | Base to emitter, driven | Collector to emitter, driven | Collector to emitter, not driven | The lamp |
|---|---|---|---|---|
| Nothing | 0.6–0.7 V | 0.1–0.3 V | Full supply | Follows the signal |
| No drive is arriving (open base resistor, dead signal) | 0 V | Full supply | Full supply | Never lights |
| Collector–emitter short | 0.6–0.7 V | About 0 V | **About 0 V** | **Always lit** |
| Open inside, collector side | 0.6–0.7 V (the junction still works) | Full supply | Full supply | Never lights |
| Base–emitter junction open | **Well above 0.7 V**, up to the full drive voltage | Full supply | Full supply | Never lights |
| Base–emitter junction shorted | **About 0 V**, although drive is present at the far end of the resistor | Full supply | Full supply | Never lights |
| Starved of base current (resistor too large, low gain) | 0.6–0.7 V | **Several volts**: neither on nor off | Full supply | Dim, and the transistor is hot |
| Lamp open | 0.6–0.7 V | About 0 V | About 0 V on a meter | Never lights |

- Rows 1 and 2 are stated (Electronics Notes; Kuphaldt, bjt Q18).
- Rows 3 and 4 follow Kuphaldt's ignition questions (bjt Q32, Q33): the
  collector stuck at the supply means the transistor is open or is not being
  driven; the collector stuck at 0 V means it is shorted.
- The base rows are **derived** from one fact: a working junction pins the
  base at about 0.7 V and the resistor drops the rest. If the base reads 0 V
  or reads far above 0.7 V while drive is present, the junction is gone.
- The starved row is from ModEL: 15 V, a 1 kΩ load, gain 30. Through 100 kΩ
  the base gets 143 µA, the collector passes only 4.29 mA, and 10.71 V stays
  across the transistor. Through 1 kΩ the base gets 14.3 mA, the collector
  passes 14.7 mA and 0.3 V stays (recomputed).
- The lamp-open row is **derived** from Kuphaldt's bjt0 Q17 (collector
  circuit open: base current unchanged, collector current stops). It is the
  one fault where "about 0 V across the transistor" does not mean the lamp
  is lit, so read the lamp's own voltage too: the full supply sits across
  the break.

**(b) Out of circuit, with a meter on diode test**

- **Six readings, and only two may conduct.** A transistor reads as two
  diodes sharing the base. Try each pair of leads both ways round. A good
  one conducts in exactly two of the six (*Lessons in Electric Circuits*,
  Goldwasser).
- **The lead common to both is the base.** If it conducts with the **red**
  (positive) lead on the base, the base is P and the transistor is **NPN**;
  with the black lead on the base, **PNP** (*Lessons in Electric Circuits*,
  Kuphaldt, Learnabout Electronics).
- **Readings**: 0.45 to 0.9 V on each junction on a digital meter's diode
  range (Goldwasser); *Lessons in Electric Circuits* shows 0.655 V and
  0.621 V on a real one. On an ohms range, a few hundred ohms to a kilohm
  forward and infinite reverse (Learnabout Electronics); the navy asks for a
  reverse-to-forward ratio of at least 30 to 1, with 100 to 1 common
  (NEETS).
- **Emitter from collector**: the base–emitter junction reads slightly
  higher than base–collector, because the emitter is more heavily doped
  (*Lessons in Electric Circuits*, Kuphaldt). **Limit**: the difference can
  be 1 or 2 mV. Goldwasser's table gives 0.715 against 0.716 V for a BC108
  and 0.640 against 0.642 V for a TIP3055. A warm hand shifts the reading
  more than that, at about 2 mV per degree.
- **Then collector to emitter, both ways: open both times.** This is the
  check that catches the short the junction tests miss (NEETS Module 21,
  Electronics Notes, Learnabout Electronics).
- **Verdicts** (NEETS Table 2-2): low both ways and dead short, *shorted*;
  low both ways but not a dead short, *leaky*; high both ways across a
  junction, *open*.

**Limits of those tests**

- They prove the junctions, not the gain. A transistor can pass and still be
  a poor switch (*Lessons in Electric Circuits*, Electronics Notes).
- **In circuit, other parts lie.** With a line output transistor still on the
  board, base to emitter reads near zero through the driver transformer
  (Goldwasser). Take it out, or lift two leads.
- **Power transistors can have parts built in.** A damper diode from emitter
  to collector conducts one way; a resistor of about 50 Ω from base to
  emitter reads nearly 0 V on diode test. Neither is a fault. Under about
  10 Ω is suspect (Goldwasser); he passes a line output transistor if no
  pair reads below about 50 Ω.
- **A Darlington** reads 1.2 to 1.4 V from base to emitter, or open on a
  meter that cannot supply that (Goldwasser).
- **An analogue meter's leads are often reversed on ohms**: red is negative
  (Kuphaldt's note, Learnabout Electronics, Goldwasser). Check on a known
  diode first, or NPN will be called PNP. For a 1984 bench with a
  moving-coil meter this is not a footnote.
- **An analogue meter's lowest ohms range can pass enough current to damage
  a small transistor.** Use the next range up (NEETS: avoid R×1; Goldwasser).
- Touching the two probes together reads 0 Ω and looks like a short
  (Learnabout Electronics).

**Safety**

- Power off, and the big capacitors discharged, before an ohmmeter goes near
  a set or a transistor is pulled (Goldwasser, NEETS).
- In a mains television the chopper and line output stages are connected to
  the mains: an isolating transformer, and no probing live by a beginner
  (Goldwasser, Electronics Notes).
- Goldwasser's shop trick after fitting a new power transistor: a lamp bulb
  in series with the mains (100 W for a small set). If the bulb stays at
  full brightness there is still a short, and the bulb has saved the new
  transistor.

**Common beginner mistakes**

- **No base resistor**, or one that is bridged by solder. All three currents
  soar and the transistor fails within a use or two (Kuphaldt, bjt Q10 and
  bjt0 Q17).
- **Base resistor too large.** The switch is half on, the lamp is dim and the
  transistor cooks (ModEL).
- **Sizing the resistor from the typical gain** instead of the lowest, then
  not rounding down (ModEL; `RESEARCH.md` has the rounding).
- **No diode across a relay or motor load** (Kuphaldt, ModEL,
  Electronics-Tutorials).
- **Emitter and collector swapped**, or the wrong type (NPN for PNP): the
  load stays dead (Kuphaldt, bjt Q7 to Q9, Q16, Q17).
- **Load put in the emitter lead** when full brightness was wanted. It then
  sits in the base current's path as well and the transistor cannot saturate
  (Kuphaldt's note to bjt Q11; ModEL).
- **Assuming the middle lead is the base** (*Lessons in Electric Circuits*).

### Exercises found

Not repeated from `RESEARCH.md`: the 82 kΩ base resistor, the six lamp
circuits, and the 24 V lamp (but see the correction to that one at the top).
All answers recomputed.

1. **Which lead is the base?** Kuphaldt, bjt0 Q18. A continuity tester
   conducts only with its negative lead on pin 3 and its positive lead on
   pin 1, and again on pin 2. NPN or PNP, and which pins? *Pin 3 is the
   base. Current goes in at 1 and at 2 and out at 3, so the base is N: a
   PNP. Pins 1 and 2 are emitter and collector, and this test cannot say
   which.* (Checked.)
2. **Which is the emitter?** *Lessons in Electric Circuits*, meter check;
   Kuphaldt, bjt0 Q19 to Q21. On diode test: red on 1, black on 3 reads
   0.655 V; red on 2, black on 3 reads 0.621 V; the other four read open.
   *Lead 3 is the base, with the black lead on it both times: PNP. Lead 1,
   with the higher reading, is the emitter.* (Checked.) A follow-up worth
   adding from Goldwasser's table: on a BC108 the two readings differ by
   1 mV. Can you tell?
3. **Two diodes are not a transistor.** Kuphaldt, bjt0 Q13. A student wires
   two 1N4001s back to back. The meter reads them just like a transistor.
   Why will it not switch a lamp? *The two junctions must share one thin
   base, so that carriers sent in by the emitter cross it and reach the
   collector. A wire between two diodes does not do that.* No band theory
   needed for that much.
4. **Four faults, three currents.** Kuphaldt, bjt0 Q17. One transistor, a
   base resistor and a collector resistor. Say what the three currents do
   when: the base resistor goes open (*all three stop*); the collector
   resistor goes open (*base current unchanged, collector current stops,
   emitter current falls to equal the base current*); solder bridges the
   base resistor (*all three soar, and the transistor will probably
   overheat*); solder bridges the collector resistor (*base current
   unchanged, collector current a little higher at most, and the transistor
   now carries the whole supply and heats*). As voltages, **derived**: with
   the collector resistor open the meter still shows about 0.7 V at the base
   and about 0 V from collector to emitter, the full supply sitting across
   the break.
5. **The motor that will not start.** Kuphaldt, bjt Q18. A photocell should
   start a motor in the dark and does not. Collector to emitter: the full
   battery. Collector to base: the full battery. What is known? *Collector
   to emitter is collector to base plus base to emitter, so base to emitter
   is 0 V: the transistor is not being told to turn on. The battery and its
   wiring are good, and the motor is not open, or no voltage could reach the
   collector.* Three conclusions from two readings and Kirchhoff's loop
   rule.
6. **Stuck high or stuck low.** Kuphaldt, bjt Q32 and Q33. In an electronic
   ignition the supply is 12 V. In one car the transistor's collector reads
   12 V all the time; in another, 0 V all the time. Name two faults for
   each. *Stuck at 12 V: transistor open, or its trigger coil open so it is
   never driven. Stuck at 0 V: transistor shorted collector to emitter, or
   the capacitor across it shorted.* The battery and the ignition switch are
   cleared in both. (Drawing not seen: his test point TP2 is taken to be the
   transistor's end of the ignition coil.)
7. **Every drop in the loop.** Kuphaldt, bjt Q4. 15 V; 0.7 V base to emitter;
   0.3 V collector to emitter, saturated. *The lamp has 14.7 V, the base
   resistor 14.3 V, and base to collector 0.4 V. For 10 mA of base current
   the resistor is 14.3 ÷ 0.01 = 1.43 kΩ.*
8. **Enough drive, and none to spare.** ModEL §2.1. Gain 25; 30 V; a 10 Ω
   load; a 12 V control. *Load current (30 − 0.3) ÷ 10 = 2.97 A. Base
   current at least 2.97 ÷ 25 = 118.8 mA. The resistor must be below
   (12 − 0.7) ÷ 0.1188 = 95.1 Ω. Heat in the transistor: 0.3 × 2.97 +
   0.7 × 0.1188 = 0.97 W.*
9. **Starved: where the heat comes from.** After ModEL §7.2.5 (22 V, a 6 Ω
   load, gain 90, 470 Ω to the base; its simulation gives 0.175 V collector
   to emitter and 0.986 V at the base). *As built: base 44.7 mA, load
   3.64 A, heat 0.64 W.* Change the resistor to 1 kΩ: *base about 21 mA, so
   at most 1.9 A; the load gets 11.4 V; 10.6 V stays across the transistor,
   which now makes 20 W and will not last.* The second half is my extension;
   ModEL asks only for a prediction.
10. **Above the load or below it.** ModEL §2.1 against §2.2. The same
    transistor and load, wired above the load with base joined to collector
    by the switch. *The load gets 30 − 0.7 = 29.3 V at 2.93 A. Collector to
    emitter can never be less than 0.7 V, so the heat is 0.7 × 2.93 =
    2.05 W: twice the low-side figure, and no base resistor is needed.*
11. **A power transistor's appetite.** From the 2N3055 figures. Gain 20 at
    4 A. What base current, and can a logic output give it? *200 mA. No.
    Hence a driver transistor in front.* Kuphaldt's Darlington sum (bjt
    Q24: 19 V, gains 85 and 30, 150 Ω) checks: 44.0 µA in, 117.3 mA out.

### Build the lesson round

- **One lamp, one transistor, one resistor, three places for the meter.**
  Base, collector, and across the lamp. First show the two healthy states
  (0 V and the full supply; 0.7 V and 0.2 V). The single idea: *a healthy
  switch is always at one end or the other.*
- **Then break it four ways** and let the learner name each from two
  readings: shorted collector to emitter (lamp stuck on), open (lamp dead,
  base normal), base junction gone (base reads 0 V or far too high), not
  driven (base 0 V and nothing arriving at the resistor either).
- **The reading in the middle.** A base resistor ten times too big: several
  volts across the transistor and a dim lamp. This is the cheapest way to
  show why "fully on" matters, and it uses №0003 (power = volts × amps).
- **On the bench with the part out**: six readings, two conduct, find the
  base, name the type; then the collector-to-emitter check that catches the
  one fault the first six miss. If the shop's meter is the moving-coil kind,
  the reversed leads belong in the story.
- **Leave out** PNP, high-side switching, Darlingtons and speed. One NPN
  below one load is the whole job. A relay as the load, with its diode,
  makes the bridge from №0018.

---

## 3. The MOSFET as a switch

### Sources

| Page | Licence, as stated |
|---|---|
| Kuphaldt, worksheet "Insulated gate field-effect transistors", [igfet.pdf](https://www.ibiblio.org/kuphaldt/socratic/output/igfet.pdf); mirror with "reveal answer" buttons at [allaboutcircuits.com/worksheets/insulated-gate-field-effect-transistors/](https://www.allaboutcircuits.com/worksheets/insulated-gate-field-effect-transistors/) | CC BY 1.0 (PDF); "Creative Commons Attribution License" (mirror) |
| Kuphaldt, ModEL "Transistor Switching Circuits", [mod_qswitch.pdf](https://www.ibiblio.org/kuphaldt/socratic/model/mod_qswitch.pdf) | CC BY 4.0 |
| Kuphaldt, ModEL "Field-Effect Transistors", [mod_fet.pdf](https://www.ibiblio.org/kuphaldt/socratic/model/mod_fet.pdf) | CC BY 4.0 |
| Kuphaldt, worksheet "Static electricity", [static.pdf](https://www.ibiblio.org/kuphaldt/socratic/output/static.pdf) (read; it is about charge, and has nothing on damage to parts) | CC BY 1.0 |
| *Lessons in Electric Circuits*, [Insulated-gate field-effect transistors (MOSFET)](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-2/insulated-gate-field-effect-transistors-mosfet/), [Introduction to IGFETs](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-6/insulated-gate-field-effect-transistors-igfet/), [Depletion-type IGFETs](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-6/depletion-type-igfets/) | Design Science License |
| Electronics-Tutorials, [The MOSFET](https://www.electronics-tutorials.ws/transistor/tran_6.html) and [MOSFET as a switch](https://www.electronics-tutorials.ws/transistor/tran_7.html) | All rights reserved (AspenCore) |
| Electronics Notes, [MOSFET basics](https://www.electronics-notes.com/articles/electronic_components/fet-field-effect-transistor/mosfet-metal-oxide-semiconductor-basics.php) | © electronics-notes.com, none stated |
| Learnabout Electronics, module 4: [4.3 Enhancement MOSFET](https://learnabout-electronics.org/Semiconductors/fet_03.php), [4.5 Power MOSFETs](https://www.learnabout-electronics.org/Semiconductors/fet_05a.php), [4.6 MOSFET switches](https://www.learnabout-electronics.org/Semiconductors/fet_06a.php), [4.7 Quiz](https://www.learnabout-electronics.org/Semiconductors/fet_07.php); and [7.1](https://www.learnabout-electronics.org/Semiconductors/tansistor_faults_01.php), [7.3](https://learnabout-electronics.org/Semiconductors/transistor_faults_03.php) | © Eric Coates, all rights reserved |
| NJIT, ECE 294, [Lab 12: MOS and bipolar compared](https://ecelabs.njit.edu/ece294/lab12.php) | None stated |
| International Rectifier, AN-936, [The do's and don'ts of using MOS-gated transistors](https://www.infineon.com/dgdl/an-936.pdf?fileId=5546d462533600a401535591115e0f6d) | Maker's note, none stated |
| Texas Instruments, SLUA618A, [Fundamentals of MOSFET and IGBT gate driver circuits](https://www.ti.com/lit/ml/slua618a/slua618a.pdf) (introduction and section 2 read) | © Texas Instruments |
| Vishay, AN-910, [Power MOSFET failures in automotive applications](https://www.vishay.com/docs/69294/an910.pdf) | Maker's note |
| Vishay, [IRF510 data sheet](https://www.vishay.com/docs/91015/irf510.pdf) | Maker's data sheet |
| Toshiba, FAQ, [How do you protect MOSFETs from static electricity?](https://toshiba.semicon-storage.com/eu/semiconductor/knowledge/faq/mosfet/mos-is-sensitive-to-static-electricityhow-do-you-protect-mosfets.html) | © Toshiba |
| S. Goldwasser, [Basic testing of semiconductor devices](https://www.repairfaq.org/sam/semitest.htm) | © S. Goldwasser. May be reproduced with the notice, at no charge |
| D. Herres, [Testing transistors with a voltmeter](https://www.testandmeasurementtips.com/testing-transistors-with-a-voltmeter-faq/) | © Arrowfly |
| US Navy NEETS Module 21, on tpub.com, [MOSFET testing](https://electriciantraining.tpub.com/14193/css/Mosfet-Testing-65.htm) | See section 2 |
| Wikipedia: [Power MOSFET](https://en.wikipedia.org/wiki/Power_MOSFET), [2N7000](https://en.wikipedia.org/wiki/2N7000), [Safe operating area](https://en.wikipedia.org/wiki/Safe_operating_area) | CC BY-SA 4.0 |

### How it works

- **Three leads again: gate, drain, source.** They do the jobs of base,
  collector and emitter (NJIT has students pull the transistor out of a lamp
  circuit and put the MOSFET in lead for lead).
- **The gate touches nothing.** It is a metal plate laid on a film of glass
  (silicon dioxide), and the film insulates it from the silicon beneath.
  That is what "metal, oxide, semiconductor" means (Kuphaldt, ModEL,
  Learnabout Electronics). The film is about a ten-thousandth of a
  millimetre thick (Learnabout Electronics; ModEL says tens of nanometres,
  a tenth of a wavelength of light).
- **Voltage on the gate makes the path.** Between drain and source there is
  at first no path. Make the gate a few volts positive against the source
  and it draws electrons up under the film, where they form a thin
  conducting layer joining drain to source. Take the voltage away and the
  layer goes (Kuphaldt, igfet Q1; Learnabout Electronics; *Lessons in
  Electric Circuits*). This is the N-channel enhancement type: off until
  told on, like an NPN transistor, and by far the commonest (ModEL,
  Electronics-Tutorials).
- **Voltage, not current.** Because the gate is insulated, no steady current
  flows into it. A resistance of a million million ohms or more (Learnabout
  Electronics). The contrast to draw: the transistor's base needs a current
  all the time it is on; the MOSFET's gate needs only to be *held at* a
  voltage (ModEL, TI).
- **Threshold.** Below the threshold voltage the MOSFET is off; the path
  begins to form there. **The threshold is where it starts to conduct, not
  where it is on**: data sheets define it at a quarter of a milliamp (TI,
  Learnabout Electronics). An IRF510 begins at 2 to 4 V and is specified
  fully on at 10 V (data sheet). So the rule for a switch: well above the
  threshold, below the gate's maximum (ModEL, Learnabout Electronics).
- **The gate is a tiny capacitor.** Plate, insulator, silicon. It takes a
  brief gulp of current to charge and then holds its charge (*Lessons in
  Electric Circuits*, TI). An IRF510's is 180 pF (data sheet). **So a gate
  left unconnected stays where it was put**: the MOSFET turns on and will
  not turn off. A resistor from gate to source drains it (ModEL).
- **Fully on, it is a small resistor.** The data sheet's
  R<sub>DS(on)</sub>: 0.54 Ω for an IRF510, 17.5 mΩ for an IRFZ44N, a few
  milliohms for a modern part (data sheet, Learnabout Electronics). Volts
  across it = current × that resistance, and heat = current² × that
  resistance. Ohm's law and the power rule apply to it as to any resistor
  (TI, ModEL). A transistor, by contrast, loses a roughly fixed few tenths
  of a volt.
- **There is a diode in it whether wanted or not.** Between source and
  drain, pointing against the normal current. It does nothing in ordinary
  use, but reverse the supply and it conducts however the gate is set. The
  arrow in the symbol shows its direction (ModEL, Kuphaldt igfet Q18,
  AN-936).

### What it is for, and where it is found

- **The same job as the transistor switch**: a lamp, a motor, a relay coil,
  from a weak signal. A Learnabout Electronics page describes power MOSFETs
  as often replacing relays for DC loads.
- **Dates, for a 1984 shop.** The first vertical power MOSFET was Hitachi's
  in 1969. In 1974 Yamaha, JVC, Pioneer, Sony and Toshiba began making hi-fi
  amplifiers with power MOSFET output stages. Siliconix sold a V-groove
  type from 1975; International Rectifier's HEXFET came in 1978 (Wikipedia).
  TI dates power MOSFETs from the mid-1970s. So in 1984 the part is on the
  shop's shelf but new: it turns up in the output stage of a recent hi-fi
  amplifier and in some switch-mode supplies. The Hitachi type numbers used
  in those amplifiers, and how many 1984 television choppers were MOSFETs
  rather than bipolar: **Unverified**.
- **Switch-mode power supplies**, then and now: TI calls it the key part in
  fast, efficient switching.
- **Inside every chip.** Most transistors in integrated circuits are MOSFETs
  (*Lessons in Electric Circuits*, NJIT). CMOS logic, calculators, memories
  (Electronics-Tutorials).
- **Today**: the ordinary power switch below about 200 V; 53% of the power
  transistor market in 2010 against 9% for bipolar (Wikipedia). The standard
  way to work a heavy load from a microcontroller pin, with a "logic-level"
  type that is fully on at 4.5 or 5 V (ModEL, Learnabout Electronics).
- **Why it won** (ModEL, TI, Wikipedia): no steady drive current; lower loss
  when on; faster; and it shares current evenly in parallel, because its
  resistance *rises* as it warms (0.7 to 1% per degree, TI), where a hot
  bipolar transistor takes more current and runs away. One older source
  still says a bipolar transistor is the better choice at high current
  (Electronics-Tutorials); the others say the opposite.

### Ratings and markings

| Marking | Meaning | An IRF510, from its data sheet |
|---|---|---|
| V<sub>DS</sub> | The most it stands when off, drain to source | 100 V |
| V<sub>GS</sub> (max) | The most the gate film stands, either way | **±20 V** |
| V<sub>GS(th)</sub> | Threshold: where it begins to conduct | 2.0 to 4.0 V, at 0.25 mA |
| R<sub>DS(on)</sub> | Its resistance fully on, at a stated gate voltage | 0.54 Ω at 10 V on the gate |
| I<sub>D</sub> | Most drain current, with the case held cool | 5.6 A at 25 °C, 4.0 A at 100 °C |
| P<sub>D</sub> | Most heat, case held at 25 °C | 43 W |
| Gate leakage | Current into a healthy gate | At most 0.1 µA at 20 V |
| Input capacitance | The gate as a capacitor | 180 pF |
| Body diode | Forward voltage of the built-in diode | At most 2.5 V at 5.6 A |

- **Lead order of a TO-220 power MOSFET such as the IRF510: gate, drain,
  source**, and the metal tab is the drain (data sheet). A small 2N7000 in
  TO-92 runs source, gate, drain; the BS170, which looks the same, has
  source and drain exchanged (Wikipedia). As with transistors: look it up.
- **±20 V on the gate is typical** of discrete parts (ModEL, Wikipedia,
  Learnabout Electronics). Static from a hand runs to thousands of volts.
- **The headline current is not a working figure.** It assumes cooling no
  one has. Compare parts by on-resistance (AN-936, Learnabout Electronics).
- **On-resistance is quoted at a gate voltage.** 10 V for a standard part;
  4.5 or 5 V for a logic-level part. At less gate voltage it is higher.
- **Higher voltage rating costs on-resistance** (Wikipedia, TI). A P-channel
  part has about three times the resistance of an N-channel one the same
  size (Wikipedia), which is why N-channel is the default.
- **Other types met**: IRFZ44N (55 V, 17.5 mΩ) and IRF9520 (P-channel, 100 V,
  0.60 Ω, gate ±20 V) from Learnabout Electronics and ModEL. The 2N7000's
  threshold and on-resistance are not on the page I loaded: **Unverified**.
- **Symbol**: a gate line that does not touch the channel; a broken channel
  line for the off-until-told type; an arrow that shows which way the
  built-in diode points (ModEL, *Lessons in Electric Circuits*,
  Electronics-Tutorials).

### How they teach it

**Order**

- **Kuphaldt's worksheet**: a cross-section first, and "what happens when the
  gate is made positive?"; then what the letters MOS mean; then the two
  kinds, and how the symbol hints at which; then why the gate takes almost
  no current; then the question he calls the most important, *what exactly
  must be done to turn one on?*; then circuits to judge on or off; then why
  a designer would choose one over a transistor; the built-in diode; the
  meter check; static and the wrist strap; and only then switch circuits and
  faults.
- **ModEL** teaches both transistors as switches in one module, the bipolar
  first, and picks the enhancement MOSFET because it behaves most like the
  NPN. It says the same thing of each: something must put carriers where
  there were none. It then works the same lamp-and-switch example four
  ways.
- **NJIT's lab is the best model for a lesson.** Build the lamp switch with
  an NPN and measure the base current. Swap in the MOSFET, same circuit.
  Measure the gate current: none. Then pull the gate wire off, touch it
  with a finger, and watch the lamp come on by itself. Its stated moral:
  never leave a gate unconnected.
- **Electronics-Tutorials and Learnabout Electronics** go by device family:
  junction FET, then MOSFET in four varieties with a table of which is on
  at which gate polarity, then "as a switch" with a lamp, a motor and the
  on-resistance sum. Learnabout Electronics ends with a real build and
  measured temperatures.
- ***Lessons in Electric Circuits*** comes at it through the depletion type,
  which a beginner will not meet, and its page on the enhancement type is
  empty.

**Pictures**

- The cross-section with the gate as one plate of a capacitor, and the
  channel appearing under it (Kuphaldt, Learnabout Electronics).
- ModEL's frame-by-frame animation of an enhancement MOSFET turning on.
- Thick arrow for the load current, thin for the control: with a MOSFET the
  thin arrow is missing altogether (ModEL).

**Transistor and MOSFET side by side** (ModEL's table, with TI, NJIT and
Wikipedia)

| | Bipolar transistor | MOSFET |
|---|---|---|
| Controlled by | A current into the base, all the time it is on | A voltage on the gate; no steady current |
| Turn-on point | About 0.7 V at the base | A threshold of a few volts; fully on well above it |
| Part between signal and control lead | A base resistor to limit the current: essential | None needed to limit current. A resistor from gate to source to let it turn off |
| When fully on | A fairly fixed 0.1 to 0.3 V | A resistance: volts = amps × R<sub>DS(on)</sub> |
| As it warms | Passes more: can run away | Resistance rises: shares in parallel |
| Left unconnected | Base open: off | Gate open: **anything**, it holds its last charge |
| Handling | Robust | The gate film is punctured by static |
| Reverse current | Blocks | Conducts through the built-in diode |

**Misconceptions the sources name**

- **"It needs no current, so anything will drive it."** It needs *voltage*.
  A 3.3 V logic output leaves many power MOSFETs half on, dropping volts and
  overheating; ModEL uses exactly this as its cautionary example and puts a
  small bipolar transistor in front to give the gate 12 V.
- **"The threshold is the on voltage."** It is where conduction begins (TI,
  Learnabout Electronics).
- **Forgetting that the gate holds charge.** ModEL calls the missing
  gate-to-source resistor a very common mistake of students new to MOSFETs.
- **Putting an N-channel MOSFET above its load.** As the load's voltage
  rises, the source rises with it and the gate can no longer be several
  volts above the source. The lamp glows dimly and the MOSFET heats
  (ModEL's "dim lamp" question; Kuphaldt, igfet Q28).
- **Not expecting the built-in diode** (ModEL).
- **The word "saturation" means opposite things.** For a bipolar switch it
  means fully on. In MOSFET textbooks it names the region where the device
  *limits* current. Electronics-Tutorials uses it one way on one page and
  the other way on the next, and ModEL lists the word among the ideas most
  often misunderstood. **For the course: say "fully on" and never
  "saturated" for a MOSFET.**

### Faulty or working

**What fails, and why**

- **The gate film is the weak point.** Too much voltage across it punches a
  hole, and the hole is permanent (AN-936, Toshiba, Learnabout Electronics).
  The gate then leaks or is shorted to the source or the drain. Two causes:
  static during handling, and voltage spikes in the circuit that reach the
  gate. AN-936 shows how a fast 300 V change on the drain can put nearly
  50 V on a gate that is not held firmly (one sixth, through the device's
  own capacitances; recomputed 300 ÷ 6).
- **The usual end state is everything shorted to everything.** In
  Goldwasser's collection a contributor, Paul Mathews, puts it as "The usual
  failure mode: GS short AND DS short." Herres adds that MOSFETs often fail
  shorted from drain to gate, which then puts the load's voltage into
  whatever drives the gate, and that the drain-to-source short is the other
  frequent one. Vishay's analysis of parts returned from cars found shorts
  from gate to drain and gate to source, and concluded that a voltage
  transient on the gate caused them.
- **Static damage need not show at once.** It can kill immediately or
  hours or years later (Learnabout Electronics); it accumulates (Wikipedia).
- **Big ones are tougher than small ones.** A power MOSFET's large gate
  capacitance soaks up a static charge without the voltage rising far, and
  International Rectifier says a wrist strap is in practice seldom essential
  for them, though still good practice (AN-936). Many parts have a
  protection diode built in at the gate, of limited strength (Toshiba,
  Learnabout Electronics). Once soldered into a circuit, the parts round the
  gate usually give static a path (ModEL).
- **Heat.** Left half on, a MOSFET has volts across it and amps through it
  together (ModEL, Wikipedia). A coil's kick at switch-off over-volts the
  drain (AN-936).
- How often each happens: the sources use words such as usual and often, and
  give no counts.

**(a) In circuit, with a voltmeter**

For an N-channel MOSFET below its load: source to ground, lamp from drain to
supply, gate fed from the signal through a resistor, another resistor from
gate to source.

| What is wrong | Gate to source, driven | Drain to source, driven | Drain to source, not driven | The lamp |
|---|---|---|---|---|
| Nothing | The full drive voltage (say 10 V) | Amps × on-resistance: 1.6 V for an IRF510 at 3 A; 63 mV for a 21 mΩ part | Full supply | Follows the signal |
| No drive arriving | 0 V | Full supply | Full supply | Never lights |
| Drain–source short | Normal, or 0 V if the gate has gone too | About 0 V | **About 0 V** | **Always lit** |
| Gate punched through to the source | **Far below the drive voltage**, near 0 V: the gate is taking current, which a gate never should | Full supply | Full supply | Never lights |
| Gate punched through to the drain | Pulled towards the drain's voltage; the driving stage may be damaged | Wrong in both states | Wrong | Erratic |
| Open inside | Full drive voltage | Full supply | Full supply | Never lights |
| Not enough gate voltage (logic-level drive on a standard part; MOSFET above the load) | A few volts, near the threshold | **Several volts** | Full supply | Dim; the MOSFET is hot |
| Gate-to-source resistor open or missing | Stays up after the signal goes | Stays low | — | On, and **slow or unwilling to go off** |

- Rows 1 and 2 are stated (Electronics-Tutorials: off, the drain sits at the
  supply; on, close to 0 V). The figures in row 1 are recomputed from the
  data sheet: 3 A × 0.54 Ω = 1.62 V; 3 A × 0.021 Ω = 63 mV.
- The short, open and missing-resistor rows are Kuphaldt's (igfet Q32):
  transistor open, the motor will not run; shorted, it runs all the time;
  gate resistor open, it runs when the button is pressed and takes a long
  time to stop.
- The low-gate-voltage row is ModEL's.
- **The punched-gate rows are derived**, from the one fact every source
  gives: a good gate draws no current, so there is no voltage lost in the
  resistor feeding it. If the gate end of that resistor reads lower than the
  signal end, current is going into the gate, and the gate is damaged.
  That is the MOSFET's own test, and the opposite of the transistor's,
  where the base *must* pull its resistor down to 0.7 V.
- **The meter can do the fault itself.** A gate with nothing connected can
  be moved by a probe or a finger (NJIT).

**(b) Out of circuit**

A MOSFET cannot be judged like a transistor: there are no junctions at the
gate to read. The sequence, from Goldwasser's contributors, Learnabout
Electronics, Herres and Kuphaldt:

1. **Discharge the gate.** Short gate to source for a moment.
2. **Gate to source, and gate to drain: open, both ways round.** Any reading
   at all means the film is holed.
3. **Drain to source: one diode.** Red on source, black on drain reads the
   built-in diode, about 0.5 to 0.6 V (Kuphaldt measured 0.583 V on an
   IRF510). The other way round reads open.
4. **Charge the gate.** Touch positive to the gate with negative on the
   source. A 9 V battery does it surely.
5. **Drain to source again: now it conducts both ways**, at an ohm or less,
   and **stays on** after the battery is taken away, because the gate holds
   its charge.
6. **Short gate to source: it goes open again.**

A part that passes all six has a sound gate, a channel that switches, and a
gate that holds charge. A dead one usually reads near zero between every
pair of leads.

**Limits of that test**

- **The meter may not reach the threshold.** An IRF510 needs 2 to 4 V just to
  begin. Many digital meters put only 1 or 2 V on their ohms range, and
  their diode range may or may not be enough (Herres; a contributor to
  Goldwasser says a digital meter usually cannot do it). The 9 V battery is
  the sure way. Kuphaldt's meter did manage it on diode test.
- **A good part can read "shorted".** If the gate was left charged by an
  earlier touch, drain to source reads about 0 V both ways. That is step 5,
  not a fault. Always discharge first (Kuphaldt, igfet Q19; Learnabout
  Electronics).
- **Do not push the leads into anti-static foam to test it.** The foam
  conducts enough to spoil the gate readings (Learnabout Electronics says
  to use a breadboard instead).
- The test shows nothing about the on-resistance or the voltage rating.
- A part with a protection zener at the gate will not read open there
  (Goldwasser).

**Safety and handling**

- Leave it in its conductive foam or anti-static bag until it is wanted
  (AN-936, Kuphaldt, Learnabout Electronics). The navy wraps loose ones in
  metal foil (NEETS).
- Hold it by the body, not the leads (AN-936).
- Touch earth first; better, wear a wrist strap. The strap is earthed
  through about a megohm, never directly: a direct earth on the wrist would
  make any live part a far worse shock (ModEL; Kuphaldt, igfet Q21; NEETS
  gives 250 kΩ to 1 MΩ). The strap itself can be tested with an ohmmeter
  (Kuphaldt).
- An earthed soldering iron; no plastic solder sucker, which makes static;
  keep parts away from clothing, plastic and cellophane (NEETS, AN-936).
- In a test circuit, do not apply voltage until every lead is firmly
  connected (AN-936).
- A coil as the load needs its diode, as with the transistor (ModEL,
  Kuphaldt, Electronics-Tutorials).

**Common beginner mistakes**

- **A floating gate**: no resistor from gate to source, so it turns on and
  will not turn off, or turns on by itself (ModEL, NJIT, Learnabout
  Electronics).
- **Driving a standard part from 5 V or 3.3 V** and finding it hot (ModEL,
  Electronics-Tutorials).
- **More than 20 V on the gate.** On a 30 V supply the gate cannot simply be
  switched to the supply rail; ModEL's IRF9520 question uses two equal
  resistors to halve it.
- **MOSFET above the load** (ModEL, Kuphaldt).
- **Handling it like a transistor**: fingers on the leads, a nylon jumper,
  no thought for static.
- **Testing it like a transistor**, and scrapping a good one because a
  charged gate made it read short.
- **Connecting it backwards**, so the built-in diode feeds the load all the
  time (ModEL).

### Exercises found

Kuphaldt's may be adapted with credit. All answers recomputed.

1. **The meter that turned it on.** Kuphaldt, igfet Q19 (his note says the
   figures are from a real IRF510). On diode test, in this order: black on
   the middle lead and red on the right, 0.583 V; reversed, open; black on
   the middle and red on the left, open; then the first two again, and both
   now read 0.001 V. Why? *The third touch put the meter's voltage on the
   gate and charged it. The MOSFET turned on and stayed on.* His follow-up:
   where must the meter go to turn it off again? *Across gate and source the
   other way round, or simply short the two* (my answer; he gives none). And
   from ModEL: what is the 0.583 V? *The built-in diode.*
2. **The lamp that stays on.** Kuphaldt, igfet Q31. A push-button charges a
   33 µF capacitor on the gate from 15 V; 47 kΩ across it; the threshold is
   4 V. How long does the lamp stay lit after the button is let go? *The
   time constant is 47 kΩ × 33 µF = 1.551 s. From 15 V down to 4 V takes
   1.551 × ln(15 ÷ 4) = 2.05 s.* His answer agrees. This is №0012 with the
   MOSFET as the thing that notices, and it shows what the gate resistor is
   for.
3. **Three faults.** Kuphaldt, igfet Q32. A push-button, a MOSFET, a motor,
   and one resistor from gate to ground. *MOSFET open, drain to source: the
   motor will not run. Shorted: it runs all the time. The resistor open: it
   runs when the button is pressed and takes a long time to stop.* The third
   is the lesson in one line.
4. **Complete the circuit, then improve it.** Kuphaldt, igfet Q22; ModEL
   §8.1.7 and §7.3.5. Wire a push-button to a MOSFET's gate so that it
   works a load. His own answer works but is, he says, not practical: make
   it better. *Add the resistor from gate to source, so the gate does not
   float when the button is up.* (Drawings not seen; ModEL's wording of the
   challenge gives the answer.)
5. **Why no resistor in the gate lead?** ModEL §2.3 and §2.7; NJIT asks the
   same by measurement. *The gate is insulated and passes no steady
   current, so there is nothing to limit. The transistor's base is a diode
   and must have one.*
6. **It is a resistor: do the sums.** ModEL §2.3. 30 V, a 10 Ω load, a MOSFET
   of 0.4 Ω, 12 V on the gate, a 10 kΩ gate-to-source resistor. *Current
   30 ÷ 10.4 = 2.885 A. The load gets 28.85 V; the MOSFET drops 1.15 V and
   makes 2.885² × 0.4 = 3.33 W. The push-button carries 12 V ÷ 10 kΩ =
   1.2 mA.* Agrees with ModEL.
7. **Three switches, one lamp.** Built from Learnabout Electronics (a 12 V,
   36 W lamp at 3 A; 21 mΩ after allowing 20%), the IRF510 data sheet and a
   saturated transistor. *Modern MOSFET: 3² × 0.021 = 0.19 W. IRF510:
   3² × 0.54 = 4.9 W, with 1.6 V lost. Bipolar at 0.3 V: 0.9 W, plus its
   base drive.* The quiz at Learnabout Electronics asks the first of these
   (answer 189 mW). A caution on that page: it finds the temperature rise
   by multiplying 0.189 W by the junction-to-case figure (0.28 °C). With no
   heat sink the junction-to-ambient figure applies; at the IRF510's
   62 °C/W that would be about 12 °C. Its own measurement with a 3 A motor
   load was about 28 °C.
8. **The dim lamp.** ModEL §8.3.5. A 24 V lamp, an N-channel MOSFET *above*
   it, the gate switched to 24 V. The lamp only glows. *The source rises
   with the lamp's voltage. The gate is at 24 V at most, so the lamp can
   never have more than 24 V less the gate-to-source voltage the MOSFET
   needs. Put the MOSFET below the lamp.* Kuphaldt, igfet Q28, asks the
   general form: *to put an N-channel above the load, the gate must be
   taken above the supply by the full turn-on voltage.*
9. **Too much for the gate.** ModEL §7.2.8. A P-channel IRF9520 (gate ±20 V
   at most, 0.60 Ω) switches a 9 Ω load on 30 V, with two 2.7 kΩ resistors
   at the gate. Why two? *Assuming they form a divider across the supply
   when the switch closes (drawing not seen): the gate sits at half the
   supply, 15 V from the source, inside the 20 V limit. Switched straight
   to ground it would have 30 V across the film. Then: 30 ÷ 9.6 = 3.125 A;
   1.875 V and 5.86 W in the MOSFET; 5.6 mA in the divider.* My answers;
   ModEL publishes none.
10. **How little it takes.** ModEL §8.2.4. The standard model of a charged
    person: 100 pF at 2000 V, through 1.5 kΩ. How much energy reaches the
    part? *½ × 100 pF × (2000 V)² = 0.2 mJ.* A fifth of a thousandth of a
    joule, yet 2000 V against a film good for 20 V. With a 5 kΩ part the
    discharge time constant is 6.5 kΩ × 100 pF = 0.65 µs. My answers.
11. **The strap.** Kuphaldt, igfet Q21. How is a wrist strap tested, and why
    is it not a plain wire to earth? *An ohmmeter from the wrist plate to
    the clip should show megohms. A plain wire would make the wearer a
    perfect path to earth for anything live.*
12. **On or off?** Kuphaldt, igfet Q13 to Q15 and Q23 to Q27; ModEL §7.3.2.
    Sets of small circuits: say whether each MOSFET is on. For a first
    lesson keep only the N-channel enhancement ones, and ask "what is the
    gate's voltage *measured from the source*?" each time.

Also checked: Electronics-Tutorials' example of a 6 V, 24 W lamp and a 0.1 Ω
MOSFET gives 4 A and 1.6 W. It ignores the MOSFET's own effect on the
current; with the lamp taken as 1.5 Ω the figures are 3.75 A and 1.41 W.

### Build the lesson round

- **The same lamp circuit as the transistor job, with the MOSFET in its
  place.** An ammeter in the gate lead reads nothing; a voltmeter on the
  gate decides everything. The single idea: *voltage on the gate, not
  current into it.* NJIT's lab is this lesson.
- **Sweep the gate.** Below the threshold, off and the full supply across
  it. Near the threshold, the lamp dim and volts across the MOSFET: the bad
  place to be. Well above, on, and what is left across it obeys Ohm's law
  with the data-sheet resistance.
- **The gate remembers.** Take the signal away with no resistor at the gate:
  the lamp stays on. Add the resistor: it goes off. With a capacitor added
  it becomes the 2.05 s exercise and ties back to №0012.
- **Faults by the same two readings as before, plus one new one.** Lamp
  stuck on with 0 V on the gate: shorted. And the reading only a MOSFET
  gives: *the gate end of the gate resistor is lower than the signal end*,
  so the gate is taking current and its film is holed.
- **On the bench, and in 1984.** A new output transistor for a hi-fi
  amplifier arrives pushed into black foam. Why? Then the battery test:
  open, charge the gate, on and staying on, short the gate, open. End on the
  good part that reads "shorted" because nobody discharged it.
- **Leave out** P-channel, depletion types, the junction FET, high-side
  drive and switching speed.
