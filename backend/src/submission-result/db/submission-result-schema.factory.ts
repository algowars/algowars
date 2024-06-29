import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { SubmissionResultSchema } from './submission-result.schema';
import { SubmissionResult } from '../entities/submission-result.entity';

@Injectable()
export class SubmissionResultSchemaFactory
  implements EntitySchemaFactory<SubmissionResultSchema, SubmissionResult>
{
  create(submissionResult: SubmissionResult): SubmissionResultSchema {
    return {
      id: submissionResult.getId(),
      langaugeId: submissionResult.getLanguageId(),
      createdAt: submissionResult.getCreatedAt(),
      updatedAt: submissionResult.getUpdatedAt(),
      testcases: submissionResult.getTestcases(),
    };
  }
}
