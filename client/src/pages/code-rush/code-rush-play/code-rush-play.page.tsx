import PageLoader from "@/components/loader/page-loader/page-loader";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { codeRushService } from "@/features/code-rush/services/code-rush.service";
import LayoutFull from "@/layout/layout-full/layout-full";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const CodeRushPlayPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { rushId } = useParams();

  const {
    data: status,
    error: statusError,
    isPending: isStatusPending,
  } = useQuery({
    queryKey: ["rush"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();

      if (!rushId) {
        throw new Error("Rush id is required.");
      }

      const status = await codeRushService.getRushStatus(accessToken, rushId);

      return status;
    },
  });

  const {
    data: startedGame,
    error: startError,
    isPending: isStartPending,
  } = useQuery({
    queryKey: ["start-game", status],
    queryFn: async () => {
      if (status?.hasGameStarted === false && rushId) {
        const accessToken = await getAccessTokenSilently();
        return codeRushService.startGame(accessToken, rushId);
      }
      return null;
    },
  });

  useEffect(() => {
    if (startedGame?.startedAt && rushId) {
      navigate(`/rush/${rushId}/play`);
    }
  }, [navigate, rushId, startedGame]);

  useEffect(() => {
    if (status?.hasGameStarted && rushId) {
      navigate(`/rush/${rushId}/play`);
    }
  }, [navigate, rushId, status]);

  if (isStatusPending || isStartPending) {
    return <PageLoader />;
  }

  return (
    <>
      <LayoutFull>
        <ErrorAlertFixed error={statusError || startError} showClose />
        <Outlet />
      </LayoutFull>
    </>
  );
};

export default CodeRushPlayPage;
