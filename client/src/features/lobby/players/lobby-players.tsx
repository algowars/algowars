import { useSocket } from "@/common/socket/socket.provider";
import { Card } from "@/components/ui/card";
import { Game } from "@/features/game/game.model";
import { Player } from "@/features/player/player.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { lobbyService } from "../services/lobby-service";
import Loader from "@/components/loader/loader";

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

    const handlePlayersUpdate = (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    };

    socket.on("playersUpdate", handlePlayersUpdate);

    return () => {
      socket.off("playersUpdate");
    };
  }, [game, socket]);

  const { data, isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: () => {
      if (game?.lobby?.id) {
        return lobbyService.getLobbyPlayers(game.lobby.id);
      }

      return null;
    },
  });

  useEffect(() => {
    if (data) {
      setPlayers(data);
    }
  }, [data]);

  if (!game) {
    return null;
  }

  return (
    <Card>
      <div className="px-5 p-5">
        <h4 className="text-lg font-semibold">
          {players.length ?? 0}/ {game?.lobby?.maxPlayers ?? 0} Players
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
      {isLoading ? (
        <div className="px-5 pb-5">
          <Loader />
        </div>
      ) : null}
    </Card>
  );
};

export default LobbyPlayers;
