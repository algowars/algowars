import { IQueryResult } from '@nestjs/cqrs';

export class FindProfileInformationResult implements IQueryResult {
  readonly username: string;
  readonly createdAt: Date;
}
