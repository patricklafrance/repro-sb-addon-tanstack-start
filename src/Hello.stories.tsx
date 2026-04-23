import type { Meta, StoryObj } from "@storybook/react-vite";
// Imported from the router package (not the "start" root barrel) so this repro does not also
// trigger issue #8 (fileURLToPath). The start addon re-exports this function from here.
import { tanstackRouterParameters } from "storybook-addon-tanstack-router";
import { Hello } from "./Hello.tsx";

const meta = {
    title: "Hello",
    component: Hello
} satisfies Meta<typeof Hello>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { message: "hello" },
    parameters: {
        tanstackRouter: tanstackRouterParameters({
            location: { path: "/" }
        })
    }
};
