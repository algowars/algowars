import { IsString } from 'class-validator';

export class FindRushByIdParam {
  @IsString()
  readonly rushId: string;
}
