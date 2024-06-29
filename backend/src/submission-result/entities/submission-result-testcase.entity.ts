import { AggregateRoot } from '@nestjs/cqrs';

export class SubmissionResultTestcase extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly token: string,
    private readonly order: number,
    private readonly isRandomTestcase: boolean,
    private readonly sourceCode: string,
    private readonly stdin: string,
    private readonly stdout: string,
    private readonly expectedOutput: string,
    private readonly statusId: number,
    private readonly stderr: string,
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

  getStdin() {
    return this.stdin;
  }

  getStdout() {
    return this.stdout;
  }

  getExpectedOutput() {
    return this.expectedOutput;
  }

  getStatusId() {
    return this.statusId;
  }

  getStderr() {
    return this.stderr;
  }
}
