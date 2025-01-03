import { IQueryResult } from '@nestjs/cqrs';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class FindProblemSolutionsBySlugResult implements IQueryResult {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly question: string;
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly submissions: {
    solution: string;
    createdBy: string;
    createdAt: Date;
    status: SubmissionStatus;
  }[];
}
