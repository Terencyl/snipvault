import "./App.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import SnippetList from "@/components/snippets/SnippetList";
import { useState } from "react";
import { Snippet } from "@/types";
import SnippetView from "@/components/snippets/SnippetView";
import { useSnippets } from "./hooks/useSnippets";

function App() {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const {
    snippets,
    isLoading,
    error,
    createSnippet,
    deleteSnippet,
    updateSnippet,
  } = useSnippets();

  const toggleSnippetFavorite = (id: number) => {
    const snippet = snippets.find((s) => s.id === id);
    if (!snippet) return;
    snippet.isFavorite = !snippet.isFavorite;
    updateSnippet(snippet);
  };

  const deleteSelectedSnippetTag = (tag: string) => {
    if (!selectedSnippet) return;
    const updatedTags = selectedSnippet.tags.filter((t) => t !== tag);
    const updatedSnippet = { ...selectedSnippet, tags: updatedTags };
    updateSnippet(updatedSnippet);
    setSelectedSnippet(updatedSnippet);
  };

  return (
    <SidebarProvider>
      {/* TODO: Implement proper error banner UI */}
      {error && <div className="error-banner">{error}</div>}
      <AppSidebar onNewSnippet={createSnippet} />
      <main className="flex h-screen flex-1 flex-row overflow-hidden">
        {isLoading ? (
          <div className="flex w-1/3 items-center justify-center">
            <p>Loading snippets...</p>
          </div>
        ) : (
          <SnippetList
            snippets={snippets}
            onSnippetDeleted={deleteSnippet}
            onSnippetSelected={setSelectedSnippet}
            onSnippetFavoriteToggle={toggleSnippetFavorite}
          />
        )}
        <div className="p-6 w-2/3 overflow-auto">
          {selectedSnippet ? (
            <SnippetView
              snippet={selectedSnippet}
              onDeleteSnippetTag={deleteSelectedSnippetTag}
            />
          ) : (
            <p>Select a snippet to view its details.</p>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
