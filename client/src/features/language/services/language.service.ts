import { AxiosRequestConfig } from "axios";
import { Language } from "../language.model";
import api from "@/api/api";

const getAvailableLanguages = () => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/language",
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<Language[]>({ config });
};

const languageService = {
  getAvailableLanguages,
};

Object.freeze(languageService);

export { languageService };
