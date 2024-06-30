import { IsUUID } from 'class-validator';

export class FindSubmissionResult {
  @IsUUID()
  id!: string;
}
