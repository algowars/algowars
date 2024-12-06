import { Inject } from '@nestjs/common';
import { EntityId, readConnection, writeConnection } from 'lib/database.module';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionEntity } from '../entities/submission.entity';
import { Account } from 'src/account/domain/account';
import { Language } from 'src/problem/domain/language';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { SubmissionResult } from 'src/submission/domain/submission-result';
import { SubmissionResultEntity } from '../entities/submission-result.entity';

export class SubmissionRepositoryImplementation
  implements SubmissionRepository
{
  @Inject() private readonly submissionFactory: SubmissionFactory;

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async findById(id: Id): Promise<Submission | null> {
    const entity = await readConnection
      .getRepository(SubmissionEntity)
      .findOne({
        where: { id: id.toString() },
        relations: ['results', 'language', 'createdBy'],
      });

    return entity ? this.entityToModel(entity) : null;
  }

  async save(data: Submission | Submission[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    await writeConnection.manager
      .getRepository(SubmissionEntity)
      .save(entities);
  }

  async updateSubmissionResult(
    submissionResult: SubmissionResult,
  ): Promise<void> {
    const entity = this.resultsToEntity([submissionResult]);

    await writeConnection.manager
      .getRepository(SubmissionResultEntity)
      .save(entity);
  }

  private modelToEntity(model: Submission): SubmissionEntity {
    return this.submissionFactory.createEntityFromDomain(model);
  }

  private resultsToEntity(
    results: SubmissionResult[],
  ): SubmissionResultEntity[] {
    return results.map((result) => {
      return new SubmissionResultEntity({
        token: result.getToken(),
        sourceCode: result.getSourceCode(),
        languageId: result.getLanguageId(),
        stdin: result.getStdin(),
        stdout: result.getStdout(),
        time: result.getTime(),
        memory: result.getMemory(),
        stderr: result.getStderr(),
        expectedOutput: result.getExpectedOutput(),
        message: result.getMessage(),
        status: result.getStatus(),
      });
    });
  }

  private entityToModel(entity: SubmissionEntity): Submission {
    return this.submissionFactory.createFromEntity(entity);
  }
}
