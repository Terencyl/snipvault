export interface Snippet {
  id: number;
  title: string;
  description: string;
  content: string;
  language: string;
  isFavorite: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateSnippetInput = Omit<Snippet, "id" | "updatedAt">;

export type SnippetFormValues = {
  title: string;
  description: string;
  content: string;
  language: string;
  tags: string;
};

export interface Language {
  id: string;
  label: string;
}
