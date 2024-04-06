import { Game } from "@/features/game/game";
import { useAppSelector } from "@/store/use-app-selector";
import LobbyActionsLeave from "./lobby-actions-leave/lobby-actions-leave";
import LobbyActionsJoin from "./lobby-actions-join/lobby-actions-join";

type Props = {
  game?: Game;
};

const LobbyActions = ({ game }: Props) => {
  const { player } = useAppSelector((state) => state.player);

  if (!game) {
    return null;
  }

  return (
    <ul className="flex gap-3 items-center">
      <LobbyActionsJoin game={game} player={player} />
      <LobbyActionsLeave game={game} player={player} />
    </ul>
  );
};

export default LobbyActions;
