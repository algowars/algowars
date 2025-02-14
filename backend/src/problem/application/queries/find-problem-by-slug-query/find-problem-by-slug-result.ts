import { IQueryResult } from '@nestjs/cqrs';

export class FindProblemBySlugResult implements IQueryResult {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly question: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly initialCode: string;
  readonly createdBy: {
    username: string;
    picture?: string;
  };
  readonly tags: {
    id: number;
    name: string;
  }[];
  readonly difficulty: number;
}
