import { Game } from "@/features/game/game.model";
import LobbyActionsLeave from "./lobby-actions-leave/lobby-actions-leave";
import LobbyActionsJoin from "./lobby-actions-join/lobby-actions-join";
import { useAppSelector } from "@/store/use-app-selector";
import LobbyActionsStartGame from "./lobby-actions-start-game/lobby-actions-start-game";

type Props = {
  game?: Game;
};

const LobbyActions = ({ game }: Props) => {
  const { account } = useAppSelector((state) => state.account);

  console.log("ACCOUNT: ", account, "GAME: ", game);

  if (!game) {
    return null;
  }

  return (
    <ul className="flex gap-3 items-center">
      <LobbyActionsStartGame game={game} player={account?.player} />
      <LobbyActionsJoin game={game} player={account?.player} />
      <LobbyActionsLeave game={game} player={account?.player} />
    </ul>
  );
};

export default LobbyActions;
