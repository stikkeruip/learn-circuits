// The home page: the lessons in course order, how far the learner has got
// (kept in this browser, see src/lesson/progress.ts), and the way into the
// Bench.

import "../ui/theme.css";
import "./home.css";
import { benchUrl, lessonUrl } from "../lesson/links";
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

const progress = new ProgressStore();
const course = progress.courseStatus(lessons.map(l => l.id));

// ---- how far along -----------------------------------------------------------

$("courseCount").textContent = `${course.done} of ${course.total} done`;
const bar = $("courseBar");
bar.setAttribute("aria-valuemax", String(course.total));
bar.setAttribute("aria-valuenow", String(course.done));
$("courseFill").style.width = `${course.total === 0 ? 0 : 100 * course.done / course.total}%`;
if (course.next == null) {
    const note = $("courseNote");
    note.textContent = "You've finished every lesson so far. Go over any of them again, or build your own circuits on the Bench.";
    note.hidden = false;
}

// ---- the lessons, in order ---------------------------------------------------

const path = $("path");
lessons.forEach((lesson, i) => {
    const done = progress.isCompleted(lesson.id);
    const isNext = lesson.id === course.next;
    const item = el("li", "lesson " + (done ? "done" : isNext ? "next" : "todo"));
    if (isNext)
        item.setAttribute("aria-current", "step");

    const node = el("span", "node", done ? "✓" : String(i + 1));
    node.setAttribute("aria-hidden", "true");

    const card = el("div", "lesson-card");
    const title = el("h3");
    title.append(link(lessonUrl(lesson), undefined, lesson.title));
    card.append(
        el("span", "status", done ? "Done" : isNext ? "Up next" : "Not started"),
        title,
        el("p", "summary", lesson.summary),
        el("p", "meta", `Lesson ${i + 1} · ${lesson.steps.length} steps`),
    );
    if (isNext) {
        const actions = el("div", "lesson-actions");
        actions.append(link(lessonUrl(lesson), "button primary", "Start"));
        card.append(actions);
    } else if (done) {
        const actions = el("div", "lesson-actions");
        actions.append(link(lessonUrl(lesson), "button secondary small", "Practice again"));
        card.append(actions);
    }
    item.append(node, card);
    path.append(item);
});

const soon = el("li", "lesson soon");
const soonNode = el("span", "node");
soonNode.setAttribute("aria-hidden", "true");
const soonCard = el("div", "lesson-card");
soonCard.append(el("p", "summary", "More lessons are on the way."));
soon.append(soonNode, soonCard);
path.append(soon);

// ---- the Bench -----------------------------------------------------------------

const circuits = $("lessonCircuits");
for (const lesson of lessons) {
    const item = el("li");
    const a = link(benchUrl(lesson), undefined, lesson.title);
    a.append(el("span", "arrow", "→"));
    a.lastElementChild!.setAttribute("aria-hidden", "true");
    item.append(a);
    circuits.append(item);
}
