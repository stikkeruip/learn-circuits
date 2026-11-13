// The test DOM (jsdom) has no canvas drawing support, and a few CircuitJS1
// components build a small slider widget that draws itself when created.
// Real browsers are unaffected; here we hand out a drawing context that
// accepts every call and does nothing.

const inertContext: any = new Proxy(function () {}, {
    get: (_target, prop) => (prop === "width" ? 0 : inertContext),
    set: () => true,
    apply: () => inertContext,
});

HTMLCanvasElement.prototype.getContext = function () {
    return inertContext;
};
