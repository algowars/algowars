import { Injectable } from '@nestjs/common';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import {
  SubmissionResult,
  SubmissionResultImplementation,
} from './submission-result';
import { SubmissionResultEntity } from '../infrastructure/entities/submission-result.entity';
import { SubmissionStatus } from './submission-status';
import { IdImplementation } from 'src/common/domain/id';

type CreateSubmissionResultOptions = Readonly<{
  token: string;
  sourceCode?: string;
  languageId?: number;
  stdin?: string;
  stdout?: string;
  time?: string;
  memory?: number;
  stderr?: string | null;
  expectedOutput?: string;
  message?: string;
  status?: SubmissionStatus;
}>;

@Injectable()
export class SubmissionResultFactory
  implements EntityDomainFactory<SubmissionResult, SubmissionResultEntity>
{
  create(options: CreateSubmissionResultOptions): SubmissionResult {
    return new SubmissionResultImplementation({
      id: new IdImplementation(1),
      ...options,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
    });
  }

  createFromEntity(entity: SubmissionResultEntity): SubmissionResult {
    if (!entity) {
      return null;
    }

    return this.create(entity);
  }

  createEntityFromDomain(domain: SubmissionResult): SubmissionResultEntity {
    if (!domain) {
      return null;
    }

    return {
      token: domain.getToken(),
      sourceCode: domain.getSourceCode(),
      languageId: domain.getLanguageId(),
      stdin: domain.getStdin(),
      stdout: domain.getStdout(),
      time: domain.getTime(),
      memory: domain.getMemory(),
      stderr: domain.getStderr(),
      expectedOutput: domain.getExpectedOutput(),
      message: domain.getMessage(),
      status: domain.getStatus(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
    };
  }
}
