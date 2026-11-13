// The lesson page: one lesson (lesson.html?id=ohms-law), told as a repair job
// at the shop, a step at a time, with the simulator (sim.html, CircuitJS1's
// own drawing and animation) on a CRT. The page changes and reads the circuit
// only through the CircuitEngine inside that frame, via LessonCircuit.
//
// The job ticket first, then one thing per screen: a progress bar, a Check
// key, and a footer that turns green or red. A question answered wrongly
// comes back at the end of the job until it is answered right.

import "../ui/theme.css";
import "./lesson.css";
import * as LZString from "lz-string";
import type { CircuitEngine, Probe } from "../engine";
import { lessons } from "../lessons";
import { phosphorOptions } from "../ui/crt";
import { LessonCircuit } from "./circuit";
import { formatValue, isClose, parseAnswer } from "./format";
import { benchUrl, jobNumber, lessonUrl, nextLesson } from "./links";
import { describePart, describeTerminal } from "./probe";
import { ProgressStore } from "./progress";
import type { ChoiceStep, ExploreStep, NumberStep, ReadStep, Step } from "./types";

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

const lessonId = new URLSearchParams(location.search).get("id");
const lesson = lessons.find(l => l.id === lessonId) ?? lessons[0];
const job = jobNumber(lesson);
document.title = `${lesson.job.title} · Ohmwork`;

const progress = $("progress");
const main = $("main");
const promptView = $("prompt");
const circuitCard = $("circuitCard");
const frame = $<HTMLIFrameElement>("circuitFrame");
const readoutsView = $("readouts");
const answerView = $("answer");
const footer = $("footer");
const feedback = $("feedback");
const primary = $<HTMLButtonElement>("primary");

// ---- start the simulator ---------------------------------------------------

// CircuitJS1's own address options: just the drawing, in phosphor colours.
// The circuit can be used but not changed: see engine.editable below.
const simOptions = new URLSearchParams({
    hideSidebar: "true",
    hideMenu: "true",
    hideInfoBox: "true",
    mouseWheelEdit: "false",
    showOhm: "true",
    ...phosphorOptions(),
    ctz: LZString.compressToEncodedURIComponent(lesson.circuit),
});
const engineReady = new Promise<CircuitEngine>(resolve => {
    frame.addEventListener("load", () => {
        // In a narrow window CircuitJS1 shows buttons for its menu and side
        // panel even when those are hidden; a lesson uses neither.
        const doc = frame.contentDocument!;
        const style = doc.createElement("style");
        // The drawing is dragged to move the view (a hand), and switches are
        // clicked (a pointer: see probeAt).
        style.textContent = ".triggerLabel, .toptriggerlabel { display: none !important; }"
            + " canvas.cursorPointer { cursor: grab; } canvas.cursorPointer:active { cursor: grabbing; }";
        doc.head.append(style);
        resolve((frame.contentWindow as any).engineReady);
    }, { once: true });
});
frame.src = "sim.html?" + simOptions;

const engine = await engineReady;
// Switches flip and buttons press, on the drawing as on the Bench, but no part
// can be added, moved, rewired, deleted or edited. (CircuitJS1's own
// editable=false option is not used: it puts a padlock on the drawing.)
engine.editable = false;
const circuit = new LessonCircuit(engine, lesson);

// ---- small helpers ---------------------------------------------------------

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text != null)
        node.textContent = text;
    return node;
}

function setText(node: HTMLElement, text: string): void {
    if (node.textContent !== text)
        node.textContent = text;
}

const ICONS = {
    check: "M5 12.5 L10 17.5 L19 7",
    cross: "M6.5 6.5 L17.5 17.5 M17.5 6.5 L6.5 17.5",
};

/** A line icon, drawn in the current text colour (lesson.css sets the stroke). */
function icon(name: keyof typeof ICONS, className?: string): SVGSVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    if (className)
        svg.setAttribute("class", className);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", ICONS[name]);
    svg.append(path);
    return svg;
}

