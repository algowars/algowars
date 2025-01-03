import { IQueryResult } from '@nestjs/cqrs';

export class FindProblemSolutionsBySlugResult implements IQueryResult {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly question: string;
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly solutions: {
    solution: string;
    createdBy: string;
    createdAt: Date;
  }[];
}
