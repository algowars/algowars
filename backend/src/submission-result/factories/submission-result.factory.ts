import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { v4 as uuidv4 } from 'uuid';
import { SubmissionResult } from '../entities/submission-result.entity';
import { CreateSubmissionResult } from '../dto/create-submission-result.dto';
import { SubmissionResultEntityRepository } from '../db/submission-result-entity.repository';

@Injectable()
export class SubmissionResultFactory
  implements EntityFactory<SubmissionResult>
{
  constructor(
    private readonly submissionResultEntityRepository: SubmissionResultEntityRepository,
  ) {}

  async create(
    createSubmissionResult: CreateSubmissionResult,
  ): Promise<SubmissionResult> {
    const submissionResult = new SubmissionResult(
      uuidv4(),
      createSubmissionResult.languageId,
      createSubmissionResult.isSubmission,
      createSubmissionResult.createdAt,
      createSubmissionResult.updatedAt,
      createSubmissionResult.createdBy,
      createSubmissionResult.testcases,
    );

    await this.submissionResultEntityRepository.create(submissionResult);

    return submissionResult;
  }
}
