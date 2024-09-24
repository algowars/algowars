import { IQueryResult } from '@nestjs/cqrs';
import { Username } from 'src/account/domain/username';

export class FindAccountBySubResult implements IQueryResult {
  readonly id: string;
  readonly sub: string;
  readonly username: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly version: number;
}
