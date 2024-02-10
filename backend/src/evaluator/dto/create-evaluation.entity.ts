import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsArray()
  inputs: string[];
}
