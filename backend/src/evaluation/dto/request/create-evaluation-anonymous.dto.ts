import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEvaluationAnonymous {
  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  @IsString()
  @IsNotEmpty()
  problemSlug: string;

  @IsNumber()
  languageId: number;
}
