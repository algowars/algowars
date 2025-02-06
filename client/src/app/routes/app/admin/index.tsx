import { routerConfig } from "@/app/router-config";
import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
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
    <Layout>
      <section>
        <Container className="flex items-center py-8">
          <Card className="w-full p-5 flex flex-col gap-5 bg-sidebar">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <Link
              to={routerConfig.adminCreateProblem.path}
              className={cn(buttonVariants({ variant: "default" }), "w-fit")}
            >
              Create Problem
            </Link>
          </Card>
        </Container>
      </section>
    </Layout>
  );
};
