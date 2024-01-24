import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { ProblemModule } from './problem/problem.module';
import { EvaluatorModule } from './evaluator/evaluator.module';
import entities from './data-model/entities';

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
        synchronize: true,
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    ProblemModule,
    EvaluatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
