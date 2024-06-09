import { AggregateRoot } from '@nestjs/cqrs';

export class ProblemSetup extends AggregateRoot {
  constructor(
    private readonly problemId: string,
    private readonly languageId: number,
    private readonly initialCode: string,
    private readonly testSetup: string,
  ) {
    super();
  }

  getProblemId() {
    return this.problemId;
  }

  getLanguageId() {
    return this.languageId;
  }

  getInitialCode() {
    return this.initialCode;
  }

  getTestSetup() {
    return this.testSetup;
  }
}
