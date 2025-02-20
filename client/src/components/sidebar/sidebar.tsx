import * as React from "react";
import { Dumbbell, NotepadText, Swords } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarMain } from "./sidebar-main";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarAuth } from "./sidebar-auth";
import { routerConfig } from "@/app/router-config";
import { SidebarAdmin } from "./sidebar-admin";

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
  admin: [
    {
      title: "Problem Management",
      url: routerConfig.admin.path,
      icon: NotepadText,
      isActive: true,
      items: [
        {
          title: "Create Problem",
          url: routerConfig.adminCreateProblem.path,
        },
        {
          title: "View Problems",
          url: routerConfig.adminViewProblems.path,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={data.navMain} />
        <SidebarAdmin items={data.admin} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarAuth />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
