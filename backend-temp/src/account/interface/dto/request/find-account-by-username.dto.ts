import { IsString } from 'class-validator';

export class FindAccountByUsername {
  @IsString()
  readonly username: string;
}
