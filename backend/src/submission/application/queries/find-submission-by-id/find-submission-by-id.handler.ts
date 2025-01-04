import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSubmissionByIdQuery } from './find-submission-by-id.query';
import { FindSubmissionByIdResult } from './find-submission-by-id-result';
import { Inject } from '@nestjs/common';
import { SubmissionInjectionToken } from '../../injection-token';

@QueryHandler(FindSubmissionByIdQuery)
export class FindSubmissionByIdHandler
  implements IQueryHandler<FindSubmissionByIdQuery, FindSubmissionByIdResult>
{
  @Inject(SubmissionInjectionToken.SUBMISSION_QUERY)
  private readonly submissionQuery: SubmissionQuery;

  async execute(
    query: FindSubmissionByIdQuery,
  ): Promise<FindSubmissionByIdResult> {}
}
