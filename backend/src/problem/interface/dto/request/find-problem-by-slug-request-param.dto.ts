import { IsNotEmpty, IsString } from 'class-validator';

export class FindProblemBySlugRequestParam {
  @IsString()
  @IsNotEmpty()
  readonly slug: string;
}
