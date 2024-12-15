import { IQuery } from '@nestjs/cqrs';

export class FindAccountByUsernameQuery implements IQuery {
  constructor(readonly username: string) {}
}
