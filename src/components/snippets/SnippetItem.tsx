import { Snippet } from "@/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { X, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as monaco from "monaco-editor";
import { getLanguageColor } from "@/lib/languageColors";
import { useMemo } from "react";

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
  const languages = useMemo(() => monaco.languages.getLanguages(), []);
  const language = languages.find((lang) => lang.id === snippet.language);
  const languageColor = getLanguageColor(snippet.language);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        variant="outline"
        className="cursor-pointer hover:bg-accent/50"
        onClick={() => onSnippetSelected(snippet)}
      >
        <ItemContent>
          <ItemTitle>{snippet.title}</ItemTitle>
          <ItemDescription>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full ${languageColor.bgClass} inline-block text-white px-2 py-1 text-sm`}
              >
                {language?.aliases ? language.aliases[0] : snippet.language}
              </span>
              {snippet.tags ? (
                <div>
                  {snippet.tags.map((tag) => (
                    <span key={tag} className="text-muted-foreground px-2 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
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
