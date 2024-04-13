import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveLobbyDto {
  @IsString()
  @IsNotEmpty()
  lobbyId: string;
}