const quantityNames = Object.keys(lesson.quantities);
const quantitySymbols = new Set(quantityNames.map(name => lesson.quantities[name].symbol));

function format(name: string): string {
    const q = lesson.quantities[name];
    if ("switch" in q)
        return circuit.read(name) === 1 ? "Closed" : "Open";
    return formatValue(circuit.read(name), q.unit);
}

/** Lesson text: paragraphs at blank lines, **bold**, and {quantity} as a live reading. */
function richText(text: string): HTMLParagraphElement[] {
    return text.split(/\n\s*\n/).map(paragraph => {
        const p = el("p");
        for (const part of paragraph.split(/(\*\*.+?\*\*|\{\w+\})/)) {
            if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
                p.append(el("strong", undefined, part.slice(2, -2)));
            } else if (/^\{\w+\}$/.test(part) && lesson.quantities[part.slice(1, -1)] != null) {
                const name = part.slice(1, -1);
                const live = el("span", "live", format(name));
                live.dataset.live = name;
                p.append(live);
            } else if (part !== "") {
                p.append(part);
            }
        }
        return p;
    });
}

/** A formula on a small screen, its quantities' symbols brighter. */
function formula(text: string): HTMLElement {
    const box = el("div", "formula");
    box.setAttribute("role", "math");
    box.setAttribute("aria-label", text);
    for (const token of text.split(/(\s+|[()])/))   // brackets apart, so "(R1" is still R1
        box.append(quantitySymbols.has(token) ? el("span", "symbol", token) : token);
    return box;
}

/** The manila tag over each screen: JOB №0001 · STEP 4 · QUICK CHECK. */
function tag(text: string): HTMLElement {
    return el("p", "tag mono", `Job ${job} · ${text}`);
}

const STEP_NAMES: Record<Step["kind"], string> = {
    read: "Shop notes",
    explore: "On the bench",
    choice: "Quick check",
    number: "Work it out",
};

// ---- readouts --------------------------------------------------------------

/** The quantity a number question asks for: its readout shows "?" until answered. */
let hiddenQuantity: string | null = null;

const readouts = new Map<string, { root: HTMLElement; value: HTMLElement }>();
readoutsView.replaceChildren();
for (const name of quantityNames) {
    const q = lesson.quantities[name];
    const root = el("div", "readout");
    const value = el("span", "value");
    // A switch has no symbol: its name stands in the symbol's place.
    const label = el("span", "label mono", q.symbol ?? q.label);
    if (q.symbol != null)
        label.append(el("span", "name", ` · ${q.label}`));
    root.append(label, value);
    readoutsView.append(root);
    readouts.set(name, { root, value });
}

function updateReadouts(): void {
    for (const [name, view] of readouts) {
        const hidden = name === hiddenQuantity;
        setText(view.value, hidden ? "?" : format(name));
        view.root.classList.toggle("unknown", hidden);
    }
    for (const span of document.querySelectorAll<HTMLElement>("[data-live]")) {
        const name = span.dataset.live!;
        setText(span, name === hiddenQuantity ? "?" : format(name));
    }
}

// ---- zoom ------------------------------------------------------------------

// The view is the learner's: the wheel or a pinch zooms, a drag moves it
// (engine.editable = false makes a drag move the view). The circuit starts
// fitted to the screen, and the Recentre key, which fades in once the view
// has been zoomed or moved, fits it again. When the screen changes size (the
// monitor grows and shrinks with what is around it), a fitted circuit is
// fitted anew and a moved view keeps what was in its middle in the middle.
// The fit is ours, not CircuitJS1's: its own caps the zoom and, in a narrow
// window, keeps room free for oscilloscope panels, so a small circuit would
// be drawn small.
const recentre = $<HTMLButtonElement>("recentre");
const frameDoc = frame.contentDocument!;
/** The fit for the screen's current size, applied or not. */
let fit: { transform: number[]; width: number; height: number } | null = null;

