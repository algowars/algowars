import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { Card } from "@/components/ui/card";
import { ProblemsTable } from "@/features/problem/problems-table/problems-table";

export const DashboardRoute = () => {
  return (
    <Layout>
      <Container className="py-5">
        <Card className="flex flex-col gap-5 p-5 rounded-none lg:rounded-lg">
          <h3 className="text-3xl font-bold">Problems</h3>
          <ProblemsTable />
        </Card>
      </Container>
    </Layout>
  );
};
