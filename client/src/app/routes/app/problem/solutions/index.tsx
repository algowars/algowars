import { Layout } from "@/components/layouts/layout/layout";
import { Spinner } from "@/components/ui/spinner";
import { useAccountStore } from "@/features/account/account-store.provider";
import { useGetProblemSolutionsBySlug } from "@/features/problem/api/get-problem-solutions-by-slug";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const ProblemSolutions = () => {
  const { isAuthenticated: isAuthAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const { isAuthenticated } = useAccountStore();

  let accessToken = "";

  const { slug } = useParams();

  useEffect(() => {
    if (isAuthenticated && isAuthAuthenticated) {
      (async () => {
        accessToken = await getAccessTokenSilently();
      })();
    }
  }, [isAuthAuthenticated, isAuthAuthenticated, getAccessTokenSilently]);

  useGetProblemSolutionsBySlug({
    slug: slug ?? "",
    accessToken,
  });

  if (!slug) {
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
          <Layout
            isAuthenticated={isAuthAuthenticated}
            className="flex flex-col h-[1px]"
          ></Layout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
