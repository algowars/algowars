import api from "@/api/api";
import { AxiosRequestConfig } from "axios";
import { CodeRush } from "../code-rush.model";
const createRush = (accessToken: string) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/rush",
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<CodeRush>({ config });
};

const getGameById = (
  accessToken: string,
  rushId: string
): Promise<{
  id: string;
  startedAt: Date;
  currentProblemSlug: string;
}> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/rush/find",
    params: {
      rushId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return api.callExternalApi<{
    id: string;
    startedAt: Date;
    currentProblemSlug: string;
  }>({
    config,
  });
};
const getRushStatus = (
  accessToken: string,
  rushId: string
): Promise<{ id: string; hasGameStarted: boolean }> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/rush/find/status",
    params: {
      rushId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return api.callExternalApi<{ id: string; hasGameStarted: boolean }>({
    config,
  });
};

const getRushById = async (
  accessToken: string,
  rushId: string
): Promise<CodeRush> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/rush/find",
    params: {
      rushId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<CodeRush>({ config });
};

const startGame = (accessToken: string, rushId: string): Promise<CodeRush> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/rush/start",
    method: "PUT",
    params: {
      rushId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<CodeRush>({ config });
};

const codeRushService = {
  createRush,
  getRushById,
  getRushStatus,
  getGameById,
  startGame,
};

Object.freeze(codeRushService);

export { codeRushService };
