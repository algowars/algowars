import { AggregateRoot } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';
import { SubmissionResult } from './submission-result';
import { Language } from 'src/problem/domain/language';

export type SubmissionEssentialProperties = Readonly<
  Required<{
    createdBy: Account;
    language: Language;
    sourceCode: string;
  }>
>;

export type SubmissionOptionalProperties = Readonly<
  Partial<{
    id: Id;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }>
>;

export type SubmissionProperties = SubmissionEssentialProperties &
  Required<SubmissionOptionalProperties>;

export interface Submission {
  compareId: (id: Id) => boolean;
  commit: () => void;
  getId: () => Id;
  getCreatedBy: () => Account;
}

export class SubmissionImplementation
  extends AggregateRoot
  implements Submission
{
  private readonly id: Id;
  private readonly sourceCode: string;
  private readonly submissionResults: SubmissionResult[];
  private readonly createdBy: Account;
  private readonly language: Language;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;

  constructor(properties: SubmissionProperties) {
    super();
    Object.assign(this, properties);
    this.id = properties.id;
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }

  getCreatedBy(): Account {
    return this.createdBy;
  }

  getId() {
    return this.id;
  }
}
