import { Injectable } from '@nestjs/common';
import {
  CodeExecutionService,
  CodeExecutionResponse,
  CodeExecutionResponseImplementation,
  CodeExecutionRequest,
} from '../code-execution-service';
import { EntityId } from 'lib/database.module';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@Injectable()
export class Judge0CodeExecutionServiceMock implements CodeExecutionService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBatchSubmissions(tokens: string[]): Promise<CodeExecutionResponse[]> {
    throw new Error('Method not implemented.');
  }

  private mockResponses: Record<string, CodeExecutionResponse> = {
    success: new CodeExecutionResponseImplementation({
      token: new EntityId().toString(),
      stdout: 'Hello, World!',
      stderr: undefined,
      compileOut: undefined,
      status: {
        id: 3,
        description: SubmissionStatus.ACCEPTED,
      },
      time: '0.01s',
      memory: 21048,
    }),
    compileError: new CodeExecutionResponseImplementation({
      token: new EntityId().toString(),
      stdout: undefined,
      stderr: undefined,
      compileOut: 'Syntax Error: Unexpected token',
      status: {
        id: 6,
        description: SubmissionStatus.COMPILATION_ERROR,
      },
      time: undefined,
      memory: undefined,
    }),
    runtimeError: new CodeExecutionResponseImplementation({
      token: new EntityId().toString(),
      stdout: undefined,
      stderr: 'Segmentation fault',
      compileOut: undefined,
      status: {
        id: 11,
        description: SubmissionStatus.RUNTIME_ERROR,
      },
      time: '0.02s',
      memory: 21048,
    }),
  };

  async run(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    const sourceCode = request.getSourceCode();

    // Mock different responses based on source code for demonstration purposes
    if (sourceCode.includes('compile_error')) {
      return this.mockResponses.compileError;
    } else if (sourceCode.includes('runtime_error')) {
      return this.mockResponses.runtimeError;
    }
    return this.mockResponses.success;
  }

  async getSubmission(token: string): Promise<CodeExecutionResponse> {
    return Object.entries(this.mockResponses).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value.getToken() === token,
    )[1];
  }
}
