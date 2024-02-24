import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem, ProblemSetup } from 'src/data-model/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerTimes } from 'src/common/throttler/throttler-times';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, ProblemSetup]),
    ThrottlerModule.forRoot([
      {
        ttl: ThrottlerTimes.TEN_SECONDS,
        limit: 5,
      },
    ]),
  ],
  controllers: [ProblemController],
  providers: [ProblemService, ProblemSetupService],
})
export class ProblemModule {}
