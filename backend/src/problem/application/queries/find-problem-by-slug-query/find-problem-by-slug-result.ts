import { IQueryResult } from '@nestjs/cqrs';

export class FindProblemBySlugResult implements IQueryResult {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly question: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly initialCode: string;
}
