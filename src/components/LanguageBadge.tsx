import { Badge } from "./ui/badge";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export interface LanguageBadgeProps {
  title: string;
  count: number;
  badgeColor: string;
}

export default function LanguageBadge(language: LanguageBadgeProps) {
  return (
    <SidebarMenuItem key={language.title}>
      <SidebarMenuButton asChild>
        <a href="#">
          <Badge className={`${language.badgeColor}`}>&nbsp;</Badge>
          <span className="text-foreground">{language.title}</span>
          <span className="text-muted-foreground align-right ml-auto">
            ({language.count})
          </span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
