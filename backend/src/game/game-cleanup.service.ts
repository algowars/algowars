import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { GameStatus } from 'src/data-model/entities/battle/game-status.entity';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class GameCleanupService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameStatus)
    private readonly gameStatusRepository: Repository<GameStatus>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async closeInactiveGames() {
    const closedGameStatus = await this.gameStatusRepository.findOne({
      where: {
        status: 'Closed',
      },
    });

    if (!closedGameStatus) {
      console.error('Closed status not found.');
      return;
    }

    const cutoffTime = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

    const inactiveGames = await this.gameRepository.find({
      where: {
        updatedAt: LessThanOrEqual(cutoffTime),
      },
    });

    for (const game of inactiveGames) {
      game.status = closedGameStatus;
    }

    console.log(inactiveGames);

    await this.gameRepository.save(inactiveGames);
  }
}
