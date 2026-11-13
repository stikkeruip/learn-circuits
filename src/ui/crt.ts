// The circuit on a green-phosphor CRT (docs/design/, "Circuit rendering").
//
// CircuitJS1 colours each wire by its voltage, on a scale from its "negative"
// colour through "neutral" (0 V) to "positive", and draws current as moving
// dots. These colours are its own address options (positiveColor=... and so
// on), so the simulator itself is not changed.
export const PHOSPHOR_COLOURS: Record<string, string> = {
    positiveColor: "#D8FFC9",   // the highest voltage is the brightest
    neutralColor: "#417049",    // 0 V: dim, but lifted to 3.3:1 on the screen so it still reads
    negativeColor: "#F7A823",   // below 0 V: amber, so polarity is not told by brightness alone
    currentColor: "#F2FFE8",    // current dots
    selectColor: "#F7A823",     // selection and hover
};

/** Address options that draw the circuit in phosphor colours on CircuitJS1's dark background. */
export function phosphorOptions(): Record<string, string> {
    return { ...PHOSPHOR_COLOURS, whiteBackground: "false" };
}
