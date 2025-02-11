import { IQueryResult } from '@nestjs/cqrs';

export class FindRushByIdResult implements IQueryResult {
  id: string;
  title: string;
  slug: string;
  initialCode: string;
  question: string;
  createdAt: Date;
  finishedAt?: Date | null;
  createdBy: {
    id: string;
    username: string;
  };
  tags: string[];
  difficulty: number;
  roundIndex: number;
}
