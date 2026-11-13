// The lesson format. A lesson is one circuit plus a short run of steps that
// set its values, let the learner turn its knobs, and ask questions about it.
//
// Lessons are plain data (see src/lessons/). The simulator is the source of
// truth for every measured number: tests/lessons.test.ts loads each lesson
// into the engine and checks that every answer agrees with it.

export interface Lesson {
    /** Used in the address: lesson.html?id=<id>. */
    id: string;
    title: string;
    /** One sentence on what the lesson teaches, shown on the home page. */
    summary: string;
    /** The story: the lesson is a repair job someone has brought in to the shop. */
    job: Job;
    /**
     * The circuit, in CircuitJS1's text format (the line format is described
     * in tests/comparison/circuits.ts). Values set by steps replace the ones
     * written here.
     */
    circuit: string;
    /** Names for parts of the circuit, so quantities can refer to them. */
    parts: Record<string, PartRef>;
    /** What the learner sees and changes, in the order the readouts appear. */
    quantities: Record<string, Quantity>;
    steps: Step[];
}

/**
 * A lesson told as a repair job (see docs/design/). Job numbers come from the
 * lesson's place in the course: the first lesson is job №0001.
 */
export interface Job {
    /** "First day on the bench" */
    title: string;
    /** Who brought the job in: "Rita, who runs the shop". */
    customer: string;
    /** What they say when they hand it over. */
    request: string;
    /** What they say when it is done. */
    thanks: string;
}

export interface PartRef {
    /** CircuitJS1 element type, with or without "Elm": "Resistor", "VoltageElm". */
    type: string;
    /** Which one of that type, counting from 0 in circuit order (default 0). */
    nth?: number;
}

interface QuantityBase {
    /** "Current" */
    label: string;
    /** A key of Lesson.parts. */
    part: string;
}

interface NumberQuantity extends QuantityBase {
    /** "I", as written in formulas. */
    symbol: string;
    /** "A" */
    unit: string;
}

/**
 * A switch. It reads "Closed" or "Open"; as a number, in a step's `set` or an
 * explore step's `goal`, 1 is closed (the loop is made) and 0 is open.
 */
export interface SwitchQuantity extends QuantityBase {
    switch: true;
    symbol?: undefined;
    unit?: undefined;
}

/**
 * A setting of a part (steps and sliders can change it, e.g. a battery's
 * "Voltage"), something the simulator measures (e.g. the current through
 * a resistor), or a switch (steps set it; the learner flips it on the drawing). Settings are
 * matched by name like CircuitElement.setParam().
 */
export type Quantity =
    | (NumberQuantity & ({ setting: string } | { measure: "voltage" | "current" | "power" }))
    | SwitchQuantity;

export type Step = ReadStep | ExploreStep | ChoiceStep | NumberStep;

interface StepBase {
    /**
     * Values for settings and switches when the step starts, by quantity name.
     * A step can come round again after a mistake, so give every value the
     * step relies on.
     */
    set?: Record<string, number>;
}

// Text fields: paragraphs are separated by a blank line, **bold** is bold, and
// {name} shows the live value of a quantity, e.g. "It is now {current}."

/** Something to read, with the circuit running alongside. */
export interface ReadStep extends StepBase {
    kind: "read";
    title: string;
    text: string;
    /** Shown large below the text. Symbols of quantities are coloured to match their readouts. */
    formula?: string;
    /** Text below the formula. */
    note?: string;
}

/**
 * The learner moves sliders, and flips switches on the drawing itself, until
 * the circuit reaches a goal.
 */
export interface ExploreStep extends StepBase {
    kind: "explore";
    title: string;
    text: string;
    /** The sliders shown. A switch has no control: the text says to press it on the drawing. */
    controls: Control[];
    /** Values the learner must reach before continuing, by quantity name. */
    goal: Record<string, number>;
    /** Shown once the goal is reached. */
    success: string;
}

/** A slider. */
export interface Control {
    /** A quantity that is a setting. */
    quantity: string;
    min: number;
    max: number;
    step: number;
}

export interface ChoiceStep extends StepBase {
    kind: "choice";
    question: string;
    options: string[];
    /** Index into options. */
    answer: number;
    /** Shown after answering, right or wrong. */
    explain: string;
}

/** The learner works out a value. Its readout and the circuit's labels stay hidden until they answer. */
export interface NumberStep extends StepBase {
    kind: "number";
    question: string;
    /** The quantity to work out; the answer is in its unit. */
    solveFor: string;
    answer: number;
    explain: string;
    /** Accepted relative error (default 0.01, i.e. 1%). */
    tolerance?: number;
}
