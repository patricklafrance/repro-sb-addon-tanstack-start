import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStartPlugin } from "storybook-addon-tanstack-start/plugin";

export default defineConfig({
    plugins: [tanstackStartPlugin(), react()],
    // Workaround for issue #7 — without this, that error fires first and masks issue #8.
    optimizeDeps: {
        include: ["use-sync-external-store/shim/with-selector"]
    }
});
