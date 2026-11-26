# Lesson blueprint

How to write a new lesson (a "job") for Ohmwork. Written for an agent that has
not seen the project before: follow it top to bottom.

A lesson is one TypeScript file of plain data in `src/lessons/`. There is no
lesson-specific code. The player (`src/lesson/main.ts`) turns the data into
screens, and the simulator computes every reading.

## 1. Before you write

Read these, in this order:

1. [`CURRICULUM.md`](CURRICULUM.md): which job comes next, what it may rely
   on, and which terms are already taught. A lesson may use a term only if an
   earlier job brought it in, or if it brings the term in itself.
2. [`RESEARCH.md`](RESEARCH.md), the section for your job: how other courses
   teach the topic, what learners get wrong, and exercises worth adapting.
   Take the idea of a question from there, never its wording.
3. [`src/lesson/types.ts`](src/lesson/types.ts): the format. It is short, and
   it is the authority if this file and it disagree.
4. The existing lesson nearest in shape to yours. Good models:
   `ohms-law.ts` (one part, sliders), `closed-loop.ts` (a switch),
   `parallel.ts` (branches, a switch and sliders), `voltage-divider.ts`
   (kilohms and milliamps), `real-battery.ts` (a meter on the drawing, and a
   fault drawn as a resistor inside the part).
5. For a job about a part (a fuse, a diode, a relay): section 6a, and the
   written part job nearest to yours. Good models: `fuse.ts` (a part that
   remembers: `reset` and `settle`), `thermistor.ts` (a slider of the part's
   own, and two fault switches), `capacitor.ts` and `coil.ts` (readings that
   take time), `diode.ts` and `led.ts` (a part that keeps a nearly fixed
   voltage), `relay.ts`, `transistor.ts` and `mosfet.ts` (parts with three
   ends or more). A part job has no sums: section 6a says what takes their
   place.

Then settle four things before writing a line:

- **The one idea.** One sentence. If it needs "and", it is two lessons.
- **The circuit.** The smallest one that shows the idea. One circuit per
  lesson.
- **The fault.** What is wrong with the customer's set, and how the idea
  explains it. The last step lands here.
- **The numbers.** Values that give whole numbers, or one decimal place, at
  every step. Work them out by hand first. In a part job they are readings to
  recognise, not answers to work out: choose values that read cleanly.

## 2. The file

`src/lessons/<id>.ts`, where `<id>` is kebab-case and also the address
(`lesson.html?id=<id>`). Export one constant in camelCase.

```ts
import type { Lesson } from "../lesson/types";

// What the circuit is, in a sentence. Explain any line of it that is not
// already explained in ohms-law.ts.
const circuit = `$ 1 0.000005 10.2 38 12 50
v 128 320 128 96 16 0 40 12 0 0 0.5
w 128 96 352 96 0
r 352 96 352 320 0 6
w 352 320 128 320 0`;

export const myLesson: Lesson = {
    id: "my-lesson",
    title: "The topic",                      // a noun phrase: "Series circuits"
    summary: "One sentence on what it teaches, for the home page.",
    job: {
        title: "The symptom",                // "The fuse that keeps blowing"
        customer: "Name, with a thing",      // "Lena, with a camper van"
        request: "What they say when they hand it over.",
        thanks: "What they say when it is fixed.",
    },
    circuit,
    parts: {
        battery: { type: "Voltage" },
        resistor: { type: "Resistor" },      // nth: 1 for the second one, and so on
    },
    quantities: {
        voltage: { label: "Voltage", symbol: "V", unit: "V", part: "battery", setting: "Voltage" },
        resistance: { label: "Resistance", symbol: "R", unit: "Ω", part: "resistor", setting: "Resistance" },
        current: { label: "Current", symbol: "I", unit: "A", part: "resistor", measure: "current" },
    },
    steps: [
        // see section 5
    ],
};
```

Then add it to the list in [`src/lessons/index.ts`](src/lessons/index.ts), at
its place in the course. The job number comes from that place.

## 3. The circuit

