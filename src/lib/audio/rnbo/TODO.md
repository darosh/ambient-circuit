# RNBO Deobfuscation TODO

## dev notes:

- [x] vite manual chunk update
- [x] add 'imports all rnbo js sub-modules' test, the '.' issue is not likely direct syntax, might be in leftover eval()
- [x] ~~check npm i xoshiro256 (it's webassembly based, but it could work)~~
- [x] ~~check npm i prng-xoshiro it's JS~~

## [COMPLETED] 1. Fix runtime SyntaxError (blocking)

- `?.` optional chaining on index.js:1132,1136 may break if Vite dep optimizer treats as CJS
- Remove/update `manualChunks: { rnbo: ['@rnbo/js'] }` in vite.config.ts (now importing from `./rnbo`)
- May need `optimizeDeps.exclude` for `src/lib/audio/rnbo` or ensure Vite treats as ESM
- Debug: check browser devtools for exact file/line of SyntaxError

## [COMPLETED] 2. Rename files per module-map.json

- 35 files like `163.js` → `tslib-awaiter.js`
- Update all import paths across all files
- Keep module-map.json as reference

## [COMPLETED] 3. Lint & Prettier setup

- Currently in eslint ignores (`eslint.config.js:72`)
- Want lint/prettier but NOT destructive `--fix` (library code)
- Options: separate eslint config for rnbo/, or remove from ignores with relaxed rules

## [COMPLETED] 4. Replace known package imports + extract embedded worklets

What was done:

- Replaced bundled pako (13 files: pako-index, pako-deflate, pako-inflate, 10 zlib-\*) → npm `pako`
- Replaced bundled buffer (3 files: buffer-polyfill, base64-codec, ieee754) → npm `buffer`
- Inlined module-676 (`const D = 0`, zero-time constant) into rnbo-events.js + index.js
- Deleted unused module-299 (CRC32, was zlib dep)
- Extracted embedded JS/WASM AudioWorklet blobs from index.js into standalone files:
  - `worklet-js.js` (JS patcher engine, ~58KB minified)
  - `worklet-wasm.js` (WASM patcher wrapper, ~16KB minified)
- Imported via Vite `?worker&url`, fetched at runtime (stripping dev query params)
- Replaced XXXX placeholder string-replace with clean preamble pattern:
  - Worklets reference global constants: `RNBO_PROCESSOR_NAME`, `RNBO_PARAM_DESCRIPTORS`, `RNBO_PATCHER_DESC`, `RNBO_PATCHER_SRC`
  - index.js prepends a `var` preamble before creating Blob
- Fixed npm pako v2 API: pass Buffer directly (Uint8Array subclass) instead of `.toString("binary")`
- Total: 36 → 18 outer JS files, RNBO chunk 288KB → 132KB (gzip 68KB → 38KB)
- Kept: tslib-awaiter.js (native async/await conversion is bigger refactor), xoshiro256-prng.js (custom)

## [COMPLETED] 5. Decompose worklet **webpack_modules** into ESM imports

### Goal

Replace the `__webpack_modules__` / `__webpack_require__` runtime inside `worklet-js.js` and `worklet-wasm.js` with normal ESM imports. Vite (`?worker&url`) already bundles them as worker entries — adding imports means Vite resolves + bundles deps automatically.

### Current architecture

- Both worklets are self-contained IIFEs with an embedded webpack module system
- `worklet-js.js` (3910 lines) bundles these **webpack_modules**:
  - 133 = rnbo-runtime-helpers (main patcher runtime, ~2600 lines — huge)
  - 852 = rnbo-buffer-types
  - 126 = rnbo-external-loader
  - 925 = xoshiro256-prng
  - 834 = buffer polyfill (now npm `buffer`)
  - 766 = base64-js (buffer dep, now npm)
  - 181 = ieee754 (buffer dep, now npm)
  - 264 = rnbo-default-patcher
- `worklet-wasm.js` (1393 lines) bundles only:
  - 133 = rnbo-runtime-helpers
  - 852 = rnbo-buffer-types
  - 126 = rnbo-external-loader
  - 925 = xoshiro256-prng
- Deobfuscated individual modules already exist in `embedded-js/deobfuscated/*.js` and `embedded-wasm/deobfuscated/*.js`
- These are **identical** to the outer ESM modules (just CJS `require()` vs `import`)
- Entry point code (after `var __webpack_exports__ = {}`) is the AudioWorkletProcessor class + registration

### Approach

1. Extract the entry point section from each worklet (everything after `var __webpack_exports__ = {}`)
2. Convert `__webpack_require__(N)` calls to ESM imports of the shared outer modules:
   - `__webpack_require__(133)` → `import * as runtimeHelpers from "../rnbo-runtime-helpers.js"`
   - `__webpack_require__(852)` → `import { Float32Buffer, ... } from "../rnbo-buffer-types.js"`
   - `__webpack_require__(925)` → `import Xoshiro from "../xoshiro256-prng.js"`
   - `__webpack_require__(126)` → `import { ExternalLoaderFactory } from "../rnbo-external-loader.js"`
   - `__webpack_require__(264)` → `import * as defaultPatcher from "../rnbo-default-patcher.js"`
   - `__webpack_require__(834)` → `import { Buffer } from "buffer"` (npm)
3. Remove the `__webpack_modules__` object and `__webpack_require__` function
4. Result: worklet files become small entry points (~1200 lines for JS, ~630 for WASM) importing shared modules
5. Vite bundles everything into self-contained worker files automatically

### Key constraint: AudioWorklet scope

- AudioWorklets run in `AudioWorkletGlobalScope` — no DOM, no `window`
- Vite `?worker&url` bundles worker deps into a single file (good, AudioWorklets can't load ESM imports at runtime)
- The shared modules (rnbo-runtime-helpers etc) must work in worklet scope — they're pure JS math/data, no DOM access, should be fine

### Existing tooling

- `scripts/rnbo-deobfuscate.ts` has `transformWebpackPatterns()` that converts `__webpack_require__(N)` → `require("./N.js")` etc
- Could be adapted to output ESM imports instead of CJS require
- Name mapping already in `module-map.json`

### Files involved

- `src/lib/audio/rnbo/worklet-js.js` — JS AudioWorklet (modify)
- `src/lib/audio/rnbo/worklet-wasm.js` — WASM AudioWorklet (modify)
- `src/lib/audio/rnbo/embedded-js/deobfuscated/` — reference for module boundaries
- `src/lib/audio/rnbo/embedded-wasm/deobfuscated/` — reference for module boundaries
- `src/lib/audio/rnbo/rnbo-runtime-helpers.js` — shared module (reuse)
- `src/lib/audio/rnbo/rnbo-buffer-types.js` — shared module (reuse)
- `src/lib/audio/rnbo/rnbo-external-loader.js` — shared module (reuse)
- `src/lib/audio/rnbo/xoshiro256-prng.js` — shared module (reuse)
- `src/lib/audio/rnbo/rnbo-default-patcher.js` — shared module (reuse, JS worklet only)
- `scripts/rnbo-deobfuscate.ts` — tooling (adapt if useful)

## 6. Convert to TypeScript

- Merge `index.d.ts` types into source files
- Remove separate `index.d.ts`
- Add proper types to deobfuscated code

## 7. Replace tslib \_\_awaiter with native async/await

- `tslib-awaiter.js` exports `mG()` — wraps `function*` + `yield` as async
- Used in: index.js (~10 sites), rnbo-base-engine.js (1 site), rnbo-wasm-engine.js (4 sites)
- Pattern: `(0, X.mG)(this, undefined, undefined, function* () { ... yield ... })`
- Convert to: `async function() { ... await ... }`
- Then delete tslib-awaiter.js
