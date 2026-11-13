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
2. [`src/lesson/types.ts`](src/lesson/types.ts): the format. It is short, and
   it is the authority if this file and it disagree.
3. The existing lesson nearest in shape to yours. Good models:
   `ohms-law.ts` (one part, sliders), `closed-loop.ts` (a switch),
   `parallel.ts` (branches, a switch and sliders), `voltage-divider.ts`
   (kilohms and milliamps).

Then settle four things before writing a line:

- **The one idea.** One sentence. If it needs "and", it is two lessons.
- **The circuit.** The smallest one that shows the idea. One circuit per
  lesson.
- **The fault.** What is wrong with the customer's set, and how the idea
  explains it. The last step lands here.
- **The numbers.** Values that give whole numbers, or one decimal place, at
  every step. Work them out by hand first.

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
| `x 229 130 251 133 4 18 R1` | A name written on the drawing, in 18 px text |

More line types are listed at the top of `tests/comparison/circuits.ts`.

In the `$` line, change only two numbers:

- **Current-dot speed** (fourth): `38` when currents are amps, `60` when they
  are milliamps. It is one setting for the whole circuit, so keep a lesson in
  one range.
- **Voltage for full colour** (fifth): the battery's usual voltage.

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
(`"Voltage"`, `"Resistor"`, `"Switch"`, `"Lamp"`), and `nth` counts elements of
that type from 0 in the order the circuit text lists them.

**`quantities`** is what the learner sees. Their order is the order of the
readouts under the screen. There are three kinds:

| Kind | Written as | Notes |
|---|---|---|
| Setting | `setting: "Voltage"` or `"Resistance"` | Steps and sliders change it. The name is matched against the start of the names in CircuitJS1's edit dialog; a wrong one fails the tests with a list of the right ones |
| Measurement | `measure: "voltage" \| "current" \| "power"` | Across or through one two-ended part. The sign is dropped |
| Switch | `switch: true`, with no symbol or unit | Reads Closed or Open. In `set` and `goal`, 1 is closed and 0 is open |

Rules:

- A `symbol` is what formulas use: `V`, `I`, `R1`, `Vout`. Label measurements
  by where they are taken: "Through R1", "Across R2", "From battery".
- Units are base units: `V`, `A`, `Ω`, `W`. The player adds prefixes when it
  shows a value (0.003 A reads "3 mA", 2000 Ω reads "2 kΩ"), at three
  significant figures.
- Keep to six readouts or fewer. Seven crowd the screen on a phone.
- Only list what the lesson uses.

## 5. The steps

Four kinds. Every step may carry `set`: values for settings and switches when
the step starts.

**Always give `set` in full**, on every step, with every value the step relies
on. A wrongly answered question comes back at the end of the job, alone, so no
step can count on the one before it. A question that follows an explore step
repeats the values that step ended at.

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
  compare the two to nine decimal places, two timesteps after setting. So a
  circuit that takes time to settle (a lamp, a capacitor) cannot carry a
  number question as things stand.
- `solveFor` may be a measurement or a setting. Asking for a setting is how
  to ask "how big is R?".
- While the question is open, that quantity's readout and the values on the
  drawing are hidden, and pointing at a part shows no reading in the asked
  unit. So **state every number the learner needs in the question itself**.
- `answer` is in the base unit. Prefer answers of 0.1 or more: a learner can
  type "3 mA", but the box is labelled in amps.
- A typed answer within 1% counts. Set `tolerance` only when the working
  rounds.
- `question` and `explain` are plain text. `explain` is one line of working
  that ends at the answer.
- Use new values for each question, not the ones from the reading steps.

## 6. The shape of a job

Nine to thirteen steps, in this arc:

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
  Lena, Ines.

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
2. `npm test`. For every lesson it checks that the circuit loads, that every
   name and `{reading}` exists, that every `set` is a setting, that each
   `number` answer is the simulator's, that explore goals can be reached, and
   that the job's story is filled in.
3. Play it from start to finish at `lesson.html?id=<id>`, at full width and
   at phone width (375 px). Tests cannot see text that overflows, a long
   question that squeezes the screen, or a dull question.
4. Answer one question wrongly on purpose, and check that it reads right
   when it comes back at the end.

## 10. Finish

- Add the job's entry to `CURRICULUM.md`: its row, its section, and its new
  terms. If it was in the planned list, move it out.
- Update the lessons row in `README.md`.

## What the format cannot do yet

Do not work round these in a lesson. They need a change to the player first,
and `CURRICULUM.md` lists which planned jobs wait on each.

- A reading over time, or a question about a moment in time.
- The voltage at a point, measured against ground.
- A reading on a part with more than two ends.
- Peak or RMS readings.
- More than one circuit in a lesson, or a change of circuit part-way.
- The learner adding, moving or editing parts. That is what the Bench is for.
