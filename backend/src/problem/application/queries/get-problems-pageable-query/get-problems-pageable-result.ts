import { IQueryResult } from '@nestjs/cqrs';

export class GetProblemsPageableResult implements IQueryResult {
  page: number;
  size: number;
  totalPages: number;
  results: {
    title: string;
    question: string;
    createdAt: Date;
    difficulty: number;
    id: string;
    slug: string;
    tags: string[];
  }[];
}