/** Measure the screen and work out the fit for it. */
function measureFit(): typeof fit {
    const app = engine.app;
    if (app.ui.elmList == null)
        return null;
    app.ui.setCircuitArea();
    const area = app.circuitArea;
    const bounds = app.ui.getCircuitBounds();
    if (bounds == null || area == null || area.width === 0 || area.height === 0)
        return null;
    // Margins leave room for the values CircuitJS1 writes beside the parts;
    // 2.5 is as far as its own zoom goes, so zooming in never jumps out.
    const scale = Math.min(area.width / (bounds.width + 96), area.height / (bounds.height + 72), 2.5);
    return {
        transform: [scale, 0, 0, scale,
            (area.width - bounds.width * scale) / 2 - bounds.x * scale,
            (area.height - bounds.height * scale) / 2 - bounds.y * scale],
        width: area.width,
        height: area.height,
    };
}

/**
 * Set by the learner's own zooming and dragging on the screen, cleared by a
 * fit. Only then is a view that differs from the fit theirs: a change the
 * simulator makes by itself is never mistaken for one.
 */
let viewTouched = false;
frameDoc.addEventListener("wheel", () => { viewTouched = true; }, { passive: true });
frameDoc.addEventListener("pointermove", event => {
    if (event.buttons !== 0)
        viewTouched = true;
});

/** True while the view is the learner's: zoomed or moved away from the fit. */
function viewMoved(): boolean {
    const t = engine.app.transform;
    return viewTouched && fit != null && t.some((v, i) => Math.abs(v - fit!.transform[i]) > 1e-6);
}

/** Fit the circuit to the screen. */
function fitDrawing(): void {
    fit = measureFit();
    if (fit == null)
        return;
    viewTouched = false;
    engine.app.transform.splice(0, 6, ...fit.transform);
    engine.app.ui.repaint();
}

/** The screen may have changed size: fit anew, or keep the learner's view where it was, its middle in the middle. */
function screenResized(): void {
    const before = fit;
    const moved = viewMoved();
    const after = measureFit();
    if (after == null)
        return;
    if (!moved || before == null) {
        fitDrawing();
        return;
    }
    const t = engine.app.transform;
    t[4] += (after.width - before.width) / 2;
    t[5] += (after.height - before.height) / 2;
    fit = after;
    engine.app.ui.repaint();
}

// CircuitJS1 centres the circuit through this one method (UIManager): after
// loading, and for a second after every resize. Ours takes its place, on this
// page's simulator only, so a view the learner has moved stays theirs.
engine.app.ui.centerCircuit = screenResized;
fitDrawing();

/** Once a frame: notice a change of screen size, and offer the key while the view is moved. */
function keepView(): void {
    const area = engine.app.circuitArea;
    if (fit == null || area == null || area.width !== fit.width || area.height !== fit.height)
        screenResized();
    const moved = viewMoved();
    recentre.classList.toggle("shown", moved);
    recentre.tabIndex = moved ? 0 : -1;
}

recentre.addEventListener("click", fitDrawing);

// ---- probe -----------------------------------------------------------------

// Point at a part or a wire (tap it, on a touch screen) to read what the
// simulator knows about it. The engine finds what is there the way CircuitJS1
// finds what its mouse is over, and highlights it the same way.
const screen = frame.parentElement!;
const probeBox = $("probe");
const probeTitle = probeBox.querySelector<HTMLElement>(".probe-title")!;
const probeRows = probeBox.querySelector<HTMLElement>(".probe-rows")!;

/** What is probed, and where the pointer is on the screen (CSS px from its inner top-left). */
let probed: { found: Probe; x: number; y: number } | null = null;
let probeLabels = "";

