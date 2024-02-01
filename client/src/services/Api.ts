import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/ApiResponseModel";
import { ErrorModel } from "../models/ErrorModel";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL ?? "",
  timeout: 10_000,
});

const callExternalApi = async <T>(options: {
  config: AxiosRequestConfig;
}): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse = await axiosApi(options.config);
    const { data } = response;

    return [data, null];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.message === "Request aborted" || error.message === "canceled") {
        return [null, null];
      }
      const axiosError = error as AxiosError;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && (response.data as ErrorModel).message) {
        message = (response.data as ErrorModel).message;
      }

      return [
        null,
        {
          message,
        },
      ];
    }

    return [
      null,
      {
        message: (error as Error).message,
      },
    ];
  }
};

const api = {
  callExternalApi,
};

Object.freeze(api);
export default api;
