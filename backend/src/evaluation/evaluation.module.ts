import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  controllers: [EvaluationController],
  providers: [],
})
export class EvaluationModule {}
