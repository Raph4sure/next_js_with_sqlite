import { db } from "@/app/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
    async function createSnippet(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        const snippet = await db.snippet.create({
            data: {
                title,
                code,
            },
        });
        console.log(snippet);

        redirect('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <form className="w-1/3" action={createSnippet}>
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
                    <button
                        type="submit"
                        className="bg-blue-200 px-2 py-3 rounded-lg"
                    >
                        Create Snippet
                    </button>
                </div>
            </form>
        </div>
    );
}
