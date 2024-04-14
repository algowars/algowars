import { IsString } from 'class-validator';

export class startGameDto {
  @IsString()
  gameId: string;
}
