import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { v4 as uuidv4 } from 'uuid';
import { SubmissionResult } from '../entities/submission-result.entity';
import { CreateSubmissionResult } from '../dto/create-submission-result.dto';

@Injectable()
export class SubmissionResultFactory
  implements EntityFactory<SubmissionResult>
{
  constructor() {}

  async create(
    createSubmissionResult: CreateSubmissionResult,
  ): Promise<SubmissionResult> {
    return new SubmissionResult(
      uuidv4(),
      createSubmissionResult.languageId,
      createSubmissionResult.createdAt,
      createSubmissionResult.updatedAt,
      createSubmissionResult.createdBy,
      createSubmissionResult.testcases,
    );
  }
}
