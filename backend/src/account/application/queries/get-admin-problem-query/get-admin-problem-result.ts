import { IQueryResult } from '@nestjs/cqrs';
import { ProblemStatus } from 'src/problem/domain/problem-status';

export class GetAdminProblemResult implements IQueryResult {
  title: string;
  question: string;
  slug: string;
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
  version: number;
  difficulty: number;
  status: ProblemStatus;
}
