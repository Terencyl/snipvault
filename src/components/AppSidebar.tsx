import { Search, Clock, Star, PlusIcon, Tag, SettingsIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import Collection from "./Collection";
import LanguageBadge from "./LanguageBadge";
import { CreateSnippetInput } from "@/types";
import CreateSnippetDialog from "./snippets/CreateSnippetDialog";
import { getLanguageColor } from "@/lib/languageColors";

interface AppSidebarProps {
  onNewSnippet: (snippet: CreateSnippetInput) => void;
}

const placeholderLanguages = [
  { id: "csharp", count: 2 },
  { id: "typescript", count: 1 },
  { id: "python", count: 1 },
  { id: "rust", count: 3 },
  { id: "java", count: 2 },
].map((lang) => {
  const color = getLanguageColor(lang.id);
  return {
    title: color.label,
    count: lang.count,
    badgeColor: color.bgClass,
  };
});

const placeholderCollections = [
  { title: "Utils", count: 4 },
  { title: "API Helpers", count: 3 },
  { title: "Database", count: 5 },
];

export function AppSidebar({ onNewSnippet }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 pt-4 pb-2 text-2xl font-bold mt-2 mb-2 ">
            SnipVault
          </SidebarGroupLabel>
          <Separator className="my-2" />
          <SidebarGroupContent className="pb-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="text-foreground">
                    <Search className="text-foreground" />
                    <span className="text-foreground">Search</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <CreateSnippetDialog onSubmit={onNewSnippet}>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <PlusIcon className="text-foreground" />
                      <span className="text-foreground">New Snippet</span>
                    </a>
                  </SidebarMenuButton>
                </CreateSnippetDialog>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Clock className="text-foreground" />
                    <span className="text-foreground">Recents</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Star className="text-foreground" />
                    <span className="text-foreground">Favorites</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Tag className="text-foreground" />
                    <span className="text-foreground">All tags</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="font-bold text-sm">
            Languages
          </SidebarGroupLabel>
          <SidebarGroupContent className="pb-4">
            <SidebarMenu>
              {placeholderLanguages.map((language) => (
                <LanguageBadge key={language.title} {...language} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="my-2" />
          <SidebarGroupLabel className="text-sm font-bold">
            Collections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {placeholderCollections.map((collection) => (
                <Collection
                  key={collection.title}
                  title={collection.title}
                  count={collection.count}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="cursor-pointer hover:bg-accent/50">
        <SidebarMenu>
          <SidebarMenuItem className="flex mt-2 mb-2">
            <SettingsIcon />
            <span className="text-foreground ml-2">Settings</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
