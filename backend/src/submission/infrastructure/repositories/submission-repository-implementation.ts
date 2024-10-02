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
import { AccountFactory } from 'src/account/domain/account-factory';
import { LanguageFactory } from 'src/problem/domain/language-factory';

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
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as SubmissionProperties;

    return {
      ...properties,
      id: properties.id.toString(),
      language: this.languageFactory.reconstituteFromEntity(
        properties.language,
      ),
    };
  }

  private entityToModel(entity: SubmissionEntity): Submission {
    return this.submissionFactory.createFromEntity(entity);
  }
}
