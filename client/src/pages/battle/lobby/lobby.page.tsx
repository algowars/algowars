import PageLoader from "@/components/loader/page-loader/page-loader";
import ErrorAlert from "@/errors/error-alert/error-alert";
import LobbyCard from "@/features/lobby/lobby-card/lobby-card";
import LobbyPlayers from "@/features/lobby/players/lobby-players";
import { lobbyService } from "@/features/lobby/services/lobby-service";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const LobbyPage = () => {
  const { gameId } = useParams();
  const {
    data: game,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => {
      if (gameId) {
        return lobbyService.findGameById(gameId);
      }
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Layout>
      <Container className="py-6 flex flex-col gap-6">
        <ErrorAlert error={error} />
        <LobbyCard game={game} />
        <LobbyPlayers game={game} />
      </Container>
    </Layout>
  );
};

export default LobbyPage;
