import { IsArray, IsOptional } from 'class-validator';

export class RandomProblemDto {
  @IsArray()
  @IsOptional()
  disallowedIds: number[];
}
