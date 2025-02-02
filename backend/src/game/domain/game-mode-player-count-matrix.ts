import { Injectable } from '@nestjs/common';
import { GameMode } from './game-mode';

@Injectable()
export class PlayerCountMatrix {
  getPlayerCountFromGameMode(gameMode: GameMode): number {
    switch (gameMode) {
      case GameMode.SOLO:
        return 1;
      case GameMode.DUEL:
        return 2;
      case GameMode.FFA:
        return 100;
      default:
        return 0;
    }
  }
}
