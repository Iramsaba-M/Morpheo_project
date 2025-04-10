import { useAuth } from "@/contexts/auth-provider";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { CircleUserRound, Send } from "lucide-react";

const templateUser = {
  name: "Jane",
  email: "jane@cibc.com",
  picture: "/avatar-sample.webp",
};

export const NavUser = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem key="logout">
        <SidebarMenuButton asChild>
          <a href="#" onClick={handleLogout}>
            <CircleUserRound />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem key="support">
        <SidebarMenuButton asChild>
          <a href="#">
            <Send />
            <span>Support</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user?.picture} alt={user?.name} />
          <AvatarFallback className="rounded-lg">M</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user?.name}</span>
          <span className="truncate text-xs">{user?.email}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenu>
  );
};

export default NavUser;
