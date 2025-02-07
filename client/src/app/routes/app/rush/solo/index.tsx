import { LayoutFull } from "@/components/layouts/layout-full";
import { Spinner } from "@/components/ui/spinner";
import { ProblemRushSoloEditor } from "@/features/game/solo/problem-rush-solo-editor/problem-rush-solo-editor";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

export const SoloRushRoute = () => {
  const { rushId } = useParams();
  const [accessToken, setAccessToken] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token && !accessToken) {
        setAccessToken(accessToken);
      }
    })();
  }, [accessToken, getAccessTokenSilently]);

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
          <LayoutFull className="flex flex-col h-[1px]">
            <ProblemRushSoloEditor rushId={rushId ?? ""} />
          </LayoutFull>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
