import { db } from "@/app/db";
import Link from "next/link";

export default async function Home() {
    const snippet = await db.snippet.findMany();

    const renderSnippets = snippet.map((snippet) => {
        return (
            <Link
                key={snippet.id}
                href={`snippet/${snippet.id}`}
                className="flex justify-between items-center p-2 border rounded-xl gap-40"
            >
                <div>{snippet.title}</div>
                <div>View</div>
            </Link>
        );
    });

    return (
      <div>
        <div className="flex justify-between m-3 items-center">
          <h1 className="text-2xl font-bold">Snippets</h1>
          <Link href='/snippet/new' className="border p-2 rounded-xl font-semibold text-2xl">New</Link>
        </div>
                <div className="text-3xl font-bold flex flex-col gap-5">
                    {renderSnippets}
            </div>
        </div>
    );
}