/** For pointer events inside the frame: their position is the frame's own. */
function probeAt(event: PointerEvent): void {
    // A move with a button held is a drag in CircuitJS1 (of the view, or a
    // selection box): no probe while it lasts, so as not to get in its way.
    if (event.type === "pointermove" && event.buttons !== 0) {
        if (probed != null) {
            probed = null;
            showProbe();
        }
        return;
    }
    const found = engine.probe(event.clientX, event.clientY);
    probed = found && { found, x: event.clientX + frame.offsetLeft, y: event.clientY + frame.offsetTop };
    engine.app.ui.cv.style.cursor = found?.element.isSwitch && event.buttons === 0 ? "pointer" : "";
    showProbe();
}

function endProbe(): void {
    probed = null;
    engine.endProbe();
    showProbe();
}

function showProbe(): void {
    probeBox.hidden = probed == null;
    if (probed == null)
        return;
    const { found: { element, terminal }, x, y } = probed;
    const hiddenUnit = hiddenQuantity != null ? lesson.quantities[hiddenQuantity].unit : null;
    const info = element.info();
    const view = terminal == null
        ? describePart(info, hiddenUnit)
        : describeTerminal(info[0] ?? "", formatValue(element.voltage(terminal), "V"), hiddenUnit);

    // Rebuild only when it shows other readings; values change every frame.
    const labels = [view.title, ...view.readings.map(r => r.label)].join("|");
    if (labels !== probeLabels) {
        probeLabels = labels;
        probeTitle.textContent = view.title;
        probeRows.replaceChildren(...view.readings.flatMap(r => [el("dt", undefined, r.label), el("dd")]));
    }
    const values = probeRows.querySelectorAll("dd");
    view.readings.forEach((r, i) => setText(values[i], r.value));

    // Beside the pointer, inside the screen.
    const gap = 16, edge = 6;
    const w = probeBox.offsetWidth, h = probeBox.offsetHeight;
    const width = screen.clientWidth, height = screen.clientHeight;
    const left = x + gap + w <= width - edge ? x + gap : Math.max(edge, x - gap - w);
    const top = y + gap + h <= height - edge ? y + gap : Math.max(edge, y - gap - h);
    probeBox.style.transform = `translate(${left}px, ${top}px)`;
}

frameDoc.addEventListener("pointermove", probeAt);
frameDoc.addEventListener("pointerdown", probeAt);
frameDoc.addEventListener("pointerout", event => {
    if (event.relatedTarget == null && event.pointerType === "mouse")   // out of the frame
        endProbe();
});
// A click on the drawing gives the keyboard to the simulator, which ignores it
// (engine.editable). Hand it straight back, so that the page's own keys go on
// working: Enter, and 1 2 3 for an answer.
frameDoc.addEventListener("pointerdown", () => setTimeout(() => frame.blur()));
// A touch probe stays until the next tap, on the screen or anywhere else.
document.addEventListener("pointerdown", () => {
    if (probed != null)
        endProbe();
});

/**
 * The step's own keeping up with the circuit, which the learner changes on
 * the drawing too: a switch is flipped there. Set by the step shown.
 */
let syncStep: (() => void) | null = null;

// Measured values change only when the simulator has run, so refresh after each of its frames.
engine.on("frame", () => {
    keepView();
    updateReadouts();
    syncStep?.();
    showProbe();
});

// ---- footer ----------------------------------------------------------------

let primaryAction: () => void = () => {};

/** The big key at the bottom right: orange to go on, green after a right answer, red after a wrong one. */
function setPrimary(label: string, enabled: boolean, action?: () => void, look: "primary" | "go" | "fault" = "primary"): void {
    primary.textContent = label;
    primary.disabled = !enabled;
    primary.className = "button " + look;
    if (action != null)
        primaryAction = action;
}
primary.addEventListener("click", () => primaryAction());

function clearFooter(): void {
    footer.className = "footer";
    feedback.replaceChildren();
}

