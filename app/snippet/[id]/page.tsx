import { db } from "@/app/db";
import { notFound } from "next/navigation";

interface ShowSnippetType {
    params: Promise<{
        id: string;
    }>;
}

export default async function ShowSnippet(props: ShowSnippetType) {

    const { id } = await props.params
    
    // const snippetId = parseInt(id)

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(id) },
    });

    if (!snippet) {
        return notFound();
    }

    return <div className="text-2xl font-bold">{snippet.title}</div>;
}

