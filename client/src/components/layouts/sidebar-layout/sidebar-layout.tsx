import { Head } from "@/components/seo";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarMainHeader } from "@/components/sidebar/sidebar-main-header";
import {
  Sidebar,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";

export interface SidebarLayoutProps extends ComponentProps<typeof Sidebar> {
  breadcrumbs: {
    href: string;
    name: string;
  }[];
}

export const SidebarLayout = ({
  children,
  breadcrumbs = [],
}: SidebarLayoutProps) => {
  return (
    <>
      <Head title="Algowars" />

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarMainHeader breadcrumbs={breadcrumbs} />
          {children}
          <SidebarFooter />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
