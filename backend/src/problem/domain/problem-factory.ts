import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Problem, ProblemImplementation, ProblemProperties } from './problem';
import { ProblemEntity } from '../infrastructure/entities/problem.entity';
import { IdImplementation } from 'src/common/domain/id';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { UserSubImplementation } from 'src/account/domain/user-sub';
import { UsernameImplementation } from 'src/account/domain/username';

type CreateProblemOptions = Readonly<{
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy: Account;
}>;

export class ProblemFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateProblemOptions): Problem {
    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation({
        ...options,
        id: new IdImplementation(options.id),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  createFromEntity(problemEntity: ProblemEntity): Problem {
    let createdBy = null;

    if (problemEntity?.createdBy) {
      createdBy = this.mapAccountEntityToDomain(problemEntity.createdBy);
    }
    return this.create({
      ...problemEntity,
      createdBy,
    });
  }

  reconstituteFromEntity(problemEntity: ProblemEntity): Problem {
    let createdBy = null;

    if (problemEntity?.createdBy) {
      createdBy = this.mapAccountEntityToDomain(problemEntity.createdBy);
    }

    return this.reconstitute({
      ...problemEntity,
      id: new IdImplementation(problemEntity.id),
      createdBy,
    });
  }

  private mapAccountEntityToDomain(account: AccountEntity): Account {
    return new AccountImplementation({
      id: new IdImplementation(account.id),
      sub: new UserSubImplementation(account.sub),
      username: new UsernameImplementation(account.username),
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      deletedAt: account.deletedAt,
      version: account.version,
    });
  }

  reconstitute(properties: ProblemProperties): Problem {
    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation(properties),
    );
  }
}
