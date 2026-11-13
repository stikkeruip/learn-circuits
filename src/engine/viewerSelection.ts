// Selecting parts while the circuit can be used but not changed
// (CircuitEngine.editable = false), where a plain drag moves the view:
//
// - Ctrl-click (⌘-click on a Mac) adds a part to the selection, or takes it out.
// - Ctrl-drag draws a box; the parts it touches join the selection.
// - A plain click clears the selection; a plain drag, which moves the view,
//   keeps it.
//
// CircuitJS1 has no click-to-add selection of its own, and in the "Drag All"
// mouse mode every press clears the selection, so these gestures are handled
// here, with CircuitJS1's own selection flags and selection-box drawing. Ctrl
// gestures never reach CircuitJS1: a Ctrl-click on a switch selects it rather
// than flipping it. Touches arrive as mouse events too (CircuitJS1 turns them
// into some), so a tap clears and a one-finger drag keeps the selection.

import type { CircuitElm } from "circuitjs/CircuitElm";
import type { CirSim } from "circuitjs/CirSim";
import { Rectangle } from "circuitjs/Rectangle";

/** How far, in CSS px, a press may move and still be a click. */
const CLICK_SLOP = 4;

/** Start handling the gestures; returns a function that stops. */
export function installViewerSelection(app: CirSim): () => void {
    const ui = app.ui;
    const mouse = app.mouse;
    const canvas = ui.cv as HTMLCanvasElement;

    let gesture: {
        ctrl: boolean;
        /** Where the press began, on the canvas. */
        x: number;
        y: number;
        moved: boolean;
        /** The selection when the press began. */
        before: Set<CircuitElm>;
        /** For a Ctrl press: the part under the pointer, as CircuitJS1's hover found it. */
        part: CircuitElm | null;
    } | null = null;

    const onCanvas = (e: MouseEvent): [number, number] => {
        const r = canvas.getBoundingClientRect();
        return [e.clientX - r.left, e.clientY - r.top];
    };
    /** The parts on the screen (inside a subcircuit, its parts). */
    const parts = (): CircuitElm[] => ui.elmList;
    const selection = () => new Set(parts().filter(ce => ce.isSelected()));
    const setSelection = (selected: (ce: CircuitElm) => boolean) => {
        for (const ce of parts())
            ce.setSelected(selected(ce));
        app.repaint();
    };

    // Capture phase on the window: before CircuitJS1's own handlers on the canvas.
    const down = (e: MouseEvent) => {
        if (e.button !== 0 || e.target !== canvas)
            return;
        if (gesture?.ctrl)
            mouse.selectedArea = null;     // a box whose release happened outside the page
        const [x, y] = onCanvas(e);
        const ctrl = e.ctrlKey || e.metaKey;
        gesture = { ctrl, x, y, moved: false, before: selection(), part: ctrl ? mouse.getMouseElm() : null };
        if (ctrl)
            e.stopImmediatePropagation();
    };
    // Bubble phase, after CircuitJS1's mousedown: put back what its Drag All mode cleared.
    const downDone = () => {
        if (gesture != null && !gesture.ctrl)
            setSelection(ce => gesture!.before.has(ce));
    };
    const move = (e: MouseEvent) => {
        if (gesture == null)
            return;
        const [x, y] = onCanvas(e);
        if (!gesture.moved && Math.hypot(x - gesture.x, y - gesture.y) >= CLICK_SLOP)
            gesture.moved = true;
        if (!gesture.ctrl)
            return;
        e.stopImmediatePropagation();
        if (!gesture.moved)
            return;
        // The box, in the drawing's own coordinates, as CircuitJS1 draws it.
        const x0 = mouse.inverseTransformX(gesture.x), y0 = mouse.inverseTransformY(gesture.y);
        const x1 = mouse.inverseTransformX(x), y1 = mouse.inverseTransformY(y);
        const box = new Rectangle(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
        mouse.selectedArea = box;
        const before = gesture.before;
        setSelection(ce => before.has(ce) || box.intersects(ce.boundingBox));
    };
    const up = (e: MouseEvent) => {
        if (gesture == null || e.button !== 0)
            return;
        const { ctrl, moved, before, part } = gesture;
        gesture = null;
        if (ctrl) {
            e.stopImmediatePropagation();
            if (!moved && part != null)
                setSelection(ce => ce === part ? !before.has(ce) : before.has(ce));
            mouse.selectedArea = null;
            app.repaint();
        } else if (!moved) {
            setSelection(() => false);
        }
    };

    const listeners: [string, (e: MouseEvent) => void, boolean][] = [
        ["mousedown", down, true],
        ["mousedown", downDone, false],
        ["mousemove", move, true],
        ["mouseup", up, true],
    ];
    for (const [type, listener, capture] of listeners)
        window.addEventListener(type, listener as EventListener, capture);
    return () => {
        for (const [type, listener, capture] of listeners)
            window.removeEventListener(type, listener as EventListener, capture);
        gesture = null;
        mouse.selectedArea = null;
    };
}
