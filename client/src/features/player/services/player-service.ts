import api from "@/api/api";
import { AxiosRequestConfig } from "axios";
import { Player } from "../player.model";

const createPlayer = (accountId?: number): Promise<Player> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/player",
    method: "POST",
    data: {
      accountId,
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<Player>({ config });
};

const getPlayerById = (playerId: string): Promise<Player> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/player/find",
    params: {
      playerId,
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<Player>({ config });
};

const playerService = {
  createPlayer,
  getPlayerById,
};

Object.freeze(playerService);

export { playerService };
