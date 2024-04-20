import { AxiosRequestConfig } from "axios";
import api from "@/api/api";
import { CreateSubmissionDto } from "../dtos/create-submission.dto";
import { PaginationResponse } from "@/common/pagination/pagination-response.model";
import { Submission } from "../sbumission.model";

const JAVASCRIPT_LANGUAGE_ID = 93;

const createSubmission = (
  accessToken: string,
  {
    code,
    problemId,
    accountId,
    sub,
    languageId = JAVASCRIPT_LANGUAGE_ID,
  }: CreateSubmissionDto
): Promise<Submission> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/evaluator/evaluate/submit",
    method: "POST",
    data: {
      code,
      problemId,
      accountId,
      sub,
      languageId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Submission>({ config });
};

const runTests = (
  accessToken: string,
  {
    code,
    problemId,
    accountId,
    sub,
    languageId = JAVASCRIPT_LANGUAGE_ID,
  }: CreateSubmissionDto
): Promise<Submission> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/evaluator/evaluate",
    method: "POST",
    data: {
      code,
      problemId,
      accountId,
      sub,
      languageId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
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

const getSubmissionById = (
  accessToken: string,
  submissionId: string
): Promise<PaginationResponse<Submission>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/submission/find",
    params: {
      submissionId,
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
  runTests,
  getSubmissionById,
};

Object.freeze(submissionService);

export { submissionService };
