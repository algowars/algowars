import { AxiosRequestConfig } from "axios";
import api from "@/api/api";
import { Game } from "@/features/game/game.model";
import { PaginationResponse } from "@/common/pagination/pagination-response.model";

const createLobby = (
  accessToken: string,
  lobbyName?: string
): Promise<Game> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/game",
    method: "POST",
    data: {
      lobbyName,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Game>({ config });
};

const getPublicLobbiesPageable = (
  page: number,
  size: number,
  timestamp: Date
): Promise<PaginationResponse<Game>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/lobby",
    params: {
      timestamp: timestamp.toISOString(),
      page,
      size,
    },
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<PaginationResponse<Game>>({ config });
};

const getLobbyPlayers = (lobbyId: string): Promise<Player[]> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/lobby/players",
    params: {
      lobbyId,
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<Player[]>({ config });
};

const findGameById = (gameId: string): Promise<Game> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/game/find",
    params: { gameId },
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<Game>({ config });
};

const lobbyService = {
  createLobby,
  getPublicLobbiesPageable,
  getLobbyPlayers,
  findGameById,
};

Object.freeze(lobbyService);

export { lobbyService };
