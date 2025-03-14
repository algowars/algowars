import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { toast } from "sonner";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
  timeout: 5_000,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error("Error", {
      description: message,
    });

    // if (error.response?.status === 401) {
    //   const searchParams = new URLSearchParams();
    //   const redirectTo = searchParams.get("redirectTo");
    //   window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    // }

    return Promise.reject(error);
  }
);
