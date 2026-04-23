import type { Meta, StoryObj } from "@storybook/react-vite";
// Imported from the router package (not the "start" root barrel) so this repro does not also
// trigger issue #8 (fileURLToPath). The start addon re-exports this function from here.
import { tanstackRouterParameters } from "storybook-addon-tanstack-router";
import { Counter } from "./Counter.tsx";

const meta = {
    title: "Counter",
    component: Counter
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// The #7 error fires during preview boot (the addon's decorators pull @tanstack/react-router, which
// transitively pulls use-sync-external-store, which the plugin has excluded from optimizeDeps).
// Component code below never runs — the createServerFn usage is here for realism, not as a trigger.
export const Default: Story = {
    parameters: {
        tanstackRouter: tanstackRouterParameters({
            location: { path: "/counter" },
            loader: { data: 0 }
        })
    }
};
