import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
} from '../code-execution-service';

export interface Judge0ExecutionConfig {
  apiKey: string;
  url: string;
  host: string;
  headers: Record<string, string>;
}

@Injectable()
export class Judge0CodeExecutionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly judge0Config: Judge0ExecutionConfig,
  ) {}

  private execute<T>(
    requestConfig: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    console.log('REQUEST CONFIG: ', requestConfig);
    return this.httpService.axiosRef<T>(requestConfig);
  }

  public async run(
    request: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse> {
    console.log(this.judge0Config.url);
    const config: AxiosRequestConfig = {
      url: `${this.judge0Config.url}/submissions?base64_encoded=true&wait=false`,
      method: 'POST',
      headers: this.judge0Config.headers,
      data: this.buildRequestData(request),
    };

    const response = await this.execute<CodeExecutionResponse>(config);
    return response.data;
  }

  private buildRequestData(request: CodeExecutionRequest): {
    source_code: string;
    language_id: number | string;
    stdin?: string;
    additional_files?: string | Buffer;
    compile_command?: string;
    execute_command?: string;
  } {
    return {
      source_code: request.getSourceCode(),
      language_id: request.getLanguageId(),
      stdin: request.getStdin(),
      additional_files: request.getAdditionalFiles(),
      compile_command: request.getCompileCommand(),
      execute_command: request.getExecuteCommand(),
    };
  }
}