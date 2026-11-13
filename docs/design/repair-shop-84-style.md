# Repair Shop '84 — style guide

Visual system for **Ohmwork**, a circuitry and electrical-engineering learning app.
Theme: a 1980s TV & radio repair bench. Customers drop off broken gear, each repair is
a unit, boss levels are timed rush jobs, and levelling up buys tools off the wall that
unlock new parts in the sandbox.

The look: **ink-outlined keycaps with hard shadows, test-gear cream, green-phosphor
screens, and manila repair tickets.** Everything on screen is either a *thing on the
bench* (panel, keycap, ticket, bin) or *something on the monitor* (the circuit).

---

## 1. Principles

1. **Two worlds, two rules.** Bench chrome is cream, outlined, physical. The circuit
   lives on a green CRT and never borrows bench colours. Don't mix them.
2. **Outline everything.** 2.5 px `#221E19` outlines and hard offset shadows, never
   soft blur. No gradients except the CRT bloom and the gloss inset on keys.
3. **Physical affordance.** Buttons have a ledge you can see; pressing sinks onto it.
   Drawers have a pull. Tickets have a punch hole.
4. **Readings are the hero.** Any number the simulator produces is set in VT323 on a
   dark screen, never in the body font.
5. **Earned, not decorative.** Every badge, meter and stamp reports real state. No
   invented stats.

---

## 2. Colour

### Bench (chrome)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#221E19` | Outlines, shadows, body text, dark panels |
| `--ink-deep` | `#0E0C0A` | Outline/shadow on dark panels (sidebar keys) |
| `--panel` | `#FBF6EA` | Card and key faces |
| `--backdrop` | `#EDE3CF` | Page ground (+ dot texture, below) |
| `--panel-dim` | `#E6DCC6` | Disabled faces |
| `--manila` | `#EBD9A6` | Repair tickets, quotes, callouts |
| `--pegboard` | `#D9C9A6` | Parts-bin panel, tool wall (+ hole texture) |
| `--bezel` | `#D9CDB4` | Instrument bezel around the CRT |
| `--metal` | `#B9B0A0` | Probe bodies, fuse caps, hardware |
| `--text-2` | `#4A433A` | Secondary prose |
| `--mono-label` | `#6B6255` | Space Mono captions on cream |
| `--mono-manila` | `#6B5A33` | Space Mono captions on manila |
| `--hairline` | `#8A7F6A` | Dashed "coming up" borders |
| `--disabled-edge` | `#A99C82` | Disabled outline + ledge |
| `--disabled-text` | `#7D725F` | Disabled label |

### Accents

| Token | Hex | Use |
|---|---|---|
| `--signal` | `#F26B1D` | Primary action, current step, progress fill |
| `--signal-press` | `#E05E14` | Pressed state of a signal key |
| `--amber` | `#F7A823` | Instruments, warnings, "in progress", selection boxes |
| `--copper` | `#C9773E` | The learning-path trace |
| `--brown` | `#7A4A2A` | Resistor bands, wood, logo stripes |
| `--gold` | `#C9A227` | Tolerance band, trim |
| `--live` | `#2F9E44` | Correct, running, "on the wall" |
| `--live-ink` | `#08200D` | Text on `--live` |
| `--fault` | `#D63A2A` | Boss, delete, wrong — **see §9, use `#C9321F` under cream text** |
| `--fault-ink` | `#FFF4E8` | Text on fault red |
| `--neon` | `#FF8A4C` | Shop-sign glow, fault marker on screen |

### Tints (feedback backgrounds)

| Token | Hex | With text |
|---|---|---|
| `--tint-correct` | `#DFF3D5` | `#1D5A28` |
| `--tint-wrong` | `#FBE0D8` | `#8E2015` |
| `--tint-selected` | `#FDE7B8` | `#221E19` |

### Screen (CRT only)

