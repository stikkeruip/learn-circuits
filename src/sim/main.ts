// The full simulator: Paul Falstad's own CircuitJS1 application (component
// symbols, moving-current animation, menus, mouse editing, scopes), started
// from his unmodified source, with our CircuitEngine attached to it.
//
// The start-up sequence is the one in circuitjs1/ts/main.ts, without its
// service worker. The import order matters (his modules import each other in
// cycles) and is the same as there.
import "circuitjs/CircuitElm";
import "circuitjs/Graphics";
import "circuitjs/Color";
import { CirSim } from "circuitjs/CirSim";
import "circuitjs/SimulationManager";
import "circuitjs/UIManager";
import "circuitjs/ScopeManager";
import "circuitjs/CircuitLoader";
import { JSInterface } from "circuitjs/JSInterface";
import { HookRegistry } from "circuitjs/HookRegistry";
import { Locale } from "circuitjs/Locale";
import * as LZString from "lz-string";
import "circuitjs/canvas2svg.js";
import { CircuitEngine } from "../engine";

async function boot(): Promise<CircuitEngine> {
    // CircuitJS1 reads both of these from window (links and SVG export).
    (window as any).LZString = LZString;
    HookRegistry.createJSInterface = (app: any) => new JSInterface(app);

    await Locale.load();
    const app = new CirSim();
    await app.init();

    const engine = CircuitEngine.attach(app);
    (window as any).engine = engine;
    return engine;
}

// A page that embeds this one waits on this promise to get the engine.
(window as any).engineReady = boot();
