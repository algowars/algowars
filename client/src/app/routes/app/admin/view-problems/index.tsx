import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminProblemsTable } from "@/features/admin/admin-problems-table/admin-problems-table";

export const AdminViewProblemsRoute = () => {
  return (
    <SidebarLayout
      breadcrumbs={[
        {
          href: routerConfig.root.path,
          name: "Home",
        },
        {
          href: routerConfig.admin.path,
          name: "Admin",
        },
        {
          href: routerConfig.adminViewProblems.path,
          name: "Problems",
        },
      ]}
    >
      <section className="px-3">
        <Card className="bg-sidebar">
          <CardHeader>
            <CardTitle>Problems</CardTitle>
            <CardDescription>View Recently created problems.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProblemsTable />
          </CardContent>
        </Card>
      </section>
    </SidebarLayout>
  );
};
