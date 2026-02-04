import { Snippet } from "@/types";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { StarIcon } from "lucide-react";
import * as monaco from "monaco-editor";
import { getLanguageColor } from "@/lib/languageColors";
import { useMemo } from "react";

export interface SnippetCardProps {
  snippet: Snippet;
  onSnippetDeleted: (id: number) => void;
  onSnippetSelected: (snippet: Snippet) => void;
  onSnippetFavoriteToggle: (id: number) => void;
}

export default function SnippetItem({
  snippet,
  onSnippetDeleted,
  onSnippetSelected,
  onSnippetFavoriteToggle,
}: SnippetCardProps) {
  const languages = useMemo(() => monaco.languages.getLanguages(), []);
  const language = languages.find((lang) => lang.id === snippet.language);
  const languageColor = getLanguageColor(snippet.language);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ContextMenu>
        <ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => onSnippetDeleted(snippet.id)}>
              Delete
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => onSnippetFavoriteToggle(snippet.id)}
            >
              {snippet.isFavorite ? "Unfavorite" : "Favorite"}
            </ContextMenuItem>
          </ContextMenuContent>

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
                        <span
                          key={tag}
                          className="text-muted-foreground px-2 py-1"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </ItemDescription>
            </ItemContent>
            <ItemMedia>
              {snippet.isFavorite && (
                <StarIcon className="text-yellow-500 fill-current h-4 w-4" />
              )}
            </ItemMedia>
          </Item>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
}
