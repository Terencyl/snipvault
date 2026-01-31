import { ReactNode, useState } from "react";
import { CreateSnippetInput } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import LanguageComboBox from "../LanguageComboBox";
import { Editor } from "@monaco-editor/react";

export interface CreateSnippetDialogProps {
  onSubmit: (snippet: CreateSnippetInput) => void;
  children: ReactNode;
}

const defaultValues = {
  title: "New Snippet",
  language: "CSharp",
  tags: "C#, Example",
  description: "Your snippet description",
  content: "// Your code here",
};

export default function CreateSnippetDialog({
  onSubmit,
  children,
}: CreateSnippetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(defaultValues.title);
  const [language, setLanguage] = useState(defaultValues.language);
  const [tags, setTags] = useState(defaultValues.tags);
  const [description, setDescription] = useState(defaultValues.description);
  const [content, setContent] = useState(defaultValues.content);

  const resetForm = () => {
    setTitle(defaultValues.title);
    setLanguage(defaultValues.language);
    setTags(defaultValues.tags);
    setDescription(defaultValues.description);
    setContent(defaultValues.content);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    console.log("Dialog open state:", open);
    if (!open) {
      resetForm();
      console.log("Form reset to default values");
    }
  };

  const handleSubmit = () => {
    const newSnippet: CreateSnippetInput = {
      title: title,
      description: description,
      content: content,
      language: language,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date(),
    };
    onSubmit(newSnippet);
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create New Snippet</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new code snippet.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="title-1">Title</Label>
        <Input
          id="title-1"
          name="title"
          defaultValue={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <Label htmlFor="title-1">Language</Label>
        <LanguageComboBox onLanguageSelect={setLanguage} />
        <Label htmlFor="content-1">Tags</Label>
        <Input
          id="content-1"
          name="tags"
          defaultValue={tags}
          onChange={(e) => setTags(e.currentTarget.value)}
        />
        <Label htmlFor="username-1">Description</Label>
        <Input
          id="username-1"
          name="description"
          defaultValue={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <Label htmlFor="bio-1">Code</Label>
        <pre className="bg-snippet-list p-4 rounded-md overflow-auto">
          <Editor
            height="25vh"
            language={language}
            value={content}
            defaultValue="// Your code here"
            theme="vs-dark"
            onChange={(value) => setContent(value || "")}
            options={{
              minimap: { enabled: false },
              lineNumbers: "on",
            }}
          />
        </pre>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
