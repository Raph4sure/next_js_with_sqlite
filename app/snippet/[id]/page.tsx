import { db } from "@/app/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as server from "@/app/servers";

interface ShowSnippetType {
    params: Promise<{
        id: string;
    }>;
}

export default async function ShowSnippet(props: ShowSnippetType) {
    await new Promise((r) => setTimeout(r, 2000));

    const { id } = await props.params;

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(id) },
    });

    if (!snippet) {
        return notFound();
    }

    const deeleteSnippetAction = server.deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <div className="flex justify-between items-center gap-20 m-5">
                <div className="text-2xl font-bold">
                    <h1>{snippet.title}</h1>
                </div>
                <div className="flex gap-4">
                    <Link
                        className="p-2 border rounded"
                        href={`/snippet/${snippet.id}/edit`}
                    >
                        Edit
                    </Link>
                    <form action={deeleteSnippetAction}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border bg-gray-200 border-gray-200">
                {snippet.code}
            </pre>
        </div>
    );
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString(),
        };
    });
}
