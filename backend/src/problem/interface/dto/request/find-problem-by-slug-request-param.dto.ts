import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindProblemBySlugRequestParam {
  @IsString()
  @IsNotEmpty()
  readonly slug: string;
}
