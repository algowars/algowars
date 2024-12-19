import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { CodeExecutionEngine } from './code-execution-engines';

export interface CodeExecutionContext {
  build(
    sourceCode: string,
    additionalFiles?: AdditionalTestFile,
    input?: string,
  ): Promise<any>;

  getEngine(): CodeExecutionEngine;

  execute(codeExecutionRequest: {}): Promise<any>;
}
