import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Problem, ProblemImplementation, ProblemProperties } from './problem';
import { ProblemEntity } from '../infrastructure/entities/problem.entity';
import { IdImplementation } from 'src/common/domain/id';
import { Account } from 'src/account/domain/account';
import {
  CreateProblemSetupOptions,
  ProblemSetupFactory,
} from './problem-setup-factory';
import {
  AccountFactory,
  CreateAccountOptions,
} from 'src/account/domain/account-factory';
import { ProblemStatus } from './problem-status';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';

export type CreateProblemOptions = Readonly<{
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy: CreateAccountOptions | Account;
  setups?: CreateProblemSetupOptions[];
  status: ProblemStatus;
}>;

@Injectable()
export class ProblemFactory
  implements EntityDomainFactory<Problem, ProblemEntity>
{
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject()
  private readonly problemSetupFactory: ProblemSetupFactory;
  @Inject()
  private readonly accountFactory: AccountFactory;

  create(options: CreateProblemOptions): Problem {
    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation({
        ...options,
        id: new IdImplementation(options.id),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: this.createAccount(options.createdBy),
        deletedAt: null,
        version: 0,
        setups: Array.isArray(options.setups)
          ? options.setups.map((setup) =>
              this.problemSetupFactory.create(setup),
            )
          : null,
      }),
    );
  }

  createFromEntity(problemEntity: ProblemEntity): Problem {
    if (!problemEntity) {
      return null;
    }

    let setups = [];
    if (Array.isArray(problemEntity.setups)) {
      setups = problemEntity.setups.map((setup) =>
        this.problemSetupFactory.createFromEntity(setup),
      );
    }

    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation({
        ...problemEntity,
        id: new IdImplementation(problemEntity.id),
        createdBy: this.accountFactory.createFromEntity(
          problemEntity.createdBy,
        ),
        setups,
      }),
    );
  }

  createEntityFromDomain(domain: Problem): ProblemEntity {
    if (!domain) {
      return null;
    }

    return {
      id: domain.getId().toString(),
      title: domain.getTitle(),
      question: domain.getQuestion(),
      slug: domain.getSlug(),
      createdBy: this.accountFactory.createEntityFromDomain(
        domain.getCreatedBy(),
      ),
      status: domain.getStatus(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
      setups:
        domain
          .getSetups()
          ?.map((setup) =>
            this.problemSetupFactory.createEntityFromDomain(setup),
          ) ?? [],
    };
  }

  async reconstituteFromEntity(problemEntity: ProblemEntity): Promise<Problem> {
    if (!problemEntity) {
      return null;
    }

    let setups = [];
    if (Array.isArray(problemEntity.setups)) {
      setups = problemEntity.setups.map((setup) =>
        this.problemSetupFactory.createFromEntity(setup),
      );
    }

    return this.reconstitute({
      ...problemEntity,
      id: new IdImplementation(problemEntity.id),
      createdBy: this.accountFactory.createFromEntity(problemEntity.createdBy),
      setups,
    });
  }

  reconstitute(properties: ProblemProperties): Problem {
    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation(properties),
    );
  }

  private createAccount(createdBy: CreateAccountOptions | Account): Account {
    // Check if `createdBy` has `getSub` and `getUsername` methods, assuming these are unique to `Account`
    if ('getSub' in createdBy && 'getUsername' in createdBy) {
      return createdBy as Account;
    }
    // Otherwise, use the factory to create an Account instance from `CreateAccountOptions`
    return this.accountFactory.create(createdBy as CreateAccountOptions);
  }
}
