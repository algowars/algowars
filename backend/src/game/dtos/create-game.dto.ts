import { IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsOptional()
  lobbyName?: string;
}
