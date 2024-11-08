import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Problem, ProblemImplementation, ProblemProperties } from './problem';
import { ProblemEntity } from '../infrastructure/entities/problem.entity';
import { IdImplementation } from 'src/common/domain/id';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { UserSubImplementation } from 'src/account/domain/user-sub';
import { UsernameImplementation } from 'src/account/domain/username';
import { Language } from './language';
import { AdditionalTestFile } from './additional-test-file';
import { LanguageFactory } from './language-factory';
import { AdditionalTestFileFactory } from './additional-test-file-factory';
import {
  CreateProblemSetupOptions,
  ProblemSetupFactory,
} from './problem-setup-factory';

type CreateProblemOptions = Readonly<{
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy: Account;
  setups?: CreateProblemSetupOptions;
}>;

export class ProblemFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject()
  private readonly languageFactory: LanguageFactory;
  @Inject()
  private readonly problemSetupFactory: ProblemSetupFactory;
  @Inject()
  private readonly additionalTestFileFactory: AdditionalTestFileFactory;

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

  async createFromEntity(
    problemEntity: ProblemEntity,
    relations: string[] = [],
  ): Promise<Problem> {
    let setups = null;
    if (relations.includes('setups')) {
      setups = (await problemEntity.setups).map((setup) =>
        this.problemSetupFactory.createFromEntity(setup),
      );
    }
    return this.create({
      ...problemEntity,
      createdBy: this.mapAccountEntityToDomain(problemEntity.createdBy),
      setups,
    });
  }

  reconstituteFromEntity(problemEntity: ProblemEntity): Problem {
    return this.reconstitute({
      ...problemEntity,
      id: new IdImplementation(problemEntity.id),
      createdBy: this.mapAccountEntityToDomain(problemEntity.createdBy),
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
