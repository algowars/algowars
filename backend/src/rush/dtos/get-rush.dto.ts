import { IsString } from 'class-validator';

export class GetRushDto {
  @IsString()
  rushId: string;
}
