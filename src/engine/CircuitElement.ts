import type { CircuitEngine } from "./CircuitEngine";

export interface Point {
    x: number;
    y: number;
}

/** One editable setting of an element, as CircuitJS1's edit dialog would show it. */
export interface ElementParam {
    index: number;
    name: string;
    kind: "number" | "text" | "checkbox" | "choice" | "other";
    value: number | string | boolean | null;
    /** For kind "choice": the selectable labels; value is the selected index. */
    options?: string[];
}

/**
 * A live view of one component in the circuit. Reads go straight to the
 * CircuitJS1 element, so values are always those of the latest timestep.
 */
export class CircuitElement {
    constructor(
        /** Stable for as long as the element exists; "e1", "e2", ... in load order. */
        readonly id: string,
        /** The underlying CircuitJS1 element, for anything not covered here. */
        readonly raw: any,
        private readonly engine: CircuitEngine,
    ) {}

    /** CircuitJS1 class name, e.g. "ResistorElm", "CapacitorElm", "SwitchElm". */
    get type(): string { return this.raw.constructor.name; }

    get x1(): number { return this.raw.x; }
    get y1(): number { return this.raw.y; }
    get x2(): number { return this.raw.x2; }
    get y2(): number { return this.raw.y2; }

    get postCount(): number { return this.raw.getPostCount(); }

    /** Positions of the element's terminals on CircuitJS1's grid. */
    get posts(): Point[] {
        const out: Point[] = [];
        for (let i = 0; i < this.postCount; i++) {
            const p = this.raw.getPost(i);
            if (p != null)
                out.push({ x: p.x, y: p.y });
        }
        return out;
    }

    /** Voltage at terminal n, relative to ground. */
    voltage(post = 0): number { return this.raw.getVoltageJS(post); }

    /** Voltage across the element (terminal 0 minus terminal 1). */
    get voltageDiff(): number { return this.raw.getVoltageDiff(); }

    /** Current through the element, in amps (meaningful for two-terminal elements). */
    get current(): number { return this.raw.getCurrent(); }

    /** Power dissipated, in watts. */
    get power(): number { return this.raw.getPower(); }

    /** CircuitJS1's own human-readable summary lines for this element. */
    info(): string[] {
        const arr: (string | null)[] = new Array(20).fill(null);
        this.raw.getInfo(arr);
        return arr.filter((s): s is string => s != null);
    }

    // ---- settings -------------------------------------------------------

    /** Every setting CircuitJS1's edit dialog offers for this element. */
    params(): ElementParam[] {
        const out: ElementParam[] = [];
        for (let i = 0; i < 100; i++) {
            const ei = this.raw.getEditInfo(i);
            if (ei == null)
                break;
            out.push(describeParam(i, ei));
        }
        return out;
    }

    /** Current value of one setting, looked up by index or by (start of) name. */
    param(key: number | string): number | string | boolean | null {
        return this.params()[this.paramIndex(key)].value;
    }

    /**
     * Change a setting the same way CircuitJS1's edit dialog does, then have
     * the circuit re-analysed. `key` is an index from params() or the start of
     * a name, case-insensitive: setParam("resistance", 220).
     */
    setParam(key: number | string, value: number | string | boolean): void {
        const index = this.paramIndex(key);
        const ei = this.raw.getEditInfo(index);
        const param = describeParam(index, ei);
        switch (param.kind) {
            case "checkbox":
                ei.checkbox.setState(Boolean(value));
                break;
            case "choice": {
                const choice = typeof value === "string" ? param.options!.indexOf(value) : Number(value);
                if (!(choice >= 0 && choice < param.options!.length))
                    throw new RangeError(`${this.type} "${param.name}": no option ${JSON.stringify(value)}`);
                ei.choice.select(choice);
                break;
            }
            case "text":
                ei.text = String(value);
                ei.textf = { value: String(value) };
                break;
            case "number": {
                const n = Number(value);
                if (Number.isNaN(n))
                    throw new RangeError(`${this.type} "${param.name}": not a number`);
                if (ei.positive && n <= 0)
                    throw new RangeError(`${this.type} "${param.name}" must be > 0`);
                if (ei.nonNegative && n < 0)
                    throw new RangeError(`${this.type} "${param.name}" must be >= 0`);
                if (ei.integer && !Number.isInteger(n))
                    throw new RangeError(`${this.type} "${param.name}" must be an integer`);
                ei.value = n;
                break;
            }
            default:
                throw new Error(`${this.type} "${param.name}" cannot be set through setParam()`);
        }
        this.raw.setEditValue(index, ei);
        this.engine.app.needAnalyze();
    }

