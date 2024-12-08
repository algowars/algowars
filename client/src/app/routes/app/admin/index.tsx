import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { useAccountStore } from "@/features/account/account-store.provider";
import { AdminProblems } from "@/features/admin/admin-problems/admin-problems";
import { cn } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminRoute = () => {
  const { isAuthenticated: isAuthAuthenticated, isLoading: isAuthLoading } =
    useAuth0();
  const { isAuthenticated, isLoading } = useAccountStore();

  if (isAuthLoading || isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout isAuthenticated={isAuthAuthenticated || isAuthenticated}>
      <section>
        <Container className="flex items-center py-8 flex flex-col gap-5">
          <Card className="w-full p-5 flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Admin Panel</h1>

            <Link
              to="/app/admin/create-problem"
              className={cn(buttonVariants({ variant: "default" }), "w-fit")}
            >
              Create Problem
            </Link>
          </Card>
          <Card className="w-full p-5 flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Problems</h2>
            <section>
              <AdminProblems />
            </section>
          </Card>
        </Container>
      </section>
    </Layout>
  );
};
