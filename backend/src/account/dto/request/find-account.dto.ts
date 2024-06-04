import { IsUUID } from 'class-validator';

export class FindAccountDto {
  @IsUUID()
  id!: string;
}
