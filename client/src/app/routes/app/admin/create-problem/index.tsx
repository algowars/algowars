import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { Card } from "@/components/ui/card";
import { useAccount } from "@/features/account/account.provider";
import { AdminCreateProblemForm } from "@/features/admin/admin-create-problem/admin-create-problem-form/admin-create-problem-form";

export const AdminCreateProblemRoute = () => {
  const { isLoading } = useAccount();

  if (isLoading) {
    return <PageLoader />;
  }

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
          name: "Create Problem",
        },
      ]}
    >
      <section className="px-3">
        <Card className="w-full p-5 flex flex-col gap-5 bg-sidebar">
          <h1 className="text-3xl font-bold">Create new Problem</h1>
          <AdminCreateProblemForm />
        </Card>
      </section>
    </SidebarLayout>
  );
};
