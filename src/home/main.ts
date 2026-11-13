// The home page, as the shop's job board: the job on the bench now, the path
// of jobs (which are done, which is next, kept in this browser by
// src/lesson/progress.ts), and the way into the Bench.

import "../ui/theme.css";
import "./home.css";
import { benchUrl, jobNumber, lessonUrl } from "../lesson/links";
import { ProgressStore } from "../lesson/progress";
import { lessons } from "../lessons";

const $ = (id: string) => document.getElementById(id)!;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className != null)
        node.className = className;
    if (text != null)
        node.textContent = text;
    return node;
}

function link(href: string, className: string | undefined, text: string): HTMLAnchorElement {
    const a = el("a", className, text);
    a.href = href;
    return a;
}

const SVG = "http://www.w3.org/2000/svg";
const ICONS = {
    check: "M5 12.5 L10 17.5 L19 7",
    resistor: "M1 12 H5 L7 7 L10 17 L13 7 L16 17 L18 12 H23",
};

function icon(name: keyof typeof ICONS): SVGSVGElement {
    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(SVG, "path");
    path.setAttribute("d", ICONS[name]);
    svg.append(path);
    return svg;
}

const progress = new ProgressStore();
const course = progress.courseStatus(lessons.map(l => l.id));

// ---- the job on the bench now ------------------------------------------------

const current = lessons.find(l => l.id === course.next);
if (current != null) {
    $("jobMeta").textContent = `Job ${jobNumber(current)} · ${course.done === 0 ? "First job" : "Next up"}`;
    $("jobTitle").textContent = current.job.title;
    $("jobTopic").textContent = `${current.title} — ${current.summary}`;
    $("sceneTag").textContent = jobNumber(current);
    const quote = $("jobQuote");
    quote.append(el("p", undefined, `“${current.job.request}”`), el("footer", undefined, `— ${current.job.customer}`));
    $("jobSteps").textContent = `${current.steps.length} steps`;
    const start = $("jobStart") as HTMLAnchorElement;
    start.href = lessonUrl(current);
    start.textContent = "Start job";
} else {
    // Every job done: the board says so, and points at the Bench.
    $("jobMeta").textContent = `${course.done} of ${course.total} jobs done`;
    $("jobTitle").textContent = "Board's clear";
    $("jobTopic").textContent = "Every job on the board is done. Go over any of them again from the path, or build your own circuits on the Bench.";
    $("sceneTag").textContent = "DONE";
    $("jobQuote").remove();
    $("jobSteps").textContent = "";
    const start = $("jobStart") as HTMLAnchorElement;
    start.href = "bench.html";
    start.textContent = "Open the Bench";
}

// ---- the path of jobs ------------------------------------------------------------

$("pathCount").textContent = `${course.done} of ${course.total} done`;
const path = $("path");
for (const lesson of lessons) {
    const done = progress.isCompleted(lesson.id);
    const isCurrent = lesson.id === course.next;
    const item = el("li", "stop " + (done ? "done" : isCurrent ? "current" : "todo"));
    if (isCurrent)
        item.setAttribute("aria-current", "step");

    const node = el("a", "node");
    node.href = lessonUrl(lesson);
    node.setAttribute("aria-label", `Job ${jobNumber(lesson)}: ${lesson.job.title}`);
    node.append(done ? icon("check") : isCurrent ? icon("resistor") : el("span", undefined, String(lessons.indexOf(lesson) + 1)));

    const label = el("div", "stop-label");
    label.append(
        el("p", "mono", `Job ${jobNumber(lesson)} · ${done ? "Done" : isCurrent ? "On the bench" : "Waiting"}`),
        el("p", "stop-title", lesson.job.title),
        el("p", "stop-topic", lesson.title),
    );
    if (done)
        label.append(link(lessonUrl(lesson), "button secondary small", "Do it again"));
    else if (isCurrent)
        label.append(link(lessonUrl(lesson), "button primary small", "Start"));
    item.append(node, label);
    path.append(item);
}

// ---- the Bench: each job's circuit ---------------------------------------------

const circuits = $("jobCircuits");
for (const lesson of lessons) {
    const done = progress.isCompleted(lesson.id);
    const item = el("li");
    const ticket = link(benchUrl(lesson), "ticket job-circuit" + (done ? " finished" : ""), "");
    ticket.append(
        el("span", "mono", `${jobNumber(lesson)} · ${lesson.title}`),
        el("span", "open", "Open →"),
    );
    item.append(ticket);
    circuits.append(item);
}
