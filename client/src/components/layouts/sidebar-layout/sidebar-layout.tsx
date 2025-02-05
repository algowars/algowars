import { Head } from "@/components/seo";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarMainHeader } from "@/components/sidebar/sidebar-main-header";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";

export const SidebarLayout = ({ children }: ComponentProps<typeof Sidebar>) => {
  return (
    <>
      <Head title="Algowars" />

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarMainHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
