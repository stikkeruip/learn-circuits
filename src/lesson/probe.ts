// What the lesson's probe shows for the part or wire under the pointer:
// CircuitJS1's own summary of it (CircuitElement.info(), e.g. "resistor",
// "I = 2 A", "Vd = 12 V") as labelled readings. While a question asks for a
// value, nothing on the probe may give that value away.

export interface ProbeReading {
    /** "I · current" */
    label: string;
    /** "2 A", or "?" while it would give an answer away. Empty for a line that is not a reading. */
    value: string;
}

export interface ProbeView {
    /** "resistor" */
    title: string;
    readings: ProbeReading[];
}

/** CircuitJS1's names for readings, said for a beginner. Others are shown as they are. */
const NAMES: Record<string, [symbol: string, name: string]> = {
    I: ["I", "current"],
    V: ["V", "voltage"],
    Vd: ["V", "across it"],
    R: ["R", "resistance"],
    P: ["P", "power"],
    C: ["C", "capacitance"],
    L: ["L", "inductance"],
    f: ["f", "frequency"],
};

/**
 * Parts whose summary is cut down to the readings named here. CircuitJS1's
 * voltmeter also lists its statistics over time (max, min, RMS, period, duty
 * cycle), which mean nothing in a steady circuit and are not taught yet.
 */
const ONLY: Record<string, string[]> = {
    voltmeter: ["Vd"],
};

/**
 * What CircuitJS1 says about how it models a part, which no meter reads and
 * the course does not teach: a fuse's I²t, a capacitor's charge, a
 * transistor's working region.
 */
const MODEL_KEYS = new Set(["I2t", "Q", "gm"]);
const MODEL_LINES = new Set(["cutoff", "fwd active", "rev active", "saturation", "linear"]);

/**
 * Readings left out for one kind of part: the resistance CircuitJS1 still
 * gives for a fuse that has blown, and the current in a MOSFET's body, which
 * shares its name with a transistor's base current.
 */
const NOT_FOR: Record<string, string[]> = {
    "fuse": ["R"],
    "fuse (blown)": ["R"],
    "n-MOSFET": ["Ib"],
    "p-MOSFET": ["Ib"],
};

/** "diode (default)" is a diode: the name of CircuitJS1's model for it is left out. */
function partName(title: string): string {
    return title.replace(/\s*\((?:default|old-|spice)[^)]*\)/, "");
}

/**
 * Whether a reading would give away the value a question asks for, of which
 * `hiddenUnit` is the unit ("A"), or null when no question is open. Readings
 * in that unit would, and so would power, from which it can be worked out.
 */
function givesAway(value: string, hiddenUnit: string | null): boolean {
    if (hiddenUnit == null)
        return false;
    const text = value.trim();
    return text.endsWith(hiddenUnit) || text.endsWith("W");
}

/** A part or wire: CircuitJS1's lines for it, title first. */
export function describePart(info: string[], hiddenUnit: string | null): ProbeView {
    const [named = "", ...lines] = info;
    const title = partName(named);
    const readings: ProbeReading[] = [];
    for (const raw of lines) {
        const line = raw.trim();
        // Bracketed lines are CircuitJS1's own working-out, e.g. a source's
        // "(R = 6 Ω)": the load it sees, not a part of the source.
        if (line === "" || (line.startsWith("(") && line.endsWith(")")))
            continue;
        // A model's own numbers ("default, β=100"), and its working region.
        if (line.includes("β") || MODEL_LINES.has(line))
            continue;
        const match = /^([^=]+?)\s*=\s*(.+)$/.exec(line);
        const only = ONLY[title];
        if (only != null && (match == null || !only.includes(match[1])))
            continue;
        if (match == null) {
            readings.push({ label: line, value: "" });   // a state, e.g. "closed"
            continue;
        }
        const [, key, value] = match;
        if (MODEL_KEYS.has(key) || NOT_FOR[title]?.includes(key))
            continue;
        const [symbol, name] = NAMES[key] ?? [key, ""];
        readings.push({
            label: name !== "" ? `${symbol} · ${name}` : symbol,
            value: givesAway(value, hiddenUnit) ? "?" : value,
        });
    }
    return { title, readings };
}

/** One terminal of a part or wire: its voltage (to ground), already formatted. */
export function describeTerminal(partTitle: string, voltage: string, hiddenUnit: string | null): ProbeView {
    return {
        title: partTitle !== "" ? `${partName(partTitle)} · end` : "end",
        readings: [{ label: "V · voltage", value: givesAway(voltage, hiddenUnit) ? "?" : voltage }],
    };
}
