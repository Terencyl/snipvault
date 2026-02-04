import { SnippetDatabase } from "@/lib/database";
import { CreateSnippetInput, Snippet } from "@/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useSnippets() {
  const db = useRef<SnippetDatabase | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    db.current = new SnippetDatabase();
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      setIsLoading(true);
      if (!db.current) return;
      const snippets = await db.current.getAllSnippets();
      setSnippets(snippets);
    } catch (error) {
      setError("Failed to load snippets from the database.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createSnippet = async (snippet: CreateSnippetInput) => {
    try {
      if (!db.current) return;
      const newSnippet = await db.current.createSnippet(snippet);
      setSnippets(prev => [...prev, newSnippet]);
    } catch (error) {
      setError("Error creating snippet");
      console.log(error);
    }
  };

  const deleteSnippet = async (id: number) => {
    try {
      if (!db.current) return;
      await db.current.deleteSnippet(id);
      await refreshSnippets();
    } catch (error) {
      setError("Error deleting snippet");
      console.log(error);
    }
  };

  const updateSnippet = async (snippet: Snippet) => {
    try {
      if (!db.current) return;
      await db.current.updateSnippet(snippet);
      await refreshSnippets();
    } catch (error) {
      setError("Error updating snippet");
      console.log(error);
    }
  };

  const refreshSnippets = async () => {
    if (!db.current) return;
    const updatedSnippets = await db.current.getAllSnippets();
    setSnippets(updatedSnippets);
  };

  const languageStats = useMemo(() => {
    const languages: { [language: string]: number } = {};
    snippets.forEach((snippet) => {
      if (languages[snippet.language]) {
        languages[snippet.language] += 1;
      } else {
        languages[snippet.language] = 1;
      }
    });
    return languages;
  }, [snippets]);

  const clearError = useCallback(() => setError(null), []);

  return {
    snippets,
    isLoading,
    error,
    createSnippet,
    deleteSnippet,
    refreshSnippets,
    updateSnippet,
    languageStats,
    clearError,
  };
}