CircuitJS1's text format: one part per line,
`<type> <x1> <y1> <x2> <y2> <flags> <settings...>`. Coordinates are multiples
of 16. Parts join only where their ends meet, so a wire that passes a junction
must be written as two wires that end there.

| Line | What it is |
|---|---|
| `$ 1 0.000005 10.2 38 12 50` | Options: show current dots; 5 µs timestep; speed; current-dot speed; voltage that gives full colour; power scale |
| `v 128 320 128 96 16 0 40 12 0 0 0.5` | DC battery of 12 V, + at the top. Flag 16 writes its voltage beside it |
| `r x1 y1 x2 y2 0 6` | Resistor, 6 Ω |
| `w x1 y1 x2 y2 0` | Wire |
| `s x1 y1 x2 y2 0 1 false` | Switch. Here `1` is open and `0` is closed |
| `181 x1 y1 x2 y2 0 300 24.015 12 0.4 0.4` | Lamp: see `closed-loop.ts` before using one |
| `p x1 y1 x2 y2 2 0 0 0` | Voltmeter between two points, drawn as a circle marked V. It draws no current. See `real-battery.ts` before using one |
| `x 229 130 251 133 4 18 R1` | A name written on the drawing, in 18 px text |

The part jobs added these. Each lesson's own comment explains its line in
full.

| Line | What it is |
|---|---|
| `404 x1 y1 x2 y2 0 0.001 27 0 false` | Fuse: 1 mΩ, I²t 27, no heat yet, not blown. It blows once the current stays above √(I²t ÷ 3), here 3 A, and stays blown until a step has `reset: true`. See `fuse.ts` |
| `350 x1 y1 x2 y2 0 10000 4000 0 100 0.2525 Temperature` | Thermistor: 10 kΩ at 25 °C, 4 kΩ at 50 °C, its slider from 0 to 100 °C and standing at 25 °C. See `thermistor.ts` |
| `c x1 y1 x2 y2 0 0.0001 0 0` | Capacitor: 100 µF, empty now, and empty after a reset. See `capacitor.ts` |
| `d x1 y1 x2 y2 2 default` | Diode, its arrow from (x1, y1) to (x2, y2). It drops about 0.6 V. See `diode.ts` |
| `162 x1 y1 x2 y2 2 default-led 1 0 0 0.02` | LED: red, at full brightness on the drawing at 20 mA. It drops about 1.8 V. See `led.ts` |
| `z x1 y1 x2 y2 2 default-zener` | Zener diode, 5.6 V, its arrow from (x1, y1) to (x2, y2): draw it pointing up to use it in reverse. See `zener.ts` |
| `l x1 y1 x2 y2 2 4 0 0 0` | Coil: 4 H, no current now. A plain switch that opens its only loop shows no kick: give its current a path. See `coil.ts` |
| `178 x1 y1 x2 y2 22 1 0.2 0 1e-9 1000000 0.075 120 0.03 0.005 0` | Relay with five ends: common, normally closed, normally open, and the coil's two. A 120 Ω coil that pulls in at 75 mA. See `relay.ts` |
| `t x1 y1 x2 y2 0 1 0 0 100 default` | NPN transistor, gain 100: base at (x1, y1), collector above and emitter below at x2. See `transistor.ts` |
| `f x1 y1 x2 y2 0 3 0.228310502283105` | N-channel MOSFET, threshold 3 V: gate at (x1, y1), drain above and source below at x2. See `mosfet.ts` |

More line types are listed at the top of `tests/comparison/circuits.ts`, and
each part's own are read in order by the constructor of its class in
`circuitjs1/ts/`.

In the `$` line, change only two numbers:

- **Current-dot speed** (fourth): `38` when currents are amps, `60` when they
  are milliamps. It is one setting for the whole circuit, so keep a lesson in
  one range.
- **Voltage for full colour** (fifth): the battery's usual voltage.

