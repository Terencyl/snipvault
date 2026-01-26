import { CreateSnippetInput, Snippet } from "@/types";
import Database from "@tauri-apps/plugin-sql";

export class SnippetDatabase {
  private db: Database | null = null;

  async init() {
    this.db = await Database.load("sqlite:snippets.db");
    return this.db;
  }

  async createSnippet(snippet: CreateSnippetInput): Promise<number> {
    if (!this.db) {
      await this.init();
    }

    try {
      const result = await this.db!.execute(
        "INSERT INTO snippets (title, description, content, language, tags, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        [
          snippet.title,
          snippet.description,
          snippet.content,
          snippet.language,
          snippet.tags.join(","),
          snippet.createdAt.toISOString(),
        ],
      );
      return result.lastInsertId!;
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
      const snippets = await this.db!.select<Snippet[]>(
        "SELECT * FROM snippets",
      );
      return snippets;
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
      const snippet = await this.db!.select<Snippet>(
        "SELECT * FROM snippets WHERE id = ?",
        [id],
      );
      return snippet;
    } catch (error) {
      console.error("Error fetching snippet:", error);
      throw error;
    }
  }

  async updateSnippet(id: number, snippet: Snippet): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    try {
      await this.db!.execute(
        "UPDATE snippets SET title = ?, content = ?, updated_at = ? WHERE id = ?",
        [snippet.title, snippet.content, Date.now, id],
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
