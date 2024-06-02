import { Button } from "@/components/ui/button";
import { Game } from "@/features/game/game.model";
import { Player } from "@/features/player/player.model";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { lobbyService } from "../../services/lobby-service";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setError } from "@/slices/error-slice";

type Props = {
  game?: Game;
  player?: Player;
};

const isLeaveableLobby = (game?: Game, player?: Player): boolean => {
  if (!game || !player) {
    return false;
  }

  if (game?.lobby?.players?.find((p) => p.id === player.id)) {
    return true;
  }

  return false;
};

const LobbyActionsLeave = ({ game, player }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const {
    mutate: leaveLobby,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["leave-lobby"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      if (!game?.lobby?.id) {
        throw new Error("Lobby is required.");
      }

      return lobbyService.leaveLobby(game.lobby.id, accessToken);
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [dispatch, error]);

  if (!isLeaveableLobby(game, player)) {
    return null;
  }

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => leaveLobby()}
    >
      {isPending ? "Loading" : "Leave Lobby"}
    </Button>
  );
};

export default LobbyActionsLeave;
