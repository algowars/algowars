import { useSocket } from "@/common/socket/socket.provider";
import { Button } from "@/components/ui/button";
import { Game } from "@/features/game/game.model";
import { Player } from "@/features/player/player.model";
import { setError } from "@/slices/error-slice";
import { useAppDispatch } from "@/store/use-app-dispatch";

type Props = {
  game?: Game;
  player?: Player;
};

const LobbyActionsJoin = ({ game, player }: Props) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  if (
    !game ||
    game?.lobby?.players?.find((p) => p.username === player?.username)
  ) {
    return null;
  }

  const joinLobby = () => {
    console.log(socket, game, player);
    if (!socket) {
      console.error("Socket connection not established");
      return;
    }

    if (!game || !game.lobby) {
      dispatch(setError({ message: "A game is required." }));
      return;
    }

    if (!player?.id) {
      return;
    }

    socket.emit("joinLobby", { lobbyId: game.lobby.id, playerId: player.id });
  };

  return <Button onClick={joinLobby}>Join Lobby</Button>;
};

export default LobbyActionsJoin;
