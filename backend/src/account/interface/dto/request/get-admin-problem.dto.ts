import { IsString } from 'class-validator';

export class GetAdminProblemParams {
  @IsString()
  readonly slug: string;
}
