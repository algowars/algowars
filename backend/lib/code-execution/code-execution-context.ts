import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { CodeExecutionEngines } from './code-execution-engines';
import {
  CodeExecutionRequest,
  CodeExecutionResponse,
} from './code-execution-service';

export interface CodeExecutionContext {
  build(context: {
    sourceCode?: string;
    additionalFiles?: AdditionalTestFile;
    languageId: number;
    input?: string;
    expectedOutput?: string;
  }): Promise<CodeExecutionRequest>;

  batchBuild(
    contexts: {
      sourceCode?: string;
      additionalFiles?: AdditionalTestFile;
      languageId: number;
      input?: string;
      expectedOutput?: string;
    }[],
  ): Promise<CodeExecutionRequest[]>;

  getEngine(): CodeExecutionEngines;

  execute(
    codeExecutionRequest: CodeExecutionRequest,
  ): Promise<CodeExecutionResponse>;

  batchExecute(
    codeExecutionRequests: CodeExecutionRequest[],
  ): Promise<CodeExecutionResponse[]>;
}
