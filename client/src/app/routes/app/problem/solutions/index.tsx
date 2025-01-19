import { Container } from "@/components/container";
import { Layout } from "@/components/layouts/layout/layout";
import { Spinner } from "@/components/ui/spinner";
import { useAccount } from "@/features/account/account.provider";
import { useGetProblemSolutionsBySlug } from "@/features/problem/api/get-problem-solutions-by-slug";
import { ProblemSolutionsContainer } from "@/features/problem/solutions/problem-solutions";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const ProblemSolutionsRoute = () => {
  const { isAuthenticated } = useAccount();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");

  const { slug } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        setAccessToken((await getAccessTokenSilently()) ?? "");
      })();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const problemSolutionsQueryResult = useGetProblemSolutionsBySlug({
    slug: slug ?? "",
    accessToken,
  });

  if (!slug || !problemSolutionsQueryResult.data) {
    return null;
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Layout className="flex flex-col h-[1px]">
            <Container className="py-5">
              <ProblemSolutionsContainer
                problem={problemSolutionsQueryResult.data.problem}
                solutions={problemSolutionsQueryResult.data.submissions ?? []}
              />
            </Container>
          </Layout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
