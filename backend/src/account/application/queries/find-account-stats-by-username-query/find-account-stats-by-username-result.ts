import { IQueryResult } from '@nestjs/cqrs';

export class FindAccountStatsByUsernameResult implements IQueryResult {
  totalSubmissions: number;
  totalSolutions: number;
}
