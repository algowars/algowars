import { IsNotEmpty, IsString } from 'class-validator';

export class ProblemAggregateDto {
  @IsString()
  @IsNotEmpty()
  problemSlug: string;
}
