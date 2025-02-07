import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { Spinner } from "@/components/ui/spinner";
import { useGetProblemBySlug } from "@/features/problem/api/get-problem-by-slug";
import { ProblemEditor } from "@/features/problem/problem-editor/problem-editor";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const ProblemRoute = () => {
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
          <SidebarLayout
            className="flex flex-col h-[1px]"
            breadcrumbs={[
              {
                href: routerConfig.root.path,
                name: "Home",
              },
              {
                href: routerConfig.problems.path,
                name: "Problems",
              },
              {
                href: routerConfig.problem.execute(slug),
                name: slug,
              },
            ]}
          >
            <ProblemEditor problem={problem} />
          </SidebarLayout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
