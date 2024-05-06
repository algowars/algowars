import { Rush } from 'src/data-model/entities';
import { GameBuilder } from './game-builder';
import { Game } from 'src/data-model/entities/game/game';

export class BattleBuilder extends GameBuilder {
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
