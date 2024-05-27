import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProblemModule } from './problem/problem.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ProblemModule],
})
export class AppModule {}
