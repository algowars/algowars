import { Api } from "@/api/api";
import { SubmissionResult } from "../models/submission-result.model";
import { AxiosRequestConfig } from "axios";

export class SubmissionResultService extends Api {
  private static instance: SubmissionResultService;

  private constructor() {
    super();
  }

  public static getInstance(): SubmissionResultService {
    if (!SubmissionResultService.instance) {
      SubmissionResultService.instance = new SubmissionResultService();
    }
    return SubmissionResultService.instance;
  }

  public getPollSubmission(
    accessToken: string,
    submissionId: string
  ): Promise<SubmissionResult> {
    const config: AxiosRequestConfig = {
      url: `/api/v1/submission-result/poll/${encodeURIComponent(submissionId)}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this.callExternalApi<SubmissionResult>({ config });
  }
}
