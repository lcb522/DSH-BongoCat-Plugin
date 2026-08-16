/**
 * Bongo Paw client bundle — the REAL classic scene, template edition.
 *
 * Renders the original BongoCat standard Live2D model (MIT, ayangweb/BongoCat):
 * the white cat behind its desk, mouse pad on the left, QWERTY keyboard on the
 * right — with the desktop app's signature effect: the pressed key's image
 * lights up on the keyboard while the paws slap.
 *
 * The vendored runtimes (Cubism Core, pixi.js, pixi-live2d-display) execute as
 * REAL code inside this factory — no script injection, no eval, no network.
 * Build: scripts/build-client.mjs substitutes the placeholders below.
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
		//#region vendor/live2dcubismcore.min.js (shadowed module/exports so the Emscripten UMD cannot hijack this factory's module.exports)
		var Live2DCubismCore = (function (module, exports, define, require) {
			__LIB_CORE__
			return typeof Live2DCubismCore !== "undefined" ? Live2DCubismCore : window.Live2DCubismCore;
		}).call(window, undefined, undefined, undefined, undefined);
		window.Live2DCubismCore = Live2DCubismCore;
		//#endregion
		//#region vendor/pixi.min.js (plain IIFE; declares var PIXI)
		__LIB_PIXI__
		window.PIXI = PIXI;
		//#endregion
		//#region vendor/l2d.min.js (UMD forced down the global branch: window.PIXI.live2d)
		(function (module, exports, require, define) {
			__LIB_L2D__
		}).call(window, undefined, undefined, undefined, undefined);
		//#endregion
		//#region src/client/embedded.ts
		/** Model files keyed by their path relative to the model root (base64 data URLs). */
		const MODEL_FILES = __MODEL_FILES__;
		/** Virtual origin every embedded model URL resolves against. */
		const VIRTUAL_BASE = "https://bongo.local/standard/";
		/** Map a virtual model URL to its embedded data URL, or undefined. */
		function mapUrl(url) {
			if (typeof url !== "string") return void 0;
			if (!url.startsWith(VIRTUAL_BASE)) return void 0;
			const rel = decodeURIComponent(url.slice(VIRTUAL_BASE.length));
			return MODEL_FILES[rel];
		}
		//#endregion
		//#region src/client/runtime-hooks.ts
		/** Route the loader channels (XHR / Image) for the virtual origin only. */
		function installLoaderHooks() {
			if (window.__bongoLoaderHooked) return;
			window.__bongoLoaderHooked = true;
			const OrigXHR = window.XMLHttpRequest;
			function PatchedXHR() {
				const xhr = new OrigXHR();
				const origOpen = xhr.open;
				xhr.open = function (method, url) {
					const mapped = mapUrl(String(url));
					arguments[1] = mapped === void 0 ? url : mapped;
					return origOpen.apply(this, arguments);
				};
				return xhr;
			}
			PatchedXHR.prototype = OrigXHR.prototype;
			window.XMLHttpRequest = PatchedXHR;
			const desc = typeof HTMLImageElement !== "undefined" ? Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src") : void 0;
			if (desc !== void 0) {
				const origSet = desc.set;
				desc.set = function (value) {
					const mapped = mapUrl(String(value));
					origSet.call(this, mapped === void 0 ? value : mapped);
				};
				Object.defineProperty(HTMLImageElement.prototype, "src", desc);
			}
		}
		//#endregion
		//#region src/client/key-map.ts
		/** e.code -> key image name (the desktop app's resources naming). */
		const CODE_TO_KEY = {
			Space: "Space", Enter: "Return", NumpadEnter: "Return", Backspace: "Backspace", Tab: "Tab",
			CapsLock: "CapsLock", Escape: "Escape", Delete: "Delete", Slash: "Slash", Backquote: "BackQuote",
			ShiftLeft: "ShiftLeft", ShiftRight: "ShiftRight", ControlLeft: "ControlLeft", ControlRight: "ControlRight",
			AltLeft: "Alt", AltRight: "AltGr", MetaLeft: "Meta", MetaRight: "Meta", ContextMenu: "Meta",
			ArrowUp: "UpArrow", ArrowDown: "DownArrow", ArrowLeft: "LeftArrow", ArrowRight: "RightArrow",
		};
		/** Fallback names mirroring the desktop app's getSupportedKey. */
		const KEY_FALLBACKS = { ShiftLeft: "Shift", ShiftRight: "Shift", ControlLeft: "Control", ControlRight: "Control" };
		/** Resolve one KeyboardEvent.code to an available key image name (or null). */
		function keyImageName(code) {
			let name = null;
			if (code.startsWith("Key") && code.length === 5) name = code;
			else if (code.startsWith("Digit") && code.length === 6) name = "Num" + code.slice(5);
			else if (/^F\d{1,2}$/.test(code)) name = "Fn";
			else if (Object.prototype.hasOwnProperty.call(CODE_TO_KEY, code)) name = CODE_TO_KEY[code];
			if (name !== null && MODEL_FILES["resources/left-keys/" + name + ".png"] !== void 0) return name;
			if (name !== null && MODEL_FILES["resources/right-keys/" + name + ".png"] !== void 0) return name;
			if (name !== null && Object.prototype.hasOwnProperty.call(KEY_FALLBACKS, code)) {
				const fb = KEY_FALLBACKS[code];
				if (MODEL_FILES["resources/left-keys/" + fb + ".png"] !== void 0) return fb;
			}
			return null;
		}
		//#endregion
		//#region src/client/pet-css.ts
		const css = `[data-dsh-bongo]{position:fixed;bottom:10px;z-index:60;pointer-events:none;font-family:var(--dsw-alias-font-family,system-ui,sans-serif);display:flex;flex-direction:column;align-items:center;gap:2px}[data-dsh-bongo][data-side=right]{right:24px}[data-dsh-bongo][data-side=left]{left:24px}[data-dsh-bongo] .bongo-caps{display:flex;gap:4px;min-height:24px;align-items:flex-end;justify-content:center;flex-wrap:wrap;max-width:340px}[data-dsh-bongo] .bongo-cap{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 7px;font-size:12px;line-height:18px;box-shadow:0 2px 8px rgba(0,0,0,.18);animation:bongo-cap 1.1s var(--ds-ease-in-out,ease) forwards;white-space:nowrap}[data-dsh-bongo] .bongo-cap.fresh{border-color:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary)}@keyframes bongo-cap{0%{opacity:0;transform:translateY(6px) scale(.85)}12%{opacity:1;transform:translateY(0) scale(1)}70%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}[data-dsh-bongo] .bongo-scene{position:relative;line-height:0}[data-dsh-bongo] .bongo-bg{position:absolute;inset:0;width:100%;height:100%;border-radius:10px}[data-dsh-bongo] canvas{position:relative;display:block;border-radius:10px}[data-dsh-bongo] .bongo-key{position:absolute;inset:0;width:100%;height:100%;border-radius:10px}`;
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
		/** Scene base width at scale 100%, px (the resources' native canvas is 612x354). */
		const BASE_WIDTH = 300;
		const SCENE_ASPECT = 354 / 612;
		/** Shared input state read by the per-frame parameter writer. */
		const BONGO_INPUT = { key: false, mouseL: false, mouseR: false };
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
		* The classic-scene pet: desk background + the standard Live2D model + the
		* pressed-key image overlay, driven by page input events. Every effect is
		* owned and disposed with the layer.
		*/
		const BongoPet = class {
			constructor() {
				this.enabled = readFlag(BONGO_ENABLED_KEY, true);
				this.settings = { ...BONGO_DEFAULTS };
				this.readSettings();
				this.stage = void 0;
				this.capsRow = void 0;
				this.scene = void 0;
				this.keyLayer = void 0;
				this.canvas = void 0;
				this.app = void 0;
				this.model = void 0;
				this.mounting = false;
				this.pressedKeys = /* @__PURE__ */ new Map();
				this.disposers = [];
				/** Immediate parameter write; wired by wrapParams(). */
				this.writeParams = () => {};
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
			/** Set the scene scale (50-180). */
			setScale(scale) {
				this.settings.scale = Math.min(180, Math.max(50, Math.round(scale)));
				writeKey(BONGO_SCALE_KEY, String(this.settings.scale));
				this.applySettings();
			}
			/** Set whether keycap bubbles show above the scene. */
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
					const scene = document.createElement("div");
					scene.className = "bongo-scene";
					const bg = document.createElement("img");
					bg.className = "bongo-bg";
					bg.alt = "";
					bg.src = MODEL_FILES["resources/background.png"];
					const canvas = document.createElement("canvas");
					const keyLayer = document.createElement("div");
					keyLayer.className = "bongo-key-layer";
					scene.appendChild(bg);
					scene.appendChild(canvas);
					scene.appendChild(keyLayer);
					stage.appendChild(caps);
					stage.appendChild(scene);
					document.body.appendChild(stage);
					this.stage = stage;
					this.capsRow = caps;
					this.scene = scene;
					this.keyLayer = keyLayer;
					this.canvas = canvas;
					this.applySettings();
					this.attach();
					const l2d = window.PIXI?.live2d;
					if (window.Live2DCubismCore === void 0 || l2d?.Live2DModel === void 0) {
						throw new Error("ui-bongocat: Live2D runtime globals missing (core=" + typeof window.Live2DCubismCore + ", l2d=" + typeof l2d + ")");
					}
					const app = new window.PIXI.Application({ view: canvas, backgroundAlpha: 0, autoDensity: true, resolution: window.devicePixelRatio || 1, width: 320, height: 200 });
					this.app = app;
					const settingsJson = JSON.parse(await (await fetch(MODEL_FILES["cat.model3.json"])).text());
					const model = await l2d.Live2DModel.from({ ...settingsJson, url: VIRTUAL_BASE + "cat.model3.json" }, { autoInteract: false });
					this.model = model;
					app.stage.addChild(model);
					this.wrapParams();
					this.applySettings();
				} catch (error) {
					console.error("ui-bongocat: Live2D mount failed:", error);
					this.teardownDom();
				} finally {
					this.mounting = false;
				}
			}
			/** Write the input state into the model's parameters every frame. */
			wrapParams() {
				const im = this.model?.internalModel;
				if (im === void 0) return;
				const core = im.coreModel;
				if (core === void 0 || typeof core.setParameterValueById !== "function") return;
				const apply = () => {
					try {
						core.setParameterValueById("CatParamLeftHandDown", BONGO_INPUT.key ? 1 : 0);
						core.setParameterValueById("ParamMouseLeftDown", BONGO_INPUT.mouseL ? 1 : 0);
						core.setParameterValueById("ParamMouseRightDown", BONGO_INPUT.mouseR ? 1 : 0);
					} catch { /* parameter absent on this model */ }
				};
				this.writeParams = apply;
				// Hook the core's own update — the last step before parameters apply
				// to drawables — so no motion-manager pass can clobber the writes.
				if (core.__bongoWrapped !== true) {
					core.__bongoWrapped = true;
					const origUpdate = core.update.bind(core);
					core.update = function () {
						apply();
						return origUpdate();
					};
				}
			}
			/** Remove the stage DOM only (shared by unmount and mount failure). */
			teardownDom() {
				for (const dispose of this.disposers.splice(0)) dispose();
				for (const entry of this.pressedKeys.values()) clearTimeout(entry.timer);
				this.pressedKeys.clear();
				this.stage?.remove();
				this.stage = void 0;
				this.capsRow = void 0;
				this.scene = void 0;
				this.keyLayer = void 0;
				this.canvas = void 0;
				BONGO_INPUT.key = false;
				BONGO_INPUT.mouseL = false;
				BONGO_INPUT.mouseR = false;
			}
			/** Remove the stage, model, and every listener. */
			unmount() {
				try {
					this.model?.destroy();
				} catch { /* already destroyed */ }
				this.model = void 0;
				try {
					this.app?.destroy(true);
				} catch { /* already destroyed */ }
				this.app = void 0;
				this.teardownDom();
			}
			/** Write the side/scale knobs onto the stage and fit the model. */
			applySettings() {
				if (this.stage === void 0) return;
				this.stage.dataset.side = this.settings.side;
				const w = Math.round(BASE_WIDTH * (this.settings.scale / 100));
				const h = Math.round(w * SCENE_ASPECT);
				if (this.scene !== void 0) {
					this.scene.style.width = w + "px";
					this.scene.style.height = h + "px";
				}
				if (this.app !== void 0 && this.canvas !== void 0) {
					this.app.renderer.resize(w, h);
					this.canvas.style.width = w + "px";
					this.canvas.style.height = h + "px";
				}
				const model = this.model;
				if (model === void 0) return;
				const im = model.internalModel;
				if (im === void 0) return;
				const mw = im.originalWidth || 1;
				const mh = im.originalHeight || 1;
				const fit = Math.min(w / mw, h / mh);
				model.scale.set(fit);
				model.anchor?.set(0.5, 0.5);
				model.x = w / 2;
				model.y = h / 2;
			}
			/** Page-scoped input listeners feeding the paw/key state. */
			attach() {
				if (this.stage === void 0) return;
				// The same event object reaches window and document during capture;
				// dedupe by identity so dual registration never double-fires.
				let lastDown = null;
				let lastUp = null;
				const onKeyDown = (e) => {
					if (e === lastDown) return;
					lastDown = e;
					if (e.repeat) return;
					this.press(e.code, keyImageName(e.code));
					this.pushCap(this.labelFor(e));
				};
				const onKeyUp = (e) => {
					if (e === lastUp) return;
					lastUp = e;
					this.release(e.code);
				};
				const onMouseDown = (e) => {
					if (e.button === 0) {
						BONGO_INPUT.mouseL = true;
						this.pushCap("L-Click");
					} else if (e.button === 2) {
						BONGO_INPUT.mouseR = true;
						this.pushCap("R-Click");
					} else return;
					this.writeParams();
				};
				const onMouseUp = () => {
					BONGO_INPUT.mouseL = false;
					BONGO_INPUT.mouseR = false;
					this.writeParams();
				};
				const onBlur = () => {
					BONGO_INPUT.mouseL = false;
					BONGO_INPUT.mouseR = false;
					for (const code of [...this.pressedKeys.keys()]) this.release(code);
					this.writeParams();
				};
				for (const target of [window, document]) {
					target.addEventListener("keydown", onKeyDown, { capture: true });
					target.addEventListener("keyup", onKeyUp, { capture: true });
					target.addEventListener("mousedown", onMouseDown, { capture: true });
					target.addEventListener("mouseup", onMouseUp, { capture: true });
				}
				window.addEventListener("blur", onBlur);
				this.disposers.push(() => {
					for (const target of [window, document]) {
						target.removeEventListener("keydown", onKeyDown, { capture: true });
						target.removeEventListener("keyup", onKeyUp, { capture: true });
						target.removeEventListener("mousedown", onMouseDown, { capture: true });
						target.removeEventListener("mouseup", onMouseUp, { capture: true });
					}
					window.removeEventListener("blur", onBlur);
				});
			}
			/** Slap the paw for one key; light its image when available. */
			press(code, name) {
				if (this.pressedKeys.has(code)) return;
				let img;
				if (name !== null && this.keyLayer !== void 0) {
					let url = MODEL_FILES["resources/left-keys/" + name + ".png"];
					if (url === void 0) url = MODEL_FILES["resources/right-keys/" + name + ".png"];
					if (url !== void 0) {
						img = document.createElement("img");
						img.className = "bongo-key";
						img.alt = "";
						img.src = url;
						this.keyLayer.appendChild(img);
					}
				}
				this.pressedKeys.set(code, { img, timer: setTimeout(() => this.release(code), 600) });
				BONGO_INPUT.key = true;
				this.writeParams();
			}
			/** Release one key image and drop the paw when none remain. */
			release(code) {
				const entry = this.pressedKeys.get(code);
				if (entry === void 0) return;
				clearTimeout(entry.timer);
				entry.img?.remove();
				this.pressedKeys.delete(code);
				if (this.pressedKeys.size === 0) {
					BONGO_INPUT.key = false;
					this.writeParams();
				}
			}
			/** Append one keycap bubble; capped so bursts cannot flood the row. */
			pushCap(label) {
				if (this.capsRow === void 0) return;
				if (!this.settings.showKeys) return;
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
				if (this.isSensitive(e)) return "\u2022\u2022\u2022";
				const parts = [];
				if (e.ctrlKey && e.key !== "Control") parts.push("Ctrl");
				if (e.altKey && e.key !== "Alt") parts.push("Alt");
				if (e.shiftKey && e.key !== "Shift" && e.key.length > 1) parts.push("Shift");
				let key = e.key;
				if (key === " ") key = "Space";
				else if (key === "Escape") key = "Esc";
				else if (key === "Backspace") key = "Bksp";
				else if (key === "Enter") key = "Enter";
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
		//#endregion
		//#region src/client/locales.ts
		const NS = "settings.bongo";
		const zh = {
			"bongo.title": "BongoCat 桌宠",
			"bongo.description": "原版经典场景：小白猫趴在桌前，打字时左爪拍键盘、按键图案实时亮起，点鼠标按鼠标（密码框自动打码）",
			"bongo.enable": "开启",
			"bongo.disable": "关闭",
			"bongo.side": "位置",
			"bongo.sideLeft": "左下角",
			"bongo.sideRight": "右下角",
			"bongo.scale": "大小",
			"bongo.showKeys": "显示按键气泡",
			"bongo.showKeysHint": "键盘上的按键亮起始终保留；气泡只是上方的文字提示；密码/密钥输入框始终显示 •••"
		};
		const en = {
			"bongo.title": "BongoCat Pet",
			"bongo.description": "The original classic scene: the white cat at its desk — typing slaps the keyboard with key images lighting up, clicking presses the mouse (password fields masked)",
			"bongo.enable": "On",
			"bongo.disable": "Off",
			"bongo.side": "Position",
			"bongo.sideLeft": "Bottom left",
			"bongo.sideRight": "Bottom right",
			"bongo.scale": "Size",
			"bongo.showKeys": "Keycap bubbles",
			"bongo.showKeysHint": "Key images on the keyboard always stay; bubbles are just the text hint above; password/secret fields always show \u2022\u2022\u2022"
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
			const pet = new BongoPet();
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
