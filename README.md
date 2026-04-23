# issue-8 repro

Tracks https://github.com/jonmumm/storybook-addon-tanstack-start/issues/8

## Reproduce

```
pnpm install
pnpm dev
```

Storybook starts, open a story; the browser console shows:

```
TypeError: (0, import_browser_external_node_url.fileURLToPath) is not a function
  at .../sb-vite/deps/storybook-addon-tanstack-start.js
```

## Why

- `src/Counter.stories.tsx` imports `tanstackRouterParameters` from the root barrel `"storybook-addon-tanstack-start"`.
- The root entry `dist/index.mjs` begins with `import { tanstackStartPlugin } from "./plugin.mjs";`.
- `dist/plugin.mjs` executes `const __dirname = path.dirname(fileURLToPath(import.meta.url));` at module load.
- Vite externalizes `node:url` to a browser shim that does not provide `fileURLToPath`, so that top-level line throws before tree-shaking can matter — it is a side effect, not an unused named export.

## Repro shape

The repro uses a `Counter` component with `createServerFn` (`getCount`, `updateCount`) and a story driven by `tanstackRouterParameters({ loader: { data } })` — the realistic shape. The #8 error fires the instant the browser parses the root-barrel import, before any component or server-fn code executes; the `@tanstack/react-start` usage is present for realism, not as a trigger.

## Note about issue #7

`vite.config.ts` and `package.json` in this branch include the workaround for issue #7 (`use-sync-external-store` as direct dep + `optimizeDeps.include`). Without it, issue #7's error fires first and masks this one.

## Workaround

Import `tanstackRouterParameters` from `storybook-addon-tanstack-router` directly.

## Proposed fix (addon-side)

Either split the root barrel so browser-side exports don't transitively import `plugin.mjs`, or move the `__dirname` computation inside `tanstackStartPlugin()` so it only runs when the plugin is invoked.
