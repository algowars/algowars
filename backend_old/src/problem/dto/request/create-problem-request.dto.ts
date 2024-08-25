import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProblemRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNumber()
  rating: number;

  @IsString()
  @IsNotEmpty()
  initialCode: string;

  @IsString()
  @IsNotEmpty()
  solution: string;

  @IsString()
  @IsNotEmpty()
  testInputs: string;

  @IsString()
  @IsNotEmpty()
  testSetup: string;

  @IsNumber()
  languageId: number;
}
