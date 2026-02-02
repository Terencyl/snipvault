import { FolderIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface CollectionProps {
  title: string;
  count: number;
}

export default function Collection({ title, count }: CollectionProps) {
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild>
        <a href="#">
          <FolderIcon className="text-foreground" />
          <span className="text-foreground">{title}</span>
          <span className="text-muted-foreground align-right ml-auto">
            ({count})
          </span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
