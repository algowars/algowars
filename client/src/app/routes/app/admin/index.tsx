import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { useAccount } from "@/features/account/account.provider";
import { cn } from "@/lib/utils";

export const AdminRoute = () => {
  const { isLoading } = useAccount();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <SidebarLayout breadcrumbs={[]}>
      <section>
        <Card className="w-full p-5 flex flex-col gap-5 bg-sidebar">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Link
            to={routerConfig.adminCreateProblem.path}
            className={cn(buttonVariants({ variant: "default" }), "w-fit")}
          >
            Create Problem
          </Link>
        </Card>
      </section>
    </SidebarLayout>
  );
};
