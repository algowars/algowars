import { Language } from 'src/problem/domain/language';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
  CodeExecutionService,
} from './code-execution-service';
import {} from './judge0-code-execution-service';

export abstract class CodeExecutionContext {
  constructor(protected readonly codeExecutionService: CodeExecutionService) {}

  abstract build(sourceCode: string, input?: string): CodeExecutionRequest;

  async execute(
    codeExecutionRequest: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse> {
    return this.codeExecutionService.run(codeExecutionRequest);
  }
}
