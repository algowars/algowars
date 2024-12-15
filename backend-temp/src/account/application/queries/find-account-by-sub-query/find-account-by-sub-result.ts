import { IQueryResult } from '@nestjs/cqrs';

export class FindAccountBySubResult implements IQueryResult {
  readonly id: string;
  readonly sub: string;
  readonly username: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly version: number;
}
