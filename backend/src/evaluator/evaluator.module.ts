import { Module } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorController } from './evaluator.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerTimes } from 'src/common/throttler/throttler-times';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: ThrottlerTimes.THREE_SECONDS,
        limit: 1,
      },
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('EVALUATOR_URL'),
        headers: {
          'X-RapidAPI-Key': configService.get<string>('EVALUATOR_API_KEY'),
          'X-RapidAPI-Host': configService.get<string>('EVALUATOR_HOST'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EvaluatorController],
  providers: [
    EvaluatorService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class EvaluatorModule {}
