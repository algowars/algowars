import { IsNumber } from 'class-validator';

export abstract class PaginationRequest {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;
}
