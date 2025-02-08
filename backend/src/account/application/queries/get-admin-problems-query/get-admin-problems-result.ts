import { IQueryResult } from '@nestjs/cqrs';
import { ProblemStatus } from 'src/problem/domain/problem-status';

export class GetAdminProblemsResult implements IQueryResult {
  page: number;
  size: number;
  totalPages: number;
  results: {
    title: string;
    createdAt: Date;
    difficulty: number;
    id: string;
    slug: string;
    tags: string[];
    status: ProblemStatus;
    createdBy: {
      id: string;
      username: string;
    };
  }[];
}
