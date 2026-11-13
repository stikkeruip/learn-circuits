// The lesson page: one lesson (lesson.html?id=ohms-law), a step at a time,
// with the simulator (sim.html, CircuitJS1's own drawing and animation) in a
// frame. The page changes and reads the circuit only through the
// CircuitEngine inside that frame, via LessonCircuit.
//
// Like a language-learning app: a progress bar, one thing per screen, a
// Check button, and a footer that turns green or red. A question answered
// wrongly comes back at the end of the lesson until it is answered right.

import "../ui/theme.css";
import "./lesson.css";
import * as LZString from "lz-string";
import type { CircuitEngine } from "../engine";
import { lessons } from "../lessons";
import { LessonCircuit } from "./circuit";
import { formatValue, isClose, parseAnswer } from "./format";
import { benchUrl, lessonUrl, nextLesson } from "./links";
import { ProgressStore } from "./progress";
import type { ChoiceStep, ExploreStep, NumberStep, ReadStep } from "./types";

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

const lessonId = new URLSearchParams(location.search).get("id");
const lesson = lessons.find(l => l.id === lessonId) ?? lessons[0];
document.title = `${lesson.title} · learn-circuits`;

const progress = $("progress");
const progressFill = $("progressFill");
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

// CircuitJS1's own address options: just the drawing. Nothing can be clicked
// or edited in it either, because the frame ignores the mouse (lesson.css);
// its editable=false option is not used, as it puts a padlock on the drawing.
const simOptions = new URLSearchParams({
    hideSidebar: "true",
    hideMenu: "true",
    hideInfoBox: "true",
    mouseWheelEdit: "false",
    whiteBackground: "true",
    showOhm: "true",
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

// Each quantity gets a colour, shared by its readout, its symbol in formulas and its live values in text.
const COLOURS = ["#e8590c", "#7048e8", "#1c7ed6", "#2f9e44", "#c2255c", "#0c8599"];
const quantityNames = Object.keys(lesson.quantities);
const colourOf = (name: string) => COLOURS[quantityNames.indexOf(name) % COLOURS.length];
const quantityBySymbol = new Map(quantityNames.map(name => [lesson.quantities[name].symbol, name]));

function format(name: string): string {
    return formatValue(circuit.read(name), lesson.quantities[name].unit);
}

/** Lesson text: paragraphs at blank lines, **bold**, and {quantity} as a live value. */
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
                live.style.setProperty("--q", colourOf(name));
                p.append(live);
            } else if (part !== "") {
                p.append(part);
            }
        }
        return p;
    });
}

/** A formula with each quantity's symbol in that quantity's colour. */
function formula(text: string): HTMLElement {
    const box = el("div", "formula");
    box.setAttribute("role", "math");
    box.setAttribute("aria-label", text);
    for (const token of text.split(/(\s+)/)) {
        const name = quantityBySymbol.get(token);
        if (name == null) {
            box.append(token);
            continue;
        }
        const symbol = el("span", "symbol", token);
        symbol.style.setProperty("--q", colourOf(name));
        box.append(symbol);
    }
    return box;
}

// ---- readouts --------------------------------------------------------------

/** The quantity a number question asks for: its readout shows "?" until answered. */
let hiddenQuantity: string | null = null;

