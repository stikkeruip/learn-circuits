// Which lessons the learner has finished, kept in this browser
// (localStorage). There is no server and no account, so another browser, or
// clearing this site's data, starts afresh. Where storage is blocked (some
// private windows) progress lasts only as long as the page.

const KEY = "learn-circuits.progress";

export interface Progress {
    version: 1;
    lessons: Record<string, LessonProgress>;
}

export interface LessonProgress {
    completions: number;
    /** ISO time. */
    lastCompleted: string | null;
}

/** Where the learner is in a list of lessons. */
export interface CourseStatus {
    done: number;
    total: number;
    /** The first lesson not yet finished, or null when all are. */
    next: string | null;
}

export function emptyProgress(): Progress {
    return { version: 1, lessons: {} };
}

type StorageLike = Pick<Storage, "getItem" | "setItem">;

function browserStorage(): StorageLike | null {
    try {
        const storage = window.localStorage;
        storage.getItem(KEY);
        return storage;
    } catch {
        return null;
    }
}

export class ProgressStore {
    #storage: StorageLike | null;
    /** The latest progress, used once storage turns out to be unavailable. */
    #memory: Progress | null = null;

    constructor(storage: StorageLike | null = browserStorage()) {
        this.#storage = storage;
    }

    /** A fresh copy of the stored progress. */
    load(): Progress {
        if (this.#storage == null)
            return this.#memory != null ? structuredClone(this.#memory) : emptyProgress();
        let raw: string | null;
        try {
            raw = this.#storage.getItem(KEY);
        } catch {
            this.#storage = null;
            return this.load();
        }
        return parse(raw) ?? emptyProgress();
    }

    isCompleted(lessonId: string): boolean {
        return (this.load().lessons[lessonId]?.completions ?? 0) > 0;
    }

    /** How many of these lessons (in course order) are finished, and which is next. */
    courseStatus(lessonIds: string[]): CourseStatus {
        const lessons = this.load().lessons;
        const finished = (id: string) => (lessons[id]?.completions ?? 0) > 0;
        return {
            done: lessonIds.filter(finished).length,
            total: lessonIds.length,
            next: lessonIds.find(id => !finished(id)) ?? null,
        };
    }

    recordCompletion(lessonId: string, now = new Date()): void {
        // Read, change, write back: another tab's progress saved in between is kept.
        const progress = this.load();
        const lesson = progress.lessons[lessonId] ??= { completions: 0, lastCompleted: null };
        lesson.completions++;
        lesson.lastCompleted = now.toISOString();
        this.#memory = progress;
        try {
            this.#storage?.setItem(KEY, JSON.stringify(progress));
        } catch {
            // Full or blocked: carry on in memory for the rest of this page.
            this.#storage = null;
        }
    }
}

/** Stored progress, or null when there is none or it is not in this format. */
function parse(raw: string | null): Progress | null {
    if (raw == null)
        return null;
    try {
        const data = JSON.parse(raw);
        if (data?.version !== 1 || data.lessons == null || typeof data.lessons !== "object")
            return null;
        // Keep only what this format has, dropping anything else stored alongside.
        return { version: 1, lessons: data.lessons };
    } catch {
        return null;
    }
}
