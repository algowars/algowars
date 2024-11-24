import { Status } from './status';

export type SubmissionResultProperties = Readonly<{ token: string }>;

export interface SubmissionResult {
  getToken(): string;
  getSourceCode(): string;
  getLanguageId(): number;
  getStdin(): string;
  getStdout(): string;
  setStdout(output: string): void;
  getTime(): string;
  getMemory(): number;
  getStderr(): string | null;
  getExpectedOutput(): string;
  getMessage(): string;
  getStatus(): Status;
  setStatus(newStatus: Status): void;
}

export class SubmissionResultImplementation implements SubmissionResult {
  private readonly token: string;
  private readonly sourceCode: string;
  private readonly language_id: number;
  private readonly stdin?: string;
  private stdout?: string;
  private readonly time: string;
  private readonly memory: number;
  private readonly stderr?: string | null;
  private readonly expectedOutput: string;
  private readonly message: string;
  private status: Status;

  constructor(properties: SubmissionResultProperties) {
    Object.assign(this, properties);
  }

  getToken(): string {
    return this.token;
  }

  getSourceCode(): string {
    return this.sourceCode;
  }

  getExpectedOutput(): string {
    return this.expectedOutput;
  }

  getLanguageId(): number {
    return this.language_id;
  }

  getMemory(): number {
    return this.memory;
  }

  getMessage(): string {
    return this.message;
  }

  getStatus(): Status {
    return this.status;
  }

  setStatus(newStatus: Status): void {
    this.status = newStatus;
  }

  getStderr(): string | null {
    return this.stderr;
  }

  getStdin(): string {
    return this.stdin;
  }

  getStdout(): string {
    return this.stdout;
  }

  setStdout(output: string): void {
    this.stdout = output;
  }

  getTime(): string {
    return this.time;
  }
}
