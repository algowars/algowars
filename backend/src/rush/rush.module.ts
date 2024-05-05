import { Module } from '@nestjs/common';
import { RushService } from './rush.service';
import { RushController } from './rush.controller';

@Module({
  controllers: [RushController],
  providers: [RushService],
})
export class RushModule {}