/** Turn the footer green or red, with a ✓ or ✕ badge, a heading and some detail. */
function showFeedback(correct: boolean, title: string, detail: (string | Node)[]): void {
    footer.className = "footer " + (correct ? "correct" : "wrong");
    const badge = el("span", "badge");
    badge.append(icon(correct ? "check" : "cross"));
    const text = el("div");
    text.append(el("strong", undefined, title), ...detail);
    feedback.replaceChildren(badge, text);
}

function showResult(correct: boolean, detail: (string | Node)[], next: () => void): void {
    showFeedback(correct, correct ? praise() : "Not quite.", detail);
    if (correct)
        setPrimary("Continue", true, next, "go");
    else
        setPrimary("Got it", true, next, "fault");
    primary.focus();
}

// Short and shop-floor (docs/design/, "Voice").
const PRAISE = ["Nice catch!", "Spot on.", "That's the one.", "Clean work."];
const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

// ---- the run through the job -----------------------------------------------

/** Steps still to do, in order. A wrongly answered step is added again at the end. */
const queue = lesson.steps.map((_, i) => i);
let position = 0;
let started = false;
const completed = new Set<number>();
const stats = { attempts: 0, right: 0, started: Date.now() };
/** Which lessons are finished, kept in this browser. */
const learnerProgress = new ProgressStore();

const segments = lesson.steps.map(() => progress.appendChild(el("span")));

function updateProgress(): void {
    const done = completed.size;
    const onStep = started && position < queue.length;
    segments.forEach((segment, i) => {
        segment.className = i < done ? "done" : i === done && onStep ? "current" : "";
    });
    progress.setAttribute("aria-valuenow", String(Math.round(100 * done / lesson.steps.length)));
}

/** The job ticket: who brought it in and what they want. */
function showJob(): void {
    const ticket = el("div", "ticket job-ticket");
    ticket.append(el("p", undefined, `“${lesson.job.request}”`), el("p", "who", `— ${lesson.job.customer}`));
    const topic = el("p");
    topic.append(el("strong", undefined, lesson.title + ". "), lesson.summary);
    promptView.replaceChildren(tag("New job"), el("h1", "heading", lesson.job.title), topic, ticket);
    setPrimary("Start job", true, () => {
        started = true;
        stats.started = Date.now();
        showStep();
    });
    primary.focus();
}

function showStep(): void {
    const index = queue[position];
    const step = lesson.steps[index];
    syncStep = null;
    circuit.setAll(step.set);
    hiddenQuantity = step.kind === "number" ? step.solveFor : null;
    circuit.setLabels(hiddenQuantity == null);
    for (const view of readouts.values())
        view.root.classList.remove("revealed");
    promptView.replaceChildren(tag(`Step ${index + 1} · ${STEP_NAMES[step.kind]}`));
    answerView.replaceChildren();
    clearFooter();
    switch (step.kind) {
        case "read": showRead(step, index); break;
        case "explore": showExplore(step, index); break;
        case "choice": showChoice(step, index); break;
        case "number": showNumber(step, index); break;
    }
    updateProgress();
    updateReadouts();
    main.scrollTop = 0;
}

/** Move on. `passed` is false when the step was answered wrongly and will come back. */
function next(index: number, passed: boolean): void {
    if (passed)
        completed.add(index);
    else
        queue.push(index);
    position++;
    if (position < queue.length)
        showStep();
    else
        showComplete();
}

function record(correct: boolean): void {
    stats.attempts++;
    if (correct)
        stats.right++;
}

// ---- step kinds --------------------------------------------------------------

function showRead(step: ReadStep, index: number): void {
    promptView.append(el("h1", undefined, step.title), ...richText(step.text));
    if (step.formula != null)
        promptView.append(formula(step.formula));
    if (step.note != null)
        promptView.append(...richText(step.note));
    setPrimary("Continue", true, () => next(index, true));
}

