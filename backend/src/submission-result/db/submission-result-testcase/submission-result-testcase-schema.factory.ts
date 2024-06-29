import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { SubmissionResultTestcaseSchema } from './submission-result-testcase.schema';
import { SubmissionResultTestcase } from 'src/submission-result/entities/submission-result-testcase.entity';

@Injectable()
export class SubmissionResultTestcaseSchemaFactory
  implements
    EntitySchemaFactory<
      SubmissionResultTestcaseSchema,
      SubmissionResultTestcase
    >
{
  create(
    submissionResultTestcase: SubmissionResultTestcase,
  ): SubmissionResultTestcaseSchema {
    return {
      id: submissionResultTestcase.getId(),
      token: submissionResultTestcase.getToken(),
      order: submissionResultTestcase.getOrder(),
      isRandomTestcase: submissionResultTestcase.getIsRandomTestcase(),
      sourceCode: submissionResultTestcase.getSourceCode(),
      stdin: submissionResultTestcase.getStdin(),
      stdout: submissionResultTestcase.getStdout(),
      expectedOutput: submissionResultTestcase.getExpectedOutput(),
      statusId: submissionResultTestcase.getStatusId(),
      stderr: submissionResultTestcase.getStderr(),
    };
  }

  createFromSchema(
    submissionResultTestcaseSchema: SubmissionResultTestcaseSchema,
  ): SubmissionResultTestcase {
    return new SubmissionResultTestcaseSchema(
      submissionResultTestcaseSchema.id,
      submissionResultTestcaseSchema.expectedOutput,
    );
  }
}
