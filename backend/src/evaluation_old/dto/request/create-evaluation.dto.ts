import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEvaluation {
  // Validates that the sourceCode field is a string and is not empty
  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  // Validates that the problemSlug field is a string and is not empty
  @IsString()
  @IsNotEmpty()
  problemSlug: string;

  // Validates that the languageId field is a number
  @IsNumber()
  languageId: number;
}
