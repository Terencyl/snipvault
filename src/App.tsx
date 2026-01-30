import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import SnippetList from "./components/snippets/SnippetList";
import { useEffect, useState } from "react";
import { SnippetDatabase } from "./lib/database";
import { CreateSnippetInput, Snippet } from "./types";
import SnippetView from "./components/snippets/SnippetView";

function App() {
  const db: SnippetDatabase = new SnippetDatabase();
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [snippetList, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const snippets = await db.getAllSnippets();
        setSnippets(snippets);
      } catch (error) {
        console.error("Error loading snippets:", error);
      }
    };
    loadSnippets();
  }, []);

  const createNewSnippet = async (snippet: CreateSnippetInput) => {
    try {
      await db.createSnippet(snippet);
      const updatedSnippets = await db.getAllSnippets();
      setSnippets(updatedSnippets);
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  const deleteSnippet = async (id: number) => {
    try {
      await db.deleteSnippet(id);
      await refreshSnippets();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const refreshSnippets = async () => {
    const updatedSnippets = await db.getAllSnippets();
    setSnippets(updatedSnippets);
  };

  return (
    <SidebarProvider>
      <AppSidebar onNewSnippet={createNewSnippet} />
      <main className="flex h-screen flex-1 flex-row overflow-hidden">
        <SnippetList
          snippets={snippetList}
          onSnippetDeleted={deleteSnippet}
          onSnippetSelected={setSelectedSnippet}
        />
        <div className="p-6 w-2/3 overflow-auto">
          {selectedSnippet ? (
            <SnippetView snippet={selectedSnippet} />
          ) : (
            <p>Select a snippet to view its details.</p>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
