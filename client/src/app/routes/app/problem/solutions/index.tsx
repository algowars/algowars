import { Layout } from "@/components/layouts/layout/layout";
import { Spinner } from "@/components/ui/spinner";
import { ProblemSolutions } from "@/features/problem-solutions/problem-solutions";
import { useGetProblemSolutions } from "@/features/problem/api/get-problem-solutions";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const ProblemSolutionsRoute = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");
  const { slug = "" } = useParams();

  useEffect(() => {
    (async () => {
      if (!isLoading && isAuthenticated) {
        const token = await getAccessTokenSilently();

        if (token) {
          setAccessToken(token);
        }
      }
    })();
  }, []);

  if (!slug) {
    return null;
  }

  const getProblemSolutionsQuery = useGetProblemSolutions({
    slug,
    accessToken,
  });

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
          <Layout
            isAuthenticated={isAuthenticated}
            className="flex flex-col h-[1px]"
          >
            <ProblemSolutions
              problem={getProblemSolutionsQuery.data?.problem}
            />
          </Layout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
