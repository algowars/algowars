import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { PlayerModule } from './player/player.module';
import { ProblemModule } from './problem/problem.module';
import { ProblemSetupModule } from './problem-setup/problem-setup.module';
import { TestInputModule } from './test-input/test-input.module';
import { EvaluatorModule } from './evaluator/evaluator.module';
import { SubmissionModule } from './submission/submission.module';
import entities from './data-model/entities';
import { ScheduleModule } from '@nestjs/schedule';
import { LanguageModule } from './language/language.module';
import { CodeRushModule } from './code-rush/code-rush.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRESQL_HOST'),
        port: +configService.get<number>('POSTGRESQL_PORT'),
        username: configService.get('POSTGRESQL_USERNAME'),
        password: configService.get('POSTGRESQL_PASSWORD'),
        database: configService.get('POSTGRESQL_NAME'),
        ssl: {
          rejectUnauthorized: true,
          ca: configService.get('POSTGRESQL_CERT'),
        },
        synchronize: true,
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    PlayerModule,
    ProblemModule,
    ProblemSetupModule,
    TestInputModule,
    EvaluatorModule,
    SubmissionModule,
    LanguageModule,
    CodeRushModule,
  ],
})
export class AppModule {}
