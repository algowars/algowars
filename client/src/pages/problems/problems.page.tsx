import { Card } from "@/components/ui/card";
import ProblemsTable from "@/features/problems/problems-table/problems-table";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const ProblemsPage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-5 py-6">
        <Card className="p-5 col-span-12">
          <ProblemsTable />
        </Card>
      </Container>
    </Layout>
  );
};

export default ProblemsPage;
