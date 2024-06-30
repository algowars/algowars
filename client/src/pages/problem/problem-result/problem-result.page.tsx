import PageLoader from "@/components/loader/page-loader/page-loader";
import ProblemResultHeader from "@/features/problem/problem-result/problem-result-header/problem-result-header";
import { ProblemService } from "@/features/problem/services/problem.service";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProblemResultPage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { slug } = useParams();

  const {
    data: problemAggregate,
    isPending,
    error,
  } = useQuery({
    queryKey: [slug],
    queryFn: async () => {
      if (slug) {
        const problem =
          await ProblemService.getInstance().findProblemAggregateBySlug(slug);

        return problem;
      }
      return null;
    },
  });

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <Container className="py-10">
        <ProblemResultHeader problemAggregate={problemAggregate} />
      </Container>
    </Layout>
  );
};

export default ProblemResultPage;
