import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStartPlugin } from "storybook-addon-tanstack-start/plugin";

export default defineConfig({
    plugins: [tanstackStartPlugin(), react()]
});
