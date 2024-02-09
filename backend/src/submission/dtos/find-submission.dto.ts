import { IsNotEmpty, IsString } from 'class-validator';

export class FindSubmissionDto {
  @IsNotEmpty()
  @IsString()
  submissionId: string;
}
