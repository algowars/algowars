import { AxiosRequestConfig } from "axios";
import { Account } from "../account.model";
import api from "@/api/api";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { Profile } from "@/features/profile/profile.model";

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

const getProfileByUsername = (username: string): Promise<Profile> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/profile",
    params: {
      username,
    },
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<Profile>({ config });
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
  getProfileByUsername,
  create,
};

Object.freeze(accountService);

export { accountService };
