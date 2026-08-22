# @deepseek-ai/dsh-client-ui-bongocat

English | [中文](README.zh.md)

**Bongo Paw (Live2D edition)**: the **original BongoCat Live2D keyboard model** ([desktop BongoCat](https://github.com/ayangweb/BongoCat), MIT) brought into the DeepSeek Harness web surface — the same cat on the same keyboard, paws slapping along with your typing, with automatic blinking and breathing.

## Architecture

[![Architecture](docs/architecture.png)](docs/architecture.html)

Interactive architecture map — click the image to open the full explorable HTML
(dark/light themes, node search, guided views: 渲染管线 / 输入驱动 / 设置回路).
Generated with [Archify](https://github.com/tt-a1i/archify) from the real plugin dataflow.
## Features

- **The real Live2D model**: embeds the keyboard model from BongoCat v1.1.0 (moc3 + official textures), rendered by Cubism Core + pixi.js + pixi-live2d-display — fully self-contained, zero network requests
- **The original drive chain**: identical to the desktop app — keystrokes write the model parameters `CatParamLeftHandDown` / `CatParamRightHandDown`; left-half keys slap the left paw, right-half keys the right paw, space/click slams both
- **Alive details**: automatic eye blink and breathing (built into the model, not canned animation)
- **Keycap bubbles**: pressed keys pop as keycaps that fade out (up to 7); password/token inputs **always show •••**; bubbles can be disabled entirely
- **Placement**: bottom-left / bottom-right, 50%–180% scale; `pointer-events: none` never blocks a click
- One switch: off destroys the model and its WebGL context, no residue

## Install (Windows)

```powershell
$DshHome = "$env:USERPROFILE\.dsh"
$src = "<path to this repo>"
$dest = "$DshHome\plugins\@deepseek-ai\dsh-client-ui-bongocat"
New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
Copy-Item "$src\*" $dest -Recurse -Force
$link = "$DshHome\profiles\node_modules\@deepseek-ai\dsh-client-ui-bongocat"
New-Item -ItemType Directory -Force -Path (Split-Path $link) | Out-Null
New-Item -ItemType Junction -Path $link -Target $dest | Out-Null
```

Append to `$DshHome\profiles\web\cordis.patch.yml`:

```yaml
- insert:
    - id: ui-bongocat
      name: '@deepseek-ai/dsh-client-ui-bongocat'
```

Reload the web UI.

## Usage

On by default after a reload. Master switch under **Settings → Plugins → Bongo Paw**; position/size/keycap bubbles under **Settings → General → Appearance** (below the Aqua rows).

## vs. the desktop BongoCat

A browser plugin cannot listen to system-wide input (only native apps can) — this paw reacts to typing **inside the DSH page**. For a global paw, use the desktop [BongoCat](https://github.com/ayangweb/BongoCat).

## License

MIT
