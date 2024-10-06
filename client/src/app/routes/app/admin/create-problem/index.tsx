import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { Card } from "@/components/ui/card";
import { useAccountStore } from "@/features/account/account-store.provider";
import { AdminCreateProblemForm } from "@/features/admin/admin-create-problem/admin-create-problem-form/admin-create-problem-form";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminCreateProblemRoute = () => {
  const { isAuthenticated: isAuthAuthenticated, isLoading: isAuthLoading } =
    useAuth0();
  const { isAuthenticated, isLoading } = useAccountStore();

  if (isAuthLoading || isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout isAuthenticated={isAuthAuthenticated || isAuthenticated}>
      <section>
        <Container className="flex items-center py-8">
          <Card className="w-full p-5 flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Create new Problem</h1>
            <AdminCreateProblemForm />
          </Card>
        </Container>
      </section>
    </Layout>
  );
};
