// Repair Shop '84 over CircuitJS1's own controls, the parts CSS cannot reach
// (the rest is src/sim/skin.css).
//
// - The side panel's sliders are canvases that CircuitJS1 paints white, grey
//   and red. Their drawing is replaced, at run time, by one in the shop's
//   colours: ink track, orange fill, a round knob. Values, clicks, drags and
//   the wheel stay CircuitJS1's own; its source is not changed. If its slider
//   ever stops looking like this, its own drawing is used again.
// - ?crt=true (the Bench) turns on the monitor look over the circuit.

/** What the drawing reads from CircuitJS1's Scrollbar (UIManager.ts). */
interface Slider {
    element: HTMLCanvasElement;
    g: CanvasRenderingContext2D;
    /** Width in CSS pixels: the side panel's. */
    vpw: number;
    min: number;
    max: number;
    val: number;
    enabled: boolean;
    attachedElm: { needsHighlight?(): boolean } | null;
}

const HEIGHT = 20;       // CSS px. CircuitJS1 draws them 14 px high; a click only uses x.
// CircuitJS1 maps x to a value between these insets, and steps the value by
// one on a click within END of either edge, so the arrows are drawn there.
const INSET = 19;        // its HMARGIN + SCROLLHEIGHT + BARMARGIN
const END = 16;          // its HMARGIN + SCROLLHEIGHT

let colours: Record<"ink" | "signal" | "amber" | "off", string> | null = null;

function shopColours() {
    if (colours == null) {
        const css = getComputedStyle(document.documentElement);
        const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
        colours = {
            ink: token("--ink", "#221E19"),
            signal: token("--signal", "#F26B1D"),
            amber: token("--amber", "#F7A823"),
            off: token("--disabled-edge", "#A99C82"),
        };
    }
    return colours;
}

function bar(g: CanvasRenderingContext2D, from: number, to: number, y: number, thickness: number, colour: string): void {
    g.strokeStyle = colour;
    g.lineWidth = thickness;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(from, y);
    g.lineTo(Math.max(from, to), y);
    g.stroke();
}

function drawSlider(s: Slider): void {
    const { element: canvas, g, vpw: width } = s;
    if (g == null || typeof width !== "number" || typeof s.val !== "number" || typeof s.min !== "number" || typeof s.max !== "number")
        throw new Error("CircuitJS1's slider is not the one this drawing knows");
    if (width <= 0)
        return;     // no side panel (?hideSidebar=true): nothing to draw
    const c = shopColours();

    // Sharp on high-density screens: more canvas pixels, same CSS size.
    const dpr = window.devicePixelRatio || 1;
    canvas.style.height = HEIGHT + "px";
    const w = Math.round(width * dpr), h = Math.round(HEIGHT * dpr);
    if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, width, HEIGHT);

    const y = HEIGHT / 2;
    const edge = s.enabled ? c.ink : c.off;

    // the step arrows
    g.strokeStyle = edge;
    g.lineWidth = 2;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(END - 5, y - 5); g.lineTo(END - 10, y); g.lineTo(END - 5, y + 5);
    g.moveTo(width - END + 5, y - 5); g.lineTo(width - END + 10, y); g.lineTo(width - END + 5, y + 5);
    g.stroke();

    bar(g, INSET, width - INSET, y, 6, edge);
    if (!s.enabled)
        return;

    const span = s.max - s.min;
    const x = INSET + (width - 2 * INSET) * (span > 0 ? (s.val - s.min) / span : 0);
    // Amber while the part it changes is highlighted on the screen.
    const hot = s.attachedElm?.needsHighlight?.() ? c.amber : c.signal;
    bar(g, INSET, x, y, 6, hot);
    g.beginPath();
    g.arc(x, y, 6.5, 0, 2 * Math.PI);
    g.fillStyle = hot;
    g.fill();
    g.lineWidth = 2;
    g.strokeStyle = c.ink;
    g.stroke();
}

/** Draw CircuitJS1's sliders in the shop's colours. Takes its Scrollbar class. */
export function skinSliders(Scrollbar: { prototype: { draw(): void } }): void {
    const own = Scrollbar.prototype.draw;
    let broken = false;
    Scrollbar.prototype.draw = function (this: Slider) {
        if (!broken) {
            try {
                drawSlider(this);
                return;
            } catch (e) {
                // Thrown before anything was drawn or resized.
                broken = true;
                console.warn("Slider skin off:", e);
            }
        }
        own.call(this);
    };
}

/** The Bench asks for the monitor look over the circuit with ?crt=true. */
export function applyScreen(): void {
    if (new URLSearchParams(location.search).get("crt") === "true")
        document.documentElement.classList.add("crt");
}
