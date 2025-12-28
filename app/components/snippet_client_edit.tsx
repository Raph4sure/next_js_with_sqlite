"use client";

import type { snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import * as server from '@/app/servers';

interface TypeSnippetEditServer {
    snippet: snippet;
}

export default function SnippetEditServer({ snippet }: TypeSnippetEditServer) {
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    };

    const editSnippetAction = server.editSnippet.bind(null, snippet.id, code)

    return (
        <div>
            <Editor
                height="40vh"
                width="50vw"
                defaultLanguage="javascript"
                defaultValue={snippet.code}
                theme="vs-dark"
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChange}
            />
            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">Save</button>
            </form>
        </div>
    );
}
