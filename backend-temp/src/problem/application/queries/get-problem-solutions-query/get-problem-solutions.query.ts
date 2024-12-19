import { IQuery } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';

export class GetProblemSolutionsQuery implements IQuery {
  constructor(
    readonly slug: string,
    readonly account: Account,
  ) {}
}
