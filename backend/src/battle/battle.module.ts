import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';

@Module({
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
