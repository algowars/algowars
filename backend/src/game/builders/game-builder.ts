import { Game } from 'src/data-model/entities/game/game';
import { GameBuilderArgs } from './game-builder-args';

export abstract class GameBuilder {
  protected game: Game | null = null;

  abstract setupGame(args: GameBuilderArgs): void;
  abstract startGame(): void;
  abstract endGame(): void;
}
