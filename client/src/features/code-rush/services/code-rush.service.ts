import api from "@/api/api";
import { AxiosRequestConfig } from "axios";
import { CodeRush } from "../code-rush";

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

const codeRushService = {
  createRush,
};

Object.freeze(codeRushService);

export { codeRushService };
