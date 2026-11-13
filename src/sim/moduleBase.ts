// Stands in for circuitjs1/ts/ModuleBase.ts (see the alias in vite.config.ts).
//
// CircuitJS1 fetches setuplist.txt, circuits/ and locale/ relative to this
// URL. Its own build puts those next to the script; ours serves them from the
// same directory as the page.
const page = document.baseURI.split(/[?#]/)[0];
export const moduleBaseURL = page.substring(0, page.lastIndexOf("/") + 1);
