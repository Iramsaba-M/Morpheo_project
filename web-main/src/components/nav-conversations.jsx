import { MessagesSquare } from "lucide-react";
import { useNav } from "@/contexts/nav-provider";
import { useConversation } from "@/contexts/conversation-provider";
import { useNavigate } from "react-router";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavConversations() {
  const navigate = useNavigate();
  const { conversations } = useNav();
  const { loadConversation } = useConversation();

  const handleNav = async (url) => {
    console.log("Navigating to " + url);
    await loadConversation(url);
    navigate("/conversations/" + url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {conversations.slice(0, 5).map((item) => (
            <SidebarMenuItem key={item.chatId}>
              <SidebarMenuButton asChild>
                <div onClick={() => handleNav(item.chatId)}>
                  <MessagesSquare />
                  <span>{item.summary}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
