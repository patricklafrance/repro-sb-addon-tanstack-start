import type { Meta, StoryObj } from "@storybook/react-vite";
// Importing from the root barrel — this is the line that triggers issue #8.
import { tanstackRouterParameters } from "storybook-addon-tanstack-start";
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
