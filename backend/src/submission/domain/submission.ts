import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';
import { SubmissionResult } from './submission-result';
import { Language } from 'src/problem/domain/language';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Problem } from 'src/problem/domain/problem';

export type SubmissionEssentialProperties = Readonly<
  Required<{
    createdBy: Account;
    language: Language;
    sourceCode: string;
    problem: Problem;
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
  getLanguage(): Language;
  getProblem(): Problem;
}

export class SubmissionImplementation
  extends BaseDomainAggregateRootImplementation
  implements Submission
{
  private readonly sourceCode: string;
  private readonly submissionResults: SubmissionResult[];
  private readonly createdBy: Account;
  private readonly language: Language;
  private readonly problem: Problem;

  constructor(properties: SubmissionProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getCreatedBy() {
    return this.createdBy;
  }

  getSourceCode() {
    return this.sourceCode;
  }

  getSubmissionResults() {
    return this.submissionResults;
  }

  getProblem(): Problem {
    return this.problem;
  }

  getLanguage() {
    return this.language;
  }
}
