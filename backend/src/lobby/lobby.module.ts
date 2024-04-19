import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities/game/lobby.entity';
import { Account, Player } from 'src/data-model/entities';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { GameSession } from 'src/data-model/entities/battle/game-session.entity';
import { GameService } from 'src/game/game.service';
import { AccountService } from 'src/account/account.service';
import { LobbyController } from './lobby.controller';
import { GameGateway } from 'src/game/game.gateway';

@Module({
  imports: [
    ThrottlerModule.forRoot(),
    TypeOrmModule.forFeature([Lobby, Account, Player, Game, GameSession]),
  ],
  controllers: [LobbyController],
  providers: [LobbyService, GameService, GameGateway, AccountService],
})
export class LobbyModule {}
