import { IQuery } from '@nestjs/cqrs';

export class FindProblemSolutionsBySlugQuery implements IQuery {
  constructor(readonly slug: string) {}
}
