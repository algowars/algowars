export interface CodeExecutionContext {
  build(sourceCode: string, input?: string): Promise<any>;

  execute(codeExecutionRequest: {}): Promise<any>;
}
