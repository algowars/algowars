import { IsDate, IsNumber } from 'class-validator';

export class GetProblemWithStatusesParam {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsDate()
  timestamp: Date;
}
