import { AxiosRequestConfig } from "axios";
import { Account } from "../account.model";
import api from "@/api/api";
import { CreateAccountDto } from "../dtos/create-account.dto";

const getAccountBySub = (accessToken: string): Promise<Account> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find/sub",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Account>({ config });
};

const create = (
  accessToken: string,
  data: CreateAccountDto
): Promise<Account> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account",
    method: "POST",
    data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Account>({ config });
};

const accountService = {
  getAccountBySub,
  create,
};

Object.freeze(accountService);

export { accountService };
