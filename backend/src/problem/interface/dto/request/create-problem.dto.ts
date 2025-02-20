import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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

  @IsString()
  readonly initialCode: string;

  @IsString()
  readonly test: string;

  @IsString()
  readonly solution: string;

  @IsString()
  @IsOptional()
  readonly additionalTestFileId: string;

  @IsString()
  @IsOptional()
  readonly input: string;

  @IsString()
  @IsOptional()
  readonly expectedOutput: string;
}
