import { IQueryResult } from '@nestjs/cqrs';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class GetProblemSolutionsResult implements IQueryResult {
  readonly problem: {
    id: string;
    title: string;
    slug: string;
    question: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
  };

  readonly solutions: {
    id: string;
    sourceCode: string;
    language: {
      id: number;
      name: string;
    };
    statuses: SubmissionStatus[];
    createdAt: Date;
  }[];
}