    private paramIndex(key: number | string): number {
        const params = this.params();
        if (typeof key === "number") {
            if (params[key] == null)
                throw new RangeError(`${this.type} has no setting #${key}`);
            return key;
        }
        const wanted = key.toLowerCase();
        const match = params.find(p => p.name.toLowerCase() === wanted)
            ?? params.find(p => p.name.toLowerCase().startsWith(wanted));
        if (match == null) {
            const names = params.map(p => `"${p.name}"`).join(", ");
            throw new RangeError(`${this.type} has no setting "${key}". Available: ${names}`);
        }
        return match.index;
    }

    // ---- switches -------------------------------------------------------

    get isSwitch(): boolean { return this.raw.isSwitchElm(); }

    /** Switch position. For a plain on/off switch 0 is closed and 1 is open. */
    get position(): number { return this.raw.position; }

    /** Flip a switch, exactly as a click on it does in CircuitJS1. */
    toggle(): void {
        if (!this.isSwitch)
            throw new Error(`${this.type} (${this.id}) is not a switch`);
        this.raw.toggle();
        this.engine.app.needAnalyze();
    }

    setPosition(position: number): void {
        for (let i = 0; this.position !== position; i++) {
            if (i >= 8)
                throw new RangeError(`${this.type} (${this.id}) has no position ${position}`);
            this.toggle();
        }
    }

    // ---- sliders (potentiometers) ---------------------------------------

    /** True for elements driven by a slider in CircuitJS1, such as a potentiometer. */
    get hasSlider(): boolean { return this.raw.slider != null && typeof this.raw.position === "number" && !this.isSwitch; }

    /** Move a potentiometer's wiper: 0 is one end, 1 the other. */
    setSlider(fraction: number): void {
        if (!this.hasSlider)
            throw new Error(`${this.type} (${this.id}) has no slider`);
        const raw = this.raw;
        // CircuitJS1 derives the wiper position from its slider widget (0..100)
        // inside setPoints(); this is what the widget's change handler does.
        raw.slider.val = Math.round(Math.min(1, Math.max(0, fraction)) * 100);
        raw.slider.draw?.();        // keeps CircuitJS1's own slider widget in step when its UI is showing
        for (const other of this.engine.app.elmList) {
            if (other === raw || (raw.link !== 0 && other.constructor === raw.constructor && other.link === raw.link))
                other.setPoints();
        }
        this.engine.app.needAnalyze();
    }

    /** A plain snapshot, handy for logging and tests. */
    snapshot() {
        const voltages: number[] = [];
        for (let i = 0; i < this.postCount; i++)
            voltages.push(this.voltage(i));
        return {
            id: this.id,
            type: this.type,
            posts: this.posts,
            voltages,
            voltageDiff: this.voltageDiff,
            current: this.current,
            power: this.power,
        };
    }
}

function describeParam(index: number, ei: any): ElementParam {
    if (ei.checkbox != null)
        return { index, name: ei.checkbox.name, kind: "checkbox", value: ei.checkbox.getState() };
    if (ei.choice != null)
        return { index, name: ei.name, kind: "choice", value: ei.choice.getSelectedIndex(), options: [...ei.choice.items] };
    if (ei.button != null || ei.textArea != null || ei.widget != null || ei.loadFile != null)
        return { index, name: ei.name, kind: "other", value: null };
    if (ei.text != null)
        return { index, name: ei.name, kind: "text", value: ei.text };
    return { index, name: ei.name, kind: "number", value: ei.value };
}
