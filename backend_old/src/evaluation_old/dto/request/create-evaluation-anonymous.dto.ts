import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEvaluationAnonymous {
  // Ensures that the sourceCode field is a string and is not empty
  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  // Ensures that the problemSlug field is a string and is not empty
  @IsString()
  @IsNotEmpty()
  problemSlug: string;

  // Ensures that the languageId field is a number
  @IsNumber()
  languageId: number;
}
