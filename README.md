# learn-circuits

**Ohmwork**: learn circuits by working at a 1980s TV and radio repair shop.
Each lesson is a repair job someone brings in, built around a live circuit on
a green-phosphor monitor, and the Bench is where you build your own. The
simulator is Paul Falstad's full editor, running from his source, with our
engine API on top of it. The look and story are in [`docs/design/`](docs/design/README.md).

## What is here

| Path | What it is |
|---|---|
| `circuitjs1/` | Paul Falstad's [CircuitJS1](https://github.com/pfalstad/circuitjs1) simulator, unmodified, as a git submodule pinned to one commit (GPL-2.0). All circuit maths lives here. |
| `src/engine/` | Our wrapper: a small typed API over CircuitJS1's simulation. Works with no user interface (`create()`) or on top of the full editor (`attach()`). |
| `sim.html` + `src/sim/` | The simulator page: CircuitJS1's own interface (symbols, current animation, menus, drag-to-build editing, scopes) started from the clone, with the engine attached as `window.engine`. Its menus, toolbar, side panel and dialogs wear the shop's look from the outside (`skin.css`, `skin.ts`). |
| `index.html` + `src/home/` | The home page, as the shop's job board: the job on the bench now, the path of jobs (which are done, which is next), and the way into the Bench. |
| `bench.html` + `src/bench/` | The Bench: the full simulator in a bench-monitor frame, to build anything, plus an optional live table of every component, read through the engine. A lesson's circuit opens here from the end of the lesson or from the home page. |
| `lesson.html` + `src/lesson/` | The lesson player: one lesson, told as a repair job (the ticket first, then a step at a time) (read, move a slider or flip a switch, multiple choice, work out a number), with the simulator in a frame driving every reading. Pointing at (or tapping) a part or wire shows what the simulator reads there (`src/lesson/probe.ts`); switches on the drawing can be flipped, but nothing in it can be added, moved or edited (`engine.editable = false`), and the probe never shows a question's answer. A wrongly answered question comes back at the end. Which lessons the learner has finished is kept in the browser's `localStorage` by `src/lesson/progress.ts`; there is no server or account yet. |
| `src/lessons/` | The lessons, as data in the format of `src/lesson/types.ts`. Seven so far, in course order (`src/lessons/index.ts`): the closed loop (`lesson.html?id=closed-loop`), Ohm's law (`ohms-law`), power (`power`), series (`series`), parallel (`parallel`), voltage dividers (`voltage-divider`) and Kirchhoff's laws (`kirchhoff`): the fundamentals, before any part other than the resistor. |
| `src/ui/` | The Repair Shop '84 look shared by our pages: `tokens.css` (colours, fonts), `theme.css` (keycaps, tickets) and `crt.ts` (the phosphor colours CircuitJS1 draws the circuit in, set through its own address options). |
| `docs/design/` | The style guide and mock-ups the look comes from, and what of them is built. |
| `iframe.html` | An empty page CircuitJS1's side panel asks for. |
| `tests/` | Physics checks, plus a run of all 373 CircuitJS1 example circuits through the engine (no user interface). `lessons.test.ts` loads every lesson into the engine and checks each stated answer against the simulator. |
| `tests/comparison/` | Seven hand-written circuits and a script that compares our results with Falstad's live site. On 2026-11-13 every number matched to the last bit; see its README. |

## Running

After a fresh clone, fetch the simulator source first (or clone with
`--recurse-submodules`):

```bash
git submodule update --init
```

```bash
npm install
```

```bash
npm run dev
```

Opens the home page at http://localhost:5180. The Bench is
http://localhost:5180/bench.html: pick a part from the toolbar or the Draw menu
and drag on the canvas to place it; right-click a part to edit or delete it;
the Circuits menu holds the examples. http://localhost:5180/sim.html is the
simulator on its own, and http://localhost:5180/lesson.html?id=ohms-law is the
Ohm's law lesson. The Bench and the simulator accept CircuitJS1's own address
options, e.g.
`?startCircuit=lrc.txt`, `?hideSidebar=true`, `?hideMenu=true`,
`?whiteBackground=true`, `?running=false`, `?editable=false`.

```bash
npm test
```

```bash
npm run typecheck
```

## Using the engine

```ts
import { CircuitEngine } from "./src/engine";

const engine = CircuitEngine.create();      // no user interface; one per page (CircuitJS1 keeps global state)
// On the simulator page the same API is already there as window.engine
// (made with CircuitEngine.attach(app)); from the Bench it is
// frame.contentWindow.engine.
engine.load(circuitText);                   // CircuitJS1 text or XML export

engine.start();                             // continuous, real time
engine.on("frame", () => {                  // ~60 times a second while running
    for (const el of engine.elements)
        console.log(el.id, el.type, el.voltageDiff, el.current, el.posts);
});

const [sw] = engine.byType("Switch");
sw.toggle();                                // change the circuit while it runs
engine.byType("Resistor")[0].setParam("resistance", 220);
engine.add("Resistor", 96, 64, 192, 64);    // grid coordinates
engine.remove(sw);

engine.stop();
engine.step(100);                           // exact timesteps, for tests or jumping ahead
engine.error;                               // { message, element } when CircuitJS1 stops on a problem
```

Events: `step` (every simulated timestep), `frame`, `analyze` (circuit changed),
`error`. Anything the wrapper does not cover is reachable through `engine.app`,
`engine.sim` and `element.raw`, which are the real CircuitJS1 objects.

## How it fits together

Nothing in `circuitjs1/` is edited, so updating the simulator is
`git submodule update --remote circuitjs1` followed by `npm test`, then
committing the new pinned commit.

- **With the editor** (`src/sim/main.ts`): starts CircuitJS1 exactly as its
  own `main.ts` does, then calls `CircuitEngine.attach(app)`. CircuitJS1 keeps
  running, drawing and handling the mouse; the engine reads and changes the
  same circuit and listens in on its timestep, analyse and frame hooks.
  CircuitJS1 lays itself out over a whole window, so other pages embed
  `sim.html` in a frame. That also gives each embedded circuit its own copy of
  CircuitJS1's global state.
- **Without a user interface** (`src/engine/headlessApp.ts`): constructs
  CircuitJS1's real app object and replaces only its screen, menu and mouse
  parts with inert stand-ins. `CircuitEngine` then drives the same three calls
  CircuitJS1's own frame loop makes (`analyzeCircuit`,
  `preStampAndStampCircuit`, `runCircuit`). Used by the tests, and useful for
  checking a circuit without showing it.
- **Build wiring** (`vite.config.ts`): CircuitJS1's `public/` folder is served
  as ours; its `ModuleBase` module (where it looks for those files) is swapped
  for `src/sim/moduleBase.ts`; its About page is served from the clone.

## Notes

- **Licence.** CircuitJS1 is GPL-2.0. That places no limits on personal use; if
  you pass the app to someone else, give them the source as well.
- **Node.** `.npmrc` sets `legacy-peer-deps` because npm 10's dependency
  resolver crashes on this dependency set under Node 23.
- **Dropbox.** The File menu's Dropbox items do nothing: CircuitJS1's page
  loads Dropbox's script with Falstad's app key, and ours leaves that out.
- **Shorted sources.** Current CircuitJS1 does not raise an error for a wire
  across a voltage source; it gives the source 1 mΩ of internal resistance, so
  the short shows up as a very large current.