| Token | Hex | Use |
|---|---|---|
| `--crt` | `#0B140E` | Screen ground |
| `--crt-grid` | `#163020` | Dot grid |
| `--crt-panel` | `#0F1A14` | Readout boxes inside bench panels |
| `--phos` | `#8DF78A` | Default trace, screen text |
| `--phos-bright` | `#D8FFC9` | Highest node voltage |
| `--phos-mid` | `#A2C89B` | Mid voltage |
| `--phos-low` | `#517456` | Low voltage |
| `--phos-gnd` | `#2B4D35` | 0 V / ground — **see §9** |
| `--phos-dim` | `#5FA86C` | De-energised component labels |
| `--phos-dot` | `#F2FFE8` | Current dots |
| `--phos-bloom` | `#B8FF9F` | LED glow |

### Texture

```css
/* page ground */
background-color: #EDE3CF;
background-image: radial-gradient(#D8CBAE 2.2px, transparent 2.8px);
background-size: 26px 26px;

/* pegboard: parts bins, tool wall */
background-color: #D9C9A6;
background-image: radial-gradient(#B8A47D 2px, transparent 2.6px);
background-size: 18px 18px;
```

---

## 3. Typography

| Family | Weights / axes | Role |
|---|---|---|
| **Archivo** (variable) | `wght 400–900`, `wdth 62–125` | Headings, buttons, body |
| **Space Mono** | 400, 700 | Tickets, part codes, labels, toolbar text |
| **VT323** | 400 | Anything on a screen: readings, timers, in-circuit labels |

Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Space+Mono:wght@400;700&family=VT323&display=swap" rel="stylesheet">
```

### Scale

| Role | Size / weight / width | Notes |
|---|---|---|
| Board title | 46 px · 900 · `font-stretch: 125%` | Kit / splash only |
| Screen title (h1) | 30–34 px · 900 · 125% | `letter-spacing: -0.01em` |
| Section (h2) | 18 px · 900 · 125% | Uppercase |
| Card title | 15–17 px · 900 · 115% | |
| Button label | 13–16 px · 800–900 · 112% | Uppercase for bench keys |
| Body | 16 px · 400 · `line-height: 1.45` | Sentence case, never uppercase |
| Small | 14 px · 400 | |
| Mono label | 12–13 px · 700 · `letter-spacing: 0.1em` | Uppercase |
| Screen text | 19–24 px VT323 | On `--crt` only |
| Big readout | 30–44 px VT323 | Meter displays |

**Rules.** Headings are uppercase and expanded; prose is sentence case at normal width.
Space Mono carries metadata (`JOB №0002 · STEP 4`), never sentences. VT323 never appears
on a cream surface — put it in a `--crt-panel` box first. Use `№` for job and ticket
numbers, `·` as the separator, `Ω`, `µF`, `mA`, `V` with a space before the unit.

---

## 4. Shape, depth, spacing

```css
--radius-key: 10px;     /* buttons, small tiles        */
--radius-card: 14px;    /* panels                       */
--radius-bezel: 22px;   /* instrument housing + screen  */
--radius-ticket: 4px;   /* paper                        */
--outline: 2.5px solid #221E19;   /* chrome            */
--outline-node: 3px solid #221E19; /* path nodes, CRT bezel */
```

Depth is a **hard offset shadow, never a blur**:

| Element | Shadow |
|---|---|
| Panel | `6px 6px 0 #221E19` |
| Key (rest) | `0 5px 0 #221E19, inset 0 3px 0 rgba(255,255,255,.3)` |
| Key (pressed) | `0 1px 0 #221E19, inset 0 3px 4px rgba(0,0,0,.2)` + `transform: translateY(4px)` |
| Small tile | `0 4px 0 #221E19` |
| Ticket | `4px 4px 0 #221E19` |
| Path node | `0 6px 0 #221E19, inset 0 -5px 0 rgba(0,0,0,.15), inset 0 4px 0 rgba(255,255,255,.35)` |
| Dragged part | `6px 9px 0 rgba(34,30,25,.45)` + `rotate(-4deg) translateY(-4px)` |
| CRT | `inset 0 0 40px rgba(0,0,0,.85)` |

