import { db } from "@/app/db"


export default async function Home() {

  const snippet = await db.snippet.findMany()

  const renderSnippets = snippet.map(snippet => {
    return (
      <div key={snippet.id}>
          {snippet.title}
      </div>
    )
  })

  return (
      <div>
      <h1 className="text-3xl font-bold">{renderSnippets}</h1>
      </div>
  );
}

