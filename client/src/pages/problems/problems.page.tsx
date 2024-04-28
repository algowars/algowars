import Problems from "@/features/problems/problems";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";

const ProblemsPage = () => {
  return (
    <Layout>
      <Container className="py-5 flex flex-col gap-6">
        <Problems />
      </Container>
    </Layout>
  );
};

export default ProblemsPage;
