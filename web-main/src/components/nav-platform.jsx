import {
  MessageSquareDiff,
  MessageSquare,
  Layers3,
  Box,
  Settings,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useNavigate } from "react-router";
import { useConversation } from "@/contexts/conversation-provider";

// Static Menu items
const items = [
  {
    title: "New Conversation",
    url: "/",
    icon: MessageSquareDiff,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: MessageSquare,
  },
  {
    title: "Catalog",
    url: "/catalog",
    icon: Layers3,
  },
  {
    title: "Data Products",
    url: "/data-products",
    icon: Box,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function NavPlatform() {
  const navigate = useNavigate();
  const { conversationId, clearConversation } = useConversation();

  const handleNav = (url) => {
    if (url !== "/" && conversationId !== null) {
      console.log("Navigating to " + url + "/" + conversationId);
      navigate(url + "/" + conversationId);
    } else if (url === "/") {
      console.log("new conversation");
      clearConversation();
      navigate(url);
    } else {
      console.log("Navigating to " + url);
      navigate(url);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <div onClick={() => handleNav(item.url)}>
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
