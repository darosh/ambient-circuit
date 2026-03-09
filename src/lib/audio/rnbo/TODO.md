# RNBO Deobfuscation TODO

## dev notes:

- [x] vite manual chunk update
- [x] add 'imports all rnbo js sub-modules' test, the '.' issue is not likely direct syntax, might be in leftover eval()
- [ ] check npm i xoshiro256 (it's webassembly based, but it could work)
- [ ] check npm i prng-xoshiro it's JS
- [ ] check `js: "(()=>{var __webpack_modules__={133:(module`
- [ ] check `wasm: "(()=>{var __webpack_modules__={133:(module`

## 1. Fix runtime SyntaxError (blocking)
- `?.` optional chaining on index.js:1132,1136 may break if Vite dep optimizer treats as CJS
- Remove/update `manualChunks: { rnbo: ['@rnbo/js'] }` in vite.config.ts (now importing from `./rnbo`)
- May need `optimizeDeps.exclude` for `src/lib/audio/rnbo` or ensure Vite treats as ESM
- Debug: check browser devtools for exact file/line of SyntaxError

## 2. Rename files per module-map.json
- 35 files like `163.js` → `tslib-awaiter.js`
- Update all import paths across all files
- Keep module-map.json as reference

## 3. Lint & Prettier setup
- Currently in eslint ignores (`eslint.config.js:72`)
- Want lint/prettier but NOT destructive `--fix` (library code)
- Options: separate eslint config for rnbo/, or remove from ignores with relaxed rules

## 4. Replace known package imports
- `834.js` = `buffer` (node Buffer polyfill) → npm `buffer` package
- `845.js` = pako (zlib) → `import pako from 'pako'`
- `766.js` = `base64-js`, `181.js` = `ieee754` (buffer deps)
- `163.js` = tslib `__awaiter` → native async/await
- `925.js` = xoshiro256 PRNG (likely custom, keep)

## 5. Convert to TypeScript
- Merge `index.d.ts` types into source files
- Remove separate `index.d.ts`
- Add proper types to deobfuscated code
