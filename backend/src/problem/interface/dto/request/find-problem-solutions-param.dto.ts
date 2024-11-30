import { IsNotEmpty, IsString } from 'class-validator';

export class FindProblemSolutionsParam {
  @IsString()
  @IsNotEmpty()
  readonly slug: string;
}
