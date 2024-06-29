import { AggregateRoot } from '@nestjs/cqrs';
import { SubmissionResultTestcase } from './submission-result-testcase.entity';

export class SubmissionResult extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly languageId: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly testcases: SubmissionResultTestcase,
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getLanguageId() {
    return this.languageId;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getTestcases() {
    return this.testcases;
  }
}
