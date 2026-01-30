import { Snippet } from "@/types";
import { Editor } from "@monaco-editor/react";

export interface SnippetViewProps {
  snippet: Snippet;
}

export default function SnippetView({ snippet }: SnippetViewProps) {
  return (
    <div className="flex-1 bg-background p-6">
      <h1 className="text-2xl font-bold mb-2">{snippet.title}</h1>
      <p className="text-muted-foreground mb-4">{snippet.description}</p>
      {snippet.tags ? (
        <div className="mb-4">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-accent text-accent-foreground px-2 py-1 mr-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <pre className="bg-snippet-list p-4 rounded-md overflow-auto">
        <Editor
          height="80vh"
          language={snippet.language}
          value={snippet.content}
          defaultValue="// Your code here"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            lineNumbers: "on",
          }}
        />
      </pre>
    </div>
  );
}