function showExplore(step: ExploreStep, index: number): void {
    promptView.append(el("h1", undefined, step.title), ...richText(step.text));
    let reached = false;
    const checkGoal = () => {
        if (reached || !Object.entries(step.goal).every(([name, value]) => isClose(circuit.read(name), value, 1e-9)))
            return;
        reached = true;
        showFeedback(true, praise(), richText(step.success));
        setPrimary("Continue", true, undefined, "go");
        // After a click on the drawing the keyboard is the simulator's, which
        // ignores it; bring it back, so that Enter continues. A slider keeps it.
        if (!(document.activeElement instanceof HTMLInputElement))
            primary.focus();
    };
    for (const control of step.controls) {
        const q = lesson.quantities[control.quantity];
        const row = el("label", "control");
        const output = el("output", "live", format(control.quantity));
        const head = el("span", "control-head");
        head.append(el("span", undefined, q.label), output);
        const slider = el("input");
        slider.type = "range";
        slider.min = String(control.min);
        slider.max = String(control.max);
        slider.step = String(control.step);
        slider.value = String(circuit.read(control.quantity));
        slider.addEventListener("input", () => {
            circuit.set(control.quantity, Number(slider.value));
            setText(output, format(control.quantity));
            updateReadouts();
            checkGoal();
        });
        row.append(head, slider);
        answerView.append(row);
    }
    setPrimary("Continue", false, () => next(index, true));
    checkGoal();
    // A switch has no control here: the learner flips it on the drawing.
    syncStep = checkGoal;
}

function showChoice(step: ChoiceStep, index: number): void {
    const question = el("h1", undefined, step.question);
    question.id = "question";
    promptView.append(question);
    const list = el("div", "options");
    list.setAttribute("role", "radiogroup");
    list.setAttribute("aria-labelledby", question.id);
    let chosen: number | null = null;
    const buttons = step.options.map((text, i) => {
        const button = el("button", "option");
        button.type = "button";
        button.setAttribute("role", "radio");
        button.setAttribute("aria-checked", "false");
        button.append(el("kbd", "key-number mono", String(i + 1)), el("span", undefined, text));
        button.addEventListener("click", () => {
            chosen = i;
            buttons.forEach((b, j) => b.setAttribute("aria-checked", String(j === i)));
            setPrimary("Check", true);
        });
        list.append(button);
        return button;
    });
    answerView.append(list);
    choiceKeys = buttons;
    setPrimary("Check", false, () => {
        if (chosen == null)
            return;
        choiceKeys = null;
        const correct = chosen === step.answer;
        record(correct);
        buttons.forEach((b, i) => {
            b.disabled = true;
            // Right and wrong are told by an icon as well as by colour.
            if (i === step.answer) {
                b.classList.add("right");
                b.prepend(icon("check", "mark"));
            } else if (i === chosen) {
                b.classList.add("wrong");
                b.prepend(icon("cross", "mark"));
            }
        });
        const detail = correct ? [] : [el("p", "mono answer-line", "Answer: " + step.options[step.answer])];
        showResult(correct, [...detail, ...richText(step.explain)], () => next(index, correct));
    });
}

/** Option buttons that the number keys pick, while a choice is open. */
let choiceKeys: HTMLButtonElement[] | null = null;

