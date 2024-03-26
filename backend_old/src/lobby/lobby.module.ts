import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby])],
  controllers: [LobbyController],
  providers: [LobbyService],
})
export class LobbyModule {}
