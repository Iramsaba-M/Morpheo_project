import { ChevronsUpDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { NavConversations } from "./nav-conversations";
import { NavPlatform } from "./nav-platform";

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="font-bold">
              <img src="/morpheo-small.svg" className="w-8 h-8" />
              <a href="/">
                <span className="font-bold">Morpheo</span>
              </a>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPlatform />
        <NavConversations />
      </SidebarContent>
      <SidebarFooter className="bg-morpheo-30 my-0">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
