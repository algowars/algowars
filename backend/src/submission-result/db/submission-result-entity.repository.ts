import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly submissionResultRepository: Repository<SubmissionResultSchema>,
    private readonly submissionResultSchemaFactory: SubmissionResultSchemaFactory,
  ) {
    super(submissionResultRepository, submissionResultSchemaFactory);
  }

  async findByIdWithTestcases(id: string): Promise<SubmissionResult> {
    console.log('FINAL ID: ', id);
    console.log(await this.submissionResultRepository.find());
    const submissionResult = await this.submissionResultRepository.findOne({
      where: {
        id,
      },
      relations: ['testcases'],
    });

    console.log('RESULT: ', submissionResult);

    if (!submissionResult) {
      throw new NotFoundException('Submission result not found');
    }

    if (!submissionResult?.testcases) {
      throw new NotFoundException('Submssion testcases not found');
    }

    return this.submissionResultSchemaFactory.createFromSchema(
      submissionResult,
    );
  }
}
