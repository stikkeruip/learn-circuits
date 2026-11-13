# Design reference: Repair Shop '84

The look and story of the app (shown as **Ohmwork**): a 1980s TV and radio
repair shop. Each lesson is a repair job someone brings in. The bench is
cream, ink-outlined and physical; the circuit lives on a green-phosphor CRT.

| File | What it is |
|---|---|
| [`repair-shop-84-style.md`](repair-shop-84-style.md) | The style guide: colours, type, shapes, components, circuit rendering, motion, accessibility, voice. |
| [`ohmwork-repair-shop-84.pdf`](ohmwork-repair-shop-84.pdf) | The mock-ups: the job board (home), a lesson step, the Bench, and the kit sheet. |

## Where it lives in the code

- `src/ui/tokens.css`: the tokens (guide §12) and fonts (self-hosted from
  npm, no Google request). `src/ui/theme.css`: keycaps, panels, tickets and
  the DONE stamp on our own pages.
- `src/ui/crt.ts`: the phosphor colours, passed to CircuitJS1 through its
  own address options (`positiveColor=` and so on), so the simulator is not
  changed. 0 V uses the lifted `#417049` from guide §9.
- `src/sim/skin.css` and `src/sim/skin.ts`: the shop look over CircuitJS1's
  own menus, toolbar, side panel, sliders and dialogs, from the outside (its
  source is not changed). `?crt=true` adds the monitor's green-black and dot
  grid over the circuit; the Bench asks for it, lessons draw their own.
- `src/home/`: the job board. `src/lesson/`: a job, step by step.
  `src/bench/`: the Bench bar and the monitor bezel around CircuitJS1's editor.
- The story of each job (customer, request, thanks) is part of the lesson
  data: `job` in `src/lesson/types.ts`.

## Left out on purpose

The app tracks only which jobs are done. These parts of the mock-ups are not
used: XP, tech level, energy and chip counters, daily tickets, fuses (lives),
timed rush jobs, the tool wall that unlocks parts, and Top Techs.

## Not built yet

- The Bench of mock-up page 3 (parts bins, inspector, probes, fault finder).
  The Bench today is CircuitJS1's own editor in the shop's colours.
- Tubs' hints inside lessons, and a scene picture per job (the home page
  draws one generic bench).
- VT323 for the labels CircuitJS1 writes on the circuit (it uses its own font).
