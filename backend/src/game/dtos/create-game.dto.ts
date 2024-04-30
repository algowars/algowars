import { IsDefined } from 'class-validator';
import { GameType } from 'src/data-model/models/game/game-type';

export class CreateGameDto {
  @IsDefined()
  gameType: GameType;
}
