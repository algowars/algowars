import { LayoutFull } from "@/components/layouts/layout-full";
import { Spinner } from "@/components/ui/spinner";
import { ProblemRushSoloEditor } from "@/features/problem-rush/solo/problem-rush-solo-editor/problem-rush-solo-editor";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const SoloRushRoute = () => {
  const { rushId } = useParams();

  // if (!rushId) {
  //   throw new Error("Rush ID is required");
  // }

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
          <LayoutFull className="flex flex-col h-[1px]">
            <ProblemRushSoloEditor rushId={rushId} />
          </LayoutFull>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
