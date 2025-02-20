import { Module } from '@nestjs/common';
import { HealthController } from './interface/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class HealthModule {}
