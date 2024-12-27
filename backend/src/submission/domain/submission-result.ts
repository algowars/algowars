import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { SubmissionStatus } from './submission-status';

export interface SubmissionResultProperties extends BaseDomainProperties {
  token: string;
  sourceCode?: string;
  languageId?: number;
  stdin?: string;
  stdout?: string;
  time?: string;
  memory?: number;
  stderr?: string;
  expectedOutput?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  version?: number;
  status: SubmissionStatus;
}

export interface SubmissionResult extends BaseDomain {
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
  getStatus(): SubmissionStatus;
  setStatus(newStatus: SubmissionStatus): void;
}

export class SubmissionResultImplementation
  extends BaseDomainImplementation
  implements SubmissionResult
{
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
  private status: SubmissionStatus;

  constructor(properties: SubmissionResultProperties) {
    super(properties);
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

  getStatus(): SubmissionStatus {
    return this.status;
  }

  setStatus(newStatus: SubmissionStatus): void {
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
