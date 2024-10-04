import { Inject } from '@nestjs/common';
import { EntityId, readConnection, writeConnection } from 'lib/database.module';
import { Id, IdImplementation } from 'src/common/domain/id';
import {
  Submission,
  SubmissionProperties,
} from 'src/submission/domain/submission';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionEntity } from '../entities/submission.entity';
import { Account } from 'src/account/domain/account';
import { LanguageFactory } from 'src/problem/domain/language-factory';
import { Language, LanguageProperties } from 'src/problem/domain/language';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';

export class SubmissionRepositoryImplementation
  implements SubmissionRepository
{
  @Inject() private readonly submissionFactory: SubmissionFactory;
  @Inject() private readonly languageFactory: LanguageFactory;

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async findById(id: Id): Promise<Submission | null> {
    const entity = await readConnection
      .getRepository(SubmissionEntity)
      .findOneBy({ id: id.toString() });

    return entity ? this.entityToModel(entity) : null;
  }

  async save(data: Submission | Submission[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager
      .getRepository(SubmissionEntity)
      .save(entities);
  }

  private modelToEntity(model: Submission): SubmissionEntity {
    return {
      id: model.getId().toString(),
      sourceCode: model.getSourceCode(),
      createdBy: this.accountToEntity(model.getCreatedBy()),
      createdAt: model.getCreatedAt(),
      updatedAt: model.getUpdatedAt(),
      deletedAt: model.getDeletedAt(),
      version: model.getVersion(),
      language: this.languageToEntity(model.getLanguage()),
    };
  }

  private languageToEntity(language: Language): LanguageEntity {
    const properties: LanguageProperties = {
      id: language.getId().toNumber(),
      name: language.getName(),
      createdAt: language.getCreatedAt(),
      updatedAt: language.getUpdatedAt(),
      deletedAt: language.getDeletedAt(),
      version: language.getVersion(),
      isArchived: language.getIsArchived(),
    };

    return properties;
  }

  private accountToEntity(account: Account): AccountEntity {
    return {
      id: account.getId().toString(),
      sub: account.getSub().toString(),
      username: account.getUsername().toString(),
      createdAt: account.getCreatedAt(),
      updatedAt: account.getUpdatedAt(),
      deletedAt: account.getDeletedAt(),
      version: account.getVersion(),
    };
  }

  private entityToModel(entity: SubmissionEntity): Submission {
    return this.submissionFactory.createFromEntity(entity);
  }
}
