import { AxiosRequestConfig } from "axios";
import api from "@/api/api";
import { Game } from "@/features/game/game";
import { PaginationResponse } from "@/common/pagination/pagination-response.model";
import { Lobby } from "../lobby";

const createLobby = (accessToken: string): Promise<Game> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/game",
    method: "POST",
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
): Promise<PaginationResponse<Lobby>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/lobby",
    params: {
      timestamp: timestamp.toISOString(),
      page,
      size,
    },
  };

  return api.callExternalApi<PaginationResponse<Lobby>>({ config });
};

const lobbyService = {
  createLobby,
  getPublicLobbiesPageable,
};

Object.freeze(lobbyService);

export { lobbyService };
