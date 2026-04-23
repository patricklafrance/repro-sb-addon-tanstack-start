import { createServerFn } from "@tanstack/react-start";
import { useLoaderData, useRouter } from "@tanstack/react-router";

export const getCount = createServerFn({ method: "GET" }).handler(async () => 0);

const updateCount = createServerFn({ method: "POST" })
    .inputValidator((d: number) => d)
    .handler(async () => { /* no-op — stubbed by the addon in stories */ });

export function Counter() {
    const router = useRouter();
    const count = useLoaderData({ strict: false }) as number;

    return (
        <button
            type="button"
            onClick={async () => {
                await updateCount({ data: 1 });
                router.invalidate();
            }}
        >
            Add 1 to {count}?
        </button>
    );
}
