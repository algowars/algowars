import { Account } from 'src/account/domain/account';
import { Id, IdImplementation } from 'src/common/domain/id';
import { ProblemStatus } from './problem-status';
import { Inject, Injectable } from '@nestjs/common';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { Problem, ProblemImplementation } from './problem';
import { EventPublisher } from '@nestjs/cqrs';

export interface CreateProblemOptions {
  id: string | Id;
  title: string;
  slug: string;
  question: string;
  createdBy: Account;
  status: ProblemStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
}

@Injectable()
export class ProblemFactory implements EntityDomainFactory<Problem> {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateProblemOptions): Problem {
    const id =
      typeof options.id === 'string'
        ? new IdImplementation(options.id)
        : options.id;

    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation({
        ...options,
        id,
      }),
    );
  }
}
