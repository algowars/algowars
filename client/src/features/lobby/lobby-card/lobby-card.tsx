import { Card } from "@/components/ui/card";
import LobbyActions from "../lobby-actions/lobby-actions";
import { Game } from "@/features/game/game.model";

type Props = {
  game?: Game;
};

const LobbyCard = ({ game }: Props) => {
  if (!game || !game?.lobby) {
    return null;
  }

  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-semibold">Lobby: {game.lobby.name}</h3>
      </div>

      <LobbyActions game={game} />
    </Card>
  );
};

export default LobbyCard;
