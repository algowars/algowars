import { IQuery } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';

export class FindRushByIdQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly shouldStart: boolean,
    readonly account: Account,
    readonly languageId: number = 93,
  ) {}
}