Spacing: 4 px base; gaps of 8 / 10 / 12 / 16 / 24 px; panel padding 22 px; page padding
`clamp(16px, 3vw, 56px)`. Grid: 12 columns, 24 px gutter.

---

## 5. Components

### Keycap button

```css
.key {
  min-height: 52px; padding: 0 24px;
  background: #F26B1D; color: #221E19;
  border: 2.5px solid #221E19; border-radius: 10px;
  box-shadow: 0 5px 0 #221E19, inset 0 3px 0 rgba(255,255,255,.3);
  font: 900 16px/1 Archivo; font-stretch: 115%; text-transform: uppercase;
  cursor: pointer;
}
.key:active { transform: translateY(4px);
  background: #E05E14; box-shadow: 0 1px 0 #221E19, inset 0 3px 4px rgba(0,0,0,.2); }
.key[disabled] { background: #E6DCC6; color: #7D725F;
  border-color: #A99C82; box-shadow: 0 5px 0 #A99C82; cursor: not-allowed; }
```

Variants: `--signal` primary · `--panel` secondary · `--live` continue ·
`--fault` destructive/dismiss · transparent face with ink outline for tertiary
("EXPLAIN"). Icon-only keys are 52 × 52 px and need an `aria-label`.
Minimum hit target 44 px.

### Path node

Circle, `3px` ink outline, 62 px (done / locked), 74 px (current, with a double ring:
`0 0 0 6px #FBF6EA, 0 0 0 9px #221E19`), 80 px (rush job, `--fault` face).
Locked uses `--panel-dim` + `--disabled-edge`. The connecting path is a **PCB trace**:
`#221E19` 16 px underlay, `#C9773E` 10 px on top, with a 3.5 px `#FFE2B8` dashed overlay
animated to look like current. Upcoming segments are `#B5A88E` 12 px, `dasharray 14 8`.

### Repair ticket

Manila `#EBD9A6`, `2px` ink border, `border-left: 6px dotted #221E19` (the tear strip),
4 px radius, `4px 4px 0` shadow, Space Mono throughout. Completed tickets go
`#F3EAD0` with `--hairline` edges, strike-through text and a rotated `DONE` stamp
(`3px` green outline, `rotate(-8deg)`).

### Instrument / CRT

Bezel `--bezel` with `2.5px` ink outline and 22 px radius, containing a `--crt` screen
with a 3 px ink border, dot grid, and a scanline overlay:

```css
/* scanlines: 1.5px black at 30% every 4px */
repeating-linear-gradient(to bottom, rgba(0,0,0,.3) 0 1.5px, transparent 1.5px 4px)
```

Readouts inside bench panels use `--crt-panel`, a 2.5 px ink border and 6 px radius.

### Parts bin

Drawer header: coloured face (`--signal`, `--amber`, `#3F7FBF`, `--live`, `--fault`,
`#8A8F99`), `2.5px` ink outline, radius `6px 6px 14px 14px`, with an inset cream label
plate (Space Mono) and a count `×4`. Locked drawers show `JOB 06` instead of a count and
use dashed `--hairline` edges. Part tiles: cream, `2.5px` ink, 10 px radius,
`0 4px 0` ledge, 56 × 28 symbol above a 13 px label.

### Progress and lives

- **Lesson progress:** 12 segments, 3 px gap, in an ink tray with 6 px radius —
  filled `--signal`, current `--amber`, empty `#4A4540`.
- **Job steps:** 5 chunky cells, 2 px ink border each.
- **Fuses (lives):** a drawn glass fuse; intact has a `--fault` filament, blown has a
  grey body `#5A524A` and a broken `--amber` filament. Five per shift.

---

## 6. Circuit rendering (the sandbox)

Follows Falstad's conventions — colour by node voltage, moving dots for current —
rendered in monochrome phosphor so it reads as a 1984 bench monitor.

