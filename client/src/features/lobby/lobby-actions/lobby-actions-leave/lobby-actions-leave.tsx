import { Button } from "@/components/ui/button";
import { Game } from "@/features/game/game";
import { Player } from "@/features/player/player";

type Props = {
  game?: Game;
  player?: Player;
};

const LobbyActionsLeave = ({ game, player }: Props) => {
  if (
    !game ||
    !game.lobby ||
    !player ||
    !game.lobby.players?.find((p) => p.username !== player.username)
  ) {
    return null;
  }

  return <Button variant="destructive">Leave Lobby</Button>;
};

export default LobbyActionsLeave;
