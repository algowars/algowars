import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
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
    <Layout>
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
