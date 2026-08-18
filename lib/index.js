//#region lib/index.js
/**
 * Bongo Paw plugin, node half. All visual state is a browser-local preference
 * (localStorage); the host half exists for two things only:
 *
 * 1. appear in the host cordis.yml / Loader;
 * 2. register the `bongocat` settings namespace and expose it through the
 *    api-proxy `settings.describe` response, so the Plugins settings tab —
 *    which pairs cards with served namespaces — dispatches the card that the
 *    browser half registers under key "bongocat". The namespace carries a
 *    single informational `enabled` field; the real on/off switch lives in
 *    the card (localStorage), so writes here are not needed.
 */
import z from '@deepseek-ai/schemastery';

/** Cordis plugin name used by loader diagnostics. */
const name = 'client-ui-bongocat';

/** Services that must exist for this plugin to mount. */
const inject = ['settings'];

/** Settings namespace owned by this plugin (pairs with the client card's slot key). */
const SETTINGS_NS = 'bongocat';

/** Schemastery validation for the settings namespace (persisted in settings.yaml). */
const SettingsSchema = z.object({
	/** Informational master switch; the live switch is the card's localStorage toggle. */
	enabled: z.boolean().default(true),
});

/** Host plugin body: register the namespace and expose it to settings clients. */
function apply(ctx) {
	const scope = ctx.get('settings').register(SETTINGS_NS, SettingsSchema);
	ctx.logger?.info?.('bongocat: settings namespace registered (client card pairs on it)');
	ctx.inject(['apiProxy'], (proxyCtx) => {
		const proxy = proxyCtx.get('apiProxy');
		const settingsFace = proxy.settings;
		if (settingsFace === undefined || typeof settingsFace.describe !== 'function') return;
		const viewOf = () => {
			const settings = proxyCtx.get('settings');
			if (settings === undefined) return undefined;
			const descriptor = settings.describe({ redactSecrets: true }).find((candidate) => candidate.ns === SETTINGS_NS);
			if (descriptor === undefined) return undefined;
			return {
				ns: String(descriptor.ns),
				schema: descriptor.schema,
				value: descriptor.value,
				...descriptor.base === undefined ? {} : { base: descriptor.base },
				...descriptor.user === undefined ? {} : { user: descriptor.user },
				applies: descriptor.applies,
				secrets: (descriptor.secrets ?? []).map((secret) => ({ path: [...secret.path], set: secret.set })),
				revision: descriptor.revision,
			};
		};
		const originalDescribe = settingsFace.describe.bind(settingsFace);
		const wrappedDescribe = async (request) => {
			const response = await originalDescribe(request);
			if (response?.result?.ok !== true) return response;
			const view = viewOf();
			if (view === undefined) return response;
			const namespaces = response.result.value.namespaces.filter((candidate) => candidate.ns !== SETTINGS_NS);
			response.result.value = { ...response.result.value, namespaces: [...namespaces, view] };
			return response;
		};
		settingsFace.describe = wrappedDescribe;
		proxyCtx.on('dispose', () => {
			if (settingsFace.describe === wrappedDescribe) settingsFace.describe = originalDescribe;
		});
	});
	return scope;
}
//#endregion
export { apply, inject, name };
