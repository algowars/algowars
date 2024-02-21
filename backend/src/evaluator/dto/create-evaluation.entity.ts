import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  problemId: number;

  @IsArray()
  inputs: string[];

  @IsString()
  username?: string;
}
