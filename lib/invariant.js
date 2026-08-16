//#region lib/invariant.js
/**
* Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-bongocat`.
* @module @deepseek-ai/dsh-client-ui-bongocat/invariant
*/
const PACKAGE_NAME = "@deepseek-ai/dsh-client-ui-bongocat";
/** Cordis companion plugin name. */
const name = "client-ui-bongocat-invariant";
/** Service required before the companion can reserve package ownership. */
const inject = ["invariants"];
/**
* No runtime invariant: the pet layer holds no cross-plugin mutable state —
* the fixed stage, the keycap bubbles, and the input listeners are all
* owned effects disposed with the plugin fiber.
*/
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
* @returns the installed registration's disposer after setup succeeds.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
