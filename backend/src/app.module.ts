import { Module } from '@nestjs/common';
import { ProblemModule } from './problem/problem.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import schemas from './db';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
import { EvaluationModule } from './evaluation/evaluation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRESQL_HOST'),
        port: +configService.get<number>('POSTGRESQL_PORT'),
        username: configService.get('POSTGRESQL_USERNAME'),
        password: configService.get('POSTGRESQL_PASSWORD'),
        database: configService.get('POSTGRESQL_NAME'),
        synchronize: configService.get('SYNCHRONIZE_DATABASE') === 'true',
        entities: schemas,
      }),
      inject: [ConfigService],
    }),
    ProblemModule,
    CommonModule,
    AccountModule,
    EvaluationModule,
  ],
})
export class AppModule {}
