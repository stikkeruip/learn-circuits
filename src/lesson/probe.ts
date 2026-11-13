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
    const [title = "", ...lines] = info;
    const readings: ProbeReading[] = [];
    for (const raw of lines) {
        const line = raw.trim();
        // Bracketed lines are CircuitJS1's own working-out, e.g. a source's
        // "(R = 6 Ω)": the load it sees, not a part of the source.
        if (line === "" || (line.startsWith("(") && line.endsWith(")")))
            continue;
        const match = /^([^=]+?)\s*=\s*(.+)$/.exec(line);
        if (match == null) {
            readings.push({ label: line, value: "" });   // a state, e.g. "closed"
            continue;
        }
        const [, key, value] = match;
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
        title: partTitle !== "" ? `${partTitle} · end` : "end",
        readings: [{ label: "V · voltage", value: givesAway(voltage, hiddenUnit) ? "?" : voltage }],
    };
}
