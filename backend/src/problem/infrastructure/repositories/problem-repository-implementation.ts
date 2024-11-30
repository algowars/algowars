import { Inject } from '@nestjs/common';
import { EntityId, readConnection, writeConnection } from 'lib/database.module';
import { Problem, ProblemProperties } from 'src/problem/domain/problem';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemEntity } from '../entities/problem.entity';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { Language } from 'src/problem/domain/language';
import { LanguageEntity } from '../entities/language.entity';
import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';
import { SubmissionResult } from 'src/submission/domain/submission-result';

export class ProblemRepositoryImplementation implements ProblemRepository {
  @Inject() private readonly problemFactory: ProblemFactory;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Problem | Problem[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    await writeConnection.manager.getRepository(ProblemEntity).save(entities);
  }

  async findById(id: string): Promise<Problem | null> {
    const entity = await readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Problem): ProblemEntity {
    const properties = JSON.parse(JSON.stringify(model)) as ProblemProperties;
    const createdBy = model.getCreatedBy();
    return {
      ...properties,
      id: model.getId().toString(),
      createdBy: {
        id: createdBy.getId().toString(),
        sub: createdBy.getSub().toString(),
        username: createdBy.getUsername().toString(),
        createdAt: createdBy.getCreatedAt(),
        updatedAt: createdBy.getUpdatedAt(),
        deletedAt: createdBy.getDeletedAt(),
        version: createdBy.getVersion(),
      },
    };
  }

  private submissionsToEntity(
    submission: Submission[] | null,
  ): SubmissionEntity[] {
    if (!submission) {
      return null;
    }
  }

  private submissionToEntity(submission: Submission | null): SubmissionEntity {
    if (!submission) {
      return null;
    }

    return {
      id: submission.getId().toString(),
      sourceCode: submission.getSourceCode(),
      language: this.languageToEntity(submission.getLanguage()),
      results: submission.getSubmissionResults(),
      createdBy: submission.getCreatedBy(),
    };
  }

  private languageToEntity(language: Language | null): LanguageEntity | null {
    if (!language) {
      return null;
    }

    return {
      id: language.getId().toNumber(),
      name: language.getName(),
      isArchived: language.getIsArchived(),
      isAvailable: language.getIsAvailable(),
      createdAt: language.getCreatedAt(),
      updatedAt: language.getUpdatedAt(),
      deletedAt: language.getDeletedAt(),
      version: language.getVersion(),
    };
  }

  private resultsToEntity(
    results: SubmissionResult[] | null,
  ): SubmissionResultEntity[] {
    if (!results) {
      return [];
    }
  }

  private resultToEntity(
    result: SubmissionResult | null,
  ): SubmissionResultEntity | null {
    if (!result) {
      return null;
    }

    return {
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
    };
  }

  private entityToModel(entity: ProblemEntity): Problem {
    return this.problemFactory.createFromEntity(entity);
  }
}