A circuit in which something takes time (a capacitor filling, a fuse
melting, a coil's current building) sets two more:

- **Timestep** (second), in seconds, and **speed** (third): the simulator
  runs 160 × the speed in timesteps every real second. 1 ms and 6.25 is real
  time (`capacitor.ts`). Choose them so that what the learner should watch
  takes one to five real seconds. A reading that is there and gone in under a
  quarter of a second will be missed: `coil.ts` runs at a seventh of real
  time so that its kick can be seen.

Lay the circuit out as the others are, so the course looks like one hand drew
it:

- Battery on the left, from (128, 320) up to (128, 96).
- Top rail at y = 96, bottom rail at y = 320.
- One loop: the load down the right at x = 352.
- Branches: columns at x = 288 and x = 448.
- Name a part along the top below its middle (`x 229 130 251 133 ...` for one
  from x = 128 to 352). Name a part down a column to the right of its middle
  (x + 20, y = 186).

## 4. Parts and quantities

**`parts`** gives names to elements. `type` is the CircuitJS1 type
(`"Voltage"`, `"Resistor"`, `"Switch"`, `"Lamp"`, `"Probe"` for the
voltmeter, `"Fuse"`, `"ThermistorNTC"`, `"Capacitor"`), and `nth` counts
elements of that type from 0 in the order the circuit text lists them.

**`quantities`** is what the learner sees. Their order is the order of the
readouts under the screen. There are four kinds:

| Kind | Written as | Notes |
|---|---|---|
| Setting | `setting: "Voltage"` or `"Resistance"` | Steps and sliders change it. The name is matched against the start of the names in CircuitJS1's edit dialog; a wrong one fails the tests with a list of the right ones |
| Slider | `slider: { min: 0, max: 100 }` | The part's own slider in CircuitJS1: a thermistor's temperature, a potentiometer's wiper. `min` and `max` are its values at the two ends of its travel, and it moves in hundredths of the travel. Steps and sliders change it as they do a setting |
| Measurement | `measure: "voltage" \| "current" \| "power"` | Across or through one two-ended part. The sign is dropped |
| Switch | `switch: true`, with no symbol or unit | Reads Closed or Open. In `set` and `goal`, 1 is closed and 0 is open |

Rules:

- A `symbol` is what formulas use: `V`, `I`, `R1`, `Vout`. Label measurements
  by where they are taken: "Through R1", "Across R2", "From battery".
- Units are base units: `V`, `A`, `Ω`, `W`. The player adds prefixes when it
  shows a value (0.003 A reads "3 mA", 2000 Ω reads "2 kΩ"), at three
  significant figures.
- A measurement too small for a shop meter reads 0: under a microamp, a
  millivolt or a microwatt. So a blown fuse passes "0 A", though
  the simulator makes it 1 GΩ and not a true gap.
- Keep to six readouts or fewer. Seven crowd the screen on a phone.
- Only list what the lesson uses.
- A part with three ends or more (a transistor, a relay) has no reading of
  its own. Read it through the two-ended parts round it: the current through
  its base resistor, the current through its load, a voltmeter (`p` line)
  across two of its ends.

## 5. The steps

Four kinds. Every step may carry `set`: values for settings and switches when
the step starts.

**The frame does not move.** The player shows every step in the same two
boxes: the monitor, and a sheet beside it (under it on a phone) that holds the
step's tag, its text, its answers, the note that says how it went, and the key
to go on in the bottom right corner. Both boxes are sized by the window alone,
so nothing a step says or asks can move or resize the monitor. A step that is
longer than the sheet scrolls inside the sheet. That keeps the monitor still,
but it hides the top of the question, so write to the lengths given below: at
1024 × 768 no step of the twenty lessons scrolls.

**Always give `set` in full**, on every step, with every value the step relies
on. A wrongly answered question comes back at the end of the job, alone, so no
step can count on the one before it. A question that follows an explore step
repeats the values that step ended at.

**Parts that remember.** A capacitor keeps its charge, a blown fuse stays
blown and a relay stays pulled in from one step to the next, and `set` cannot
change that. A step may carry `reset: true`: after `set`, the circuit starts
as at switch-on, with capacitors empty, coils without current, fuses whole and
relays let go. Give it on every step that relies on such a part starting
fresh. A lesson with such a part also gives `settle`, beside `steps`: the
simulated seconds its circuit takes to come to rest (a capacitor filling, a
fuse blowing, a relay pulling in). The tests run the circuit that long after
`set` and `reset` before they read a number question's answer, so a number
question asks about the circuit at rest, never about a moment on the way.

### `read`: shop notes

```ts
{
    kind: "read",
    title: "Ohm's law",
    set: { voltage: 12, resistance: 6 },
    text: "Both experiments follow one rule, called **Ohm's law**:",
    formula: "V = I × R",
    note: "Here: 2 A × 6 Ω = 12 V. Check it against the readings.",
}
```

- `text` and `note`: a blank line (`\n\n`) starts a paragraph, `**bold**` is
  bold, and `{current}` shows the live reading of a quantity.
- `formula`: put a space between every symbol and sign (`V = I × R`,
  `Vout = V × R2 ÷ (R1 + R2)`). Symbols that match a quantity are lit up.
  Use `×` and `÷`. It must fit a phone: the divider rule is about the longest
  that does.
- Two short paragraphs at most. One new term per paragraph, in bold where it
  is defined, and defined in that same sentence.

### `explore`: on the bench

```ts
{
    kind: "explore",
    title: "Turn up the voltage",
    set: { voltage: 12, resistance: 6 },
    text: "Drag the battery up to **24 V**, twice what it is now, and watch the current.",
    controls: [{ quantity: "voltage", min: 0, max: 24, step: 1 }],
    goal: { voltage: 24 },
    success: "Now look at the current: {current}.",
}
```

- The learner cannot go on until the goal is reached, so say the target in
  the text, in bold.
- `goal` holds settings and switches only, never measurements.
- A slider's goal must lie on its stops (`min` + a whole number of `step`s),
  and the step must not start there.
- Keep a resistance slider's `min` at 1 or more: 0 Ω shorts the battery.
- One slider is usual. Tell the learner what to watch.
- **A switch has no control.** Use `controls: []`, a goal of `{ switch: 1 }`
  or `{ switch: 0 }`, a `set` that starts it the other way, and text that says
  "Press the switch on the screen".
- `success` is shown once the goal is reached. Use live readings in it rather
  than typed numbers.

### `choice`: quick check

```ts
{
    kind: "choice",
    set: { voltage: 24, resistance: 6 },
    question: "You doubled the voltage. What happened to the current?",
    options: ["It doubled", "It halved", "It stayed the same"],
    answer: 0,
    explain: "The current went from 2 A to 4 A. Twice the push, twice the flow.",
}
```

- Three options, each about 22 characters at most.
- Wrong options are what a beginner really believes ("the current gets used
  up"), not filler.
- Options appear in the order written. **Vary where the right one sits** from
  question to question.
- `question` is plain text: no bold, no `{readings}`.
- `explain` is shown after a right and after a wrong answer, so it gives the
  reason, not "Correct". Bold and live readings work in it.

### `number`: work it out

```ts
{
    kind: "number",
    set: { voltage: 9, resistance: 3 },
    question: "The battery gives 9 V and the resistor is 3 Ω. What current flows?",
    solveFor: "current",
    answer: 3,
    explain: "I = V ÷ R = 9 V ÷ 3 Ω = 3 A",
}
```

- `set` must make the simulator produce `answer` for `solveFor`. The tests
  compare the two to nine decimal places, two timesteps after setting, or
  after the lesson's `settle` seconds.
- **"About" answers.** A diode drops about 0.7 V, never exactly, so a sum with
  one in it is only nearly round. Give such a step a `tolerance` (0.05 is 5%):
  the tests then let the simulator's value differ from `answer` by that much,
  and the learner's too. Say "about" in the question, give the rounded figure
  to use ("take the diode's drop as 0.7 V"), and keep the tolerance as tight
  as the simulator's value allows.
- `solveFor` may be a measurement or a setting. Asking for a setting is how
  to ask "how big is R?".
- While the question is open, that quantity's readout and the values on the
  drawing are hidden, and pointing at a part shows no reading in the asked
  unit. So **state every number the learner needs in the question itself**.
- `answer` is in the base unit. Prefer answers of 0.1 or more: a learner can
  type "3 mA", but the box is labelled in amps.
- A typed answer within 1% counts. Set `tolerance` only when the working
  rounds, or for an "about" answer.
- `question` and `explain` are plain text. `explain` is one line of working
  that ends at the answer.
- Use new values for each question, not the ones from the reading steps.

## 6. The shape of a job

A fundamentals job (Part 1 of `CURRICULUM.md`) has nine to thirteen steps, in
this arc. A job about a part follows section 6a instead.

1. **Meet the circuit** (`read`). What is new on the screen, tied to the last
   job: "The same loop as before, with a resistor where the lamp was."
2. **Try it, then say what happened** (`explore`, then `choice`), once or
   twice. The learner sees the effect before any rule is stated.
3. **Name the rule** (`read` with a `formula`), with the numbers on screen
   worked through in the `note`.
4. **Work it out** (two or three `number` steps): one for each unknown the
   formula can give.
5. **The set on the bench** (`read`, then a last `choice`). The real part or
   habit the idea shows up as, and the customer's fault explained by it.

## 6a. A job about a part

A part job is for someone learning to repair, not to design. It answers four
things about one part: how it works, what it is for, where you meet it, and
how to tell a good one from a dead one. **The learner never works anything
out**: a part job has no `number` steps and no `formula`. What they take away
is a picture of the part, and the readings and signs that tell a technician
at a glance that one is good, open, shorted or leaky.

**Readings, not sums.** A rule of thumb a technician says aloud is welcome
("a working diode keeps about 0.6 V for itself"). A question may state
readings, and its options may be readings, when the learner picks the right
one by knowing what a good or failed part shows, never by working it out.

The arc:

1. **Meet the part** (`read`). Its name, its symbol on the screen, and what is
   inside it, in a sentence or two a beginner can picture. No theory that the
   job does not use.
2. **See what it does** (`explore`, then `choice`), once or twice. The
   question asks what happened, or why: never how much.
3. **How it works** (`read`), in words: what goes on inside, and the one or
   two readings that go with a working one, the numbers worth carrying in
   your head.
4. **What it is for** (`read`). Two or three places the learner will meet it,
   in sets of the time. Its markings and ratings, as a repairer reads them to
   choose a replacement: match the old one, or better it.
5. **How it dies** (`read`). The ways it really fails, commonest first, and
   what you see, smell or hear: blackened glass, a bulging or leaking can, a
   cracked body, a scorched board, no click.
6. **Good, open or shorted** (`explore` with the fault switches, then
   `choice`). What the meter reads across a working one, an open one and a
   shorted one, in the set; and what it shows on ohms, out of the set.
7. **Spot it** (two or three `choice` steps). A reading or a sign, and the
   learner says what it means: good, open, shorted, leaky, in backwards. Every
   reading the question relies on is in the question.
8. **The customer's fault** (the last `choice`), found from readings or signs.

Ten to fourteen steps. The two fault signs of the fundamentals carry through
every part: an **open** part has the full supply across it and passes no
current, and a **shorted** part has 0 V across it and passes too much.

**Showing a fault on the screen.** The circuit cannot be changed part-way, so
a fault is built into the drawing and brought in by a step's `set`:

- A switch across the part shorts it. A switch in line with it opens it. Say
  so plainly: "The switch across the diode does what a shorted diode does."
- A resistor drawn as part of the component, as Ri is in `real-battery.ts`: a
  leak across a capacitor, burnt contacts in a relay. A slider wears it.
- Name fault switches and resistors on the drawing (`x` line), and keep to
  one or two. The readouts are still limited to six.

**The meter test.** A shop meter of the time, set to ohms, is a small battery
and a resistor: it passes a little current through the part and shows how
much flows. Where the part is tested out of the set, say what the meter
shows each way round, in the text. Do not draw a second circuit for it.

## 7. The story

The learner is the new hand at a TV and radio repair shop in 1984. Every
lesson is a job a customer brings in.

- **`title`**: the symptom, as a ticket heading. "The crackling knob".
- **`customer`**: "Name, with a thing". Rita runs the shop: jobs with no
  customer's set (training, checking readings) are hers.
- **`request`**: in the customer's own voice. They describe what they notice,
  never the cause, and they do not know electronics.
- **`thanks`**: one or two short sentences, after the fix.
- Write both without quotation marks: the ticket adds them.
- Nothing later than 1984: radios, televisions, cassette players, record
  players, car and caravan electrics, torches, fairy lights.
- A new name for each customer. Used so far: Rita, Mr. Okafor, Mrs. Papadaki,
  Lena, Ines, Tomasz, Mrs. Adeyemi, Mr. Castellano, Mr. Brennan, Yusuf,
  Mrs. Nakamura, Dev, Miss Abara, Mr. Halvorsen, Mrs. Farouk, Giorgos, Carmen,
  Bea.
- A new set for each customer too. Used so far: a kitchen radio, a string of
  lights, a camper van, a portable radio, a hi-fi amplifier, a cassette
  player, a portable television, a car radio, a taxi, a camera flashgun, a
  walkie-talkie, a hi-fi tuner, a CB radio, a door chime, a remote-control
  television, a burglar alarm, a lamp flasher built from a kit.

## 8. Voice

- Short, warm, shop-floor. An experienced technician talking, not a textbook.
- Plain words and short sentences. Say "you". British spelling.
- Lead with the rule, then the number: "Twice the push, twice the flow."
- Use a colon or a full stop where a dash would go.
- Refer back by day, not by lesson number: "as on your first day".
- Never: "Oops!", "Great job!", stacked exclamation marks, emoji.
- No points, scores, levels, streaks or lives, in text or anywhere else.
  Progress is only which jobs are done.

## 9. Check it

1. `npm run typecheck`
2. `npm test`. Before the lesson is in the course list, check it alone with a
   file of four lines: see the top of `tests/lessonChecks.ts`. For every
   lesson it checks that the circuit loads, that every
   name and `{reading}` exists, that every `set` is a setting, that each
   `number` answer is the simulator's, that explore goals can be reached, that
   the right answer is not in the same place in every choice question, and
   that the job's story is filled in.
3. Play it from start to finish at `lesson.html?id=<id>`, at full width and
   at phone width (375 px). Tests cannot see text that overflows, a question
   or explanation so long that the sheet has to scroll, or a dull question.
   On a small phone the sheet does scroll once the note appears; at full
   width it should not. `tests/play/playLesson.ts` plays a lesson through
   from the browser's console and reports, step by step, how far each step
   runs past the sheet: its first lines say how. Use it to find the steps to
   look at, not in place of looking. And keep the page in view while a
   lesson with timing in it plays: a hidden page runs slow.
4. Answer one question wrongly on purpose, and check that it reads right
   when it comes back at the end.

When a script or an agent plays a lesson, a click flips a switch only if it
lands on the middle third of the switch's arm, on the side the arm leans to.
A click elsewhere on the switch shows its readings and flips nothing.

## 10. Finish

- Add the job's entry to `CURRICULUM.md`: its row, its section, and its new
  terms. If it was in the planned list, move it out.
- Update the lessons row in `README.md`.

## What the format cannot do yet

Do not work round these in a lesson. They need a change to the player first,
and `CURRICULUM.md` lists which planned jobs wait on each.

- A trace of a reading over time, or a question about a moment in time. The
  readouts do move as a capacitor fills, so the learner can watch a reading
  rise and fall, but a question can only ask about the circuit at rest.
- The voltage at a point, measured against ground.
- A reading taken from a part with more than two ends itself (see section 4
  for the way round).
- Peak or RMS readings.
- More than one circuit in a lesson, or a change of circuit part-way.
- The learner adding, moving or editing parts. That is what the Bench is for.
