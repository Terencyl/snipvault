import { CreateSnippetInput, Snippet } from "@/types";
import Database from "@tauri-apps/plugin-sql";

interface SnippetRow {
  id: number;
  title: string;
  description: string;
  content: string;
  language: string;
  favorite: number;
  tags: string;
  created_at: string;
  updated_at: string;
}

export class SnippetDatabase {
  private db: Database | null = null;

  async init() {
    this.db = await Database.load("sqlite:snippets.db");
    return this.db;
  }

  async createSnippet(snippet: CreateSnippetInput): Promise<Snippet> {
    if (!this.db) {
      await this.init();
    }

    try {
      const result = await this.db!.execute(
        "INSERT INTO snippets (title, description, content, language, favorite, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          snippet.title,
          snippet.description,
          snippet.content,
          snippet.language,
          snippet.isFavorite ? 1 : 0,
          snippet.tags.join(","),
          snippet.createdAt.toISOString(),
        ],
      );
      const id = result.lastInsertId!;
      return { id, ...snippet };
    } catch (error) {
      console.error("Error creating snippet:", error);
      throw error;
    }
  }

  async getAllSnippets(): Promise<Snippet[]> {
    if (!this.db) {
      await this.init();
    }

    try {
      const snippets = await this.db!.select<SnippetRow[]>(
        "SELECT * FROM snippets",
      );
      return snippets.map((snippet) => ({
        id: snippet.id,
        title: snippet.title,
        description: snippet.description,
        content: snippet.content,
        language: snippet.language,
        isFavorite: snippet.favorite === 1,
        tags: snippet.tags.split(",").map((tag) => tag.trim()),
        createdAt: new Date(snippet.created_at),
        updatedAt: new Date(snippet.updated_at),
      }));
    } catch (error) {
      console.error("Error fetching snippets:", error);
      throw error;
    }
  }

  async getSnippetById(id: number): Promise<Snippet> {
    if (!this.db) {
      await this.init();
    }

    try {
      const snippet = await this.db!.select<SnippetRow[]>(
        "SELECT * FROM snippets WHERE id = ?",
        [id],
      );

      if (!snippet || snippet.length === 0) {
        throw new Error("Snippet with id ${id} not found");
      }

      const row = snippet[0];

      return {
        id: row.id,
        title: row.title,
        description: row.description,
        content: row.content,
        language: row.language,
        isFavorite: row.favorite === 1,
        tags: row.tags.split(",").map((tag) => tag.trim()),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      };
    } catch (error) {
      console.error("Error fetching snippet:", error);
      throw error;
    }
  }

  async updateSnippet(snippet: Snippet): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    try {
      await this.db!.execute(
        "UPDATE snippets SET title = ?, description = ?, content = ?, language = ?, favorite = ?, tags = ?, updated_at = ? WHERE id = ?",
        [
          snippet.title,
          snippet.description,
          snippet.content,
          snippet.language,
          snippet.isFavorite ? 1 : 0,
          snippet.tags.join(","),
          Date.now(),
          snippet.id,
        ],
      );
    } catch (error) {
      console.error("Error updating snippet:", error);
      throw error;
    }
  }

  async deleteSnippet(id: number): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    try {
      await this.db!.execute("DELETE FROM snippets WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error deleting snippet:", error);
      throw error;
    }
  }
}
