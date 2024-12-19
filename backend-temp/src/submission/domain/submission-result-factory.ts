import { Injectable } from '@nestjs/common';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import {
  SubmissionResult,
  SubmissionResultImplementation,
} from './submission-result';
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
  implements EntityDomainFactory<SubmissionResult>
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
}
