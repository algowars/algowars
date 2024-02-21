import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorModel } from "../models/ErrorModel";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL ?? "",
  timeout: 30_000,
});

const callExternalApi = async <T>(
  options: {
    config: AxiosRequestConfig;
  },
  onCancel: T
): Promise<T> => {
  try {
    const response: AxiosResponse = await axiosApi(options.config);
    const { data } = response;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.message === "Request aborted" || error.message === "canceled") {
        return onCancel;
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

      throw new Error(message);
    }
    return onCancel;
  }
};

const api = {
  callExternalApi,
};

Object.freeze(api);
export default api;
