# Research: the fuse (with the switch as a part) and the thermistor (with the LDR)

Gathered on 20 November 2026, in the format of `RESEARCH.md`, for two
one-component lessons. Nothing here repeats what `RESEARCH.md` already holds:
where a source is already used there (Kuphaldt's basic troubleshooting
worksheet, the cold lamp filament in №0003, the battery short left over from
№0010), only the new part is reported.

## How far to trust this

- Web pages were opened through a summarising fetch, so what is reported is the
  substance of a page, not its wording. PDFs were read directly as extracted
  text: Kuphaldt's worksheets and ModEL modules, the Littelfuse guide, the
  EPCOS and Vishay notes, the MIT, Bucknell and Olin lab sheets, and the 1988
  automotive article.
- Text extraction drops the drawings. Where an answer depends on a drawing I
  could not see (bridge polarities, the oven's terminal numbers), it says so.
- Every number below was recomputed by me. "Mine" marks an answer or a figure
  that I worked out and the source does not give.
- "Unverified" marks anything that did not come from a page I loaded,
  including things seen only in a search-result snippet.
- One short quotation is used in the whole report (Victor Todd, 1921). All
  else is paraphrase.

**These would not load, so nothing here comes from them**

| Page | What happened |
|---|---|
| All About Circuits, `textbook/digital/chpt-4/contact-design/` | 404. The ibiblio copy of the same chapter loaded and is used |
| RF Cafe copies of NEETS module 3 (three URLs, index included) | 404. The tpub.com copy loaded and is used |
| `tpub.com/neets/book3/index.htm` | Redirected to another host, not followed, so the NAVEDTRA number and distribution statement were never seen on a page |
| TDK, "How to use NTC thermistors for inrush current limiting" and "Failure modes and countermeasures of NTC" (`product.tdk.com`) | 403. An EPCOS (TDK) PDF on the same subject did load |
| US Navy, NSWC Crane, thermistor page (two URLs) | 403. Its failure-mode percentages were seen only in a search snippet: Unverified |
| UC Santa Cruz thermistor lab handout | Certificate error |
| Murata's posistor pages | Found by search, never opened: Unverified |
| Wikipedia, "Fuse (electrical)" | Loaded, but cut off before the end: the last part and the licence footer were not read |

Searched for and not found: any learnabout-electronics.org page on fuses,
thermistors or LDRs (its page on temperature and resistance loaded, and names
neither), any Electronics-Tutorials page on fuses, and any Kuphaldt worksheet
given over to thermistors or photoresistors. Kuphaldt's "DC transducers"
worksheet loaded and holds only two Hall-effect questions.

## Sources, and what may be done with them

| Source | Licence, as the page states it | Suggested use |
|---|---|---|
| Kuphaldt, *Socratic Electronics* worksheets (PDFs and the All About Circuits mirror) | Each PDF and each mirror page: CC BY 1.0. The Socratic index page itself says CC BY 3.0 US | Exercises adapted, with credit |
| Kuphaldt, *Modular Electronics Learning* (ModEL) modules | CC BY 4.0 | Exercises adapted, with credit |
| Kuphaldt, *Lessons in Electric Circuits* | Design Science License on the All About Circuits pages. CC BY on the ibiblio page | Ideas and order of teaching |
| OpenStax, *College Physics 2e* | CC BY-NC-SA 4.0, with the notice against use in generative-AI offerings without written permission | Ideas only. No text or problems taken |
| NEETS module 3, as copied at tpub.com | Page footer: © Integrated Publishing, Inc., all rights reserved. No statement about the Navy text itself was seen | Ideas only |
| Littelfuse, *Fuseology Design Guide* | © 2022 Littelfuse, Inc. | Ideas only |
| EPCOS (TDK) and Vishay Ametherm application notes | © EPCOS AG 2013. Vishay: no open licence, subject to its disclaimers | Ideas only |
| DigiKey articles | © DigiKey, all rights reserved | Ideas only |
| Electronics-Tutorials.ws | © AspenCore, all rights reserved | Ideas only |
| electronics-notes.com (Ian Poole) | "© electronics-notes.com", no licence terms | Ideas only |
| learnabout-electronics.org (Eric Coates) | © Eric Coates, all rights reserved | Ideas only |
| Samuel Goldwasser, Sci.Electronics.Repair FAQ | © Goldwasser, all rights reserved. Copying allowed with his notice and at no charge | Ideas only |
| MIT 22.071/6.071 lab 6, Bucknell ELEC 101 lab 3, Olin ISIM lab 2 | None stated on the PDFs | Ideas only |
| gammaelectronics.xyz reprints (*Electronic Servicing*, Oct. 1979, and two unattributed book chapters) | None stated | Ideas only |
| Vince Fischelli, "Electrical Troubleshooting" (a trade-magazine training column, 1988 by its URL) | None stated | Ideas only |
| Wikipedia | CC BY-SA 4.0 (not seen on the cut-off fuse page) | Ideas only |

---

## 1. The fuse, and the switch as a part

### Sources

Kuphaldt

- Socratic worksheet, [Overcurrent protection (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/over_i.pdf), 13 questions with answers and notes. CC BY 1.0. Mirror, pages 1 to 5: [allaboutcircuits.com/worksheets/overcurrent-protection](https://www.allaboutcircuits.com/worksheets/overcurrent-protection/). CC BY 1.0.
- Socratic worksheet, [Switches (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/switches.pdf), 18 questions. CC BY 1.0. Mirror, first page only: [allaboutcircuits.com/worksheets/switches](https://www.allaboutcircuits.com/worksheets/switches/). CC BY 1.0.
- Socratic worksheets, [Basic circuit troubleshooting (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/trouble1.pdf) (already in `RESEARCH.md` for №0011: only its switch questions 13 and 15 to 18 and note 3 are used here) and [Basic troubleshooting strategies (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/trouble2.pdf), question 11. CC BY 1.0.
- ModEL, [Overcurrent Protection (PDF)](https://www.ibiblio.org/kuphaldt/socratic/model/mod_overcurrent.pdf), last updated 21 September 2026. CC BY 4.0.
- ModEL, [Electrical Switches (PDF)](https://www.ibiblio.org/kuphaldt/socratic/model/mod_switch.pdf), last updated 2 September 2025. CC BY 4.0.
- ModEL, [Series Circuits and Voltage Dividers (PDF)](https://www.ibiblio.org/kuphaldt/socratic/model/mod_series.pdf), last updated 4 September 2026: its fuse passages and question 7.3.4. CC BY 4.0.
- *Lessons in Electric Circuits*, [Fuses](https://www.allaboutcircuits.com/textbook/direct-current/chpt-12/fuses/). Design Science License.
- *Lessons in Electric Circuits*, digital chapter 4, switch contact design, contact bounce and "normal" state: [ibiblio copy](https://www.ibiblio.org/kuphaldt/electricCircuits/Digital/DIGI_4.html), CC BY. Also [Switch types](https://www.allaboutcircuits.com/textbook/digital/chpt-4/switch-types/), Design Science License.

US Navy NEETS, module 3, chapter 2, as copied at tpub.com (© Integrated Publishing on each page)

- [Circuit protection devices](https://www.tpub.com/neets/book3/8b.htm), [fuse types](https://www.tpub.com/neets/book3/8c.htm), [fuse ratings](https://www.tpub.com/neets/book3/8d.htm), [identification of fuses](https://www.tpub.com/neets/book3/8e.htm), [checking fuses](https://www.tpub.com/neets/book3/8g.htm), [replacing fuses](https://www.tpub.com/neets/book3/8h.htm), [answers](https://www.tpub.com/neets/book3/8n.htm), and a second copy of the checking page, [Checking fuses with a meter](https://electriciantraining.tpub.com/14175/css/Checking-Fuses-With-A-Meter-102.htm).

Makers and distributors

- Littelfuse, [Fuseology Design Guide (PDF)](https://info.littelfuse.com/hubfs/Fuseology%20Design%20Guide.pdf). © 2022 Littelfuse.
- DigiKey, [Littelfuse Fuseology](https://www.digikey.com/en/articles/littelfuse-fuseology) (first 100,000 characters read) and [Testing and identifying fuse problems](https://www.digikey.com/en/blog/testing-and-identifying-fuse-problems) (Ashley Awalt, 2018). © DigiKey.

Other

- electronics-notes.com, [Electrical fuses 101](https://www.electronics-notes.com/articles/electronic_components/fuses/electrical-fuses-101-basics.php). © electronics-notes.com.
- Goldwasser, [TV blows fuse](https://repairfaq.org/samnew/tvfaq/tvtvbfuse.htm) and [Troubleshooting and repair of small switchmode power supplies](https://repairfaq.org/sam/smpsfaq.htm). © Goldwasser.
- OpenStax College Physics 2e, [23.8 Electrical safety: systems and devices](https://openstax.org/books/college-physics-2e/pages/23-8-electrical-safety-systems-and-devices) and [chapter 20 problems](https://openstax.org/books/college-physics-2e/pages/20-problems-exercises). CC BY-NC-SA 4.0 with the AI notice.
- Wikipedia, [Fuse (electrical)](https://en.wikipedia.org/wiki/Fuse_(electrical)) (cut off, licence not seen) and [Fuse (automotive)](https://en.wikipedia.org/wiki/Fuse_(automotive)) (CC BY-SA 4.0).
- Vince Fischelli, [Electrical Troubleshooting (PDF)](https://automotivetechinfo.com/wp-content/uploads/1988/10/Electrical-Troubleshooting.pdf). None stated. A trade column, used for one worked case of a bad switch.
- gammaelectronics.xyz: [Repairing old TVs](https://gammaelectronics.xyz/electronic-srvc_mag_1979-10_tv.html) (*Electronic Servicing*, October 1979, Gill Grieshaber) and an unattributed book chapter, [Troubleshooting/repairing power supplies](https://gammaelectronics.xyz/trcswos2e_8.html). None stated.

### How it works

- A fuse is a short, thin piece of wire or metal strip put in series with what
  it guards. Current heats every wire a little. The fuse is made the thinnest
  wire in the loop, so it is the one that gets hot enough to melt, and when it
  melts the loop is broken. (Kuphaldt, NEETS, electronics-notes.)
- The heat goes with the *square* of the current: twice the current is four
  times the heat, three times is nine times. That is why a fuse sits cool at
  its normal load and goes quickly in a short. (ModEL, from P = I² × R.)
- It is kept short so that it adds almost no resistance. Its length does not
  set its rating. A good fuse is, to a meter, a piece of wire. (Kuphaldt.)
  Littelfuse adds a caution worth knowing at the bench: fuses rated for a
  fraction of an amp can have several ohms, and the element's resistance rises
  as it warms.
- When the wire parts, an arc strikes across the gap and burns the ends back
  until it can no longer hold. The glass or ceramic tube, sometimes filled
  with sand, is there to contain that. (DigiKey, NEETS, electronics-notes.)
  This is the reason a fuse has a voltage rating as well as a current rating.
- How fast it goes depends on how big the overload is. A slow-blow fuse has
  the same rating but more to heat up (a coiled wire, a blob of solder, a
  spring), so it rides out the short surge at switch-on and still opens on a
  lasting overload. (Kuphaldt, Littelfuse, electronics-notes, Wikipedia.)
  NEETS gives figures for 1 A fuses at twice their rating: fast about 0.7 s,
  standard about 1.5 s, delay about 10 s.
- A fuse works once. A circuit breaker is a switch that a hot bimetal strip or
  an electromagnet throws open, and it can be reset. (Kuphaldt.)
- **The switch**: two metal contacts pushed together or pulled apart. Closed,
  the two sides are one point: no resistance to speak of, no voltage across.
  Open, an air gap: no current, and the whole supply across the gap. (ModEL.)
  Contacts are usually a silver alloy, chosen to stay conductive as they
  tarnish. (Kuphaldt.)

### What it is for, and where it is found

- **It guards against heat and fire, not against shock.** A current far too
  small to blow any fuse can kill. Kuphaldt, ModEL and OpenStax all say this
  outright.
- **Each fuse guards what lies beyond it, and no more.** The fuse or breaker
  at the house panel is sized for the wiring in the wall, not for the set
  plugged into it. ModEL's case: a small appliance that normally draws 1 A
  develops a fault and draws 5 A, and a 20 A breaker never notices. So a set
  carries its own, smaller fuse inside.
- **Several fuses in a row, each smaller than the last.** ModEL's example is a
  supply with a 10 A fuse, a 5 A fuse for the wire, and a 1 A fuse in the
  load. The one nearest the fault, and no bigger than it need be, should go.
- **In the sets of the time.** A television has a mains fuse and often AC and
  DC line fuses on the main board, and a fuse on the standby transformer.
  Low-value "fusible" or flameproof resistors do the same job in supply feeds:
  they are made to go open, not to drift. (Goldwasser. The unattributed
  chapter at gammaelectronics.) The mains fuse of a colour television is rated
  well above the set's running current, because the degaussing coil and the
  charging of the smoothing capacitors make a large surge at switch-on.
  (Goldwasser.) Car radios: early ones had a 5 to 10 A fuse in the supply
  lead, "deluxe" ones 2 to 5 A. (The gammaelectronics chapter.)
- **In cars.** Glass tube fuses in North American cars to at least 1981. The
  plastic blade fuse dates from 1976. Older European cars used ceramic
  "torpedo" fuses coded by colour (yellow 5 A, white 8 A, red 16 A, blue 25 A,
  grey 40 A), and old British Lucas fuses are marked with the current that
  blows them, twice what they should carry. (Wikipedia.)
- **In the UK mains plug.** A cartridge fuse to BS 1362. (electronics-notes.)
- **Today.** Surface-mount fuses on boards, and self-resetting polymer fuses
  on USB ports and the like, which are PTC thermistors: see part 2.
  (electronics-notes.)
- **Switches in sets**: the on/off switch, and slide and rotary selectors. The
  1979 bench article names a service switch and a picture-tube bias switch as
  regular causes of trouble in old colour sets.

### Ratings and markings

- **Current rating**, in amps, always marked. It is the current the fuse will
  *carry*, not the current that blows it. Littelfuse: run a fuse at no more
  than 75% of its rating at room temperature, so a 10 A fuse suits a circuit
  of up to 7.5 A. NEETS: pick about 125% of the normal current to guard
  against overloads (10 A normal, 12.5 A fuse), and 150% if only shorts
  matter. electronics-notes: a UK 13 A plug fuse must carry 1.6 times its
  rating (20.8 A) for half an hour and must blow within half an hour at 1.9
  times (24.7 A). All three sums recomputed.
- **Voltage rating.** Not the voltage it works at: the highest circuit voltage
  at which it can be trusted to put out its own arc and stay open. A fuse may
  be used on any lower voltage. Common values 32, 63, 125, 250 and 600 V.
  (NEETS, Littelfuse.)
- **Speed.** Fast, standard (medium) or slow: "slow-blow", "time-delay",
  "anti-surge". NEETS matches them to loads: slow for motors, solenoids and
  transformers, standard for lighting and car circuits, fast for delicate
  instruments and semiconductors. In the American codes a glass AGC fuse is
  fast and an MDL is slow, and the number after is the amps, so AGC-5 is a 5 A
  fast glass fuse. (ModEL.) NEETS: 3AG, or AGC, is the ¼ inch by 1¼ inch glass
  size, and it classes that type as "standard" speed where ModEL calls it
  fast: the two sources use different scales. The letters F and T (and FF, M,
  TT) on European 20 mm fuses: Unverified, seen only in a search snippet.
- **Breaking capacity** (interrupting rating): the largest fault current it
  can stop without bursting. Littelfuse: from 35 A for some 250 V fuses of the
  5 × 20 mm size to 200,000 A for industrial ones. Kuphaldt's point: this is
  not the current at which it opens.
- **Temperature.** Ratings are fixed at 25 °C. A hot fuse blows early.
  (Littelfuse. Wikipedia gives a 1 A fuse opening at 80% of its rating at
  100 °C.)
- **Blade fuse colours** (Wikipedia): 1 A black, 2 A grey, 3 A violet, 4 A
  pink, 5 A tan, 7.5 A brown, 10 A red, 15 A blue, 20 A yellow, 25 A clear,
  30 A green, 40 A orange.
- **Symbols.** Kuphaldt draws an S-shaped curve between two terminals.
  electronics-notes gives a line through a rectangle. A lesson should show
  whichever the course's schematics use, and name the other.
- **Switch ratings**: a contact current and a contact voltage, and they are
  higher for AC than for DC, because an AC arc dies each time the current
  passes through zero. The current a switch can *break* is its lowest rating.
  There is also a least current, the "wetting current", below which the
  contacts stop cleaning themselves and grow a film. (ModEL, Kuphaldt.)

### How they teach it

- **ModEL's order** is the one to copy: current heats any wire, the heat goes
  with the square of the current, every wire has a safe limit, so put in one
  wire that is weaker than all the rest and put it where you can get at it.
  It quotes Victor Todd's 1921 account of the first fuse as just that: a thin
  piece of wire, so that the operator knew where to look when the power went
  off. Then where to put it, then ratings, then breakers.
- **NEETS's order** is a technician's: what goes wrong (a direct short, too
  much current, too much heat), why the device must be in series, the kinds,
  the ratings, reading the markings, checking, replacing, upkeep.
- **Where to put it.** ModEL draws four circuits with a short half-way along.
  With the fuse next to the source it blows. With the fuse next to the load it
  does not, and the wire burns. Either side of the source will do for stopping
  the current. Kuphaldt's textbook adds the safety reason for the live side.
- **Pictures that work.** A circuit board where someone fitted a 30 A fuse in
  place of 3 A, with the copper tracks burnt off before the fuse went. A coin
  under an old screw-in house fuse. A time-against-current curve. (ModEL.)
- **Kuphaldt's show-and-tell** (question 13): bring a real fuse, read off all
  you can from its markings, and prove with a meter whether it has blown.
- **What they warn against**
  - "The fuse stops me getting a shock." No. (Kuphaldt, OpenStax.)
  - "The fuse at the panel protects my set." No, only the wiring. (Kuphaldt.)
  - "The fuse was the fault." A fuse opens because something is wrong, and
    the cause comes first. (NEETS, Goldwasser.) Goldwasser allows one
    exception: a fuse can die of age, or of a surge that harmed nothing else,
    so one replacement, after a quick check for shorted parts, is a fair
    test. If that one blows, stop.
  - "It keeps blowing, so fit a bigger one." Todd called improper replacement
    of fuses "one of the deepest-rooted evils in the electrical industry"
    (1921, quoted in ModEL). NEETS's rule: never a higher current rating, a
    lower voltage rating, or a slower type.
  - "A 1 A fuse blows at 1 A." It carries 1 A for good. (Littelfuse, NEETS.)
  - "The voltage rating is the voltage it needs." (NEETS.)
  - "An intact fuse has no voltage across it, so its terminals are safe to
    touch." Both ends are at the full supply voltage above earth. (A challenge
    question in ModEL's series module.)
  - "Open" and "closed" for a switch mean the opposite of what they mean for a
    door. Kuphaldt suggests a drawbridge: down (closed), the traffic crosses.

### Faulty or working

**How a fuse fails.** In one way only: it goes open. What matters is why.

| Why it opened | What it tells you | Source |
|---|---|---|
| A short or a failed part beyond it | The fuse did its job. A new one will blow too | NEETS, Goldwasser |
| A lasting overload | The same | NEETS |
| A mains surge or lightning that harmed nothing else | A new fuse holds | Goldwasser, the gammaelectronics chapter |
| Age: years of being heated and cooled by switch-on surges, or of running near its rating | A new fuse holds | Goldwasser, Littelfuse, electronics-notes |
| The wrong fuse was fitted: a fast one where a slow one belongs | It blows at switch-on with nothing wrong | Goldwasser |

None of the sources puts numbers on how often each happens. Goldwasser's rule
of thumb for a television: a fuse that goes the instant the set is switched
on means a short near the mains input, and his suspects in order are the
degaussing posistor, the line output transistor, the supply regulator or
chopper transistor, the bridge rectifier diodes and the main smoothing
capacitor.

A fuse cannot fail "shorted". The faults that amount to it are made by
people: a larger fuse, or foil, wire or a coin across the holder. (NEETS has a
nice question on this, below.) A fuse *holder* can fail: corroded or slack
clips add resistance, get hot and drop voltage. NEETS's test for a clip
holder is that a slip of paper should not go between clip and fuse.

**What the meter reads**

| | Good fuse | Blown fuse |
|---|---|---|
| In circuit, set on: voltmeter across the fuse | 0 V, like any piece of wire | The whole supply, as across any open (provided the rest of the loop is whole) |
| In circuit, set on: each end of the fuse to chassis | Supply on both ends | Supply on the feed end, nothing on the far end |
| Out of circuit, ohmmeter or continuity | About 0 Ω, and a beep | No reading at all ("OL"), no beep |

(NEETS and DigiKey for the table.) Three traps go with it:

- **Supply on both ends does not always mean a good fuse.** Kuphaldt's motor
  question: a motor fed by two live lines, each with its own fuse. One fuse is
  blown, yet all four fuse terminals read 120 V to earth, because the far end
  of the blown fuse is fed back through the motor from the other line. He says
  he watched an experienced electrician make exactly this mistake. The reading
  to trust is the one *across* each fuse. In a set with one supply and one
  fuse the trap does not arise: the far end of a blown fuse is pulled to 0 V
  by the load. (That last sentence is mine.)
- **0 V across does not always mean a good fuse either.** With the set
  switched off, or with a second break somewhere, there is no voltage across
  anything. Kuphaldt makes the point about a switch (no voltage across it
  does not prove it conducts). Applying it to a fuse is mine.
- **An ohmmeter on a fuse still in the circuit can lie.** The meter can find
  another way round through the rest of the set and show a reading for a fuse
  that is open. Take the fuse out, or lift one end. (NEETS.)

Also from NEETS: a meter is the only sure test, because a fuse can look whole
and be open. And a very small fuse (1/32 A and under) can be blown by the
ohmmeter's own current. Its remedy is to put a resistor of known value in
series and look for a reading equal to the resistor.

**By eye.** A gap in the wire, or the wire melted onto the glass. Fine wires
are hard to see and ceramic fuses cannot be seen into. (NEETS.) Goldwasser
describes fuses that vaporise or explode as the sign of a severe short on
the mains side. The bench rule "black glass means a short, a clean gap means
an overload" is Unverified: no page I loaded states it.

**After a fuse has blown.** Goldwasser's series lamp, which he uses when
powering a set up after work on its supply: a mains filament lamp in series
with the set, to hold the current down. A lamp that stays at full brightness
means a short is still there. Bright, then dim, is a set drawing its normal
current. He suggests 40 W for a small supply, 100 W for a small television,
150 to 200 W for a large one, and unplugging the degaussing coil first. Using
it to save fuses is my framing of it.

**Beginners' mistakes**

- Fitting a bigger fuse, or bridging the holder.
- Replacing the fuse without asking why it went, and then replacing it again.
- Fitting the wrong speed, or a lower voltage rating.
- Testing with an ohmmeter in circuit, or with the set live.
- Trusting the look of the fuse.
- Pulling fuses with the power on. (NEETS: power off, circuit discharged,
  and an insulated puller for clip holders.)
- "Swap it and see" with a load that blows fuses: see the welder exercise.

**The switch as a part**

- **Good**: closed, about 0 Ω and no voltage across it while current flows.
  Open, no continuity and the full supply across it.
- **How it fails.** Contacts burnt and pitted by arcing, which is worse on DC
  and worst with coils and motors. (ModEL, with a photograph of a burnt pair
  beside a good pair.) A film of tarnish or dirt, especially where the current
  is too small to keep the contacts clean. (ModEL, Kuphaldt.) The mechanism
  itself, since it has moving parts (Kuphaldt raises this as a question for
  the class and does not answer it). His note is the one to teach: a corroded contact is seldom
  a clean break. It is usually a sizeable resistance that will not hold still,
  so the fault comes and goes. No source gives figures for how often each.
  Contacts welded shut by too much current: Unverified as a common failure
  (Kuphaldt's textbook mentions only gold contacts cold-welding under force).
- **In circuit.** A bad switch shows as a voltage across it when it is closed.
  Fischelli's worked case: a 12.6 V lamp circuit with 4.0 V across the closed
  switch, leaving 8.6 V for a dim lamp (recomputed). He gives, as the motor
  trade's limits, 0.3 V across switch contacts, 0.2 V along a heavy cable and
  0.1 V across a heavy connection. A switch stuck closed (mine, from the
  fault tables in Kuphaldt's troubleshooting worksheet): the lamp cannot be
  put out, and there is never any voltage across the switch.
- **Out of circuit.** Continuity in both positions: a beep when on, none when
  off. Kuphaldt: on a board, disconnect one supply wire first, then measure
  across the switch on and off. A caution from Fischelli, with my wording of
  the reason: an ohmmeter can pass a switch that fails under load, because a
  resistance too small for the meter to show still drops volts at a large
  current. (His own explanation, that the meter's small current meets no
  resistance, is not sound.)
- **From the 1979 bench**: a corroded service switch could kill the picture.
  Spraying tuner cleaner in and working the switch to and fro brought it back
  for a while. The same cure was used on noisy volume controls.

### Exercises found

Kuphaldt's are CC BY and may be adapted with credit. The rest are ideas.

1. **Open or short?** Which kind of fault makes too much current flow, a part
   gone open or a part gone short? What is the harm in a wire carrying too
   much? *A short. An open means less current or none. The wire overheats and
   may start a fire.* Kuphaldt, overcurrent worksheet, question 1.
2. **In line, or across?** Should a fuse go in series with what it guards or
   in parallel with it, and why? *In series: only then does all the load's
   current pass through it, and only then does its opening stop that current.
   Across the load it would be by-passed.* Kuphaldt, note to question 4.
   NEETS, question 6.
3. **Whose fuse is it?** Does the breaker at the house panel protect the
   television? If not, where should the television's protection be? *No: it
   protects the house wiring. In the set, at its mains input (mine: Kuphaldt
   leaves the follow-up open). ModEL's figures make the sum: a set that should
   draw 1 A faults to 5 A, and a 20 A breaker holds.* Kuphaldt, question 5.
   ModEL.
4. **Three fuses, three shorts.** A supply with its own 10 A fuse, a 5 A fuse
   at the start of the wire, a 1 A fuse inside the load. Which blows for a
   short inside the load? Between the two wires? Across the supply's own
   terminals? *The 1 A. The 5 A. The 10 A.* Then true or false: "the 5 A fuse
   can never blow, because the 1 A always goes first" (*false: a short between
   the wires never passes through the 1 A fuse*), "moved to the other supply
   wire, the 5 A fuse would no longer protect" (*false: one loop, one
   current*), "a fuse limits voltage as well as current" (*false*). ModEL,
   tutorial 2.6 and question 5.1.8. The module prints no answers to 5.1.8:
   those three are mine.
5. **Two fuses side by side.** Two 100 A fuses in parallel to make "200 A". A
   connection to one of them corrodes. Fuses start to blow with the meter
   showing under 200 A. Why? *The current no longer splits evenly. Kuphaldt's
   answer circuit has 150 A dividing between resistances in the ratio 1 to 3:
   112.5 A and 37.5 A (recomputed), so one fuse is over its rating while the
   total is well under. With that split the first fuse reaches 100 A at a
   total of only 133 A (mine).* Kuphaldt, question 6. The unit of his two
   resistances was lost in extraction. Only the ratio matters. A use for the
   current-divider idea in №0005.
6. **Four good readings, one blown fuse.** A motor fed through two fuses has
   stopped. An electrician measures 120 V from each of the four fuse terminals
   to earth and declares both fuses good. Is he right? *No. Which measurement
   settles it? Across each fuse: nothing across a good one, the supply across
   a blown one (the follow-up answer is mine).* Kuphaldt, question 8, and
   ModEL 5.3.1.
7. **The welder that killed two sockets.** Each socket has its own fuses.
   Welder 1 is dead and welder 2 works. You swap their plugs between sockets,
   and now neither works, even when swapped back. Where is the fault, and why
   was swapping a bad idea? *In welder 1. It blew the fuses at its own socket,
   then at the second one (the second half is mine: Kuphaldt gives only the
   location).* Kuphaldt, troubleshooting strategies, question 11. The shop
   version: a customer's set that blows the bench supply's fuse.
8. **More than its rating.** Can a fuse carry more than its rated current? For
   how long? *Yes. A little over, for hours or for ever. Twice its rating,
   about a second or a few, depending on its speed.* Kuphaldt's question 9
   asks the learner to read this off a curve and gives no answer. The figures
   are from NEETS (0.7 s, 1.5 s and 10 s at twice the rating) and
   electronics-notes (1.6 times for half an hour).
9. **"The meter says the fuse is shorted."** You test a fuse with an ohmmeter
   and it reads 0 Ω. What do you do? *Put it back. That is a good fuse.* NEETS,
   question 22. A trick question that tests whether "short" has been
   understood.
10. **The fuse the meter blew.** A 1/500 A fuse reads open. So does its
    replacement, straight from the box. Why, and how should it be tested?
    *The ohmmeter's own current is more than 2 mA (1/500 A, recomputed). Test
    it with a known resistor in series.* NEETS, questions 23 and 24.
11. **No exact spare.** The set wants a ½ A, 125 V fuse of a given speed. On
    the shelf: the same but 250 V; the same but ⅜ A; the same but faster; the
    same but ⅝ A; the same but 32 V. Which will do? *The 250 V one is the best
    stand-in. The faster one and the ⅜ A one are safe but may blow in normal
    use. The ⅝ A and the 32 V must not be used.* After NEETS, question 26,
    whose own list is in military part codes (and adds one of the wrong
    physical size, also refused).
12. **Choosing the size.** A circuit draws 1.5 A. What fuse? *2 A, since
    1.5 ÷ 0.75 = 2.0 (recomputed). In a hot corner of the set where the fuse
    is good for only 80% of its rating, 2.5 A.* Littelfuse's worked example.
13. **Is the switch good?** A lamp will not light. There is no voltage across
    the lamp and no voltage across the switch. Has that proved the switch
    good? *No. With a break elsewhere there is no voltage across anything.*
    And: with the lamp dark and the switch on, which of these is possible: the
    lamp open, the switch open, the switch shorted? *The first two.* Kuphaldt,
    basic troubleshooting, questions 15 and 16.
14. **The dim lamp.** 12.6 V supply. The meter shows 4.0 V across the closed
    switch. What does the lamp get, and what is wrong? *8.6 V (recomputed).
    The switch contacts have resistance: it should show next to nothing.*
    After Fischelli.

Two more, for ideas only:

- OpenStax, chapter 20, problem 93: a short of 0.5 Ω in a 120 V flex, a
  breaker that takes 0.05 s. My working: 240 A, 28.8 kW, 1,440 J, and a rise
  of about 860 °C in the 2 g of material round the short. Why a fuse must be
  fast.
- ModEL, series module, question 7.3.4: an 800 W oven on 240 V with a 5 A
  fuse will not heat, and seven voltage readings between numbered terminals
  are given. What does each prove? No answers are printed, and the terminal
  drawing did not survive extraction, so this one must be read from the PDF.

### Build the lesson round

1. **One loop: supply, fuse, switch, the set.** Let the learner raise the
   load, or drop a short across it, and watch the fuse wire heat with the
   square of the current and part. The fuse is "the thinnest wire in the loop,
   put where you can get at it". Tie the size of the short to №0010: the most
   a supply can give is its voltage over its internal resistance, and the fuse
   has to break that.
2. **Then the meter.** A good fuse is a piece of wire: 0 V across it. A blown
   one is the open from №0004 and №0011: the whole supply across it. Then out
   of the holder, on continuity. This is the fault sign the learner already
   owns, met in a part made to fail.
3. **Make the job a comeback.** The set arrives dead with a blown fuse. A new
   fuse blows at once. The lesson's one idea: the fuse is the messenger. Find
   out why before fitting a third.
4. **Offer the wrong fuse.** Put a 3 A fuse in the drawer beside the right
   315 mA one. If the learner fits it, the short now burns a track or a
   resistor (ModEL's photograph is this exact story).
5. **Leave for a note, not a step**: fast against slow, with the television's
   switch-on surge as the reason for a "T" fuse. And the switch aside: a dim
   lamp with volts across a closed switch, cured for a week with cleaner.

---

## 2. The thermistor, with a note on the LDR

### Sources

Kuphaldt

- Socratic worksheet, [Temperature coefficient of resistance (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/temp_r.pdf), 10 questions. CC BY 1.0. Mirror: [allaboutcircuits.com/worksheets/temperature-coefficient-of-resistance](https://www.allaboutcircuits.com/worksheets/temperature-coefficient-of-resistance/). CC BY 1.0.
- Socratic worksheet, [DC bridge circuits (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/bridge.pdf), questions 4, 13, 14 and 15 (thermistors and photoresistors). CC BY 1.0. Mirror, first page: [allaboutcircuits.com/worksheets/dc-bridge-circuits](https://www.allaboutcircuits.com/worksheets/dc-bridge-circuits/).
- ModEL, [Sensors Overview (PDF)](https://www.ibiblio.org/kuphaldt/socratic/model/mod_sensors.pdf), last updated 12 May 2026. CC BY 4.0.
- ModEL, [Series Circuits and Voltage Dividers (PDF)](https://www.ibiblio.org/kuphaldt/socratic/model/mod_series.pdf), section 2.4, light and temperature sensor circuits. CC BY 4.0.
- *Lessons in Electric Circuits*, [Temperature coefficient of resistance](https://www.allaboutcircuits.com/textbook/direct-current/chpt-12/temperature-coefficient-resistance/) and [Nonlinear conduction](https://www.allaboutcircuits.com/textbook/direct-current/chpt-2/nonlinear-conduction/). Design Science License. Neither names the thermistor.
- Loaded and of no use here: [DC transducers (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/dcsense.pdf) (Hall effect only), [Voltage divider circuits (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/e_divide.pdf) and [Series DC circuits (PDF)](https://www.ibiblio.org/kuphaldt/socratic/output/dc_s.pdf) (no sensor questions).

Tutorials

- Electronics-Tutorials, [Thermistors](https://www.electronics-tutorials.ws/io/thermistors.html) and [Light sensors](https://www.electronics-tutorials.ws/io/io_4.html). © AspenCore.
- electronics-notes.com, [Thermistor](https://www.electronics-notes.com/articles/electronic_components/resistors/thermistor-technology-types.php), [PTC thermistor](https://www.electronics-notes.com/articles/electronic_components/resistors/thermistor-ptc-positive-temperature-coefficient.php) and [Light dependent resistor](https://www.electronics-notes.com/articles/electronic_components/resistors/light-dependent-resistor-ldr.php). © electronics-notes.com.
- learnabout-electronics.org, [Temperature effects on resistance](https://learnabout-electronics.org/Resistors/resistors_01a.php). © Eric Coates. Its [amplifier module 5.5](https://learnabout-electronics.org/Amplifiers/amplifiers55.php) was opened to look for thermistors in output-stage biasing: it uses diodes, and has none.
- OpenStax College Physics 2e, [20.3 Resistance and resistivity](https://openstax.org/books/college-physics-2e/pages/20-3-resistance-and-resistivity) and [chapter 20 problems](https://openstax.org/books/college-physics-2e/pages/20-problems-exercises). CC BY-NC-SA 4.0 with the AI notice.

University lab sheets

- MIT 22.071/6.071, spring 2006, [Lab 6, resistor networks 2 (PDF)](https://ocw.mit.edu/courses/6-071j-introduction-to-electronics-signals-and-measurement-spring-2006/37d31874f64c1873cdd5774a219ab83e_lab6rnetworks.pdf), Chaniotakis and Cory: a voltage-divider thermometer. None stated on the PDF.
- Bucknell ELEC 101, [lab 3, page 2 (PDF)](https://www.eg.bucknell.edu/~kozick/elec101/lab3_2.pdf), 1999: sensor dividers and pre-lab questions. None stated.
- Olin College, ISIM, [Lab 2: monitoring temperature (PDF)](https://pages.olin.edu/files/isim/files/m3.lab_.thermistor.pdf). None stated.

Makers

- EPCOS (TDK), [NTC thermistors for inrush current limiting (PDF)](https://www.tdk-electronics.tdk.com/download/2982800/f5be4fca9d1f66204de9cf37891e5265/ntc-thermistors-icl-an.pdf), application note, 2013. © EPCOS AG.
- Vishay Ametherm, [PTC and NTC inrush current limiters: solutions for current protection (PDF)](https://www.vishay.com/docs/24002/solutionscurrentprotection.pdf), document 24002, revised 22 April 2025.

The repair bench

- Goldwasser, [What is a posistor?](https://repairfaq.org/samnew/tvfaq/tvposistor.htm), [Degaussing a CRT](https://repairfaq.org/samnew/tvfaq/tvdegacrt.htm), [TV blows fuse](https://repairfaq.org/samnew/tvfaq/tvtvbfuse.htm) and the [switchmode supply notes](https://repairfaq.org/sam/smpsfaq.htm). © Goldwasser.
- gammaelectronics.xyz: [New in color TV for 1970](https://www.gammaelectronics.xyz/color_tv_10.html) (no author, date or licence on the page) and [Repairing old TVs](https://gammaelectronics.xyz/electronic-srvc_mag_1979-10_tv.html) (*Electronic Servicing*, October 1979).

Reference

- Wikipedia, [Thermistor](https://en.wikipedia.org/wiki/Thermistor), [Photoresistor](https://en.wikipedia.org/wiki/Photoresistor) and [Degaussing](https://en.wikipedia.org/wiki/Degaussing). CC BY-SA 4.0.

### How it works

- A thermistor is a resistor made on purpose to change with temperature. It
  is a small bead or disc of metal oxides (manganese, nickel, cobalt, copper,
  iron), pressed from powder, baked hard, with a lead on each face.
  (Electronics-Tutorials, electronics-notes, EPCOS.)
- **NTC** (negative temperature coefficient): hotter means *less* resistance.
  The material is a semiconductor. Few of its electrons are free to move.
  Heat shakes more of them loose, so it conducts better. (OpenStax, Wikipedia,
  and a footnote in the Olin sheet.) A metal goes the other way: its electrons
  are free already, and heat only makes the atoms jostle and get in the way.
  (learnabout-electronics.)
- **The change is large and it is not a straight line.** The table on
  Electronics-Tutorials for a "10 k" part: 18.5 kΩ at 10 °C, 10 kΩ at 25 °C,
  4.08 kΩ at 50 °C, 973 Ω at 100 °C. I recomputed all thirteen rows from its
  B value of 3455 and they agree. That is about 4% less for each degree near
  room temperature (mine), against about 0.4% *more* per degree for copper
  (Kuphaldt's table). Steep when cold, flat when hot.
- **It warms itself.** Any current through it makes heat in it. That gives two
  ways of using one: with a tiny current, so that it takes the temperature of
  its surroundings (a sensor), or with a large one, so that it heats itself
  and changes the circuit it is in (a surge limiter, a self-resetting fuse, a
  degaussing timer). electronics-notes names these "sensor mode" and
  "self-heating mode" for the PTC, and the split serves for both kinds.
- **PTC** (positive): the switching kind is a different ceramic (barium
  titanate, says Wikipedia). It stays low in resistance until it reaches a
  set temperature and then climbs steeply, so it behaves almost as a switch
  that opens when hot. (electronics-notes.)
- **The LDR** is the same idea with light for heat. A zigzag track of cadmium
  sulphide on a ceramic disc. Light knocks electrons free, so more light
  means less resistance. In the dark, megohms. In bright light, a few hundred
  ohms. It is slow: tens of milliseconds to respond to light and up to a
  second to recover in the dark (electronics-notes, Wikipedia), or several
  seconds by Electronics-Tutorials' account. It has no polarity. (ModEL.)

### What it is for, and where it is found

**NTC, as a sensor**

- In series with a fixed resistor it makes a voltage divider, and the voltage
  at the join tells the temperature. Every source teaches it this way.
- Car coolant, oil and air temperature senders, feeding the dashboard gauge
  and the engine computer. Digital thermostats, clinical thermometers,
  battery packs on charge, fire alarms. (Wikipedia, OpenStax,
  electronics-notes.) Today, 3D printer hot ends. (Wikipedia.)
- Cancelling out the drift of other parts that rise with temperature.
  (electronics-notes.) The much-repeated use in the output stage of a
  transistor radio or amplifier, to hold the bias steady: Unverified. The one
  page I opened on that circuit uses diodes.

**NTC, heating itself: the surge limiter**

- A disc in series with the mains input. Cold, it has some ohms and holds
  back the rush of current into empty smoothing capacitors. Within seconds it
  is hot and down to a small part of an ohm, and wastes little. EPCOS: cold
  values from 1 to 80 Ω, falling by a factor of 30 to 50. Its list of uses
  includes switched-mode supplies, amplifiers, monitors and colour television
  sets. Vishay's example: 10 Ω cold, 0.05 Ω hot.
- It must cool before it can do it again: 30 seconds to 2 minutes. (EPCOS.)
- In an old valve colour set: the 1979 bench article has a set with its
  degaussing thermistor missing, dead but for the valve heaters. The part
  doubled as the surge resistor, so its leads could be joined for a test but
  not left joined.

**PTC**

- **Degaussing a colour television.** A coil round the face of the tube is
  fed from the mains through a PTC "posistor". Cold, the posistor passes a
  large alternating current. It heats, its resistance climbs, and the current
  dies away smoothly to almost nothing, which is what wipes the magnetism off
  the tube's shadow mask. This is the thump and hum at switch-on. (Goldwasser,
  Wikipedia.) The common part has three legs: the PTC disc and a heater disc
  across the mains, clamped together, the heater keeping the PTC hot while the
  set is on. (Goldwasser.) It works only from cold: he allows about a quarter
  of an hour off between goes. Not every set did it this way: in the 1970
  model year Philco used a posistor, while RCA and Admiral used the charging
  current of the smoothing capacitors (Admiral with a thermal switch to take
  the coil out afterwards). (The unattributed page at gammaelectronics.)
- **The self-resetting fuse.** A PTC in series with a load. Too much current
  heats it past its switching point, its resistance jumps, the current drops,
  and it resets when it cools. (electronics-notes.)
- Heaters, and protecting motor windings. (Wikipedia.)

**LDR**

- Camera light meters, clock radios that dim at night, night lights, street
  lamps that come on at dusk, light-beam alarms, flame detectors, and (paired
  with a small lamp) audio compressors and guitar-amplifier tremolo.
  (Wikipedia, electronics-notes, Electronics-Tutorials.)
- A television that sets its own brightness by the light in the room:
  Unverified.
- Cadmium is now restricted in Europe, so new designs avoid CdS cells.
  (electronics-notes, Wikipedia.) In 1984 they were everywhere.

### Ratings and markings

- **Resistance at 25 °C**, written R25. This is the number a thermistor is
  known by: a "10 k thermistor" is 10 kΩ at 25 °C. Common sensor values 2.2 k,
  10 k, 47 k. (Electronics-Tutorials, MIT.) Surge limiters 1 to 80 Ω. (EPCOS.)
- **B value**, a number in the thousands (3,000 to 5,000 is usual) that says
  how steeply the resistance falls. With temperatures in kelvin,
  R = R25 × e^(B × (1/T − 1/298)). (Electronics-Tutorials, Wikipedia, and the
  Olin sheet, whose part is 1 kΩ with B = 3528.) Not for a first lesson. A
  table of a few points does the same work.
- **Tolerance**: EPCOS offers ±10% on its surge limiters as the tighter
  choice, and MIT's sheet assumes 10% for its sensor. So a reading within a
  tenth or two of R25 at room temperature is a pass (mine).
- **For self-heating parts**: the largest steady current, the largest power,
  and for surge limiters the largest capacitor they may charge. (EPCOS.) For a
  PTC, its switching temperature. (electronics-notes.) "Hold" and "trip"
  currents for resettable fuses: Unverified (search snippet only).
- **Time constant**: how long it takes to make 63% of a change. The same 63%
  as the capacitor in №0012. (Electronics-Tutorials.)
- **Symbol**: a resistor with a bent diagonal line through it, marked −t° or
  +t°. (electronics-notes, ModEL's drawings.) The LDR: a resistor with two
  arrows pointing at it.
- **Printed on the part**: what is marked on the body of a disc or bead, and
  any colour code. Unverified: none of the pages I loaded covers it.
- **LDR**: resistance at a stated light level (10 lux, 100 lux), dark
  resistance a second or more after the light goes, largest voltage and
  power. (electronics-notes.) The classic ORP12: about 10 MΩ dark, about
  100 Ω fully lit. (Electronics-Tutorials.)

### How they teach it

- **Start from what every conductor does.** Kuphaldt's textbook and OpenStax
  begin with ordinary wire: metals rise a little with temperature, and
  carbon, silicon and germanium fall. The thermistor is then that same effect
  made large on purpose. OpenStax's lamp filament (0.35 Ω cold, 4.8 Ω at
  white heat, recomputed) is the PTC every learner has already met: it is the
  cold filament of №0003.
- **Then the divider, drawn four ways.** ModEL's series module has the best
  single picture: sensor above or below the fixed resistor, NTC or PTC, and
  under each drawing whether the output rises or falls with temperature. It
  does the same for a photocell. Bucknell asks the same three questions
  before the lab.
- **Then hands on it.** MIT, Bucknell and Olin all have the student squeeze
  the thermistor between finger and thumb and watch the voltage move. MIT
  asks how close to 37 °C you can get.
- **Electronics-Tutorials' order**: what it is, NTC and PTC, R25, the B value
  and a table, the divider, self-heating, then the surge limiter.
- **What they warn against**
  - Deciding in advance which way the resistance should go. Kuphaldt's note:
    let the experiment say.
  - Mistaking some other effect for temperature. Kuphaldt's story of the
    lecturer who gripped a resistor and saw the meter drop at once: a change
    caused by heat is never instant.
  - Forgetting that which way the *voltage* moves depends on where the sensor
    sits in the divider. (ModEL, Bucknell.)
  - Treating it as a straight-line device. (Electronics-Tutorials, MIT.)
  - Self-heating: the measuring current warms a small bead and spoils the
    reading. (electronics-notes, Electronics-Tutorials.)
  - Expecting a surge limiter to work when it is still hot, or to protect
    against a short. A short heats it, its resistance falls, and it passes
    more. (Vishay.)
  - Expecting an LDR to be quick, or exact: its resistance also shifts with
    temperature. (Wikipedia.)

### Faulty or working

**How they fail**

| Part | How it fails | Source |
|---|---|---|
| NTC sensor bead | Open, from a cracked bead or a lead pulled off. Or drifted: a wrong value with nothing to see. Rarely short | Unverified in detail: this split, with figures of 63% open, 22% drift and 15% short, is from a US Navy page seen only as a search snippet |
| NTC surge limiter | Cracked, pin-holed or burnt disc, checked for by eye. One of Goldwasser's contributors says they usually fail short, often after a lightning surge. Vishay: a short further on can destroy one | Goldwasser, Vishay. Wikipedia pictures a burnt one |
| Degaussing posistor | Most often a short across the mains, which blows the set's fuse at once. Taken out, the set runs, without degaussing | Goldwasser |
| The joints to it | A bad joint that cuts the degaussing current off sharply leaves coloured patches | Unverified: search snippet of a Goldwasser page I did not open |
| LDR | No page I loaded says how they fail | Unverified |

No loaded page gives verified figures for how often each happens.

**What the meter reads, in circuit.** For a sensor in a divider the rule is
the divider rule from №0006. My figures, for a 9 V supply, 10 kΩ on top and
the Electronics-Tutorials 10 k NTC below, reading across the thermistor:

| Condition | Reading |
|---|---|
| 10 °C | 5.84 V |
| 25 °C | 4.50 V |
| 50 °C | 2.61 V |
| 100 °C | 0.80 V |
| Thermistor open | 9 V: the whole supply, as if it were colder than cold |
| Thermistor shorted | 0 V, as if it were hotter than hot |
| Fixed resistor open | 0 V |
| Thermistor drifted | A believable voltage that is wrong. Only a known temperature shows it up |

Kuphaldt's bridge worksheet asks for exactly this kind of prediction (a
thermistor open, a thermistor bridged by solder, a fixed resistor open) and
answers that the meter is driven hard over one way or the other.

For a surge limiter in series with the supply (my figures from Vishay's
example): working and warm, 0.05 Ω at 10 A is half a volt across it and 5 W
of heat. Open, the whole supply is across it and the set is dead. It runs
hot in normal use, and that is not a fault. (EPCOS.)

**What the meter reads, out of circuit**

- **At room temperature, about R25.** Not exactly: the room is seldom 25 °C
  and the part has a tolerance. The 10 k part reads 12.2 kΩ at 20 °C and
  8.3 kΩ at 30 °C. (Electronics-Tutorials' table, recomputed.)
- **Then warm it and watch.** Between finger and thumb an NTC falls steadily
  over some seconds. (MIT, Bucknell, Olin.) A surge limiter should go from
  tens of ohms cold to very little under a hair dryer. (Goldwasser.) A PTC
  starts low and rises. No reading at all is an open part. A reading that
  will not move with heat is a dead part or a plain resistor.
- **LDR**: megohms with a thumb over it, a few hundred ohms to a few kilohms
  under a torch, and a second or so to climb back when covered.
  (Electronics-Tutorials and electronics-notes for the values. As a test
  procedure it is mine.)

**Beginners' mistakes**

- Measuring it in circuit, where the meter reads everything in parallel with
  it.
- Holding both leads in the fingers: the body is a resistor in parallel, and
  the hand warms the part. The first shows as a jump, the second as a creep.
  (After Kuphaldt's story. The explanation of the jump is mine: he leaves it
  to the student.)
- Calling a part faulty because it does not read exactly its marked value.
- Testing a surge limiter still hot from use.
- Leaving a posistor out, or linked across, because "the set works without
  it". (The 1979 article: a link is for testing only.)
- Fitting an NTC where a PTC was, or the other way about.
- Blaming the thermistor for a wrong divider voltage without checking the
  fixed resistor and the supply.

### Exercises found

1. **The instant change.** A lecturer clips an ohmmeter to an ordinary carbon
   resistor, grips the resistor, and the reading falls at once and by a lot.
   "Temperature", he says. What is wrong with the demonstration? *Heat takes
   time to soak in, so a change caused by temperature cannot be instant.* What
   was the meter really showing? *His fingers, in parallel (mine).* Kuphaldt,
   temperature coefficient worksheet, question 2. The best single question
   found, and it doubles as the rule for testing a thermistor by hand.
2. **Which way does the voltage go?** A sensor and a fixed resistor across a
   supply. For an NTC below the resistor, an NTC above it, a PTC below and a
   PTC above: does the output rise or fall as it gets hotter? *Falls, rises,
   rises, falls.* How would you make a circuit that goes the other way? *Swap
   the two parts over.* ModEL series module, section 2.4. Bucknell, pre-lab
   questions 1 to 3.
3. **Half the supply.** A 10 k thermistor in series with a 10 kΩ resistor.
   What is the output at 25 °C? *Half the supply, whatever the supply is.*
   Electronics-Tutorials, example 2. Carried on with its own table (mine): on
   9 V with the thermistor below, 2.61 V at 50 °C and 0.80 V at 100 °C.
4. **Work back from the voltage.** 5 V supply, thermistor on top, 10 kΩ
   below, output across the 10 kΩ. Write the thermistor's resistance in terms
   of what you can measure. *R = 10 kΩ × (5 V − Vout) ÷ Vout.* At 25 °C the
   output is 2.5 V. You pinch the thermistor: up or down? *Up. At 35 °C,
   where MIT's part is 6.5 kΩ, 3.03 V (mine).* MIT lab 6, experiment 2.
5. **The best fixed resistor.** A sensor swings between 1 kΩ and 5 kΩ. What
   fixed resistor gives the biggest swing in voltage? *The square root of the
   two multiplied together: 2.24 kΩ.* On 5 V, do the two outputs clear 3.5 V
   and 1.5 V? *No: 3.45 V and 1.55 V, a near miss (recomputed).* Bucknell,
   pre-lab questions 4 and 5. Too much for a first lesson as a sum, but "why
   is the fixed resistor about the same size as the sensor?" is a fair
   question without numbers.
6. **Positive or negative?** A data sheet's table runs from 66 kΩ at −40 °C to
   97 kΩ at 20 °C to 161 kΩ at 100 °C. Which kind is it? *PTC: it rises. About
   0.7 kΩ for each degree (mine).* ModEL sensors module, question 4.2.4.
7. **Name the fault.** A temperature circuit reads hard over one way and will
   not move. Name two faults that would do it. Kuphaldt, bridge worksheet,
   questions 13 to 15. His answers are in terms of a bridge whose drawing I
   could not see. For a plain divider (mine): stuck at the supply, the lower
   part is open or the upper is shorted. Stuck at 0 V, the upper part is open
   or the lower is shorted. ModEL adds a good rider: name two faults a
   voltmeter alone cannot tell apart.
8. **How hot is the filament?** A 12 V lamp measures 5.7 Ω cold and draws
   225 mA lit. *53.3 Ω hot, so about 1,900 °C by the tungsten figure
   (recomputed: 1,918 °C, Kuphaldt gives 3,484 °F).* What current does it take
   at the instant of switch-on? *2.1 A, over nine times its running current
   (mine).* Kuphaldt, question 10. This is why slow fuses exist and why surge
   limiters exist, in one lamp.
9. **The surge limiter.** 10 Ω cold, 0.05 Ω hot, 10 A running. How much does
   it waste once hot? *5 W, and half a volt (mine).* The set is switched off
   and straight back on. What happens to the surge? *It is hardly limited:
   the disc is still hot and still low.* After Vishay's example and its list
   of cases where an NTC is the wrong choice.
10. **Only from cold.** A colour set shows patches of wrong colour after a
    loudspeaker was stood beside it. Switching it off and on does nothing.
    Leaving it off for twenty minutes and switching on clears it. Why? *The
    posistor has to be cold to pass the burst of current that degausses the
    tube.* Made from Goldwasser and Wikipedia: not a question either asks.
11. **The same circuit with light.** 10 V, 10 kΩ on top, an LDR below: 50 kΩ
    in dim light, 2 kΩ in bright. *8.33 V and 1.67 V.* electronics-notes'
    example. Its page prints 0.166 V for the second, which is a slip:
    recomputed.
12. **Is it a thermometer?** Two identical thermistors in the two halves of a
    bridge. What does the meter read with both at the same temperature? *0 V.*
    Can it tell you the temperature of the room? *No: only the difference
    between the two (mine: ModEL poses this as a challenge without an
    answer).* Kuphaldt, bridge worksheet, question 4, and ModEL sensors 4.1.4.

For ideas only: OpenStax, chapter 20, problem 37, a clinical thermometer
whose thermistor changes by −6% per degree and reads 82% of its 37 °C value.
My working: 40.0 °C. Its second part asks why a straight-line rule cannot
hold far from the starting point, which is the non-linearity warning.

### Build the lesson round

1. **Use the divider the learner already owns.** A 10 k NTC and a 10 kΩ
   resistor across the supply, a slider for temperature, and two readouts:
   the thermistor's resistance and the voltage at the join. One idea: this
   resistor's value follows the temperature, and a divider turns that into a
   voltage. A car's temperature gauge or a thermostat gives it a job.
2. **Let the curve be found.** Step the slider through 10, 25, 50 and 100 °C
   and have the learner notice that equal steps of temperature do not give
   equal steps of resistance. No formula.
3. **Ask the direction question before showing it**: with the thermistor
   moved to the top, does the reading rise or fall as it warms? This is
   ModEL's four-way picture, and it is where learners go wrong.
4. **End on the fault.** The gauge sits hard over at "cold" on a hot engine:
   the whole supply across the sensor, so the sensor (or its wire) is open.
   Then the bench test out of circuit: about R25 at room temperature, and a
   slow, steady fall in the warmth of the hand. Slow is the tell.
5. **Two notes, not steps.** The PTC as the thermistor that runs the other
   way and heats itself: the posistor behind the thump of a colour set at
   switch-on, and the reason a set blows its fuse the moment it is plugged
   in. And the LDR: the same circuit with a torch for the kettle.
