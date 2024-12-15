import { IsNumber } from 'class-validator';

export class FindProblemBySlugRequestQuery {
  @IsNumber()
  readonly languageId: number;
}
