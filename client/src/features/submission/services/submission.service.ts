import { AxiosRequestConfig } from "axios";
import { Submission } from "../submission.model";
import api from "@/api/api";
import { CreateSubmissionDto } from "../dtos/create-submission.dto";

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

const submissionService = {
  createSubmission,
};

Object.freeze(submissionService);

export { submissionService };
