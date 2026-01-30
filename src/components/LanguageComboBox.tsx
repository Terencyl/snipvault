import { useState } from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Language } from "@/types";
import * as monaco from "monaco-editor";

export interface LanguageComboBoxProps {
  onLanguageSelect: (language: string) => void;
}

export default function LanguageComboBox({
  onLanguageSelect,
}: LanguageComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();

  const languages: Language[] = monaco.languages.getLanguages().map((lang) => {
    const name = lang.aliases ? lang.aliases[0] : lang.id;
    return { id: lang.id, label: name };
  });

  const handleLanguageSelect = (language: Language) => {
    onLanguageSelect(language.id);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-s justify-between"
          aria-label="Language combobox"
        >
          {selectedLanguage
            ? languages.find((language) => language.id === selectedLanguage.id)
                ?.label
            : "Select language..."}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-8" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.id}
                  value={language.label}
                  onSelect={(currentValue) => {
                    const lang = languages.find(
                      (l) => l.label === currentValue,
                    );
                    if (lang) {
                      setSelectedLanguage(lang);
                      handleLanguageSelect(lang);
                    }
                    setOpen(false);
                  }}
                >
                  {language.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      selectedLanguage?.id === language.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
