import { IQueryResult } from '@nestjs/cqrs';

export class FindAccountByUsernameResult implements IQueryResult {
  readonly id: string;
  readonly username: string;
  readonly createdAt: Date;
}
