import { Head } from "@/components/seo";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarMainHeader } from "@/components/sidebar/sidebar-main-header";
import {
  Sidebar,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ServerHealthBanner } from "@/features/server-health/server-health-banner/server-health-banner";
import { ComponentProps } from "react";

export interface SidebarLayoutProps extends ComponentProps<typeof Sidebar> {
  breadcrumbs: {
    href: string;
    name: string;
  }[];
  isOpenedByDefault?: boolean;
}

export const SidebarLayout = ({
  children,
  breadcrumbs = [],
  isOpenedByDefault = true,
}: SidebarLayoutProps) => {
  return (
    <>
      <Head title="Algowars" />

      <SidebarProvider defaultOpen={isOpenedByDefault}>
        <AppSidebar />
        <SidebarInset>
          <ServerHealthBanner />
          <SidebarMainHeader breadcrumbs={breadcrumbs} />
          {children}
          <SidebarFooter />
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
};
