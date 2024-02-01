import { ApiResponse } from "@/models/ApiResponseModel";
import { AxiosRequestConfig } from "axios";
import api from "./Api";

const createAnonymousSubmission = (code: string): Promise<ApiResponse<any>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/evaluator/evaluate/anonymous",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      code,
    },
  };

  return api.callExternalApi<any>({ config });
};

const evaluatorService = {
  createAnonymousSubmission,
};

Object.freeze(evaluatorService);
export { evaluatorService };
