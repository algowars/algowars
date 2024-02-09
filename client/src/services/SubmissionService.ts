import { ApiResponse } from "@/models/ApiResponseModel";
import { SubmissionModel } from "@/models/SubmissionModel";
import { AxiosRequestConfig } from "axios";
import api from "./Api";

export const getSubmission = (
  submissionId: string
): Promise<ApiResponse<SubmissionModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/submission",
    params: {
      submissionId,
    },
    headers: {
      "content-type": "application/json",
    },
  };

  return api.callExternalApi<SubmissionModel>({ config });
};

const submissionService = {
  getSubmission,
};

Object.freeze(submissionService);
export { submissionService };
