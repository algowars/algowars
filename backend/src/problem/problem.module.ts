import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Problem } from 'src/data-model/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerTimes } from 'src/common/throttler/throttler-times';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Account]),
    ThrottlerModule.forRoot([
      {
        ttl: ThrottlerTimes.TEN_SECONDS,
        limit: 5,
      },
    ]),
  ],
  controllers: [ProblemController],
  providers: [ProblemService, AccountService],
})
export class ProblemModule {}
