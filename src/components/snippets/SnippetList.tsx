import { Snippet } from "@/types";
import SnippetItem from "@/components/snippets/SnippetItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface SnippetListProps {
  snippets: Snippet[];
  onSnippetDeleted: (id: number) => void;
  onSnippetSelected: (snippet: Snippet) => void;
}

export default function SnippetList({
  snippets,
  onSnippetDeleted,
  onSnippetSelected,
}: SnippetListProps) {
  return (
    <ScrollArea className="h-full bg-snippet-list ">
      <div className="p-4">
        <h4 className="mb-4 text-xl text-bold leading-none font-medium">
          Snippets
        </h4>
        {snippets.map((snippet) => (
          <SnippetItem
            key={snippet.id}
            snippet={snippet}
            onSnippetDeleted={onSnippetDeleted}
            onSnippetSelected={onSnippetSelected}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
