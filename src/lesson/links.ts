// Where a lesson leads: the next lesson in the course, and the Bench (the full
// simulator, bench.html) opened on the lesson's circuit.

import * as LZString from "lz-string";
import { lessons } from "../lessons";
import type { Lesson } from "./types";

export function lessonUrl(lesson: Lesson): string {
    return "lesson.html?" + new URLSearchParams({ id: lesson.id });
}

/** "№0001": the lesson's place in the course, told as a repair-job number. */
export function jobNumber(lesson: Lesson): string {
    const i = lessons.findIndex(l => l.id === lesson.id);
    return "№" + String(i + 1).padStart(4, "0");
}

/** The lesson after this one in course order, or null for the last. */
export function nextLesson(lesson: Lesson): Lesson | null {
    const i = lessons.findIndex(l => l.id === lesson.id);
    return i >= 0 ? lessons[i + 1] ?? null : null;
}

/**
 * The Bench with the lesson's circuit loaded, through CircuitJS1's own ?ctz=
 * option (compressed circuit text). ?from= lets the Bench say which lesson the
 * circuit came from and link on.
 */
export function benchUrl(lesson: Lesson): string {
    return "bench.html?" + new URLSearchParams({ from: lesson.id, ctz: LZString.compressToEncodedURIComponent(lesson.circuit) });
}
