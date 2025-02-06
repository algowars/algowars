import * as React from "react";
import { Dumbbell, Frame, Map, PieChart, Swords } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./sidebar-user";
import { SidebarMain } from "./sidebar-main";
import { SidebarLogo } from "./sidebar-logo";
import { useAccount } from "@/features/account/account.provider";
import { SidebarAuth } from "./sidebar-auth";
import { routerConfig } from "@/app/router-config";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Play",
      url: routerConfig.root.path,
      icon: Swords,
      isActive: true,
      items: [
        {
          title: "Rush",
          url: routerConfig.rush.path,
        },
      ],
    },
    {
      title: "Train",
      url: routerConfig.problems.path,
      icon: Dumbbell,
      isActive: true,
      items: [
        {
          title: "Problems",
          url: routerConfig.problems.path,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isAuthenticated } = useAccount();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated ? <SidebarUser /> : <SidebarAuth />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
