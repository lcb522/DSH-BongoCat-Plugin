//#region lib/index.js
/**
* Bongo Paw plugin, node half. Pure UI plugin: the empty apply exists
* so the plugin appears in the host cordis.yml / Loader; the browser half
* ships via exports["./client"], discovered through the package.json
* dsh.client declaration. All state is a browser-local preference
* (localStorage) — a client-only visual pet owns no host configuration.
*/
/** Host plugin body — no host-side behavior for this surface plugin. */
function apply() {}
//#endregion
export { apply };
