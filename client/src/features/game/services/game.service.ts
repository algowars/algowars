import { AxiosRequestConfig } from "axios";
import { Game } from "../game.model";
import api from "@/api/api";

const getGameWithSessions = (
  accessToken: string,
  gameId: string
): Promise<Game> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/game/find",
    params: {
      sessions: true,
      gameId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Game>({ config });
};

const gameService = {
  getGameWithSessions,
};

export { gameService };
