import { AggregateRoot } from '@nestjs/cqrs';

export class SubmissionResultTestcase extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly token: string,
    private readonly order: number,
    private readonly isRandomTestcase: boolean,
    private sourceCode: string,
    private stdin: string,
    private stdout: string,
    private expectedOutput: string,
    private statusId: number,
    private stderr: string,
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getToken() {
    return this.token;
  }

  getOrder() {
    return this.order;
  }

  getIsRandomTestcase() {
    return this.isRandomTestcase;
  }

  getSourceCode() {
    return this.sourceCode;
  }

  setSourceCode(code: string): void {
    this.sourceCode = code;
  }

  getStdin() {
    return this.stdin;
  }

  setStdin(stdin: string): void {
    this.stdin = stdin;
  }

  getStdout() {
    return this.stdout;
  }

  setStdout(stdout: string): void {
    this.stdout = stdout;
  }

  getExpectedOutput() {
    return this.expectedOutput;
  }

  setExpectedOutput(expectedOutput: string): void {
    this.expectedOutput = expectedOutput;
  }

  getStatusId() {
    return this.statusId;
  }

  setStatusId(statusId: number) {
    this.statusId = statusId;
  }

  getStderr() {
    return this.stderr;
  }

  setStderr(stderr: string): void {
    this.stderr = stderr;
  }
}
