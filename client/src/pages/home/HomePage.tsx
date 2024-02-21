import ProblemsRandom from "@/features/problems/problems-random/ProblemsRandom";
import Container from "@/layout/container/Container";
import Layout from "@/layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <Container className="py-5">
        <ProblemsRandom />
      </Container>
    </Layout>
  );
};

export default HomePage;
