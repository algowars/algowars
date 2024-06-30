import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SubmissionResultSchema } from './submission-result.schema';
import { SubmissionResultDto } from '../dto/submission-result.dto';
import { SubmissionResultTestcaseDto } from '../dto/submission-result-testcase.dto';
import { SubmissionResultTestcaseSchema } from './submission-result-testcase/submission-result-testcase.schema';
import { PageableRepository } from 'src/common/pagination/db/pageable.repository';

@Injectable()
export class SubmissionResultDtoRepository extends PageableRepository<SubmissionResultSchema> {
  constructor(private readonly dataSource: DataSource) {
    super(SubmissionResultSchema, dataSource);
  }

  async findById(id: string): Promise<SubmissionResultDto> {
    const submissionResult = await this.dataSource
      .getRepository(SubmissionResultSchema)
      .findOne({
        where: {
          id,
        },
        relations: ['testcases', 'createdBy'],
      });

    if (!submissionResult) {
      throw new NotFoundException('Submission result not found');
    }

    return this.toSubmissionResultDto(submissionResult);
  }

  toSubmissionResultDto(
    submissionResult: SubmissionResultSchema,
  ): SubmissionResultDto {
    return {
      id: submissionResult.id,
      isSubmission: submissionResult.isSubmission,
      createdBy: submissionResult.createdBy,
      testcases: submissionResult.testcases.map(
        this.toSumissionRestTestcaseDto,
      ),
    };
  }

  toSumissionRestTestcaseDto(
    submissionResultTestcase: SubmissionResultTestcaseSchema,
  ): SubmissionResultTestcaseDto {
    return {
      id: submissionResultTestcase.id,
      order: submissionResultTestcase.order,
      isRandomTestcase: submissionResultTestcase.isRandomTestcase,
      token: submissionResultTestcase.token,
      sourceCode: submissionResultTestcase.sourceCode,
      stdin: submissionResultTestcase.stdin,
      stdout: submissionResultTestcase.stdout,
      expectedOutput: submissionResultTestcase.expectedOutput,
      statusId: submissionResultTestcase.statusId,
      stderr: submissionResultTestcase.stderr,
    };
  }
}
