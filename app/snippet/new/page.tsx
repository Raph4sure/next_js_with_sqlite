// import { db } from "@/app/db";
// import { redirect } from "next/navigation";

"use client";

import { useActionState } from "react";
import * as server from "@/app/servers";

export default function SnippetCreatePage() {
    const [formState, action] = useActionState(server.createSnippet, {
        message: "",
    });

    return (
        // <div className="min-h-screen flex items-center justify-center w-full">
        <form className="w-1/3" action={action}>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Create New Snippet</h2>
                <div className="flex gap-4">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        className="border p-2 w-full rounded-lg"
                    />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="code">Code:</label>
                    <textarea
                        id="code"
                        name="code"
                        className="border p-2 w-full rounded-lg"
                    />
                </div>
                {formState?.message && (<div className="my-2 p-2 bg-red-200 border rounded border-red-400 text-center">{formState.message}</div>)}
                <button
                    type="submit"
                    className="bg-blue-200 px-2 py-3 rounded-lg"
                >
                    Create Snippet
                </button>
            </div>
        </form>
        // </div>
    );
}
