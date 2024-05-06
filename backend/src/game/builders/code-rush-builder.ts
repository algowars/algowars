import { Rush } from 'src/data-model/entities';
import { Game } from 'src/data-model/entities/game/game';
import { GameBuilder } from 'src/game/builders/game-builder';

export class CodeRushBuilder extends GameBuilder {
  constructor() {
    super();
    this._game = this.createGame();
  }

  private createGame(): Game {
    return new Rush();
  }

  public setupGame(): void {
    console.log();
  }

  public startGame(): void {
    this._game.startGame();
  }
}
