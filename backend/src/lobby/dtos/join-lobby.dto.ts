import { IsNotEmpty, IsString } from 'class-validator';

export class JoinLobbyDto {
  @IsString()
  @IsNotEmpty()
  lobbyId: string;
}
