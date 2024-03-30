import ProblemRandom from "@/features/problem/problem-random/problem-random";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
const HomePage = () => {
  return (
    <Layout>
      <Container className="py-5">
        <ProblemRandom />
      </Container>
    </Layout>
  );
};

export default HomePage;
