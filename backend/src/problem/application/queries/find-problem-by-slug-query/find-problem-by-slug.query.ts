import { IQuery } from '@nestjs/cqrs';

export class FindProblemBySlugQuery implements IQuery {
  constructor(
    readonly slug: string,
    readonly languageId: number,
  ) {}
}
