import { Snippet } from "@/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { X, StarIcon } from "lucide-react";
import { Button } from "../ui/button";

export interface SnippetCardProps {
  snippet: Snippet;
  onSnippetDeleted: (id: number) => void;
  onSnippetSelected: (snippet: Snippet) => void;
}

export default function SnippetItem({
  snippet,
  onSnippetDeleted,
  onSnippetSelected,
}: SnippetCardProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        variant="outline"
        className="cursor-pointer hover:bg-accent/50"
        onClick={() => onSnippetSelected(snippet)}
      >
        <ItemContent>
          <ItemTitle>{snippet.title}</ItemTitle>
          {/* todo: make it so that it displays the language's badge */}
          <ItemDescription>
            <span className="text-muted-foreground">{snippet.language}</span>
            <span className="mx-1">•</span>
            <span className="text-muted-foreground">{snippet.description}</span>
          </ItemDescription>
        </ItemContent>
        <ItemActions className="flex">
          <Button
            variant="outline"
            size="sm"
            className="w-8"
            onClick={(e) => {
              e.stopPropagation();
              onSnippetDeleted(snippet.id);
            }}
          >
            <X />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <StarIcon />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