| Thing | Spec |
|---|---|
| Wire stroke | 4 px, `round` caps and joins |
| Component stroke | 3.5 px |
| Voltage → colour | `#D8FFC9` (supply) → `#A2C89B` → `#517456` → `#2B4D35` (0 V). Brighter = higher. |
| Current dots | `#F2FFE8`, `stroke-width: 5`, `stroke-dasharray: 0 22`, `stroke-dashoffset` animated to `-22` over `0.6s linear infinite`. Faster animation = more current. |
| Junction | Filled 5.5 px dot in the wire's own voltage colour |
| Pin (unconnected) | 5 px `--crt` dot with a 2.5 px `--phos` ring |
| Hover pin | Adds a 13 px `--amber` ring |
| Selection | Dashed `--amber` rectangle, `stroke-dasharray: 6 4` |
| Suspected fault | Dashed `--neon` circle with an ✕ through it |
| Node readout | `--crt` box, 1.5 px `--phos` border, VT323 |
| Drop target | Dashed `--amber` rectangle; the dragged part floats above in bench style |
| De-energised label | `--phos-dim` so dead branches read as dead |

The LED bloom is a radial gradient of `--phos-bloom` at 75% → 0 opacity, radius ≈ 48 px.
Grid dots are 1.2 px `--crt-grid` on a 20 px pitch.

