import { IQuery } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';

export class FindProblemSolutionsQuery implements IQuery {
  constructor(
    readonly problemSlug: string,
    readonly account: Account,
  ) {}
}
