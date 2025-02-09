import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { Spinner } from "@/components/ui/spinner";
import { ProblemRushSoloEditor } from "@/features/game/solo/problem-rush-solo-editor/problem-rush-solo-editor";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const SoloRushRoute = () => {
  const { rushId } = useParams();

  if (!rushId) {
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
            breadcrumbs={[
              {
                href: routerConfig.root.path,
                name: "Home",
              },
              {
                href: routerConfig.rush.path,
                name: "Rush",
              },
              {
                href: routerConfig.rushSolo.execute(rushId),
                name: "Game",
              },
            ]}
            className="flex flex-col h-[1px]"
            isOpenedByDefault={false}
          >
            <ProblemRushSoloEditor rushId={rushId ?? ""} />
          </SidebarLayout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
