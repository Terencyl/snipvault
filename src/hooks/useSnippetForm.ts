import { SnippetFormValues } from "@/types";
import { useState } from "react";

export function useSnippetForm(defaultValues: SnippetFormValues) {
  const [formState, setFormState] = useState(defaultValues);

  const updateField = <K extends keyof SnippetFormValues>(
    field: K,
    value: SnippetFormValues[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => setFormState(defaultValues);

  return { formState, updateField, reset };
}
