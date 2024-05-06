import { Game } from 'src/data-model/entities/game/game';
export abstract class GameBuilder {
  protected _game: Game | null = null;

  abstract setupGame(): void;
  abstract startGame(): void;

  public get game() {
    return this.game;
  }
}
