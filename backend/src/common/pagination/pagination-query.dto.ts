import { IsDate, IsNumber } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsDate()
  timestamp: Date;
}
