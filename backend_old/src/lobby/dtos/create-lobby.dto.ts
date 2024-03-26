import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLobbyDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;
}
