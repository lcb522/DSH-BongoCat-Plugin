# @deepseek-ai/dsh-client-ui-bongocat

English | [中文](README.zh.md)

**Bongo Paw**: a typing companion pet for the DeepSeek Harness web surface. A cat paw sits in a corner of the UI and thumps along with your keystrokes, popping keycap bubbles — inspired by [BongoCat](https://github.com/ayangweb/BongoCat) (MIT), rewritten from scratch for the browser.

## Features

- **Full cat scene**: a happy white cat (ears, blush, whiskers) lying over a keyboard, two independent paws slapping with a head bob
- **Left/right split**: left-half keys (QWERT/ASDFG/ZXCVB/1-5) slap the left paw, right-half keys the right paw; **space and left clicks slam both**
- **Keycap bubbles**: pressed keys pop as keycaps that fade out, up to 7 at once; breathing animation disabled automatically for `prefers-reduced-motion` users
- **Privacy first**: password fields and token/secret-looking inputs **always show •••**, never the real key; bubbles can also be turned off entirely
- **Placement**: bottom-left / bottom-right, 50%–180% scale
- **Zero interference**: `pointer-events: none` — the paw never blocks a click
- One switch: off removes every DOM node and listener, no residue

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
