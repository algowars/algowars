import { IQueryResult } from '@nestjs/cqrs';

export class GetAdminProblemResult implements IQueryResult {
  title: string;
}
