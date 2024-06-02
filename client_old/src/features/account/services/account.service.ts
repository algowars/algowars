import { AxiosRequestConfig } from "axios";
import { Account } from "../account.model";
import api from "@/api/api";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { Profile } from "@/features/profile/profile.model";
import { ProfileInfo } from "@/features/profile/profile-info/profile-info.model";
import { UpdateProfileDto } from "@/features/profile/dtos/update-profie.dto";

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

const getProfileInformation = (accessToken: string): Promise<ProfileInfo> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/profile/info",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<ProfileInfo>({ config });
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

const updateProfile = (
  accessToken: string,
  updateProfileDto: UpdateProfileDto
): Promise<ProfileInfo> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/profile/info",
    method: "PUT",
    data: updateProfileDto,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<ProfileInfo>({ config });
};

const accountService = {
  getAccountBySub,
  getProfileByUsername,
  getProfileInformation,
  updateProfile,
  create,
};

Object.freeze(accountService);

export { accountService };
