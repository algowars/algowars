import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities/battle/lobby.entity';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { GameSession } from 'src/data-model/entities/battle/game-session.entity';
import { Account, Player } from 'src/data-model/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { AccountService } from 'src/account/account.service';
import { GameStatus } from 'src/data-model/entities/battle/game-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lobby,
      Game,
      GameStatus,
      GameSession,
      Player,
      Account,
    ]),
    ThrottlerModule.forRoot(),
  ],
  controllers: [GameController],
  providers: [GameService, AccountService],
})
export class GameModule {}
