// Build lib/client.js: embed the vendored runtimes (as REAL code, executed
// inside the factory — CSP-proof, no script injection) and the standard model
// files (base64 data URLs). Requires: vendor/ + assets/standard/.
// Usage: node scripts/build-client.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outPath = join(root, 'lib', 'client.js')

const lib = (name) => readFileSync(join(root, 'vendor', name), 'utf8')
const core = lib('live2dcubismcore.min.js')
const pixi = lib('pixi.min.js')
const l2d = lib('l2d.min.js')

// Model files: everything under assets/standard except the motion sounds.
const modelDir = join(root, 'assets', 'standard')
const modelFiles = {}
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (!entry.name.endsWith('.flac')) modelFiles[relative(modelDir, full).replaceAll('\\', '/')] = full
  }
}
walk(modelDir)

const mime = (path) => {
  if (path.endsWith('.json')) return 'application/json'
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.moc3')) return 'application/octet-stream'
  return 'application/octet-stream'
}

const MODEL_FILES = Object.fromEntries(
  Object.entries(modelFiles).map(([key, file]) => [
    key,
    `data:${mime(key)};base64,${readFileSync(file).toString('base64')}`,
  ]),
)

let out = readFileSync(join(root, 'src', 'client-template.js'), 'utf8')
const replaceOnce = (placeholder, value) => {
  const parts = out.split(placeholder)
  if (parts.length !== 2) throw new Error(`placeholder ${placeholder} expected once, found ${parts.length - 1}`)
  out = parts.join(value)
}
// Vendored libs paste as executable code (order matters: core -> pixi -> l2d).
replaceOnce('__LIB_CORE__', core)
replaceOnce('__LIB_PIXI__', pixi)
replaceOnce('__LIB_L2D__', l2d)
replaceOnce('__MODEL_FILES__', JSON.stringify(MODEL_FILES))

writeFileSync(outPath, out)
const kb = (n) => `${Math.round(n / 1024)}KB`
console.log(`built lib/client.js: ${kb(out.length)} (core ${kb(core.length)} + pixi ${kb(pixi.length)} + l2d ${kb(l2d.length)} + model ${kb(out.length - core.length - pixi.length - l2d.length)}, ${Object.keys(modelFiles).length} files)`)
