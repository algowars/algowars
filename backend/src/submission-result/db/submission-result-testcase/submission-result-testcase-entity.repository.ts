import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { SubmissionResultTestcase } from 'src/submission-result/entities/submission-result-testcase.entity';
import { SubmissionResultTestcaseSchema } from './submission-result-testcase.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubmissionResultTestcaseSchemaFactory } from './submission-result-testcase-schema.factory';

@Injectable()
export class SubmissionResultTestcaseEntityRepository extends BaseEntityRepository<
  SubmissionResultTestcaseSchema,
  SubmissionResultTestcase
> {
  constructor(
    @InjectRepository(SubmissionResultTestcaseSchema)
    private readonly submissionResultTestcaseRepository: Repository<SubmissionResultTestcaseSchema>,
    private readonly submissionResultTestcaseSchemaFactory: SubmissionResultTestcaseSchemaFactory,
  ) {
    super(
      submissionResultTestcaseRepository,
      submissionResultTestcaseSchemaFactory,
    );
  }

  async findByTokens(tokens: string[]): Promise<SubmissionResultTestcase[]> {
    const testcases = await this.submissionResultTestcaseRepository.find({
      where: { token: In(tokens) },
    });

    return testcases.map((testcase) =>
      this.submissionResultTestcaseSchemaFactory.createFromSchema(testcase),
    );
  }

  async updateBatch(
    submissionResultTestcases: SubmissionResultTestcase[],
  ): Promise<SubmissionResultTestcase[]> {
    const updatedTestcases = await Promise.all(
      submissionResultTestcases.map(async (testcase) => {
        const updatedTestcase =
          await this.submissionResultTestcaseRepository.save(
            this.submissionResultTestcaseSchemaFactory.create(testcase),
          );
        return this.submissionResultTestcaseSchemaFactory.createFromSchema(
          updatedTestcase,
        );
      }),
    );
    return updatedTestcases;
  }
}
