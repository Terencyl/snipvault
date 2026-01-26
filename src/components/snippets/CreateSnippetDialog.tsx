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

export interface CreateSnippetDialogProps {
  onSubmit: (snippet: CreateSnippetInput) => void;
  children: ReactNode;
}

export default function CreateSnippetDialog({
  onSubmit,
  children,
}: CreateSnippetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("New Snippet");
  const [language, setLanguage] = useState("TypeScript");
  const [tags, setTags] = useState("example,code");
  const [description, setDescription] = useState("Your snippet description");
  const [content, setContent] = useState("// Your code here");

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
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Create New Snippet</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new code snippet.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                name="title"
                defaultValue={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title-1">Language</Label>
              <Input
                id="title-1"
                name="language"
                defaultValue={language}
                onChange={(e) => setLanguage(e.currentTarget.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content-1">Tags</Label>
              <Input
                id="content-1"
                name="tags"
                defaultValue={tags}
                onChange={(e) => setTags(e.currentTarget.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input
                id="username-1"
                name="description"
                defaultValue={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="bio-1">Code</Label>
              <Input
                id="bio-1"
                name="content"
                defaultValue={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
