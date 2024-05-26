import { IsString } from 'class-validator';

export class GetPlayerDto {
  @IsString()
  username: string;
}
