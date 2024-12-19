import { IsString } from 'class-validator';

export class FindAccountBySub {
  @IsString()
  readonly sub: string;
}
