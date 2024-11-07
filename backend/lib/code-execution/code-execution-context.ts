import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';

export interface CodeExecutionContext {
  build(
    sourceCode: string,
    additionalFiles?: AdditionalTestFile,
    input?: string,
  ): Promise<any>;

  execute(codeExecutionRequest: {}): Promise<any>;
}
