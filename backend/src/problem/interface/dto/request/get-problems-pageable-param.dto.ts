import { IsDate, IsDateString, IsNumber } from 'class-validator';

export class GetProblemsPageableParam {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsDate()
  timestamp: Date;
}