const readouts = new Map<string, { root: HTMLElement; value: HTMLElement }>();
readoutsView.replaceChildren();
for (const name of quantityNames) {
    const q = lesson.quantities[name];
    const root = el("div", "readout");
    root.style.setProperty("--q", colourOf(name));
    const value = el("span", "value");
    root.append(el("span", "symbol", q.symbol), el("span", "label", q.label), value);
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
// instead. CircuitJS1 centres the circuit again by itself after loading and
// after the window is resized; when its zoom has replaced ours, fit again.
let fitted: number[] | null = null;

function fitDrawing(): void {
    const app = engine.app;
    const t = app.transform;
    if (fitted != null && t.every((v, i) => v === fitted![i]))
        return;
    const bounds = app.ui.getCircuitBounds();
    const area = app.circuitArea;
    if (bounds == null || area == null || area.width === 0 || area.height === 0)
        return;
    // Margins leave room for the values CircuitJS1 writes beside the parts.
    const scale = Math.min(area.width / (bounds.width + 96), area.height / (bounds.height + 72), 3);
    t[0] = t[3] = scale;
    t[1] = t[2] = 0;
    t[4] = (area.width - bounds.width * scale) / 2 - bounds.x * scale;
    t[5] = (area.height - bounds.height * scale) / 2 - bounds.y * scale;
    fitted = [...t];
    app.ui.repaint();
}

// Measured values change only when the simulator has run, so refresh after each of its frames.
engine.on("frame", () => {
    fitDrawing();
    updateReadouts();
});

// ---- footer ----------------------------------------------------------------

let primaryAction: () => void = () => {};

function setPrimary(label: string, enabled: boolean, action?: () => void): void {
    primary.textContent = label;
    primary.disabled = !enabled;
    if (action != null)
        primaryAction = action;
}
primary.addEventListener("click", () => primaryAction());

function clearFooter(): void {
    footer.className = "footer";
    feedback.replaceChildren();
}

/** Green or red footer with a message, and Continue. */
function showResult(correct: boolean, title: string, detail: (string | Node)[], next: () => void): void {
    footer.className = "footer " + (correct ? "correct" : "wrong");
    feedback.replaceChildren(el("strong", undefined, title), ...detail);
    setPrimary("Continue", true, next);
    primary.focus();
}

const PRAISE = ["Correct!", "Nice!", "Well done!", "Exactly!"];
const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

// ---- the run through the lesson --------------------------------------------

/** Steps still to do, in order. A wrongly answered step is added again at the end. */
const queue = lesson.steps.map((_, i) => i);
let position = 0;
const completed = new Set<number>();
const stats = { attempts: 0, right: 0, started: Date.now() };
/** Which lessons are finished, kept in this browser. */
const learnerProgress = new ProgressStore();

function updateProgress(): void {
    const percent = Math.round(100 * completed.size / lesson.steps.length);
    progressFill.style.width = percent + "%";
    progress.setAttribute("aria-valuenow", String(percent));
}

function showStep(): void {
    const index = queue[position];
    const step = lesson.steps[index];
    circuit.setAll(step.set);
    hiddenQuantity = step.kind === "number" ? step.solveFor : null;
    circuit.setLabels(hiddenQuantity == null);
    for (const view of readouts.values())
        view.root.classList.remove("revealed");
    promptView.replaceChildren();
    answerView.replaceChildren();
    clearFooter();
    switch (step.kind) {
        case "read": showRead(step, index); break;
        case "explore": showExplore(step, index); break;
        case "choice": showChoice(step, index); break;
        case "number": showNumber(step, index); break;
    }
    updateReadouts();
    main.scrollTop = 0;
}

/** Move on. `passed` is false when the step was answered wrongly and will come back. */
function next(index: number, passed: boolean): void {
    if (passed)
        completed.add(index);
    else
        queue.push(index);
    updateProgress();
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
        footer.className = "footer correct";
        feedback.replaceChildren(el("strong", undefined, praise()), ...richText(step.success));
        setPrimary("Continue", true);
    };
    for (const control of step.controls) {
        const q = lesson.quantities[control.quantity];
        const row = el("label", "control");
        row.style.setProperty("--q", colourOf(control.quantity));
        const output = el("output", undefined, format(control.quantity));
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
    promptView.append(el("h1", undefined, step.question));
    const list = el("div", "options");
    let chosen: number | null = null;
    const buttons = step.options.map((text, i) => {
        const button = el("button", "option");
        button.type = "button";
        button.setAttribute("aria-pressed", "false");
        button.append(el("kbd", undefined, String(i + 1)), el("span", undefined, text));
        button.addEventListener("click", () => {
            chosen = i;
            buttons.forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
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
            b.classList.toggle("right", i === step.answer);
            b.classList.toggle("wrong", i === chosen && !correct);
        });
        const detail = correct ? [] : [el("p", undefined, "Answer: " + step.options[step.answer])];
        showResult(correct, correct ? praise() : "Not quite", [...detail, ...richText(step.explain)], () => next(index, correct));
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
        const detail = correct ? [] : [el("p", undefined, "Answer: " + formatValue(step.answer, q.unit))];
        showResult(correct, correct ? praise() : "Not quite", [...detail, el("p", "working", step.explain)], () => next(index, correct));
    });
    input.focus();
}

function showComplete(): void {
    hiddenQuantity = null;
    circuitCard.classList.add("hidden");
    promptView.replaceChildren();
    answerView.replaceChildren();
    const seconds = Math.round((Date.now() - stats.started) / 1000);
    const accuracy = stats.attempts === 0 ? 100 : Math.round(100 * stats.right / stats.attempts);
    learnerProgress.recordCompletion(lesson.id);
    const course = learnerProgress.courseStatus(lessons.map(l => l.id));
    const box = el("div", "complete");
    const stat = (label: string, value: string) => {
        const s = el("div", "stat");
        s.append(el("span", undefined, label), el("strong", undefined, value));
        return s;
    };
    const statsRow = el("div", "stats");
    statsRow.append(
        stat("Accuracy", accuracy + "%"),
        stat("Time", `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`),
        stat("Lessons done", `${course.done} of ${course.total}`),
    );
    const next = nextLesson(lesson);
    const again = el("a", "link", "Practice this lesson again");
    again.href = lessonUrl(lesson);
    box.append(
        el("div", "badge", "⚡"),
        el("h1", undefined, "Lesson complete!"),
        el("p", undefined, `You finished “${lesson.title}”. ` + (next != null
            ? "Try this circuit on the Bench, or carry on to the next lesson."
            : "That's the last lesson so far. Take this circuit to the Bench: change any part, add new ones.")),
        statsRow,
        again,
    );
    promptView.append(box);
    clearFooter();
    // The next lesson is the main way on; without one, the Bench is.
    const bench = benchUrl(lesson);
    if (next != null) {
        const link = el("a", "button secondary", "Open on the Bench");
        link.href = bench;
        primary.before(link);
        setPrimary("Next lesson", true, () => { location.href = lessonUrl(next); });
    } else {
        setPrimary("Open on the Bench", true, () => { location.href = bench; });
    }
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
showStep();
