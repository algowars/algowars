import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProblemsTable } from "@/features/problem/problems-table/problems-table";

export const ProblemsRoute = () => {
  return (
    <SidebarLayout
      breadcrumbs={[
        {
          href: routerConfig.root.path,
          name: "Home",
        },
        {
          href: routerConfig.problems.path,
          name: "Problems",
        },
      ]}
    >
      <div className="flex flex-col gap-5 px-5">
        <Card className="bg-sidebar">
          <CardHeader>
            <CardTitle>Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <ProblemsTable />
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};
