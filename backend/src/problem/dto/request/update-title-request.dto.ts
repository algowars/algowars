import { IsString } from 'class-validator';

export class UpdateTitleRequest {
  @IsString()
  title: string;
}
