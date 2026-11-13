// Where a lesson leads: the next lesson in the course, and the sandbox (the
// full simulator on the main page) opened on the lesson's circuit.

import * as LZString from "lz-string";
import { lessons } from "../lessons";
import type { Lesson } from "./types";

export function lessonUrl(lesson: Lesson): string {
    return "lesson.html?" + new URLSearchParams({ id: lesson.id });
}

/** The lesson after this one in course order, or null for the last. */
export function nextLesson(lesson: Lesson): Lesson | null {
    const i = lessons.findIndex(l => l.id === lesson.id);
    return i >= 0 ? lessons[i + 1] ?? null : null;
}

/**
 * The main page with the lesson's circuit loaded, through CircuitJS1's own
 * ?ctz= option (compressed circuit text). ?from= lets that page say which
 * lesson the circuit came from and link on.
 */
export function sandboxUrl(lesson: Lesson): string {
    return "./?" + new URLSearchParams({ from: lesson.id, ctz: LZString.compressToEncodedURIComponent(lesson.circuit) });
}
