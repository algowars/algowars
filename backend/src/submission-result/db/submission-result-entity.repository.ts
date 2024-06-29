import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { SubmissionResultSchema } from './submission-result.schema';
import { SubmissionResult } from '../entities/submission-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionResultSchemaFactory } from './submission-result-schema.factory';

@Injectable()
export class SubmissionResultEntityRepository extends BaseEntityRepository<
  SubmissionResultSchema,
  SubmissionResult
> {
  constructor(
    @InjectRepository(SubmissionResultSchema)
    submissionResultRepository: Repository<SubmissionResultSchema>,
    submissionResultSchemaFactory: SubmissionResultSchemaFactory,
  ) {
    super(submissionResultRepository, submissionResultSchemaFactory);
  }
}
