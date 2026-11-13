// Numbers in and out of a lesson: "0.5 A", "1.33 A", "50 mA"; and reading what
// a learner typed ("3", "3,0", "3 A", "3000 mA", "24 ohms").

const PREFIXES: [number, string][] = [[1e9, "G"], [1e6, "M"], [1e3, "k"], [1, ""], [1e-3, "m"], [1e-6, "µ"], [1e-9, "n"]];

/** At most three significant figures; plain numbers from 0.1 up to 1000, a prefix outside that. */
export function formatValue(value: number, unit: string): string {
    if (!Number.isFinite(value))
        return "–";
    const abs = Math.abs(value);
    if (abs < 1e-12)
        return `0 ${unit}`;
    if (abs >= 0.1 && abs < 1000)
        return `${round(value)} ${unit}`;
    const [scale, prefix] = PREFIXES.find(([s]) => abs >= s) ?? PREFIXES[PREFIXES.length - 1];
    return `${round(value / scale)} ${prefix}${unit}`;
}

function round(n: number): string {
    return String(Number(n.toPrecision(3)));
}

const UNIT_WORDS: Record<string, string[]> = {
    A: ["amperes", "ampere", "amps", "amp", "a"],
    V: ["volts", "volt", "v"],
    "Ω": ["ohms", "ohm", "ω"],
    W: ["watts", "watt", "w"],
};

const PREFIX_SCALES: Record<string, number> = { "": 1, k: 1e3, K: 1e3, M: 1e6, m: 1e-3, u: 1e-6, "µ": 1e-6, "μ": 1e-6 };

/**
 * The value a learner typed, in `unit`, or null when it is not a number in
 * that unit. A unit after the number is optional; prefixes are understood.
 */
export function parseAnswer(text: string, unit: string): number | null {
    const match = /^\s*([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?)\s*(.*?)\s*$/i.exec(text.normalize("NFKC"));
    if (match == null)
        return null;
    const value = Number(match[1].replace(",", "."));
    const rest = match[2];
    const words = UNIT_WORDS[unit] ?? [unit.toLowerCase()];
    for (const word of [...words, ""]) {
        if (!rest.toLowerCase().endsWith(word))
            continue;
        const scale = PREFIX_SCALES[rest.slice(0, rest.length - word.length).trim()];
        if (scale != null && Number.isFinite(value))
            return value * scale;
    }
    return null;
}

/** True when `given` is within `tolerance` (relative) of `answer`. */
export function isClose(given: number, answer: number, tolerance = 0.01): boolean {
    return Math.abs(given - answer) <= Math.max(tolerance * Math.abs(answer), 1e-12);
}
