import {
  CodeExecutionRequest,
  CodeExecutionResponse,
  CodeExecutionService,
} from './code-execution-service';

export abstract class CodeExecutionContext {
  constructor(protected readonly codeExecutionService: CodeExecutionService) {}

  abstract build(
    sourceCode: string,
    input?: string,
  ): Promise<CodeExecutionRequest>;

  async execute(
    codeExecutionRequest: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse> {
    return this.codeExecutionService.run(codeExecutionRequest);
  }
}
