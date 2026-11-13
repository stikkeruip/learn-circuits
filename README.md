# learn-circuits

A Duolingo-style app for learning circuits. So far this repo holds the
simulator (Paul Falstad's full editor, running from his source) and our engine
API on top of it; lessons and our own visuals come later.

## What is here

| Path | What it is |
|---|---|
| `circuitjs1/` | Paul Falstad's [CircuitJS1](https://github.com/pfalstad/circuitjs1) simulator, unmodified, as a git submodule pinned to one commit (GPL-2.0). All circuit maths lives here. |
| `src/engine/` | Our wrapper: a small typed API over CircuitJS1's simulation. Works with no user interface (`create()`) or on top of the full editor (`attach()`). |
| `sim.html` + `src/sim/` | The simulator page: CircuitJS1's own interface (symbols, current animation, menus, drag-to-build editing, scopes) started from the clone, with the engine attached as `window.engine`. |
| `index.html` + `src/demo/` | The main page: the simulator in a frame, plus an optional live table of every component, read through the engine. |
| `iframe.html` | An empty page CircuitJS1's side panel asks for. |
| `tests/` | Physics checks, plus a run of all 373 CircuitJS1 example circuits through the engine (no user interface). |
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

Opens the app at http://localhost:5180. Pick a part from the toolbar or the
Draw menu and drag on the canvas to place it; right-click a part to edit or
delete it; the Circuits menu holds the examples. http://localhost:5180/sim.html
is the simulator on its own. Both accept CircuitJS1's own address options, e.g.
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
// (made with CircuitEngine.attach(app)); from the main page it is
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
