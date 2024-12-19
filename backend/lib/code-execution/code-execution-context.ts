import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { CodeExecutionEngines } from './code-execution-engines';

export interface CodeExecutionContext {
  build(
    sourceCode: string,
    additionalFiles?: AdditionalTestFile,
    input?: string,
  ): Promise<any>;

  getEngine(): CodeExecutionEngines;

  execute(codeExecutionRequest: {}): Promise<any>;
}
