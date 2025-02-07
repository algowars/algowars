import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountStats } from "@/features/account/account-stats/account-stats";
import { CreateSoloProblemRushCard } from "@/features/game/solo/create-solo-problem-rush-card/create-solo-problem-rush-card";
import { ProblemsTable } from "@/features/problem/problems-table/problems-table";

export const DashboardRoute = () => {
  return (
    <SidebarLayout
      breadcrumbs={[
        {
          href: routerConfig.root.path,
          name: "Home",
        },
        {
          href: routerConfig.root.path,
          name: "Dashboard",
        },
      ]}
    >
      <div className="px-3 grid grid-cols-12 gap-3">
        <CreateSoloProblemRushCard className="col-span-12" />

        <Card className="bg-sidebar col-span-12 lg:col-span-9">
          <CardHeader>
            <CardTitle>Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <ProblemsTable />
          </CardContent>
        </Card>
        <AccountStats className="col-span-12 lg:col-span-3" />
      </div>
    </SidebarLayout>
  );
};
