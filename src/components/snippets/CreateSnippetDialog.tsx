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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LanguageComboBox from "@/components/LanguageComboBox";
import { Editor } from "@monaco-editor/react";
import { useSnippetForm } from "@/hooks/useSnippetForm";
import { SNIPPET_FORM_DEFAULTS } from "@/constants";

export interface CreateSnippetDialogProps {
  onSubmit: (snippet: CreateSnippetInput) => void;
  children: ReactNode;
}

export default function CreateSnippetDialog({
  onSubmit,
  children,
}: CreateSnippetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { formState, updateField, reset } = useSnippetForm(
    SNIPPET_FORM_DEFAULTS,
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ...formState,
      isFavorite: false,
      tags: formState.tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date(),
    });
    setIsOpen(false);
    reset();
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
          value={formState.title}
          onChange={(e) => updateField("title", e.currentTarget.value)}
        />
        <Label htmlFor="title-1">Language</Label>
        <LanguageComboBox
          onLanguageSelect={(e) => updateField("language", e)}
        />
        <Label htmlFor="content-1">Tags</Label>
        <Input
          id="content-1"
          name="tags"
          value={formState.tags}
          onChange={(e) => updateField("tags", e.currentTarget.value)}
        />
        <Label htmlFor="username-1">Description</Label>
        <Input
          id="username-1"
          name="description"
          value={formState.description}
          onChange={(e) => updateField("description", e.currentTarget.value)}
        />
        <Label htmlFor="bio-1">Code</Label>
        <pre className="bg-snippet-list p-4 rounded-md overflow-auto">
          <Editor
            height="25vh"
            language={formState.language}
            value={formState.content}
            defaultValue="// Your code here"
            theme="vs-dark"
            onChange={(value) => updateField("content", value || "")}
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
