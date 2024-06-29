import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { SubmissionResultSchema } from './submission-result.schema';
import { SubmissionResult } from '../entities/submission-result.entity';
import { SubmissionResultTestcaseSchemaFactory } from './submission-result-testcase/submission-result-testcase-schema.factory';
import { AccountSchemaFactory } from 'src/account/db/account-schema.factory';

@Injectable()
export class SubmissionResultSchemaFactory
  implements EntitySchemaFactory<SubmissionResultSchema, SubmissionResult>
{
  constructor(
    private readonly submissionResultTestcaseSchemaFactory: SubmissionResultTestcaseSchemaFactory,
    private readonly accountSchemaFactory: AccountSchemaFactory,
  ) {}

  create(submissionResult: SubmissionResult): SubmissionResultSchema {
    return {
      id: submissionResult.getId(),
      langaugeId: submissionResult.getLanguageId(),
      createdAt: submissionResult.getCreatedAt(),
      updatedAt: submissionResult.getUpdatedAt(),
      createdBy: this.accountSchemaFactory.create(
        submissionResult.getCreatedBy(),
      ),
      testcases: submissionResult
        .getTestcases()
        .map((testcase) =>
          this.submissionResultTestcaseSchemaFactory.create(testcase),
        ),
    };
  }

  createFromSchema(
    submissionResultSchema: SubmissionResultSchema,
  ): SubmissionResult {
    return new SubmissionResult(
      submissionResultSchema.id,
      submissionResultSchema.langaugeId,
      submissionResultSchema.createdAt,
      submissionResultSchema.updatedAt,
      this.accountSchemaFactory.createFromSchema(
        submissionResultSchema.createdBy,
      ),
      submissionResultSchema.testcases.map((testcase) =>
        this.submissionResultTestcaseSchemaFactory.createFromSchema(testcase),
      ),
    );
  }
}
