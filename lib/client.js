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
		//#region src/client/pet-css.ts
		const css = `[data-dsh-bongo]{position:fixed;bottom:12px;z-index:60;pointer-events:none;font-family:var(--dsw-alias-font-family,system-ui,sans-serif);display:flex;flex-direction:column;align-items:center;gap:2px}[data-dsh-bongo][data-side=right]{right:24px}[data-dsh-bongo][data-side=left]{left:24px}[data-dsh-bongo] .bongo-caps{display:flex;gap:4px;min-height:24px;align-items:flex-end;justify-content:center;flex-wrap:wrap;max-width:320px}[data-dsh-bongo] .bongo-cap{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 7px;font-size:12px;line-height:18px;box-shadow:0 2px 8px rgba(0,0,0,.18);animation:bongo-cap 1.1s var(--ds-ease-in-out,ease) forwards;white-space:nowrap}[data-dsh-bongo] .bongo-cap.fresh{border-color:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary)}@keyframes bongo-cap{0%{opacity:0;transform:translateY(6px) scale(.85)}12%{opacity:1;transform:translateY(0) scale(1)}70%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}[data-dsh-bongo] .bongo-breathe{animation:bongo-breathe 3.4s ease-in-out infinite;transform-origin:50% 100%}@media (prefers-reduced-motion:reduce){[data-dsh-bongo] .bongo-breathe{animation:none}}@keyframes bongo-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}[data-dsh-bongo] .bongo-paw{transition:transform .09s cubic-bezier(.34,1.3,.64,1);transform-box:fill-box;transform-origin:50% 15%}[data-dsh-bongo] .bongo-paw[data-side=left].pressed{transform:translate(5px,16px) rotate(10deg)}[data-dsh-bongo] .bongo-paw[data-side=right].pressed{transform:translate(-5px,16px) rotate(-10deg)}[data-dsh-bongo] .bongo-head{transition:transform .1s ease-out;transform-box:fill-box;transform-origin:50% 95%}[data-dsh-bongo] .bongo-head.pressed{transform:translateY(2.5px) rotate(-1.5deg)}[data-dsh-bongo] svg{display:block;filter:drop-shadow(0 6px 14px rgba(0,0,0,.25))}`;
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
		/** The bongo-cat scene: head, body, keyboard, and two slappable paws. */
		const CAT_SVG = (() => {
			const keys = [];
			for (let i = 0; i < 13; i++) keys.push(`<rect x="${37 + i * 11.4}" y="131" width="9.4" height="6" rx="1.5"/>`);
			for (let i = 0; i < 12; i++) keys.push(`<rect x="${43 + i * 11.4}" y="139" width="9.4" height="6" rx="1.5"/>`);
			const keyRows = keys.join("");
			return `<svg width="240" height="186" viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="163" rx="88" ry="6.5" fill="rgba(31,32,38,.14)"/><rect x="26" y="128" width="168" height="32" rx="6" fill="#4a5165" stroke="#313747" stroke-width="2.5"/><g fill="#e8ebf2" opacity=".92">${keyRows}<rect x="74" y="147" width="72" height="6.5" rx="2"/></g><g class="bongo-head"><path d="M76 44 63 8l42 20z" fill="#fffdf9" stroke="#3a3a45" stroke-width="3.5" stroke-linejoin="round"/><path d="M144 44l13-36-42 20z" fill="#fffdf9" stroke="#3a3a45" stroke-width="3.5" stroke-linejoin="round"/><path d="M77 35 69 14l24 12z" fill="#f4a8bb"/><path d="M143 35l8-21-24 12z" fill="#f4a8bb"/><ellipse cx="110" cy="86" rx="65" ry="57" fill="#fffdf9" stroke="#3a3a45" stroke-width="3.5"/><path d="M83 80q6-8 12 0M125 80q6-8 12 0" stroke="#3f3f4a" stroke-width="4" stroke-linecap="round"/><path d="M101 96q4.5 5.5 9 0 4.5 5.5 9 0" stroke="#3f3f4a" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="73" cy="94" rx="7.5" ry="4.5" fill="#f9c3d2"/><ellipse cx="147" cy="94" rx="7.5" ry="4.5" fill="#f9c3d2"/><path d="M38 84l20 2M40 94l19 4M182 84l-20 2M180 94l-19 4" stroke="#c6c6cf" stroke-width="2.5" stroke-linecap="round"/></g><g class="bongo-paw" data-side="left"><ellipse cx="63" cy="127" rx="25" ry="20" fill="#fffdf9" stroke="#3a3a45" stroke-width="3.5"/><circle cx="51" cy="117" r="4.6" fill="#f4a8bb"/><circle cx="63" cy="113" r="4.6" fill="#f4a8bb"/><circle cx="75" cy="117" r="4.6" fill="#f4a8bb"/><ellipse cx="63" cy="130" rx="11" ry="8" fill="#f4a8bb"/></g><g class="bongo-paw" data-side="right"><ellipse cx="157" cy="127" rx="25" ry="20" fill="#fffdf9" stroke="#3a3a45" stroke-width="3.5"/><circle cx="145" cy="117" r="4.6" fill="#f4a8bb"/><circle cx="157" cy="113" r="4.6" fill="#f4a8bb"/><circle cx="169" cy="117" r="4.6" fill="#f4a8bb"/><ellipse cx="157" cy="130" rx="11" ry="8" fill="#f4a8bb"/></g></svg>`;
		})();
		/**
		* The bongo-cat pet: a fixed, click-transparent stage carrying a keycap row
		* and the cat scene. Page-scoped keydown/keyup/mousedown/mouseup drive the
		* two paws (left keys -> left paw, right keys -> right paw, space/click ->
		* both) plus a head bob; every effect is owned and disposed with the layer.
		*/
		const BongoPet = class {
			constructor() {
				this.enabled = readFlag(BONGO_ENABLED_KEY, true);
				this.settings = { ...BONGO_DEFAULTS };
				this.readSettings();
				this.stage = void 0;
				this.capsRow = void 0;
				this.pawL = void 0;
				this.pawR = void 0;
				this.headEl = void 0;
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
				if (value) this.mount();
				else this.unmount();
			}
			/** Set the stage side (`left` / `right`). */
			setSide(side) {
				this.settings.side = side;
				writeKey(BONGO_SIDE_KEY, side);
				this.applySettings();
			}
			/** Set the paw scale (50-180). */
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
			/** Build the stage: caps row + breathing wrapper + the cat scene. */
			mount() {
				if (this.stage !== void 0) return;
				if (typeof document === "undefined") return;
				const stage = document.createElement("div");
				stage.setAttribute("data-dsh-bongo", "");
				stage.setAttribute("aria-hidden", "true");
				const caps = document.createElement("div");
				caps.className = "bongo-caps";
				const breathe = document.createElement("div");
				breathe.className = "bongo-breathe";
				breathe.innerHTML = CAT_SVG;
				stage.appendChild(caps);
				stage.appendChild(breathe);
				document.body.appendChild(stage);
				this.stage = stage;
				this.capsRow = caps;
				this.pawL = breathe.querySelector('.bongo-paw[data-side="left"]');
				this.pawR = breathe.querySelector('.bongo-paw[data-side="right"]');
				this.headEl = breathe.querySelector(".bongo-head");
				this.applySettings();
				this.attach();
			}
			/** Remove the stage and every listener. */
			unmount() {
				for (const dispose of this.disposers.splice(0)) dispose();
				this.stage?.remove();
				this.stage = void 0;
				this.capsRow = void 0;
				this.pawL = void 0;
				this.pawR = void 0;
				this.headEl = void 0;
				this.downKeys.clear();
			}
			/** Write the side/scale knobs onto the stage. */
			applySettings() {
				if (this.stage === void 0) return;
				this.stage.dataset.side = this.settings.side;
				this.stage.style.setProperty("--bongo-scale", String(this.settings.scale / 100));
				this.stage.style.scale = String(this.settings.scale / 100);
			}
			/** Page-scoped input listeners: keys slap paws + bubbles, clicks slam both. */
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
				if (/^(Backspace|Enter|ShiftRight|ControlRight|AltRight|MetaRight|Arrow|Delete|End|PageDown|Numpad)/.test(code)) return "right";
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
				this.applyPaws();
			}
			/** Push the paw/head classes for the current states. */
			applyPaws() {
				this.pawL?.classList.toggle("pressed", this.pawState.left);
				this.pawR?.classList.toggle("pressed", this.pawState.right);
				this.headEl?.classList.toggle("pressed", this.pawState.left || this.pawState.right);
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
				else if (key === "Enter") key = "Enter";
				else if (key === "ArrowUp") key = "\u2191";
				else if (key === "ArrowDown") key = "\u2193";
				else if (key === "ArrowLeft") key = "\u2190";
				else if (key === "ArrowRight") key = "\u2192";
				else if (key === "Control") key = "Ctrl";
				else if (key === "Meta") key = "Win";
				else if (/^F\d{1,2}$/.test(key)) { /* keep */ }
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
			"bongo.title": "猫爪桌宠",
			"bongo.description": "打字时猫爪跟着拍击，气泡显示按下的键（密码框自动打码）",
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
			"bongo.description": "The paw thumps along with your keystrokes, with keycap bubbles (password fields masked)",
			"bongo.enable": "On",
			"bongo.disable": "Off",
			"bongo.side": "Position",
			"bongo.sideLeft": "Bottom left",
			"bongo.sideRight": "Bottom right",
			"bongo.scale": "Size",
			"bongo.showKeys": "Keycap bubbles",
			"bongo.showKeysHint": "Off keeps only the thump; password/secret fields always show \u2022\u2022\u2022"
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
				if (pet.getEnabled()) pet.mount();
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
