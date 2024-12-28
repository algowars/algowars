import { IQueryResult } from '@nestjs/cqrs';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class GetProblemSolutionsResult implements IQueryResult {
  problem: {
    title: string;
    question: string;
    createdBy: {
      username: string;
    };
    slug: string;
    createdAt: Date;
  };
  solutions: {
    id: string;
    sourceCode: string;
    language: {
      id: number;
      name: string;
    };
    createdBy: {
      username: string;
    };
    createdAt: Date;
    status: SubmissionStatus;
  }[];
}
