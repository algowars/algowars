import { Module } from '@nestjs/common';
import { CodeRushService } from './code-rush.service';
import { CodeRushController } from './code-rush.controller';

@Module({
  controllers: [CodeRushController],
  providers: [CodeRushService],
})
export class CodeRushModule {}
