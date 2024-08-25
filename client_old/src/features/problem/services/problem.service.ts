import { PaginationResponse } from "@/common/pagination/pagination-response.model";
import { Problem } from "../models/problem.model";
import { AxiosRequestConfig } from "axios";
import { Api } from "@/api/api";
import { CreateProblemDto } from "../dtos/create-problem.dto";
import { ProblemAggregate } from "../models/problem-aggregate.model";

export class ProblemService extends Api {
  private static instance: ProblemService;
  private JAVASCRIPT_LANGUAGE_ID = 93;

  private constructor() {
    super();
  }

  public static getInstance(): ProblemService {
    if (!ProblemService.instance) {
      ProblemService.instance = new ProblemService();
    }
    return ProblemService.instance;
  }

  public getPageable(
    page: number,
    size: number,
    timestamp: Date
  ): Promise<PaginationResponse<Problem>> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/problem",
      params: {
        page,
        size,
        timestamp: timestamp.toISOString(),
      },
      headers: { "content-type": "application/json" },
    };

    return this.callExternalApi<PaginationResponse<Problem>>({ config });
  }

  public createProblem(
    accessToken: string,
    createProblemDto: CreateProblemDto
  ): Promise<string> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/problem",
      method: "POST",
      data: createProblemDto,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // javaScript language id
    config.data.languageId = this.JAVASCRIPT_LANGUAGE_ID;

    return this.callExternalApi<string>({ config });
  }

  public findProblemAggregateBySlug(slug: string): Promise<ProblemAggregate> {
    const config: AxiosRequestConfig = {
      url: "/api/v1/problem/slug",
      params: {
        slug,
        languageId: this.JAVASCRIPT_LANGUAGE_ID,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    return this.callExternalApi<ProblemAggregate>({ config });
  }
}
