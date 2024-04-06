import { useSocket } from "@/common/socket/socket.provider";
import { Card } from "@/components/ui/card";
import { Game } from "@/features/game/game";
import { Player } from "@/features/player/player";
import { useEffect, useState } from "react";

type Props = {
  game?: Game;
};

const LobbyPlayers = ({ game }: Props) => {
  const { socket } = useSocket();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!game || !socket) {
      return;
    }

    const handlePlayersUpdate = (updatedPlayers) => {
      setPlayers(updatedPlayers);
    };

    socket.on("playersUpdate", handlePlayersUpdate);

    return () => {
      socket.off("playersUpdate");
    };
  }, [game, socket]);

  if (!game) {
    return null;
  }

  return (
    <Card>
      <div className="p-5">
        <h4 className="text-lg font-semibold">
          {players.length ?? 0}/ {game?.lobby?.maxPlayers ?? 0} Players
        </h4>
      </div>

      <ul>
        {players.map((player) => (
          <li key={player.username}>{player.username}</li>
        ))}
      </ul>
    </Card>
  );
};

export default LobbyPlayers;
