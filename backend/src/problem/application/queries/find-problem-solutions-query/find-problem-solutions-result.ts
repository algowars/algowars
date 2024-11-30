import { IQueryResult } from '@nestjs/cqrs';

export class FindProblemSolutionsResult implements IQueryResult {
  title: string;
  question: string;
  createdBy: {
    username: string;
    id: string;
  };
  submissions: {
    id: string;
    sourceCode: string;
    language: {
      id: number;
      name: string;
    };
  }[];
}
