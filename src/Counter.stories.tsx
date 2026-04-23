import type { Meta, StoryObj } from "@storybook/react-vite";
// Importing from the root barrel — this is the line that triggers issue #8.
import { tanstackRouterParameters } from "storybook-addon-tanstack-start";
import { Counter } from "./Counter.tsx";

const meta = {
    title: "Counter",
    component: Counter
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// The #8 error fires the moment the browser parses the root-barrel import above
// (Node-only plugin.mjs runs top-level fileURLToPath). Component code below never executes —
// the createServerFn usage is here for realism, not as a trigger.
export const Default: Story = {
    parameters: {
        tanstackRouter: tanstackRouterParameters({
            location: { path: "/counter" },
            loader: { data: 0 }
        })
    }
};
