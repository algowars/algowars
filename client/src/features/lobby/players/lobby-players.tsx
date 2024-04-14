import { Card } from "@/components/ui/card";
import { Game } from "@/features/game/game.model";
import { Player } from "@/features/player/player.model";

type Props = {
  game?: Game;
  players: Player[];
};

const LobbyPlayers = ({ game, players }: Props) => {
  if (!game) {
    return null;
  }

  return (
    <Card>
      <div className="px-5 p-5">
        <h4 className="text-lg font-semibold">
          {players?.length ?? 0}/ {game?.lobby?.maxPlayers ?? 0} Players
        </h4>
      </div>

      {players?.length ? (
        <ul className="px-5 pb-5 flex flex-col gap-5">
          {players.map((player) => (
            <li key={player.username} className="p-5 border rounded">
              <h4 className="text-lg font-semibold">{player.username}</h4>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
};

export default LobbyPlayers;
