export interface LanguageColor {
  id: string;
  label: string;
  bgClass: string;
  textClass: string;
  hex: string;
}

export const languageColors: Record<string, LanguageColor> = {
  typescript: {
    id: "typescript",
    label: "TypeScript",
    bgClass: "bg-blue-500",
    textClass: "text-blue-500",
    hex: "#3178c6",
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    bgClass: "bg-yellow-400",
    textClass: "text-yellow-400",
    hex: "#f7df1e",
  },
  html: {
    id: "html",
    label: "HTML",
    bgClass: "bg-orange-500",
    textClass: "text-orange-500",
    hex: "#e34f26",
  },
  css: {
    id: "css",
    label: "CSS",
    bgClass: "bg-blue-400",
    textClass: "text-blue-400",
    hex: "#1572b6",
  },
  scss: {
    id: "scss",
    label: "SCSS",
    bgClass: "bg-pink-400",
    textClass: "text-pink-400",
    hex: "#c6538c",
  },
  vue: {
    id: "vue",
    label: "Vue",
    bgClass: "bg-emerald-500",
    textClass: "text-emerald-500",
    hex: "#42b883",
  },
  python: {
    id: "python",
    label: "Python",
    bgClass: "bg-yellow-500",
    textClass: "text-yellow-500",
    hex: "#3776ab",
  },
  java: {
    id: "java",
    label: "Java",
    bgClass: "bg-red-500",
    textClass: "text-red-500",
    hex: "#ed8b00",
  },
  csharp: {
    id: "csharp",
    label: "C#",
    bgClass: "bg-green-700",
    textClass: "text-green-700",
    hex: "#512bd4",
  },
  cpp: {
    id: "cpp",
    label: "C++",
    bgClass: "bg-blue-600",
    textClass: "text-blue-600",
    hex: "#00599c",
  },
  c: {
    id: "c",
    label: "C",
    bgClass: "bg-gray-500",
    textClass: "text-gray-500",
    hex: "#a8b9cc",
  },
  rust: {
    id: "rust",
    label: "Rust",
    bgClass: "bg-orange-600",
    textClass: "text-orange-600",
    hex: "#ce422b",
  },
  go: {
    id: "go",
    label: "Go",
    bgClass: "bg-cyan-500",
    textClass: "text-cyan-500",
    hex: "#00add8",
  },
  ruby: {
    id: "ruby",
    label: "Ruby",
    bgClass: "bg-red-600",
    textClass: "text-red-600",
    hex: "#cc342d",
  },
  php: {
    id: "php",
    label: "PHP",
    bgClass: "bg-indigo-400",
    textClass: "text-indigo-400",
    hex: "#777bb4",
  },
  swift: {
    id: "swift",
    label: "Swift",
    bgClass: "bg-orange-500",
    textClass: "text-orange-500",
    hex: "#f05138",
  },
  kotlin: {
    id: "kotlin",
    label: "Kotlin",
    bgClass: "bg-violet-500",
    textClass: "text-violet-500",
    hex: "#7f52ff",
  },
  bash: {
    id: "bash",
    label: "Bash",
    bgClass: "bg-green-600",
    textClass: "text-green-600",
    hex: "#4eaa25",
  },
  shell: {
    id: "shell",
    label: "Shell",
    bgClass: "bg-green-600",
    textClass: "text-green-600",
    hex: "#4eaa25",
  },
  powershell: {
    id: "powershell",
    label: "PowerShell",
    bgClass: "bg-blue-700",
    textClass: "text-blue-700",
    hex: "#012456",
  },
  yaml: {
    id: "yaml",
    label: "YAML",
    bgClass: "bg-red-400",
    textClass: "text-red-400",
    hex: "#cb171e",
  },
  json: {
    id: "json",
    label: "JSON",
    bgClass: "bg-gray-400",
    textClass: "text-gray-400",
    hex: "#000000",
  },
  xml: {
    id: "xml",
    label: "XML",
    bgClass: "bg-orange-400",
    textClass: "text-orange-400",
    hex: "#e34c26",
  },
  toml: {
    id: "toml",
    label: "TOML",
    bgClass: "bg-gray-500",
    textClass: "text-gray-500",
    hex: "#9c4121",
  },
  sql: {
    id: "sql",
    label: "SQL",
    bgClass: "bg-blue-300",
    textClass: "text-blue-300",
    hex: "#e38c00",
  },
  graphql: {
    id: "graphql",
    label: "GraphQL",
    bgClass: "bg-pink-500",
    textClass: "text-pink-500",
    hex: "#e10098",
  },
  markdown: {
    id: "markdown",
    label: "Markdown",
    bgClass: "bg-gray-600",
    textClass: "text-gray-600",
    hex: "#083fa1",
  },
  dockerfile: {
    id: "dockerfile",
    label: "Dockerfile",
    bgClass: "bg-blue-500",
    textClass: "text-blue-500",
    hex: "#2496ed",
  },
  lua: {
    id: "lua",
    label: "Lua",
    bgClass: "bg-blue-800",
    textClass: "text-blue-800",
    hex: "#000080",
  },
  r: {
    id: "r",
    label: "R",
    bgClass: "bg-blue-400",
    textClass: "text-blue-400",
    hex: "#276dc3",
  },
  dart: {
    id: "dart",
    label: "Dart",
    bgClass: "bg-teal-500",
    textClass: "text-teal-500",
    hex: "#0175c2",
  },
  elixir: {
    id: "elixir",
    label: "Elixir",
    bgClass: "bg-purple-400",
    textClass: "text-purple-400",
    hex: "#6e4a7e",
  },
  scala: {
    id: "scala",
    label: "Scala",
    bgClass: "bg-red-500",
    textClass: "text-red-500",
    hex: "#dc322f",
  },
  haskell: {
    id: "haskell",
    label: "Haskell",
    bgClass: "bg-purple-600",
    textClass: "text-purple-600",
    hex: "#5e5086",
  },
  fsharp: {
    id: "fsharp",
    label: "F#",
    bgClass: "bg-cyan-600",
    textClass: "text-cyan-600",
    hex: "#378bba",
  },
  clojure: {
    id: "clojure",
    label: "Clojure",
    bgClass: "bg-green-500",
    textClass: "text-green-500",
    hex: "#5881d8",
  },
  zig: {
    id: "zig",
    label: "Zig",
    bgClass: "bg-amber-500",
    textClass: "text-amber-500",
    hex: "#f7a41d",
  },
};

export const defaultLanguageColor: LanguageColor = {
  id: "unknown",
  label: "Unknown",
  bgClass: "bg-gray-500",
  textClass: "text-gray-500",
  hex: "#6b7280",
};

export function getLanguageColor(languageId: string): LanguageColor {
  const normalizedId = languageId.toLowerCase().replace(/[^a-z]/g, "");
  return languageColors[normalizedId] ?? defaultLanguageColor;
}

export function getLanguageBgClass(languageId: string): string {
  return getLanguageColor(languageId).bgClass;
}

export function getLanguageTextClass(languageId: string): string {
  return getLanguageColor(languageId).textClass;
}
