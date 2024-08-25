import { IsUUID } from 'class-validator';

export class FindSubmissionResultDto {
  @IsUUID()
  id!: string;
}
