import { AxiosRequestConfig } from "axios";
import { Lobby } from "../lobby";
import api from "@/api/api";

const createLobby = (playerId: string): Promise<Lobby> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/lobby",
    method: "POST",
    data: {
      playerId,
    },
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<Lobby>({ config });
};

const lobbyService = {
  createLobby,
};

Object.freeze(lobbyService);

export { lobbyService };
