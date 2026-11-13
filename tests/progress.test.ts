import { describe, expect, it } from "vitest";
import { ProgressStore } from "../src/lesson/progress";

const KEY = "learn-circuits.progress";

/** A stand-in for localStorage. */
function memoryStorage() {
    const items = new Map<string, string>();
    return {
        items,
        getItem: (key: string) => items.get(key) ?? null,
        setItem: (key: string, value: string) => { items.set(key, value); },
    };
}

describe("ProgressStore", () => {
    it("starts with nothing finished", () => {
        const store = new ProgressStore(memoryStorage());
        expect(store.isCompleted("ohms-law")).toBe(false);
        expect(store.courseStatus(["ohms-law", "b"])).toEqual({ done: 0, total: 2, next: "ohms-law" });
    });

    it("remembers finished lessons for the next page to read", () => {
        const storage = memoryStorage();
        new ProgressStore(storage).recordCompletion("ohms-law", new Date("2026-11-13T10:00:00Z"));
        const later = new ProgressStore(storage);
        expect(later.isCompleted("ohms-law")).toBe(true);
        expect(later.load().lessons["ohms-law"]).toEqual({ completions: 1, lastCompleted: "2026-11-13T10:00:00.000Z" });
    });

    it("counts each time a lesson is finished", () => {
        const store = new ProgressStore(memoryStorage());
        store.recordCompletion("a");
        store.recordCompletion("a");
        expect(store.load().lessons.a.completions).toBe(2);
    });

    it("says how far through the course the learner is, and which lesson is next", () => {
        const store = new ProgressStore(memoryStorage());
        const course = ["a", "b", "c"];
        store.recordCompletion("a");
        expect(store.courseStatus(course)).toEqual({ done: 1, total: 3, next: "b" });
        // Lessons can be done out of order; "next" is the first one not done.
        store.recordCompletion("c");
        expect(store.courseStatus(course)).toEqual({ done: 2, total: 3, next: "b" });
        store.recordCompletion("b");
        expect(store.courseStatus(course)).toEqual({ done: 3, total: 3, next: null });
    });

    it("ignores finished lessons that are no longer in the course", () => {
        const store = new ProgressStore(memoryStorage());
        store.recordCompletion("removed-lesson");
        expect(store.courseStatus(["a"])).toEqual({ done: 0, total: 1, next: "a" });
    });

    it("starts afresh over data it cannot read, and then saves normally", () => {
        const storage = memoryStorage();
        storage.setItem(KEY, "{not json");
        const store = new ProgressStore(storage);
        expect(store.isCompleted("a")).toBe(false);
        store.recordCompletion("a");
        expect(new ProgressStore(storage).isCompleted("a")).toBe(true);
    });

    it("drops fields an older version stored alongside", () => {
        const storage = memoryStorage();
        storage.setItem(KEY, JSON.stringify({ version: 1, xp: 25, streak: { days: 2 }, lessons: { a: { completions: 1, lastCompleted: null } } }));
        const store = new ProgressStore(storage);
        expect(store.isCompleted("a")).toBe(true);
        store.recordCompletion("b");
        expect(Object.keys(JSON.parse(storage.items.get(KEY)!))).toEqual(["version", "lessons"]);
    });

    it("works in memory when storage is missing or refuses to save", () => {
        const none = new ProgressStore(null);
        none.recordCompletion("a");
        expect(none.isCompleted("a")).toBe(true);

        const full = new ProgressStore({
            getItem: () => null,
            setItem: () => { throw new DOMException("full", "QuotaExceededError"); },
        });
        full.recordCompletion("a");
        full.recordCompletion("a");
        expect(full.load().lessons.a.completions).toBe(2);
    });

    it("returns copies, so changing what load() gave does not change the store", () => {
        const store = new ProgressStore(null);
        store.recordCompletion("a");
        store.load().lessons.a.completions = 99;
        expect(store.load().lessons.a.completions).toBe(1);
    });
});
