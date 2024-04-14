import PageLoader from "@/components/loader/page-loader/page-loader";
import ErrorAlert from "@/errors/error-alert/error-alert";
import { useGameUpdateEvents } from "@/features/game/events/use-game-update-events";
import LobbyCard from "@/features/lobby/lobby-card/lobby-card";
import LobbyPlayers from "@/features/lobby/players/lobby-players";
import { lobbyService } from "@/features/lobby/services/lobby-service";
import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const LobbyPage = () => {
  const { gameId } = useParams();
  const { game, setGame } = useGameUpdateEvents(gameId);

  const { data, error, isPending } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => {
      if (gameId) {
        return lobbyService.findGameById(gameId);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data, setGame]);

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <Container className="py-6 flex flex-col gap-6">
        <ErrorAlert error={error} />
        {game ? (
          <>
            <LobbyCard game={game} />
            <LobbyPlayers game={game} players={game?.lobby?.players ?? []} />
          </>
        ) : (
          <h1>NO BATTLES</h1>
        )}
      </Container>
    </Layout>
  );
};

export default LobbyPage;
