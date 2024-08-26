import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProblemRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  question: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  slug: string;

  @IsNumber()
  @Min(0)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  initialCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  solution: string;

  @IsNumber()
  languageId: number;
}
