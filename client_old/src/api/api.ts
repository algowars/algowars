import { AppError } from "@/errors/app-error.model";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class Api {
  constructor(
    private readonly axiosApi = axios.create({
      baseURL: import.meta.env.VITE_API_SERVER_URL ?? "",
      timeout: 30_000,
    })
  ) {}

  protected async callExternalApi<T>(options: {
    config: AxiosRequestConfig;
  }): Promise<T> {
    try {
      const response: AxiosResponse = await this.axiosApi(options.config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        const { response } = axiosError;

        let message = "http request failed";

        if (response && response.statusText) {
          message = response.statusText;
        }

        if (axiosError.message) {
          message = axiosError.message;
        }

        if (response && response.data && (response.data as AppError).message) {
          message = (response.data as AppError).message;
        }

        throw new Error(message);
      }
      throw error;
    }
  }
}
