import { IsString } from 'class-validator';

export class GetProblemAggregate {
  @IsString()
  problemSlug: string;
}
