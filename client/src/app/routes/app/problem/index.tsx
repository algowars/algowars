import { LayoutFull } from "@/components/layouts/layout-full";
import { Spinner } from "@/components/ui/spinner";
import { useGetProblemBySlug } from "@/features/problem/api/get-problem-by-slug";
import { ProblemEditor } from "@/features/problem/problem-editor/problem-editor";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const ProblemRoute = () => {
  const { isAuthenticated } = useAuth0();

  const { slug } = useParams();

  const problemQuery = useGetProblemBySlug({
    slug: slug ?? "",
  });

  const problem = problemQuery?.data;

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
          <LayoutFull
            isAuthenticated={isAuthenticated}
            className="flex flex-col h-[1px]"
          >
            <ProblemEditor problem={problem} />
          </LayoutFull>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
