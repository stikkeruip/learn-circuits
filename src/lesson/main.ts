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
import type { CircuitEngine } from "../engine";
import { lessons } from "../lessons";
import { phosphorOptions } from "../ui/crt";
import { LessonCircuit } from "./circuit";
import { formatValue, isClose, parseAnswer } from "./format";
import { benchUrl, jobNumber, lessonUrl, nextLesson } from "./links";
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
// Nothing can be clicked or edited in it either, because the frame ignores
// the mouse (lesson.css); its editable=false option is not used, as it puts a
// padlock on the drawing.
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
        style.textContent = ".triggerLabel, .toptriggerlabel { display: none !important; }";
        doc.head.append(style);
        resolve((frame.contentWindow as any).engineReady);
    }, { once: true });
});
frame.src = "sim.html?" + simOptions;

const engine = await engineReady;
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
    return formatValue(circuit.read(name), lesson.quantities[name].unit);
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
    for (const token of text.split(/(\s+)/))
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
    const label = el("span", "label mono", q.symbol);
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

// CircuitJS1 caps its zoom and, in a narrow window, keeps room free for
// oscilloscope panels, so a small circuit is drawn small. Fit it to the frame
// instead. Fit again when CircuitJS1's own zoom has replaced ours (it centres
// the circuit by itself after loading and after a resize), and when the
// screen changes size: the monitor grows and shrinks with what is around it.
let fitted: { transform: number[]; width: number; height: number } | null = null;

function fitDrawing(): void {
    const app = engine.app;
    const t = app.transform;
    const area = app.circuitArea;
    if (fitted != null && area != null && area.width === fitted.width && area.height === fitted.height
        && t.every((v, i) => v === fitted!.transform[i]))
        return;
    const bounds = app.ui.getCircuitBounds();
    if (bounds == null || area == null || area.width === 0 || area.height === 0)
        return;
    // Margins leave room for the values CircuitJS1 writes beside the parts.
    const scale = Math.min(area.width / (bounds.width + 96), area.height / (bounds.height + 72), 3);
    t[0] = t[3] = scale;
    t[1] = t[2] = 0;
    t[4] = (area.width - bounds.width * scale) / 2 - bounds.x * scale;
    t[5] = (area.height - bounds.height * scale) / 2 - bounds.y * scale;
    fitted = { transform: [...t], width: area.width, height: area.height };
    app.ui.repaint();
}

// Measured values change only when the simulator has run, so refresh after each of its frames.
engine.on("frame", () => {
    fitDrawing();
    updateReadouts();
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
