import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Player } from 'src/data-model/entities';
import { PlayerService } from 'src/player/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Player])],
  controllers: [AccountController],
  providers: [AccountService, PlayerService],
})
export class AccountModule {}
