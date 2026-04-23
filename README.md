# issue-7 repro

Tracks https://github.com/jonmumm/storybook-addon-tanstack-start/issues/7

## Reproduce

```
pnpm install
pnpm dev
```

Storybook starts, then the browser console shows:

```
Uncaught SyntaxError: The requested module
  '/.../use-sync-external-store@1.6.0/.../shim/with-selector.js'
  does not provide an export named 'useSyncExternalStoreWithSelector'
```

## Why

- `tanstackStartPlugin` adds `@tanstack/react-router` to `optimizeDeps.exclude` (see `node_modules/storybook-addon-tanstack-start/dist/plugin.mjs`).
- Vite therefore skips pre-bundling `@tanstack/react-router` and its CJS transitive `use-sync-external-store/shim/with-selector`.
- Under pnpm's isolated layout, `use-sync-external-store` is not a direct dep of this project, so Vite can't resolve it by bare specifier either — it serves the raw CJS module, which the browser ESM parser rejects on the named import.

## Workaround applied in consumer projects

1. Add `use-sync-external-store` as a direct dependency.
2. Add `use-sync-external-store/shim/with-selector` to `optimizeDeps.include`.

## Proposed fix (addon-side)

Remove `@tanstack/react-router` from the plugin's `optimizeDeps.exclude`. The plugin only stubs `@tanstack/react-start` / `@tanstack/start-server-core`, not the router.
