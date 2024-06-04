import ProblemsTable from "@/features/problems/problems-table/problems-table";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const ProblemsPage = () => {
  return (
    <Layout>
      <Container>
        <ProblemsTable />
      </Container>
    </Layout>
  );
};

export default ProblemsPage;
