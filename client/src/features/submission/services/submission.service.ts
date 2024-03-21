import { AxiosRequestConfig } from "axios";
import { Submission } from "../submission.model";
import api from "@/api/api";
import { CreateSubmissionDto } from "../dtos/create-submission.dto";
import { PaginationResponse } from "@/common/pagination/pagination-response.model";

const createSubmission = ({
  code,
  problemId,
  accountId,
  sub,
}: CreateSubmissionDto): Promise<Submission> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/evaluator/evaluate/submit",
    method: "POST",
    data: {
      code,
      problemId,
      accountId,
      sub,
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<Submission>({ config });
};

const getUserSubmissions = (
  accessToken: string,
  username: string,
  page: number,
  size: number,
  timestamp: Date
): Promise<PaginationResponse<Submission>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/submission/find/account",
    params: {
      username,
      page,
      size,
      timestamp,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<PaginationResponse<Submission>>({ config });
};

const submissionService = {
  createSubmission,
  getUserSubmissions,
};

Object.freeze(submissionService);

export { submissionService };
