import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
  CodeExecutionResponseImplementation,
  CodeExecutionService,
} from '../code-execution-service';
import { unescape } from 'querystring';

export interface Judge0ExecutionConfig {
  apiKey: string;
  url: string;
  host: string;
  headers: Record<string, string>;
}

@Injectable()
export class Judge0CodeExecutionService implements CodeExecutionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly judge0Config: Judge0ExecutionConfig,
  ) {}

  private execute<T>(
    requestConfig: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.httpService.axiosRef<T>(requestConfig);
  }

  public async batchRun(
    requests: CodeExecutionRequest[],
  ): Promise<CodeExecutionResponse[]> {
    const config: AxiosRequestConfig = {
      url: `${this.judge0Config.url}/submissions/batch?base64_encoded=true&wait=false`,
      method: 'POST',
      headers: this.judge0Config.headers,
      data: {
        submissions: requests.map((request) => this.buildRequestData(request)),
      },
    };

    const response = await this.execute<CodeExecutionResponse[]>(config);
    return response.data;
  }

  public async run(
    request: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse> {
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

  async getBatchSubmissions(
    tokens: string[],
  ): Promise<CodeExecutionResponse[]> {
    const config: AxiosRequestConfig = {
      url: `${this.judge0Config.url}/submissions/batch`,
      params: {
        tokens: tokens.join(','),
        base64_encoded: 'true',
        fields: '*',
      },
      headers: this.judge0Config.headers,
    };

    const { data } = await this.execute<{
      submissions: {
        token: string;
        stdout?: string;
        stderr?: string;
        compileOut?: string;
        status: {
          id: number;
          description: string;
        };
        time?: string;
        memory?: number;
      }[];
    }>(config);

    return data.submissions.map((sub) => {
      return new CodeExecutionResponseImplementation({
        token: sub.token,
        stdout: sub.stdout ? this.decode(sub.stdout) : '',
        stderr: sub.stderr ? this.decode(sub.stderr) : '',
        compileOut: sub.compileOut,
        status: sub.status,
        time: sub.time,
        memory: sub.memory,
      });
    });
  }

  async getSubmission(token: string): Promise<CodeExecutionResponse> {
    const config: AxiosRequestConfig = {
      url: `${this.judge0Config.url}/submissions/${encodeURIComponent(token)}`,
      params: {
        base64_encoded: 'true',
        fields: '*',
      },
      headers: this.judge0Config.headers,
    };

    const { data } = await this.execute<{
      token: string;
      stdout?: string;
      stderr?: string;
      compileOut?: string;
      status: {
        id: number;
        description: string;
      };
      time?: string;
      memory?: number;
    }>(config);
    return new CodeExecutionResponseImplementation({
      token: data.token,
      stdout: this.decode(data.stdout),
      stderr: this.decode(data.stderr),
      compileOut: data.compileOut,
      status: data.status,
      time: data.time,
      memory: data.memory,
    });
  }

  private encode(string: string): string {
    return btoa(unescape(encodeURIComponent(string)));
  }

  private decode(bytes: string): string {
    const escaped = escape(atob(bytes));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  }
}
