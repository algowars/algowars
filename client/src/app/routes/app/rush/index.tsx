import { routerConfig } from "@/app/router-config";
import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { CreateSoloProblemRushCard } from "@/features/game/solo/create-solo-problem-rush-card/create-solo-problem-rush-card";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const RushRoute = () => {
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
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
                href: routerConfig.rush.path,
                name: "Rush",
              },
            ]}
          >
            <section className="px-3">
              <CreateSoloProblemRushCard />
            </section>
          </SidebarLayout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
