// A burst of sparks from a key: the small celebration when a step is done and
// the key to go on turns green. Chips in the bench's colours, ink-outlined
// like everything else on it, thrown up and out and gone in under a second
// (the "spark" animation in lesson.css).

const SHAPES = ["", "bar", "dot"];
const COLOURS = ["", "signal", "live", "cream"];
const COUNT = 16;

/**
 * Throw sparks from the top edge of a key. `host` is an empty element laid
 * over the key. Does nothing for a reader who has asked for less motion.
 */
export function throwSparks(host: HTMLElement): void {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
    const sparks: HTMLElement[] = [];
    for (let i = 0; i < COUNT; i++) {
        const spark = document.createElement("i");
        spark.className = `spark ${SHAPES[i % SHAPES.length]} ${COLOURS[i % COLOURS.length]}`;
        // A fan over the key, from low on the left to low on the right, each
        // spark a little off its place in the fan so no two bursts look alike.
        const along = (i + Math.random()) / COUNT;
        const angle = Math.PI * (1.08 - 1.16 * along);
        const reach = 44 + Math.random() * 56;
        spark.style.setProperty("--x", `${10 + 80 * along}%`);
        spark.style.setProperty("--dx", `${(Math.cos(angle) * reach).toFixed(1)}px`);
        spark.style.setProperty("--dy", `${(-Math.sin(angle) * reach - 8).toFixed(1)}px`);
        spark.style.setProperty("--spin", `${Math.round((Math.random() * 2 - 1) * 260)}deg`);
        spark.style.setProperty("--delay", `${Math.round(Math.random() * 90)}ms`);
        sparks.push(spark);
    }
    host.append(...sparks);
    // Each burst clears up after itself, so a second one can overlap the first.
    setTimeout(() => sparks.forEach(spark => spark.remove()), 1100);
}
