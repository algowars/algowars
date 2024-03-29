import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  problemId: number;

  @IsArray()
  @IsOptional()
  inputs: string[];

  @IsNumber()
  languageId: number;
}
