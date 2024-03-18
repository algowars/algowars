import ProblemRandom from "@/features/problem/problem-random/problem-random";
import Container from "@/layout/container/container";
import Landing from "@/layout/landing/landing";
import Layout from "@/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Landing />;
  }

  return (
    <Layout>
      <Container className="py-5">
        <ProblemRandom />
      </Container>
    </Layout>
  );
};

export default HomePage;
