import { IQuery } from '@nestjs/cqrs';

export class GetProblemSolutionsQuery implements IQuery {
  constructor(readonly slug: string) {}
}
