import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import SnippetList from "./components/snippets/SnippetList";
import { useEffect, useState, useRef } from "react";
import { SnippetDatabase } from "./lib/database";
import { CreateSnippetInput, Snippet } from "./types";
import SnippetView from "./components/snippets/SnippetView";

function App() {
  const db = useRef<SnippetDatabase | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [snippetList, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    db.current = new SnippetDatabase();
    const loadSnippets = async () => {
      try {
        if (!db.current) return;
        const snippets = await db.current.getAllSnippets();
        setSnippets(snippets);
      } catch (error) {
        console.error("Error loading snippets:", error);
      }
    };
    loadSnippets();
  }, []);

  const createNewSnippet = async (snippet: CreateSnippetInput) => {
    try {
      if (!db.current) return;
      await db.current.createSnippet(snippet);
      const updatedSnippets = await db.current.getAllSnippets();
      setSnippets(updatedSnippets);
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  const deleteSnippet = async (id: number) => {
    try {
      if (!db.current) return;
      await db.current.deleteSnippet(id);
      await refreshSnippets();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const refreshSnippets = async () => {
    if (!db.current) return;
    const updatedSnippets = await db.current.getAllSnippets();
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
