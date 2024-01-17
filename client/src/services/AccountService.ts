import { AxiosRequestConfig } from "axios";
import { AccountModel } from "../models/AccountModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";
import { ContentRating } from "../models/ContentRating";

const getAccountBySub = (
  sub: string,
  accessToken: string
): Promise<ApiResponse<AccountModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find",
    params: {
      sub,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<AccountModel>({ config });
};

const isAccountSetup = (
  sub: string,
  accessToken: string
): Promise<ApiResponse<boolean>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/is-account-setup",
    params: {
      sub,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<boolean>({ config });
};

const setupAccount = (
  username: string,
  sub: string
): Promise<ApiResponse<AccountModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/create",
    data: {
      username,
      sub,
    },
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<AccountModel>({ config });
};

const getAccountByUsername = (
  username: string
): Promise<
  ApiResponse<{
    account: AccountModel;
    adlibs: number;
    responses: number;
    bookmarks: number;
  }>
> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/find/username/${encodeURI(username)}`,
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<{
    account: AccountModel;
    adlibs: number;
    responses: number;
    bookmarks: number;
  }>({ config });
};

const updateContentRating = (
  contentRating: ContentRating,
  sub: string,
  accountId: string,
  accessToken: string
): Promise<ApiResponse<AccountModel>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/${encodeURI(accountId)}/update/rating`,
    method: "PUT",
    params: {
      sub,
    },
    data: {
      contentRating,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<AccountModel>({ config });
};

const AccountService = {
  getAccountBySub,
  isAccountSetup,
  setupAccount,
  getAccountByUsername,
  updateContentRating,
};

Object.freeze(AccountService);
export default AccountService;
