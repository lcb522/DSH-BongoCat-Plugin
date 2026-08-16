/**
 * Bongo Paw client bundle — Live2D edition template.
 *
 * Renders the REAL BongoCat keyboard Live2D model (MIT, ayangweb/BongoCat)
 * inside the DSH web surface, driven by page keyboard events through the
 * model's own paw parameters (CatParamLeftHandDown / CatParamRightHandDown).
 *
 * Build: scripts/build-client.mjs substitutes the placeholders below with the
 * vendored runtime sources and base64 model files, producing lib/client.js.
 */
window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-bongocat",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region src/client/embedded.ts
		/** Vendored runtime sources (injected in dependency order). */
		const LIB_CORE = ["__LIB_CORE__"][0];
		const LIB_PIXI = ["__LIB_PIXI__"][0];
		const LIB_L2D = ["__LIB_L2D__"][0];
		/** Model files keyed by their path relative to the model root. */
		const MODEL_FILES = __MODEL_FILES__;
		/** Virtual origin every embedded model URL resolves against. */
		const VIRTUAL_BASE = "https://bongo.local/keyboard/";
		/** Map a virtual model URL to its embedded data URL, or undefined. */
		function mapUrl(url) {
			if (typeof url !== "string") return void 0;
			if (!url.startsWith(VIRTUAL_BASE)) return void 0;
			const rel = decodeURIComponent(url.slice(VIRTUAL_BASE.length));
			return MODEL_FILES[rel];
		}
		//#endregion
		//#region src/client/runtime-hooks.ts
		/** Inject the three runtime scripts once (synchronous execution order). */
		function ensureRuntimeLibs() {
			const seq = [
				["bongocat-lib-core", LIB_CORE],
				["bongocat-lib-pixi", LIB_PIXI],
				["bongocat-lib-l2d", LIB_L2D],
			];
			for (const [id, code] of seq) {
				if (document.getElementById(id) === null) {
					const tag = document.createElement("script");
					tag.id = id;
					tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-bongocat";
					tag.textContent = code;
					document.head.appendChild(tag);
				}
			}
			return typeof window.Live2DCubismCore !== "undefined" && typeof window.PIXI === "object" && window.PIXI !== null && window.PIXI.live2d !== void 0;
		}
		/** Route every loader channel (XHR / fetch / Image) for the virtual origin. */
		function installLoaderHooks() {
			if (window.__bongoLoaderHooked) return;
			window.__bongoLoaderHooked = true;
			const OrigXHR = window.XMLHttpRequest;
			function PatchedXHR() {
				const xhr = new OrigXHR();
				const origOpen = xhr.open;
				xhr.open = function (method, url, ...rest) {
					const mapped = mapUrl(String(url));
					return origOpen.call(this, method, mapped === void 0 ? url : mapped, ...rest);
				};
				return xhr;
			}
			PatchedXHR.prototype = OrigXHR.prototype;
			window.XMLHttpRequest = PatchedXHR;
			const origFetch = window.fetch;
			if (typeof origFetch === "function") {
				window.fetch = function (input, init) {
					try {
						const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
						const mapped = mapUrl(url);
						if (mapped !== void 0) return origFetch.call(this, mapped, init);
					} catch { /* fallthrough */ }
					return origFetch.apply(this, arguments);
				};
			}
			const OrigImage = window.Image;
			const desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
			if (desc !== void 0) {
				function PatchedImage(w, h) {
					const img = arguments.length === 2 ? new OrigImage(w, h) : arguments.length === 1 ? new OrigImage(w) : new OrigImage();
					Object.defineProperty(img, "src", {
						get() {
							return desc.get.call(this);
						},
						set(value) {
							const mapped = mapUrl(String(value));
							desc.set.call(this, mapped === void 0 ? value : mapped);
						},
						configurable: true,
					});
					return img;
				}
				PatchedImage.prototype = OrigImage.prototype;
				window.Image = PatchedImage;
			}
		}
		//#endregion
		//#region src/client/pet-css.ts
		const css = `[data-dsh-bongo]{position:fixed;bottom:10px;z-index:60;pointer-events:none;font-family:var(--dsw-alias-font-family,system-ui,sans-serif);display:flex;flex-direction:column;align-items:center;gap:2px}[data-dsh-bongo][data-side=right]{right:24px}[data-dsh-bongo][data-side=left]{left:24px}[data-dsh-bongo] .bongo-caps{display:flex;gap:4px;min-height:24px;align-items:flex-end;justify-content:center;flex-wrap:wrap;max-width:340px}[data-dsh-bongo] .bongo-cap{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 7px;font-size:12px;line-height:18px;box-shadow:0 2px 8px rgba(0,0,0,.18);animation:bongo-cap 1.1s var(--ds-ease-in-out,ease) forwards;white-space:nowrap}[data-dsh-bongo] .bongo-cap.fresh{border-color:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary)}@keyframes bongo-cap{0%{opacity:0;transform:translateY(6px) scale(.85)}12%{opacity:1;transform:translateY(0) scale(1)}70%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}[data-dsh-bongo] .bongo-stage{position:relative;line-height:0}[data-dsh-bongo] canvas{display:block}`;
		const tagId = "@deepseek-ai/dsh-client-ui-bongocat/pet.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-bongocat";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/bongo-pet.ts
		/** localStorage keys for the pet layer. */
		const BONGO_ENABLED_KEY = "dsh.ui-bongocat.enabled";
		const BONGO_SIDE_KEY = "dsh.ui-bongocat.side";
		const BONGO_SCALE_KEY = "dsh.ui-bongocat.scale";
		const BONGO_SHOW_KEYS_KEY = "dsh.ui-bongocat.showKeys";
		/** Pet settings with the shipped defaults. */
		const BONGO_DEFAULTS = { side: "right", scale: 100, showKeys: true };
		/** Display width of the model at scale 100%, px. */
		const BASE_WIDTH = 260;
		/** True when the stored string is the literal `true`/`1`. */
		function readFlag(key, fallback) {
			try {
				const raw = localStorage.getItem(key);
				if (raw === null) return fallback;
				return raw === "true" || raw === "1";
			} catch {
				return fallback;
			}
		}
		/** Write one localStorage key (quota failures are non-fatal). */
		function writeKey(key, value) {
			try {
				localStorage.setItem(key, value);
			} catch { /* non-fatal */ }
		}
		/**
		* The Live2D bongo-cat pet: a fixed, click-transparent stage with a
		* keycap row and the real BongoCat keyboard model on a WebGL canvas.
		* Page-scoped keyboard events drive the model's own paw parameters;
		* every effect is owned and disposed with the layer.
		*/
		const BongoPet = class {
			constructor() {
				this.enabled = readFlag(BONGO_ENABLED_KEY, true);
				this.settings = { ...BONGO_DEFAULTS };
				this.readSettings();
				this.stage = void 0;
				this.capsRow = void 0;
				this.canvas = void 0;
				this.app = void 0;
				this.model = void 0;
				this.mounting = false;
				this.pawState = { left: false, right: false };
				this.downKeys = /* @__PURE__ */ new Map();
				this.disposers = [];
			}
			/** Read the persisted knobs, clamping every field. */
			readSettings() {
				try {
					const side = localStorage.getItem(BONGO_SIDE_KEY);
					if (side === "left" || side === "right") this.settings.side = side;
					const scale = Number(localStorage.getItem(BONGO_SCALE_KEY));
					if (Number.isFinite(scale)) this.settings.scale = Math.min(180, Math.max(50, Math.round(scale)));
					const showKeys = localStorage.getItem(BONGO_SHOW_KEYS_KEY);
					if (showKeys !== null) this.settings.showKeys = showKeys === "true" || showKeys === "1";
				} catch { /* non-fatal */ }
			}
			getEnabled() {
				return this.enabled;
			}
			/** Flip the enable flag; the stage mounts/unmounts immediately. */
			setEnabled(value) {
				if (value === this.enabled) return;
				this.enabled = value;
				writeKey(BONGO_ENABLED_KEY, String(value));
				if (value) void this.mount();
				else this.unmount();
			}
			/** Set the stage side (`left` / `right`). */
			setSide(side) {
				this.settings.side = side;
				writeKey(BONGO_SIDE_KEY, side);
				this.applySettings();
			}
			/** Set the model scale (50-180). */
			setScale(scale) {
				this.settings.scale = Math.min(180, Math.max(50, Math.round(scale)));
				writeKey(BONGO_SCALE_KEY, String(this.settings.scale));
				this.applySettings();
			}
			/** Set whether keycap bubbles show the pressed key names. */
			setShowKeys(showKeys) {
				this.settings.showKeys = showKeys;
				writeKey(BONGO_SHOW_KEYS_KEY, String(showKeys));
			}
			/** Build the DOM shell, then load the Live2D model onto it. */
			async mount() {
				if (this.stage !== void 0 || this.mounting) return;
				if (typeof document === "undefined") return;
				this.mounting = true;
				try {
					installLoaderHooks();
					const stage = document.createElement("div");
					stage.setAttribute("data-dsh-bongo", "");
					stage.setAttribute("aria-hidden", "true");
					const caps = document.createElement("div");
					caps.className = "bongo-caps";
					const holder = document.createElement("div");
					holder.className = "bongo-stage";
					const canvas = document.createElement("canvas");
					holder.appendChild(canvas);
					stage.appendChild(caps);
					stage.appendChild(holder);
					document.body.appendChild(stage);
					this.stage = stage;
					this.capsRow = caps;
					this.canvas = canvas;
					this.applySettings();
					this.attach();
					if (!ensureRuntimeLibs()) throw new Error("ui-bongocat: runtime libs failed to expose globals");
					const PIXI = window.PIXI;
					const app = new PIXI.Application({ view: canvas, backgroundAlpha: 0, autoDensity: true, resolution: window.devicePixelRatio || 1, width: 320, height: 240 });
					this.app = app;
					const settingsJson = JSON.parse(await (await fetch(MODEL_FILES["cat.model3.json"])).text());
					const model = await PIXI.live2d.Live2DModel.from({ ...settingsJson, url: VIRTUAL_BASE + "cat.model3.json" }, { autoInteract: false });
					this.model = model;
					app.stage.addChild(model);
					this.drivePaws();
					this.applySettings();
				} catch (error) {
					console.error("ui-bongocat: Live2D mount failed", error);
					this.stage?.remove();
					this.stage = void 0;
				} finally {
					this.mounting = false;
				}
			}
			/** Wrap the internal update so paw parameters ride every frame. */
			drivePaws() {
				const im = this.model?.internalModel;
				if (im === void 0) return;
				const core = im.coreModel;
				const origUpdate = im.update.bind(im);
				const left = "CatParamLeftHandDown";
				const right = "CatParamRightHandDown";
				im.update = function (dt, ...rest) {
					try {
						core.setParameterValueById(left, BONGO_PAW_STATE.left ? 1 : 0);
						core.setParameterValueById(right, BONGO_PAW_STATE.right ? 1 : 0);
					} catch { /* parameter missing on this model */ }
					return origUpdate(dt, ...rest);
				};
			}
			/** Remove the stage, model, and every listener. */
			unmount() {
				for (const dispose of this.disposers.splice(0)) dispose();
				try {
					this.model?.destroy();
				} catch { /* already destroyed */ }
				this.model = void 0;
				try {
					this.app?.destroy(true);
				} catch { /* already destroyed */ }
				this.app = void 0;
				this.stage?.remove();
				this.stage = void 0;
				this.capsRow = void 0;
				this.canvas = void 0;
				this.downKeys.clear();
			}
			/** Write the side/scale knobs onto the stage and the model. */
			applySettings() {
				if (this.stage !== void 0) this.stage.dataset.side = this.settings.side;
				const model = this.model;
				if (model === void 0) return;
				const im = model.internalModel;
				if (im === void 0) return;
				const natural = im.originalWidth && im.originalHeight ? im.originalHeight / im.originalWidth : 0.75;
				const targetW = Math.round(BASE_WIDTH * (this.settings.scale / 100));
				const targetH = Math.round(targetW * natural);
				if (this.app !== void 0 && this.canvas !== void 0) {
					this.app.renderer.resize(targetW, targetH);
					this.canvas.style.width = `${targetW}px`;
					this.canvas.style.height = `${targetH}px`;
				}
				model.scale.set(targetW / im.originalWidth);
				model.x = 0;
				model.y = targetH;
				model.anchor?.set(0, 1);
			}
			/** Page-scoped input listeners feeding the paw state. */
			attach() {
				if (this.stage === void 0) return;
				const onKeyDown = (e) => {
					if (e.repeat) return;
					this.downKeys.set(e.code, this.sideFor(e));
					this.recompute();
					this.pushCap(this.labelFor(e));
				};
				const onKeyUp = (e) => {
					this.downKeys.delete(e.code);
					this.recompute();
				};
				const onMouseDown = (e) => {
					if (e.button === 0) {
						this.downKeys.set("__mouse", "both");
						this.recompute();
					}
				};
				const onMouseUp = () => {
					this.downKeys.delete("__mouse");
					this.recompute();
				};
				const onBlur = () => {
					this.downKeys.clear();
					this.recompute();
				};
				window.addEventListener("keydown", onKeyDown, { capture: true });
				window.addEventListener("keyup", onKeyUp, { capture: true });
				window.addEventListener("mousedown", onMouseDown, { capture: true });
				window.addEventListener("mouseup", onMouseUp, { capture: true });
				window.addEventListener("blur", onBlur);
				this.disposers.push(() => {
					window.removeEventListener("keydown", onKeyDown, { capture: true });
					window.removeEventListener("keyup", onKeyUp, { capture: true });
					window.removeEventListener("mousedown", onMouseDown, { capture: true });
					window.removeEventListener("mouseup", onMouseUp, { capture: true });
					window.removeEventListener("blur", onBlur);
				});
			}
			/** Map one keyboard event to the paw side that slaps it. */
			sideFor(e) {
				const code = e.code;
				if (code === "Space") return "both";
				if (code.startsWith("Key")) {
					const letter = code.slice(3);
					return "QWERTASDFGZXCVB".includes(letter) ? "left" : "right";
				}
				if (code.startsWith("Digit")) return Number(code.slice(5)) <= 5 ? "left" : "right";
				if (/^(Backquote|Tab|CapsLock|ShiftLeft|ControlLeft|AltLeft|MetaLeft|Escape|F[1-6]$)/.test(code)) return "left";
				if (/^(Backspace|Enter|ShiftRight|ControlRight|AltRight|MetaRight|Arrow|Delete|End|PageDown|PageUp|Home|Numpad|F([7-9]|1[0-2])$)/.test(code)) return "right";
				return "left";
			}
			/** Re-derive both paw states from the held-key map. */
			recompute() {
				let left = false;
				let right = false;
				for (const side of this.downKeys.values()) {
					if (side === "left") left = true;
					else if (side === "right") right = true;
					else {
						left = true;
						right = true;
					}
				}
				this.pawState.left = left;
				this.pawState.right = right;
				BONGO_PAW_STATE.left = left;
				BONGO_PAW_STATE.right = right;
			}
			/** Append one keycap bubble; capped so bursts cannot flood the row. */
			pushCap(label) {
				if (this.capsRow === void 0) return;
				if (label === "") return;
				while (this.capsRow.childElementCount >= 7) this.capsRow.firstElementChild?.remove();
				const cap = document.createElement("span");
				cap.className = "bongo-cap fresh";
				cap.textContent = label;
				this.capsRow.appendChild(cap);
				const previous = cap.previousElementSibling;
				if (previous instanceof HTMLElement) previous.classList.remove("fresh");
				cap.addEventListener("animationend", () => {
					cap.remove();
				});
			}
			/** Format one keyboard event into a short bubble label. */
			labelFor(e) {
				if (!this.settings.showKeys) return "";
				if (this.isSensitive(e)) return "\u2022\u2022\u2022";
				const parts = [];
				if (e.ctrlKey && e.key !== "Control") parts.push("Ctrl");
				if (e.altKey && e.key !== "Alt") parts.push("Alt");
				if (e.shiftKey && e.key !== "Shift" && e.key.length > 1) parts.push("Shift");
				if (e.metaKey && e.key !== "Meta") parts.push("Win");
				let key = e.key;
				if (key === " ") key = "Space";
				else if (key === "Escape") key = "Esc";
				else if (key === "Backspace") key = "Bksp";
				else if (key === "Delete") key = "Del";
				else if (key === "ArrowUp") key = "\u2191";
				else if (key === "ArrowDown") key = "\u2193";
				else if (key === "ArrowLeft") key = "\u2190";
				else if (key === "ArrowRight") key = "\u2192";
				else if (key === "Control") key = "Ctrl";
				else if (key === "Meta") key = "Win";
				else if (key.length > 8) return "";
				if (key.length === 1) key = key.toUpperCase();
				parts.push(key);
				return parts.join("+");
			}
			/** True while typing into a password or secret-looking field. */
			isSensitive(e) {
				const target = e.target;
				if (target instanceof HTMLInputElement) {
					if (target.type === "password") return true;
					const ac = target.getAttribute("autocomplete") ?? "";
					if (/password|token|secret|api[-_]?key/i.test(ac)) return true;
				}
				return false;
			}
		};
		/** Shared paw state read by the per-frame parameter writer. */
		const BONGO_PAW_STATE = { left: false, right: false };
		/** The single live pet instance (owned by apply, read nowhere else). */
		let bongoPetInstance = void 0;
		//#endregion
		//#region src/client/locales.ts
		const NS = "settings.bongo";
		const zh = {
			"bongo.title": "猫爪桌宠",
			"bongo.description": "原版 BongoCat Live2D 模型趴在键盘上，打字时左右爪跟着拍击（密码框自动打码）",
			"bongo.enable": "开启",
			"bongo.disable": "关闭",
			"bongo.side": "位置",
			"bongo.sideLeft": "左下角",
			"bongo.sideRight": "右下角",
			"bongo.scale": "大小",
			"bongo.showKeys": "显示按键气泡",
			"bongo.showKeysHint": "关闭后只有拍击动画；密码/密钥输入框始终显示 •••"
		};
		const en = {
			"bongo.title": "Bongo Paw",
			"bongo.description": "The original BongoCat Live2D model lying on its keyboard — paws slap along with your typing (password fields masked)",
			"bongo.enable": "On",
			"bongo.disable": "Off",
			"bongo.side": "Position",
			"bongo.sideLeft": "Bottom left",
			"bongo.sideRight": "Bottom right",
			"bongo.scale": "Size",
			"bongo.showKeys": "Keycap bubbles",
			"bongo.showKeysHint": "Off keeps only the slapping; password/secret fields always show \u2022\u2022\u2022"
		};
		//#endregion
		//#region src/client/stores.ts
		/** Card store: the master enable mirror. */
		function createBongoCardStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({ enabled: true, revision: -1 }),
				actions: {
					sync: (d, next, revision) => {
						if (revision <= d.revision) return;
						d.enabled = next.enabled;
						d.revision = revision;
					}
				}
			});
		}
		/** Settings-row store: the knob mirrors. */
		function createBongoSettingsStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({ enabled: true, side: "right", scale: 100, showKeys: true, revision: -1 }),
				actions: {
					sync: (d, next, revision) => {
						if (revision <= d.revision) return;
						d.enabled = next.enabled;
						d.side = next.side;
						d.scale = next.scale;
						d.showKeys = next.showKeys;
						d.revision = revision;
					}
				}
			});
		}
		//#endregion
		//#region src/client/BongoCard.tsx
		/** The Plugins-section card: master on/off, same shape as the others. */
		function BongoCard(props) {
			const { t, setEnabled, useStore } = props;
			const enabled = useStore((s) => s.enabled);
			const cardStyle = { border: "1px solid var(--dsw-alias-border-l2)", background: "var(--dsw-alias-bg-layer-1)", borderRadius: 12, display: "flex", flexDirection: "column", padding: 16, listStyle: "none" };
			const headStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 };
			const textStyle = { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 };
			const titleStyle = { color: "var(--dsw-alias-label-primary)", fontSize: 14, fontWeight: 500, lineHeight: "22px" };
			const descStyle = { color: "var(--dsw-alias-label-tertiary)", fontSize: 12, lineHeight: "18px" };
			const toggleStyle = { border: "1px solid var(--dsw-alias-border-l2)", height: 28, color: "var(--dsw-alias-label-primary)", cursor: "pointer", background: "0 0", borderRadius: 14, flex: "none", display: "inline-flex", alignItems: "center", gap: 6, padding: "0 10px 0 6px", fontSize: 12, lineHeight: "18px" };
			const pressedStyle = enabled ? { ...toggleStyle, background: "var(--dsw-alias-state-business-tertiary)", color: "var(--dsw-alias-state-business-primary)", borderColor: "transparent" } : toggleStyle;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
				style: cardStyle,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: headStyle,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: textStyle,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: titleStyle, children: t("bongo.title") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: descStyle, children: t("bongo.description") })
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							style: pressedStyle,
							"aria-pressed": enabled,
							onClick: () => {
								setEnabled(!enabled);
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16 }, children: enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {}) }),
								enabled ? t("bongo.enable") : t("bongo.disable")
							]
						})
					]
				})
			});
		}
		//#endregion
		//#region src/client/BongoSettingsRow.tsx
		/** Shared control styles for the settings row. */
		const rowStyle = { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" };
		const labelStyle = { color: "var(--dsw-alias-label-secondary)", fontSize: 13, minWidth: 72 };
		const segBase = { border: "1px solid var(--dsw-alias-border-l2)", height: 26, cursor: "pointer", background: "0 0", borderRadius: 13, padding: "0 12px", fontSize: 12, color: "var(--dsw-alias-label-primary)" };
		const segActive = { ...segBase, background: "var(--dsw-alias-state-business-tertiary)", color: "var(--dsw-alias-state-business-primary)", borderColor: "transparent" };
		const toggleBase = { ...segBase, display: "inline-flex", alignItems: "center", gap: 6, padding: "0 10px 0 6px" };
		const toggleOn = { ...toggleBase, background: "var(--dsw-alias-state-business-tertiary)", color: "var(--dsw-alias-state-business-primary)", borderColor: "transparent" };
		const hintStyle = { color: "var(--dsw-alias-label-tertiary)", fontSize: 12, lineHeight: "18px" };
		const rangeStyle = { width: 160, accentColor: "var(--dsw-alias-state-business-primary, #5b8cff)" };
		const numberStyle = { width: 56, height: 26, borderRadius: 8, border: "1px solid var(--dsw-alias-border-l2)", background: "var(--dsw-alias-bg-layer-2)", color: "var(--dsw-alias-label-primary)", padding: "0 6px", fontSize: 12 };
		/** Render the Bongo settings row (side / size / keycap bubbles). */
		function BongoSettingsRow(props) {
			const { t, setSide, setScale, setShowKeys, useStore } = props;
			const enabled = useStore((s) => s.enabled);
			const side = useStore((s) => s.side);
			const scale = useStore((s) => s.scale);
			const showKeys = useStore((s) => s.showKeys);
			if (!enabled) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: { display: "flex", flexDirection: "column", gap: 10 },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: rowStyle,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: labelStyle, children: t("bongo.side") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6 }, role: "group", "aria-label": t("bongo.side"), children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", { type: "button", style: side === "left" ? segActive : segBase, "aria-pressed": side === "left", onClick: () => { setSide("left") }, children: t("bongo.sideLeft") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", { type: "button", style: side === "right" ? segActive : segBase, "aria-pressed": side === "right", onClick: () => { setSide("right") }, children: t("bongo.sideRight") })
							] })
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: rowStyle,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: labelStyle, children: t("bongo.scale") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", { type: "range", min: 50, max: 180, step: 5, value: scale, style: rangeStyle, "aria-label": t("bongo.scale"), onChange: (e) => { setScale(Number(e.target.value)) } }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", { type: "number", min: 50, max: 180, step: 5, value: scale, style: numberStyle, onChange: (e) => { const v = Number(e.target.value); if (Number.isFinite(v)) setScale(v) } }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: hintStyle, children: "%" })
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: rowStyle,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: labelStyle, children: t("bongo.showKeys") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								style: showKeys ? toggleOn : toggleBase,
								"aria-pressed": showKeys,
								onClick: () => { setShowKeys(!showKeys) },
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16 }, children: showKeys && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {}) }),
									showKeys ? t("bongo.enable") : t("bongo.disable")
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: hintStyle, children: t("bongo.showKeysHint") })
				]
			});
		}
		//#endregion
		//#region src/client/index.ts
		/** Required services: the settings-card surfaces plus locale. */
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		/** Client plugin body. */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-bongocat: settings dictionary");
			bongoPetInstance = new BongoPet();
			const pet = bongoPetInstance;
			const cardStore = createBongoCardStore();
			const settingsStore = createBongoSettingsStore();
			let cardBound;
			let settingsBound;
			let revision = 0;
			const payload = () => ({
				enabled: pet.getEnabled(),
				side: pet.settings.side,
				scale: pet.settings.scale,
				showKeys: pet.settings.showKeys
			});
			const sync = () => {
				const next = payload();
				cardBound?.sync(next, revision);
				settingsBound?.sync(next, revision);
				revision += 1;
			};
			ctx.effect(() => {
				if (pet.getEnabled()) void pet.mount();
				sync();
				return () => pet.unmount();
			}, "ui-bongocat: pet lifecycle");
			const cardInjected = (actions) => {
				cardBound = actions;
				sync();
				return {
					setEnabled: (enabled) => {
						pet.setEnabled(enabled);
						sync();
					}
				};
			};
			const settingsInjected = (actions) => {
				settingsBound = actions;
				sync();
				return {
					setSide: (side) => {
						pet.setSide(side);
						sync();
					},
					setScale: (scale) => {
						pet.setScale(scale);
						sync();
					},
					setShowKeys: (showKeys) => {
						pet.setShowKeys(showKeys);
						sync();
					}
				};
			};
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				id: "bongocat",
				order: 6,
				store: cardStore,
				locale: NS,
				inject: cardInjected
			}, BongoCard));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "bongocat",
				order: 13,
				store: settingsStore,
				locale: NS,
				inject: settingsInjected
			}, BongoSettingsRow));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
