import { SidebarLayout } from "@/components/layouts/sidebar-layout/sidebar-layout";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
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
          <SidebarLayout className="flex flex-col h-[1px]">
            <h1>RUSH GAMEMODE</h1>
          </SidebarLayout>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
