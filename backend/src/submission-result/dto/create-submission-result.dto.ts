import { IsNumber } from 'class-validator';

export class CreateSubmissionResult {
  @IsNumber()
  languageId: number;
}
