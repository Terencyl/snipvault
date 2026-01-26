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
import { CreateSnippetInput, Language } from "@/types";
import CreateSnippetDialog from "./snippets/CreateSnippetDialog";

interface AppSidebarProps {
  onNewSnippet: (snippet: CreateSnippetInput) => void;
}

const languages: Language[] = [
  {
    title: "C#",
    count: 2,
    badgeColor: "bg-purple-600",
  },
  {
    title: "TypeScript",
    count: 1,
    badgeColor: "bg-blue-600",
  },
  {
    title: "Python",
    count: 1,
    badgeColor: "bg-yellow-600",
  },
  {
    title: "Rust",
    count: 3,
    badgeColor: "bg-orange-600",
  },
  {
    title: "Java",
    count: 2,
    badgeColor: "bg-red-600",
  },
];

const collections = [
  {
    title: "Utils",
    count: 4,
  },
  {
    title: "API Helpers",
    count: 3,
  },
  {
    title: "Database",
    count: 5,
  },
];

export function AppSidebar({ onNewSnippet }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 pt-4 pb-2 text-2xl font-bold">
            SnipVault
            {/*<SidebarTrigger />*/}
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
              {languages.map((language) => (
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
              {collections.map((collection) => (
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
