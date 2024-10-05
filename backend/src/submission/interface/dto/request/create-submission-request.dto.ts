import { IsNumber, IsString } from 'class-validator';

export class CreateSubmissionRequest {
  @IsNumber()
  readonly languageId: number;

  @IsString()
  readonly problemSlug: string;

  @IsString()
  readonly sourceCode: string;
}