function showNumber(step: NumberStep, index: number): void {
    const q = lesson.quantities[step.solveFor];
    promptView.append(el("h1", undefined, step.question));
    // The question, and the reading shown once it is answered, are about the
    // circuit as the step set it: a switch flipped on the drawing goes back.
    const held = Object.entries(step.set ?? {}).filter(([name]) => circuit.isSwitch(name));
    if (held.length > 0) {
        syncStep = () => {
            for (const [name, value] of held)
                circuit.set(name, value);
        };
    }
    const row = el("label", "number-answer");
    const input = el("input");
    input.inputMode = "decimal";
    input.autocomplete = "off";
    input.placeholder = "?";
    input.setAttribute("aria-label", `${q.label} in ${q.unit}`);
    row.append(input, el("span", "unit", q.unit));
    const hint = el("p", "hint");
    answerView.append(row, hint);
    input.addEventListener("input", () => {
        setText(hint, "");
        setPrimary("Check", input.value.trim() !== "");
    });
    setPrimary("Check", false, () => {
        const value = parseAnswer(input.value, q.unit);
        if (value == null) {
            setText(hint, `Type a number in ${q.unit}, like 2.5`);
            input.focus();
            return;
        }
        const correct = isClose(value, step.answer, step.tolerance);
        record(correct);
        input.disabled = true;
        row.classList.add(correct ? "right" : "wrong");
        // Reveal what the simulator shows: the value on the drawing and in the readout.
        hiddenQuantity = null;
        circuit.setLabels(true);
        readouts.get(step.solveFor)?.root.classList.add("revealed");
        updateReadouts();
        const detail = correct ? [] : [el("p", "mono answer-line", "Answer: " + formatValue(step.answer, q.unit))];
        showResult(correct, [...detail, el("p", "working", step.explain)], () => next(index, correct));
    });
    input.focus();
}

function showComplete(): void {
    hiddenQuantity = null;
    circuitCard.classList.add("hidden");
    answerView.replaceChildren();
    updateProgress();
    const seconds = Math.round((Date.now() - stats.started) / 1000);
    const accuracy = stats.attempts === 0 ? 100 : Math.round(100 * stats.right / stats.attempts);
    learnerProgress.recordCompletion(lesson.id);
    const course = learnerProgress.courseStatus(lessons.map(l => l.id));
    const next = nextLesson(lesson);

    const ticket = el("div", "ticket job-ticket");
    ticket.append(
        el("span", "stamp", "Done"),
        el("p", "mono", `${job} · ${lesson.job.title}`),
        el("p", undefined, `“${lesson.job.thanks}”`),
        el("p", "who", `— ${lesson.job.customer}`),
    );
    const stat = (label: string, value: string) => {
        const s = el("div", "stat screen-text");
        s.append(el("span", "mono", label), el("strong", undefined, value));
        return s;
    };
    const statsRow = el("div", "stats");
    statsRow.append(
        stat("Accuracy", accuracy + "%"),
        stat("Time", `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`),
        stat("Jobs done", `${course.done} of ${course.total}`),
    );
    const again = el("a", "link", "Do this job again");
    again.href = lessonUrl(lesson);
    const box = el("div", "complete");
    box.append(
        tag("Done"),
        el("h1", "heading", "Job done"),
        el("p", undefined, next != null
            ? "Take this circuit to the Bench and change anything you like, or start the next job."
            : "That's every job on the board for now. Take this circuit to the Bench: change any part, add new ones."),
        ticket,
        statsRow,
        el("p", "actions-line"),
    );
    box.lastElementChild!.append(again);
    promptView.replaceChildren(box);
    clearFooter();
    // The next job is the main way on; without one, the Bench is.
    const bench = benchUrl(lesson);
    if (next != null) {
        const link = el("a", "button secondary", "Open on the Bench");
        link.href = bench;
        primary.before(link);
        setPrimary("Next job", true, () => { location.href = lessonUrl(next); });
    } else {
        setPrimary("Open on the Bench", true, () => { location.href = bench; });
    }
    main.scrollTop = 0;
    primary.focus();
}

// ---- keyboard ----------------------------------------------------------------

document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey)
        return;
    const target = event.target as HTMLElement;
    // Enter checks or continues, except on buttons and links, which handle Enter themselves.
    if (event.key === "Enter" && !(target instanceof HTMLButtonElement) && !(target instanceof HTMLAnchorElement)) {
        event.preventDefault();
        if (!primary.disabled)
            primary.click();
        return;
    }
    // 1, 2, 3 ... pick an option.
    if (choiceKeys != null && /^[1-9]$/.test(event.key) && !(target instanceof HTMLInputElement)) {
        choiceKeys[Number(event.key) - 1]?.click();
    }
});

updateProgress();
showJob();
