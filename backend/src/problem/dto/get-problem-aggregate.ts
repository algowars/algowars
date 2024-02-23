import { IsNumber, IsString } from 'class-validator';

export class GetProblemAggregate {
  @IsString()
  problemSlug: string;

  @IsNumber()
  languageId: number;
}
