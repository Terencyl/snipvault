import { Snippet } from "@/types";

export interface SnippetViewProps {
  snippet: Snippet;
}

export default function SnippetView({ snippet }: SnippetViewProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{snippet.title}</h1>
      <p className="text-muted-foreground mb-4">{snippet.description}</p>
      <pre className="bg-snippet-list p-4 rounded-md overflow-auto">
        <code>{snippet.content}</code>
      </pre>
    </div>
  );
}
