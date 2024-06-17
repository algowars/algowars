import { Api } from "@/api/api";
import { AxiosRequestConfig } from "axios";

export class EvaluationService extends Api {
  private static instance: EvaluationService;
  private JAVASCRIPT_LANGUAGE_ID = 93;

  private constructor() {
    super();
  }

  public static getInstance(): EvaluationService {
    if (!EvaluationService.instance) {
      EvaluationService.instance = new EvaluationService();
    }
    return EvaluationService.instance;
  }

  public createAnonymouse(
    accessToken: string,
    problemSlug: string,
    sourceCode: string
  ): Promise<{ token: string }[]> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/evaluation/anonymous",
      method: "POST",
      data: {
        sourceCode,
        problemSlug,
        languageId: this.JAVASCRIPT_LANGUAGE_ID,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this.callExternalApi<{ token: string }[]>({ config });
  }
}
