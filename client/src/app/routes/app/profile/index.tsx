import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProfileBioRoute } from "./bio";

export const ProfileRoute = () => {
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
          <ProfileBioRoute />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
