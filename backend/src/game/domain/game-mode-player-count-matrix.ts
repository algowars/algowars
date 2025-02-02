import { GameMode } from './game-mode';

export const getPlayerCountFromGameMode = (gameMode: GameMode): number => {
  switch (gameMode) {
    case GameMode.SOLO:
      return 1;
    case GameMode.DUEL:
      return 2;
    case GameMode.FFA:
      return 100;
  }
};
