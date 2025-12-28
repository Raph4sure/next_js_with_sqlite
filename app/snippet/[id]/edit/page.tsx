import { db } from "@/app/db";
import { notFound } from "next/navigation";
import SnippetEditServer from "@/app/components/snippet_client_edit";


interface EditSnippetType {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditSnippet(props: EditSnippetType) {
    const { id } = await props.params;

    const idInt = parseInt(id);

    const snippet = await db.snippet.findFirst({
        where: { id: idInt },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <div>
            <SnippetEditServer snippet={snippet}/>
        </div>
    );
}
