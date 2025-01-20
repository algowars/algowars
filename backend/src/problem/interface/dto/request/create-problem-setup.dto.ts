import { IsNumber } from 'class-validator';

export class CreateProblemSetupRequest {
  @IsNumber()
  readonly languageId: number;
}