> The boards ship with hand-worked numbers. For a live sandbox, wire this layer to a real
> solver (a port of Falstad's engine, or any MNA solver) and drive the colours and dot
> speed from node voltages and branch currents.

---

## 7. Illustration and icons

- Line icons: 2.2–2.6 px stroke, `round` caps and joins, `currentColor`, 22 px in nav,
  18 px inline. Never emoji.
- Component symbols are a single shared set (ANSI/zig-zag resistor), drawn on a
  56 × 28 canvas so bins, lessons and the circuit all match.
- Scene illustrations (the boombox, the bench): flat fills, ink outlines, no gradients
  except glow. Every gadget is fictional — no real brand names or logos.
- **Mascot: Tubs**, a vacuum tube with a filament smile and an amber halo. Appears beside
  hints and empty states, never larger than 140 px, never speaking for the user.

---

## 8. Motion

| Name | Spec | Used for |
|---|---|---|
| `flow` | `stroke-dashoffset → -22`, `0.6s linear infinite` | Current dots, path trace |
| `glow` | opacity `.55 → 1`, `1.6s ease-in-out` | Fault marker, tube halo |
| `buzz` | opacity steps `1 → .4 → 1 → .5`, `4s steps(1)` | Shop sign flicker |
| `blink` | opacity `1 → .3`, `1s steps(1)` | Live/run indicator |

Press feedback is instantaneous (no transition). Everything decorative is wrapped in:

```css
@media (prefers-reduced-motion: reduce) { .flow, .glow, .buzz, .blink { animation: none; } }
```

---

## 9. Accessibility

Measured contrast in the current boards:

| Pair | Ratio | |
|---|---|---|
| `#221E19` on `#FBF6EA` | 15.4:1 | ✅ |
| `#221E19` on `#EDE3CF` | 13.0:1 | ✅ |
| `#4A433A` on `#FBF6EA` | 9.0:1 | ✅ |
| `#6B6255` on `#FBF6EA` | 5.6:1 | ✅ |
| `#221E19` on `#F26B1D` | 5.4:1 | ✅ |
| `#08200D` on `#2F9E44` | 5.0:1 | ✅ |
| `#8DF78A` on `#0B140E` | 14.1:1 | ✅ |
| `#5FA86C` on `#0B140E` | 6.5:1 | ✅ |
| `#1D5A28` on `#DFF3D5` | 7.0:1 | ✅ |
| `#8E2015` on `#FBE0D8` | 7.1:1 | ✅ |
| `#FFF4E8` on `#D63A2A` | 4.3:1 | ⚠️ below AA for body text |
| `#2B4D35` on `#0B140E` | 2.0:1 | ⚠️ below 3:1 for a meaningful graphic |

**Two fixes to apply when this becomes code:**

1. Use `#C9321F` (4.9:1) instead of `#D63A2A` behind `#FFF4E8` text. Keep `#D63A2A` for
   fills that carry no text.
2. Lift the 0 V wire to `#417049` (3.3:1), or keep it dark and mark ground with the
   ground symbol plus a label — voltage must never be carried by brightness alone.

Also non-negotiable:

- Real `<button>`, `<a href>`, `<input>` + `<label>` — never a clickable `div`.
- Answer choices are a `radiogroup`; correct/wrong is shown by icon **and** colour.
- Feedback banners are `role="status"`.
- Every circuit `<svg>` has `role="img"` and an `aria-label` describing the circuit and
  its readings, so a screen-reader user gets the same information as the picture.
- Decorative SVG is `aria-hidden="true"`.
- Disabled controls (3.5:1) are exempt, but never put essential information only there.

---

## 10. Voice

Short, warm, shop-floor. The app talks like an experienced tech, not a textbook.

- Headings: `THE SILENT BOOMBOX`, `NICE CATCH!`, `FUSE BLOWN`
- Explanations lead with the rule, then the number: *"With a break in a series loop, no
  current flows — so R1 and the speaker drop **0 V**, and the open joint gets the whole
  **9 V**."*
- Hints come from Tubs and stay under ten words: *"Where the volts pile up, the break is
  hiding."*
- Customers speak in quotes with a name: *"Right side plays fine, left side's dead."* — Mrs. Delgado
- Never: "Oops!", "Great job!", exclamation stacking, or emoji.

---

## 11. Don'ts

- No soft or blurred shadows, no gradient washes, no glassmorphism.
- No phosphor green on cream, and no cream orange inside the CRT.
- No rounded-corner card with a coloured left border (that's the other theme's ticket).
- Don't animate more than one thing per screen region.
- Don't invent readings: every number shown must come from the simulator.
- Don't use real manufacturer names, logos or model numbers on the gadgets.

---

## 12. Tokens

```css
:root {
  /* bench */
  --ink:#221E19;        --ink-deep:#0E0C0A;   --panel:#FBF6EA;      --backdrop:#EDE3CF;
  --panel-dim:#E6DCC6;  --manila:#EBD9A6;     --pegboard:#D9C9A6;   --bezel:#D9CDB4;
  --metal:#B9B0A0;      --text-2:#4A433A;     --mono-label:#6B6255; --mono-manila:#6B5A33;
  --hairline:#8A7F6A;   --disabled-edge:#A99C82; --disabled-text:#7D725F;
  /* accents */
  --signal:#F26B1D;     --signal-press:#E05E14; --amber:#F7A823;    --copper:#C9773E;
  --brown:#7A4A2A;      --gold:#C9A227;       --live:#2F9E44;       --live-ink:#08200D;
  --fault:#C9321F;      --fault-fill:#D63A2A; --fault-ink:#FFF4E8;  --neon:#FF8A4C;
  --tint-correct:#DFF3D5; --tint-correct-ink:#1D5A28;
  --tint-wrong:#FBE0D8;   --tint-wrong-ink:#8E2015;  --tint-selected:#FDE7B8;
  /* screen */
  --crt:#0B140E;        --crt-grid:#163020;   --crt-panel:#0F1A14;
  --phos:#8DF78A;       --phos-bright:#D8FFC9; --phos-mid:#A2C89B;  --phos-low:#517456;
  --phos-gnd:#417049;   --phos-dim:#5FA86C;   --phos-dot:#F2FFE8;   --phos-bloom:#B8FF9F;
  /* shape */
  --radius-key:10px;    --radius-card:14px;   --radius-bezel:22px;  --radius-ticket:4px;
  --outline:2.5px;      --ledge:5px;          --panel-shadow:6px 6px 0 var(--ink);
  /* type */
  --font-ui:'Archivo', system-ui, sans-serif;
  --font-mono:'Space Mono', ui-monospace, monospace;
  --font-screen:'VT323', monospace;
}
```

---

*Names, customers, tickets and stats across the boards are placeholders.*
