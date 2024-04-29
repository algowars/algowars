import { Rush } from 'src/data-model/entities';
import { Game } from 'src/data-model/entities/game/game';
import { GameBuilder } from 'src/game/builders/game-builder';
import { GameBuilderArgs } from 'src/game/builders/game-builder-args';

export class CodeRushBuilder extends GameBuilder {
  constructor() {
    super();
    this.game = this.createGame();
  }

  private createGame(): Game {
    return new Rush();
  }

  public setupGame(args: GameBuilderArgs): void {
    console.log(args);
  }

  public startGame(): void {
    this.game.startGame();
  }

  public endGame(): void {
    this.game.endGame();
  }
}
