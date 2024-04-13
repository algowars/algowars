import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities/battle/lobby.entity';
import { Account, Player } from 'src/data-model/entities';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { GameSession } from 'src/data-model/entities/battle/game-session.entity';
import { GameService } from 'src/game/game.service';
import { LobbyGateway } from './lobby.gateway';
import { AccountService } from 'src/account/account.service';
import { LobbyController } from './lobby.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot(),
    TypeOrmModule.forFeature([Lobby, Account, Player, Game, GameSession]),
  ],
  controllers: [LobbyController],
  providers: [LobbyService, GameService, LobbyGateway, AccountService],
})
export class LobbyModule {}
