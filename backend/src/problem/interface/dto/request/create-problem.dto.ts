import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProblemRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(125)
  readonly slug: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(750)
  readonly question: string;

  @IsNumber()
  readonly languageId: number;
}
