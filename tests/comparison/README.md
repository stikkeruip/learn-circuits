# Comparison with Falstad's live site

Checks that our simulator computes exactly what
https://www.falstad.com/circuit/circuitjs.html computes.

| File | What it is |
|---|---|
| `circuits.ts` | Seven circuits written by hand in CircuitJS1's text format: voltage divider, Wheatstone bridge, RC charging, RLC ringing, diode rectifier, transistor amplifier, op-amp amplifier. |
| `browser-script.ts` | Prints a script for the browser console. It loads each circuit through CircuitJS1's public JavaScript interface and samples it after 1, 2, 10, 100, 1000, 5000 and 20000 timesteps. |
| `falstad-site.json` | What that script produced on Falstad's site on 2026-11-13. |
| `../falstadSite.test.ts` | Runs the same circuits through the engine under Node (`npm test`) and compares with the recording. |

A sample is every number the simulator offers: the time, the voltage at every
terminal of every component, and the current through every component (15 to 40
numbers per circuit). Each sample is reduced to a SHA-256 fingerprint of the
raw 64-bit values, so two runs match only if every number is identical to the
last bit.

## Result (2026-11-13)

| Compared with Falstad's site | Circuits | Samples identical to the last bit |
|---|---|---|
| Our simulator page (`sim.html`), same browser | 7 | 49 of 49 |
| Our engine with no user interface, same browser | 7 | 49 of 49 |
| Our engine with no user interface, under Node 23 | 7 | 45 of 49 |

The four Node samples that are not bit-identical are in the diode and
transistor circuits and agree to 13 significant digits. The cause is the
JavaScript runtime, not the simulator: Node 23 and Chrome 156 return
`Math.exp`, `Math.log` and `Math.sin` results that differ in the final bit for
some inputs.

## Running it again

```bash
node tests/comparison/browser-script.ts
```

Paste the printed script into the browser console on Falstad's site and on
http://localhost:5180/sim.html, then in each console:

```js
(await __comparison).map(c => c.name + " " + c.samples.map(s => s.sha).join(" "))
```

The two outputs should be the same, and should match the `sha` values in
`falstad-site.json` for as long as the site runs the same simulator version as
the clone in `circuitjs1/`.

Two details the script takes care of:

- CircuitJS1 leaves wires, grounds and closed switches out of its equations and
  works out their currents once per drawn frame. The script therefore pauses on
  the wanted timestep and reads the values at the end of that frame.
- Browsers slow the timers of a tab that is not on screen, which would make the
  run take half an hour. While it runs, the script fires CircuitJS1's frame
  timers as soon as the page is idle. That changes the pacing only.
