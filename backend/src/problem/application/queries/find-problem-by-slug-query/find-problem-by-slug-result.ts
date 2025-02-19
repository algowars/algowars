import { IQueryResult } from '@nestjs/cqrs';
import { SubmissionType } from 'src/problem/domain/submission-type';

export class FindProblemBySlugResult implements IQueryResult {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly question: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly initialCode: string;
  readonly submissionType: SubmissionType;
  readonly createdBy: {
    username: string;
    picture?: string;
  };
  readonly tags: {
    id: number;
    name: string;
  }[];
  readonly difficulty: number;
  readonly tests?: {
    id: string;
    code: string;
  }[];
  readonly testCases?: {
    id: string;
    input: string;
  }[];
}
