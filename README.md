# repro-sb-addon-tanstack-start

Minimal reproductions for two issues in [`storybook-addon-tanstack-start`](https://github.com/jonmumm/storybook-addon-tanstack-start).

Each reproduction lives on its own branch. The `main` branch is empty scaffolding.

- **Branch [`issue-7`](../../tree/issue-7)** — `tanstackStartPlugin` excludes `@tanstack/react-router` from `optimizeDeps`, breaking `use-sync-external-store` in pnpm. Tracks [issue #7](https://github.com/jonmumm/storybook-addon-tanstack-start/issues/7).
- **Branch [`issue-8`](../../tree/issue-8)** — root barrel pulls Node-only `plugin.mjs` into the browser bundle. Tracks [issue #8](https://github.com/jonmumm/storybook-addon-tanstack-start/issues/8).

## Reproduce

```
git checkout issue-7  # or issue-8
pnpm install
pnpm dev
```

Open `http://localhost:6006`. Each branch's README describes the expected failure.

## Versions

- pnpm 10.30.1
- Node 24+
- `storybook@10.3.5`, `storybook-addon-tanstack-start@0.2.1`, `vite@8.0.9`
