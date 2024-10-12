import { HttpService } from '@nestjs/axios';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
  CodeExecutionService,
} from './code-execution-service';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Judge0ExecutionConfig {
  apiKey: string;
  url: string;
  host: string;
  headers: Record<string, string>;
}

export class Judge0CodeExecutionService extends CodeExecutionService {
  constructor(
    httpService: HttpService,
    private readonly judge0Config: Judge0ExecutionConfig,
  ) {
    super(httpService);
  }

  public async run(
    request: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse> {
    const config: AxiosRequestConfig = {
      url: `${this.judge0Config.url}/submissions?base64_encoded=true&wait=false`,
      method: 'POST',
      headers: this.judge0Config.headers,
      data: request,
    };

    const response = await this.execute<CodeExecutionResponse>(config);
    return response.data;
  }

  public async runBatch(
    request: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse[]> {
    const config: AxiosRequestConfig = {
      url: `${this.judge0Config.url}/submissions?base64_encoded=true&wait=false`,
      method: 'POST',
      headers: this.judge0Config.headers,
      data: request,
    };

    const response = await this.execute<CodeExecutionResponse[]>(config);

    return response.data;
  }
}
