import { AggregateRoot } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';
import { Id, IdImplementation } from 'src/common/domain/id';
import { SubmissionResult } from './submission-result';

export type SubmissionEssentialProperties = Readonly<
  Required<{
    id: string;
    createdBy: Account;
    languageId: number;
  }>
>;

export type SubmissionOptionalProperties = Readonly<
  Partial<{
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
}

export class SubmissionImplementation
  extends AggregateRoot
  implements Submission
{
  private readonly id: Id;
  private readonly submissionResults: SubmissionResult[];
  private readonly createdBy: Account;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;

  constructor(properties: SubmissionProperties) {
    super();
    Object.assign(this, properties);
    this.id = new IdImplementation(properties.id) as Id;
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }
}
