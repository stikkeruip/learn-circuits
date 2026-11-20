// Plays the lesson on the page from the ticket to "Job done", answering every
// question rightly, and reports what tests/lessons.test.ts cannot see: a step
// too long for the sheet, a goal that the page never notices, a reading that
// has not come to rest when a number question shows it.
//
// For an agent or a person at the browser's console, with the dev server
// running and lesson.html?id=<id> open on its ticket:
//
//     const { playLesson } = await import("/tests/play/playLesson.ts");
//     await playLesson();
//
// It returns one row per step. `over` is how many pixels of the step lie
// below the sheet when it opens and `overAfter` once its note is showing: 0
// at 1024 × 768 is what LESSON_BLUEPRINT.md asks for. Nothing here is part of
// the site: the build does not include it.

import { lessons } from "../../src/lessons";
import type { Lesson, Step } from "../../src/lesson/types";

export interface PlayedStep {
    n: number;
    kind: Step["kind"];
    title: string;
    /** Pixels of the step below the sheet's bottom edge when it opens. */
    over: number;
    /** The same once the answer's note is showing. */
    overAfter: number;
    /** The note's heading and text after answering or reaching the goal. */
    note: string;
    /** Every readout as shown once the step is done. */
    readouts: string;
    problem?: string;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function until(test: () => boolean, ms: number): Promise<boolean> {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        if (test())
            return true;
        await wait(50);
    }
    return test();
}

/**
 * @param settleMs how long to let the circuit run before a number question is
 *     answered, and before its revealed reading is noted.
 * @param miss answer the first number question wrongly, to see it come back
 *     at the end of the job and be answered rightly there.
 */
export async function playLesson(settleMs = 400, miss = false): Promise<{ lesson: string; window: string; done: boolean; missed: string | null; steps: PlayedStep[] }> {
    const id = new URLSearchParams(location.search).get("id");
    const lesson: Lesson | undefined = lessons.find(l => l.id === id);
    if (lesson == null)
        throw new Error(`No lesson "${id}"`);
    const $ = (name: string) => document.getElementById(name)!;
    const sheet = $("sheetBody");
    const primary = $("primary") as HTMLButtonElement;
    const frame = $("circuitFrame") as HTMLIFrameElement;
    const over = () => Math.max(0, sheet.scrollHeight - sheet.clientHeight);
    const readouts = () => [...document.querySelectorAll("#readouts .readout")]
        .map(r => r.textContent!.replace(/\s+/g, " ").trim()).join(" | ");
    const note = () => $("feedback").textContent!.replace(/\s+/g, " ").trim();

    // The ticket shows once the simulator is up, which can take some seconds.
    if (!await until(() => primary.textContent === "Start job", 20000))
        throw new Error("Open the lesson afresh: it must be on its ticket");
    const engine = (frame.contentWindow as any).engine;
    primary.click();

    const typeAnswer = (value: number) => {
        const input = document.querySelector<HTMLInputElement>("#answer input")!;
        input.value = String(value);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        primary.click();
    };
    /** The number question answered wrongly on purpose, and how its return went. */
    let missedStep = -1;
    let missed: string | null = null;

    const steps: PlayedStep[] = [];
    for (const [i, step] of lesson.steps.entries()) {
        // The sheet's tag names the step it shows: "Job №0001 · Step 4 · Quick check".
        if (!await until(() => $("tag").textContent!.includes(`Step ${i + 1} ·`), 5000))
            throw new Error(`Step ${i + 1} never came up (the sheet says: ${$("tag").textContent})`);
        await wait(100);
        sheet.scrollTop = 0;
        const row: PlayedStep = {
            n: i + 1,
            kind: step.kind,
            title: step.kind === "read" || step.kind === "explore" ? step.title : step.question,
            over: over(),
            overAfter: 0,
            note: "",
            readouts: "",
        };
        steps.push(row);
        if (step.kind === "explore") {
            const sliders = [...document.querySelectorAll<HTMLInputElement>("#answer input[type=range]")];
            for (const [name, value] of Object.entries(step.goal)) {
                const at = step.controls.findIndex(c => c.quantity === name);
                if (at >= 0) {
                    if (sliders[at] == null)
                        throw new Error(`Step ${i + 1}: no slider on the page for "${name}" (the sheet says: ${$("tag").textContent})`);
                    sliders[at].value = String(value);
                    sliders[at].dispatchEvent(new Event("input", { bubbles: true }));
                } else {
                    // A switch: flipped on the drawing by the learner, here through the engine.
                    const ref = lesson.parts[lesson.quantities[name].part];
                    engine.byType(ref.type)[ref.nth ?? 0].setPosition(value === 1 ? 0 : 1);
                }
            }
            if (!await until(() => !primary.disabled, 3000))
                row.problem = "the goal was set, but the page did not notice";
            await wait(settleMs);
        } else if (step.kind === "choice") {
            document.querySelectorAll<HTMLButtonElement>("#answer .option")[step.answer].click();
            primary.click();
        } else if (step.kind === "number") {
            await wait(settleMs);
            if (miss && missedStep < 0) {
                missedStep = i;
                typeAnswer(step.answer * 2 + 1);
                await wait(settleMs);
                if (!$("feedback").classList.contains("wrong"))
                    row.problem = "a wrong answer was not marked wrong";
            } else {
                typeAnswer(step.answer);
                await wait(settleMs);
                if (!$("feedback").classList.contains("correct"))
                    row.problem = "the stated answer was marked wrong";
            }
        }
        await wait(100);
        row.overAfter = over();
        row.note = note();
        row.readouts = readouts();
        if (primary.disabled)
            break;
        primary.click();
    }
    if (missedStep >= 0) {
        // The missed question comes back, alone, after the last step.
        const step = lesson.steps[missedStep];
        if (step.kind === "number" && await until(() => $("tag").textContent!.includes(`Step ${missedStep + 1} ·`), 5000)) {
            await wait(settleMs);
            typeAnswer(step.answer);
            await wait(settleMs);
            missed = `step ${missedStep + 1} came back and was ${$("feedback").classList.contains("correct") ? "marked right" : "NOT marked right"}: ${readouts()}`;
            primary.click();
        } else {
            missed = `step ${missedStep + 1} did not come back`;
        }
    }
    await wait(200);
    return {
        lesson: lesson.id,
        window: `${innerWidth} × ${innerHeight}`,
        done: document.querySelector("#prompt .complete") != null,
        missed,
        steps,
    };
}
