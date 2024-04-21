import { useEffect, useState } from "react";
import { Game } from "../game.model";
import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

const useGameUpdateEvents = (gameId?: string) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const socket = io(`${SERVER_URL}/game`);

    if (gameId) {
      socket.emit("joinRoom", { gameId });

      socket.on("gameUpdate", (updatedGame) => {
        setGame(updatedGame);
      });
    }
    return () => {
      if (gameId) {
        socket.emit("leaveRoom", { gameId });
        socket.off("gameUpdate");
        socket.disconnect();
      }
    };
  }, [gameId]);

  return { game, setGame };
};

export { useGameUpdateEvents };
