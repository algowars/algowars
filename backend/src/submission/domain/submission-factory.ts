import { Inject, Injectable } from '@nestjs/common';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { Account } from 'src/account/domain/account';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { Language } from 'src/problem/domain/language';
import { Submission, SubmissionImplementation } from './submission';
import { EventPublisher } from '@nestjs/cqrs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { SubmissionResult } from './submission-result';
import { SubmissionStatus } from './submission-status';

export interface CreateSubmissionOptions {
  id: string | Id;
  sourceCode: string;
  codeExecutionEngine: CodeExecutionEngines;
  createdBy: Account;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
  results: SubmissionResult[];
  status: SubmissionStatus;
}

@Injectable()
export class SubmissionFactory implements EntityDomainFactory<Submission> {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateSubmissionOptions): Submission {
    const id = this.createId(options.id);

    return this.eventPublisher.mergeObjectContext(
      new SubmissionImplementation({
        ...options,
        id,
      }),
    );
  }

  private createId(id: string | Id): Id {
    if (typeof id === 'string') {
      return new IdImplementation(id);
    }

    return id;
  }
}
