import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { useAccount } from "@/features/account/account.provider";
import { cn } from "@/lib/utils";

export const AdminRoute = () => {
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
      ]}
    >
      <section className="px-3">
        <Card className="bg-sidebar">
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-5">
            <Link
              to={routerConfig.adminCreateProblem.path}
              className={cn(buttonVariants({ variant: "secondary" }), "w-fit")}
            >
              Create Problem
            </Link>
            <Link
              to={routerConfig.adminViewProblems.path}
              className={cn(buttonVariants({ variant: "default" }), "w-fit")}
            >
              View Problems
            </Link>
          </CardContent>
        </Card>
      </section>
    </SidebarLayout>
  );
};
