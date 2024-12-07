import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';
import { SubmissionResult } from './submission-result';
import { Language } from 'src/problem/domain/language';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { SubmissionCreatedEvent } from './events/submission-created-event';
import { CodeExecutionEngine } from 'lib/code-execution/code-execution-engines';
import { Problem } from 'src/problem/domain/problem';
import { SubmissionStatus } from './submission-status';

export type SubmissionEssentialProperties = Readonly<
  Required<{
    createdBy: Account;
    language: Language;
    sourceCode: string;
    codeExecutionContext: CodeExecutionEngine;
  }>
>;

export type SubmissionOptionalProperties = Readonly<
  Partial<{
    id: Id;
    submissionResults: SubmissionResult[];
    problem: Problem;
  }>
>;

export type SubmissionProperties = SubmissionEssentialProperties &
  SubmissionOptionalProperties &
  BaseDomainProperties;

export interface Submission extends BaseDomainAggregateRoot {
  getCreatedBy(): Account;
  getSourceCode(): string;
  getSubmissionResults(): SubmissionResult[];
  setSubmissionResults(results: SubmissionResult[]): void;
  getLanguage(): Language;
  getCodeExecutionContext(): CodeExecutionEngine;
  getProblem(): Problem;
  getAggregateStatus(): SubmissionStatus;
  create(): void;
}

export class SubmissionImplementation
  extends BaseDomainAggregateRootImplementation
  implements Submission
{
  private readonly sourceCode: string;
  private submissionResults: SubmissionResult[];
  private readonly createdBy: Account;
  private readonly language: Language;
  private readonly codeExecutionContext: CodeExecutionEngine;
  private readonly problem: Problem;

  constructor(properties: SubmissionProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getCreatedBy() {
    return this.createdBy;
  }

  getCodeExecutionContext(): CodeExecutionEngine {
    return this.codeExecutionContext;
  }

  getSourceCode() {
    return this.sourceCode;
  }

  getSubmissionResults() {
    return this.submissionResults;
  }

  setSubmissionResults(results: SubmissionResult[]): void {
    this.submissionResults = results;
  }

  getLanguage() {
    return this.language;
  }

  getProblem(): Problem {
    return this.problem;
  }

  getAggregateStatus(): SubmissionStatus {
    if (!this.submissionResults || this.submissionResults.length === 0) {
      throw new Error('No submission results available to aggregate status.');
    }

    // Priority order of statuses
    const statusPriority = [
      SubmissionStatus.INTERNAL_ERROR,
      SubmissionStatus.EXEC_FORMAT_ERROR,
      SubmissionStatus.RUNTIME_ERROR,
      SubmissionStatus.COMPILATION_ERROR,
      SubmissionStatus.TIME_LIMIT_EXCEEDED,
      SubmissionStatus.WRONG_ANSWER,
      SubmissionStatus.PROCESSING,
      SubmissionStatus.IN_QUEUE,
      SubmissionStatus.POLLING_ERROR,
      SubmissionStatus.POLLING,
      SubmissionStatus.ACCEPTED,
    ];

    // Find the most critical status by priority
    let finalStatus: SubmissionStatus = SubmissionStatus.ACCEPTED;

    for (const result of this.submissionResults) {
      const resultStatus = result.getStatus();
      const resultPriority = statusPriority.indexOf(resultStatus);
      const finalPriority = statusPriority.indexOf(finalStatus);

      if (resultPriority < finalPriority) {
        finalStatus = resultStatus;
      }
    }

    return finalStatus;
  }

  create(): void {
    this.apply(new SubmissionCreatedEvent(this.getId().toString()));
  }
}
