import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import SnippetList from "./components/snippets/SnippetList";
import { useEffect, useState } from "react";
import { SnippetDatabase } from "./lib/database";
import { CreateSnippetInput, Snippet } from "./types";

function App() {
  const db: SnippetDatabase = new SnippetDatabase();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
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

  const handleNewSnippet = async (snippet: CreateSnippetInput) => {
    try {
      await db.createSnippet(snippet);
      console.log("Snippet created:", snippet);
      const updatedSnippets = await db.getAllSnippets();
      setSnippets(updatedSnippets);
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  const deleteSnippetAtId = async (id: number) => {
    try {
      await db.deleteSnippet(id);
      console.log("Snippet deleted with id:", id);
      await refreshSnippets();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const selectSnippet = (snippet: Snippet) => {
    setSnippet(snippet);
    console.log("Selected snippet:", snippet);
  };

  async function refreshSnippets() {
    const updatedSnippets = await db.getAllSnippets();
    setSnippets(updatedSnippets);
  }

  return (
    <SidebarProvider>
      <AppSidebar onNewSnippet={handleNewSnippet} />
      <main className="flex h-screen flex-1 flex-row overflow-hidden">
        <SnippetList
          snippets={snippetList}
          onSnippetDeleted={deleteSnippetAtId}
          onSnippetSelected={selectSnippet}
        />
        <div className="p-6 w-2/3 overflow-auto">
          {snippet ? (
            <div>
              <h2>{snippet.title}</h2>
              <p>{snippet.description}</p>
              <pre>{snippet.content}</pre>
            </div>
          ) : (
            <p>Select a snippet to view its details.</p>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
