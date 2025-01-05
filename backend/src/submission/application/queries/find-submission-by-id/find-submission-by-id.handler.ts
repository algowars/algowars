import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSubmissionByIdQuery } from './find-submission-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { SubmissionInjectionToken } from '../../injection-token';
import { SubmissionQuery } from '../submission-query';
import { IdImplementation } from 'src/common/domain/id';
import { Submission } from 'src/submission/domain/submission';

@QueryHandler(FindSubmissionByIdQuery)
export class FindSubmissionByIdHandler
  implements IQueryHandler<FindSubmissionByIdQuery, Submission>
{
  @Inject(SubmissionInjectionToken.SUBMISSION_QUERY)
  private readonly submissionQuery: SubmissionQuery;

  async execute(query: FindSubmissionByIdQuery): Promise<Submission> {
    console.log('QUERY: ', query);
    const foundSubmission = await this.submissionQuery.findById(
      new IdImplementation(query.id),
    );

    console.log('FOUND SUBMISSION: ', foundSubmission);

    if (!foundSubmission) {
      throw new NotFoundException('Submission not found.');
    }

    return foundSubmission;
  }
}
