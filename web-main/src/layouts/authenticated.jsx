import { BrowserRouter, Navigate, Routes, Route } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NavHeader } from "@/components/nav-header";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatMain } from "@/views/chat-main";
import { ConversationProvider } from "@/contexts/conversation-provider";
import { NavProvider } from "@/contexts/nav-provider";
import { GraphProvider } from "@/contexts/graph-provider";
import { SystemsProvider } from "@/contexts/systems-provider";
import { DataProductsProvider } from "@/contexts/data-product-provider";
import { DataProduct } from "@/views/data-product";
import { Catalog } from "@/views/catalog";

export const Authenticated = () => {
  return (
    <BrowserRouter>
      <GraphProvider>
        <ConversationProvider>
          <SidebarProvider className="h-screen">
            <NavProvider>
              <AppSidebar className="fixed h-screen" />
            </NavProvider>
            <SidebarInset className="h-screen overflow-y-hidden">
              <NavHeader />
              <DataProductsProvider>
                <SystemsProvider>
                  <Routes>
                    <Route path="/" element={<ChatMain />} />
                    <Route path="/conversations/*" element={<ChatMain />} />
                    <Route path="/catalog/*" element={<Catalog />} />
                    <Route path="/data-products/*" element={<DataProduct />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </SystemsProvider>
              </DataProductsProvider>
            </SidebarInset>
          </SidebarProvider>
        </ConversationProvider>
      </GraphProvider>
    </BrowserRouter>
  );
};
