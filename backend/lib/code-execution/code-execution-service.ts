import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CodeExecutionRequest {
  source_code: string; // The source code to be executed
  language_id: number; // ID representing the programming language
  stdin?: string; // Optional input to be provided during execution
  additional_files?: string; // Base64-encoded zipped file containing additional files (e.g., node_modules)
  compile_command?: string; // Optional compilation command (if needed)
  execute_command?: string; // Optional execution command (if needed)
}

export interface CodeExecutionResponse {
  token: string; // Token representing the execution submission
  stdout?: string; // Standard output from the code execution
  stderr?: string; // Error output (if any) from the code execution
  compile_output?: string; // Output from the compilation step (if applicable)
  status: {
    id: number; // Status ID (e.g., 0 for success, non-zero for errors)
    description: string; // Human-readable status description (e.g., "Accepted", "Runtime Error")
  };
  time?: string; // Execution time (if provided by the service)
  memory?: string; // Memory usage (if provided by the service)
}

export abstract class CodeExecutionService {
  constructor(protected readonly httpService: HttpService) {}

  abstract run(request: CodeExecutionRequest): Promise<CodeExecutionResponse>;

  abstract runBatch(
    request: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse[]>;

  protected execute<T>(
    requestConfig: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.httpService.axiosRef<T>(requestConfig);
  }
}
