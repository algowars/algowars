import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Submission, SubmissionImplementation } from './submission';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { SubmissionEntity } from '../infrastructure/entities/submission.entity';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { Language, LanguageImplementation } from 'src/problem/domain/language';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { UserSubImplementation } from 'src/account/domain/user-sub';
import { UsernameImplementation } from 'src/account/domain/username';

type CreateSubmissionOptions = Readonly<{
  id: Id;
  language: Language;
  createdBy: Account;
  sourceCode: string;
}>;

export class SubmissionFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateSubmissionOptions): Submission {
    return this.eventPublisher.mergeObjectContext(
      new SubmissionImplementation({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  createFromEntity(submissionEntity: SubmissionEntity): Submission {
    const id = new IdImplementation(submissionEntity.id);

    return this.create({
      id,
      createdBy: this.mapAccountEntityToDomain(submissionEntity.createdBy),
      language: this.mapLanguageEntityToDomain(submissionEntity.language),
      sourceCode: submissionEntity.sourceCode,
    });
  }

  private mapLanguageEntityToDomain(language: LanguageEntity): Language {
    return new LanguageImplementation({
      id: new IdImplementation(language.id),
      name: language.name,
      version: language.version,
      createdAt: language.createdAt,
      updatedAt: language.updatedAt,
      deletedAt: language.deletedAt,
    });
  }

  private mapAccountEntityToDomain(accountEntity: AccountEntity): Account {
    return new AccountImplementation({
      id: new IdImplementation(accountEntity.id),
      sub: new UserSubImplementation(accountEntity.sub),
      username: new UsernameImplementation(accountEntity.username),
      createdAt: accountEntity.createdAt,
      updatedAt: accountEntity.updatedAt,
      deletedAt: accountEntity.deletedAt,
      version: accountEntity.version,
    });
  }
}
