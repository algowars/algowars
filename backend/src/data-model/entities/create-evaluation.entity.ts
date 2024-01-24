import { IsString } from 'class-validator';

export class CreateEvaluationDto {
  @IsString()
  code: string;
}
