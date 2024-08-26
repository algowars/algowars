import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProblemModule } from './problem/problem.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProblemModule,
  ],
})
export class AppModule {}
