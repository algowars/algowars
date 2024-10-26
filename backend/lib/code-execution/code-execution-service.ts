export interface CodeExecutionRequest {
  getSourceCode(): string;
  getLanguageId(): number | string;
  getStdin(): string | undefined;
  getAdditionalFiles(): string | Buffer | undefined;
  getCompileCommand(): string | undefined;
  getExecuteCommand(): string | undefined;
}

export class CodeExecutionRequestImplementation
  implements CodeExecutionRequest
{
  private readonly sourceCode: string;
  private readonly languageId: number | string;
  private readonly stdin?: string;
  private readonly additionalFiles?: string | Buffer;
  private readonly compileCommand?: string;
  private readonly executeCommand?: string;

  constructor(properties: {
    source_code: string;
    language_id: number;
    stdin: string;
    additional_files: string;
  }) {
    Object.assign(this, properties);
  }

  getAdditionalFiles(): string | Buffer | undefined {
    return this.additionalFiles;
  }

  getCompileCommand(): string | undefined {
    return this.compileCommand;
  }

  getExecuteCommand(): string | undefined {
    return this.executeCommand;
  }

  getLanguageId(): number | string {
    return this.languageId;
  }

  getSourceCode(): string {
    return this.sourceCode;
  }

  getStdin(): string | undefined {
    return this.stdin;
  }
}

export interface CodeExecutionResponse {
  getToken(): string;
  getStdout(): string | undefined;
  getStderr(): string | undefined;
  getCompileOut(): string | undefined;
  getStatus(): any;
  getTime(): string | undefined;
  getMemory(): string | undefined;
}

export class CodeExecutionResponseImplementation
  implements CodeExecutionResponse
{
  private readonly token: string;
  private readonly stdout?: string;
  private readonly stderr?: string;
  private readonly compileOut?: string;
  private readonly status?: any;
  private readonly time?: string;
  private readonly memory?: string;

  constructor(properties: {
    token: string;
    stdout?: string;
    stderr?: string;
    compileOut?: string;
    status?: any;
    time?: string;
    memory?: string;
  }) {
    Object.assign(this, properties);
  }

  getToken(): string {
    return this.token;
  }

  getStdout(): string | undefined {
    return this.stdout;
  }

  getCompileOut(): string | undefined {
    return this.compileOut;
  }

  getMemory(): string | undefined {
    return this.memory;
  }

  getStatus() {
    return this.status;
  }

  getStderr(): string | undefined {
    return this.stderr;
  }

  getTime(): string | undefined {
    return this.time;
  }
}
