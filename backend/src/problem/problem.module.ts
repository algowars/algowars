import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Problem, TestInput } from 'src/data-model/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerTimes } from 'src/common/throttler/throttler-times';
import { AccountService } from 'src/account/account.service';
import { TestInputService } from 'src/test-input/test-input.service';
import { ProblemSetup } from 'src/data-model/entities/problem-setup.entity';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Account, TestInput, ProblemSetup]),
    ThrottlerModule.forRoot([
      {
        ttl: ThrottlerTimes.TEN_SECONDS,
        limit: 5,
      },
    ]),
  ],
  controllers: [ProblemController],
  providers: [
    ProblemService,
    AccountService,
    TestInputService,
    ProblemSetupService,
  ],
})
export class ProblemModule {}
