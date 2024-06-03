import { IsUUID } from 'class-validator';

export class FindProblemDto {
  @IsUUID()
  id!: string;
}
