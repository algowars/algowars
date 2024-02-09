import { Module } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorController } from './evaluator.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 3_000,
        limit: 1,
      },
      {
        name: 'medium',
        ttl: 10_000,
        limit: 5,
      },
      {
        name: 'long',
        ttl: 60_000,
        limit: 20,
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
