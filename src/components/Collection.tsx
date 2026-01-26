import { FolderIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

interface CollectionProps {
  title: string;
  count: number;
}

export default function Collection(collection: CollectionProps) {
  return (
    <SidebarMenuItem key={collection.title}>
      <SidebarMenuButton asChild>
        <a href="#">
          <FolderIcon className="text-foreground" />
          <span className="text-foreground">{collection.title}</span>
          <span className="text-muted-foreground align-right ml-auto">
            ({collection.count})
          </span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
