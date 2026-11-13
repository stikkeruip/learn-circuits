// The Bench: the full simulator (sim.html, CircuitJS1's own interface) in a
// frame, to build and change any circuit, plus an optional live table of every
// component. The table reads and changes the circuit only through our
// CircuitEngine, which lives inside the frame, so it doubles as a check that
// the engine API works on top of the real editor.

import type { CircuitElement, CircuitEngine, ElementParam } from "../engine";
import { lessonUrl, nextLesson } from "../lesson/links";
import { lessons } from "../lessons";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const frame = $<HTMLIFrameElement>("sim");
const showTable = $<HTMLInputElement>("showTable");
const table = $<HTMLTableElement>("elements");

// ---- start the simulator ---------------------------------------------------

// The page's query string is handed to the simulator, which understands
// CircuitJS1's own options: ?startCircuit=lrc.txt, ?hideSidebar=true,
// ?whiteBackground=true, ?running=false ... (?circuit= is short for ?startCircuit=).
const query = new URLSearchParams(location.search);
const circuit = query.get("circuit");
if (circuit != null) {
    query.delete("circuit");
    query.set("startCircuit", circuit);
}

// Opened from a lesson (?from=<lesson id>, with the lesson's
// circuit in ?ctz=): say so, and link on to the next lesson.
const fromLesson = lessons.find(l => l.id === query.get("from"));
query.delete("from");
if (fromLesson != null) {
    const note = $("fromLesson");
    const next = nextLesson(fromLesson);
    const link = document.createElement("a");
    link.href = lessonUrl(next ?? fromLesson);
    link.textContent = next != null ? `Next lesson: ${next.title} →` : `Replay “${fromLesson.title}”`;
    note.append(`This is the circuit from the lesson “${fromLesson.title}”. Change anything you like. `, link);
    note.hidden = false;
}
const simLoaded = new Promise<CircuitEngine>(resolve => {
    frame.addEventListener("load", () => resolve((frame.contentWindow as any).engineReady), { once: true });
});
frame.src = "sim.html" + (query.size > 0 ? "?" + query : "");

const engine = await simLoaded;
(window as any).engine = engine;

// ---- live table ------------------------------------------------------------

function format(value: number, unit: string): string {
    if (!Number.isFinite(value))
        return String(value);
    const abs = Math.abs(value);
    if (abs === 0 || abs < 1e-15)
        return "0 " + unit;
    const scales: [number, string][] = [[1e9, "G"], [1e6, "M"], [1e3, "k"], [1, ""], [1e-3, "m"], [1e-6, "µ"], [1e-9, "n"], [1e-12, "p"]];
    const [scale, prefix] = scales.find(([s]) => abs >= s) ?? scales[scales.length - 1];
    return (value / scale).toPrecision(4) + " " + prefix + unit;
}

function paramControl(el: CircuitElement, param: ElementParam): HTMLElement | null {
    const label = document.createElement("label");
    const apply = (value: number | string | boolean) => {
        try {
            el.setParam(param.index, value);
        } catch (e) {
            alert(String(e));
        }
    };
    if (param.kind === "number") {
        const input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.value = String(param.value);
        input.onchange = () => apply(Number(input.value));
        label.append(param.name + " ", input);
    } else if (param.kind === "checkbox") {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = Boolean(param.value);
        input.onchange = () => apply(input.checked);
        label.append(input, " " + param.name);
    } else if (param.kind === "choice") {
        const select = document.createElement("select");
        param.options!.forEach((name, i) => select.add(new Option(name, String(i), false, i === param.value)));
        select.onchange = () => apply(Number(select.value));
        label.append(param.name + " ", select);
    } else {
        return null;
    }
    return label;
}

function controlsFor(el: CircuitElement): HTMLElement[] {
    const out: HTMLElement[] = [];
    if (el.isSwitch) {
        const button = document.createElement("button");
        button.textContent = "toggle";
        button.onclick = () => el.toggle();
        out.push(button);
    }
    if (el.hasSlider) {
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "100";
        slider.value = String(Math.round(el.raw.position * 100));
        slider.oninput = () => el.setSlider(Number(slider.value) / 100);
        out.push(slider);
    }
    for (const param of el.params()) {
        const control = paramControl(el, param);
        if (control != null)
            out.push(control);
    }
    return out;
}

interface Row { el: CircuitElement; row: HTMLTableRowElement; cells: HTMLTableCellElement[] }
let rows: Row[] = [];
let shownIds = "";
let stale = true;       // the circuit changed since the table was built
let lastRender = 0;

/** Point CircuitJS1 at an element, as if the mouse were over it on the canvas. */
function highlight(el: CircuitElement | null): void {
    engine.app.mouse.setMouseElm(el?.raw ?? null);
    engine.app.ui.repaint();
}

function rebuildTable(elements: CircuitElement[]): void {
    table.replaceChildren();
    const head = table.insertRow();
    for (const title of ["id", "type", "V terminals", "V across", "current", "power", "controls"]) {
        const th = document.createElement("th");
        th.textContent = title;
        head.append(th);
    }
    rows = elements.map(el => {
        const row = table.insertRow();
        row.insertCell().textContent = el.id;
        row.insertCell().textContent = el.type.replace(/Elm$/, "");
        const cells = [row.insertCell(), row.insertCell(), row.insertCell(), row.insertCell()];
        row.insertCell().append(...controlsFor(el));
        // Hovering a row highlights that part in the simulator, and the other way round (see render).
        row.addEventListener("pointerenter", () => highlight(el));
        row.addEventListener("pointerleave", () => highlight(null));
        return { el, row, cells };
    });
}

function render(): void {
    if (!showTable.checked)
        return;
    const now = performance.now();
    if (now - lastRender < 100)     // ten times a second is plenty for reading numbers
        return;
    lastRender = now;

    const elements = engine.elements;
    const ids = elements.map(e => e.id).join(",");
    // Rebuild when parts were added or removed, or when settings changed in
    // the simulator. Not while a control in the table is in use.
    if (ids !== shownIds || (stale && !table.contains(document.activeElement))) {
        shownIds = ids;
        stale = false;
        rebuildTable(elements);
    }
    const underMouse = engine.app.mouse.getMouseElm();
    for (const { el, row, cells } of rows) {
        const volts: string[] = [];
        for (let i = 0; i < el.postCount; i++)
            volts.push(format(el.voltage(i), "V"));
        cells[0].textContent = volts.join(" | ");
        const twoTerminal = el.postCount === 2;
        cells[1].textContent = twoTerminal ? format(el.voltageDiff, "V") : "";
        cells[2].textContent = el.postCount <= 2 ? format(el.current, "A") : "";
        cells[3].textContent = twoTerminal ? format(el.power, "W") : "";
        row.classList.toggle("hover", el.raw === underMouse);
    }
}

engine.on("frame", render);
engine.on("analyze", () => { stale = true; });

// ---- show / hide the table (remembered in this browser) --------------------

function applyTableChoice(): void {
    document.body.classList.toggle("no-table", !showTable.checked);
    try {
        localStorage.setItem("showTable", String(showTable.checked));
    } catch {
        // storage unavailable (private window): the choice just isn't remembered
    }
    // The simulator sizes its canvas from its window; tell it the frame changed.
    frame.contentWindow?.dispatchEvent(new Event("resize"));
    stale = true;
    lastRender = 0;
    render();
}
try {
    showTable.checked = localStorage.getItem("showTable") === "true";
} catch {
    // keep the default (hidden)
}
showTable.onchange = applyTableChoice;
applyTableChoice();
