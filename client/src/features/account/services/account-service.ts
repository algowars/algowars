import { AxiosRequestConfig } from "axios";
import { Account } from "../account.model";
import api from "@/api/api";

const getAccountBySub = (accessToken: string): Promise<Account> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find/sub",
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Account>({ config });
};

const accountService = {
  getAccountBySub,
};

Object.freeze(accountService);

export { accountService };
