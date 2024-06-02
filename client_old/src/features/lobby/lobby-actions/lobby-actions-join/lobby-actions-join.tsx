import { Button } from "@/components/ui/button";
import { Game } from "@/features/game/game.model";
import { Player } from "@/features/player/player.model";
import { setError } from "@/slices/error-slice";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { lobbyService } from "../../services/lobby-service";
import { useEffect } from "react";

type Props = {
  game?: Game;
  player?: Player;
};

const isJoinableGame = (game?: Game, player?: Player): boolean => {
  if (!player) {
    return true;
  }

  if (!game) {
    return false;
  }
  const gameHasPlayer = game.lobby?.players?.find((p) => p.id === player?.id);
  if (gameHasPlayer) {
    return false;
  }

  return true;
};

const LobbyActionsJoin = ({ game, player }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const {
    mutate: joinLobby,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["join-lobby"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      if (!game?.lobby?.id) {
        throw new Error("Lobby is required.");
      }

      return lobbyService.joinLobby(game.lobby.id, accessToken);
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [dispatch, error]);

  if (!isJoinableGame(game, player)) {
    return null;
  }

  return (
    <Button onClick={() => joinLobby()} disabled={isPending}>
      {isPending ? "Loading" : "Join Lobby"}
    </Button>
  );
};

export default LobbyActionsJoin;
