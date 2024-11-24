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

  create(): void {
    this.apply(new SubmissionCreatedEvent(this.getId().toString()));
  }
}
