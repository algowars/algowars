import { IsNotEmpty, IsString } from 'class-validator';

export class FindSubmissionDto {
  @IsString()
  @IsNotEmpty()
  submissionId: string;
}
