import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateSubmissionDto {
  @IsInt()
  @IsNotEmpty()
  languageId: number;

  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  @IsInt()
  @IsNotEmpty()
  problemId: number;
}
