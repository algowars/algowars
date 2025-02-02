import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { Card } from "@/components/ui/card";
import { CreateSoloProblemRushCard } from "@/features/game/solo/create-solo-problem-rush-card/create-solo-problem-rush-card";
import { ProblemsTable } from "@/features/problem/problems-table/problems-table";

export const DashboardRoute = () => {
  return (
    <Layout>
      <Container className="py-5 flex flex-col gap-5">
        <CreateSoloProblemRushCard />
        <Card className="flex flex-col gap-5 p-5 rounded-none lg:rounded-lg">
          <h3 className="text-3xl font-bold">Problems</h3>
          <ProblemsTable />
        </Card>
      </Container>
    </Layout>
  );
};
