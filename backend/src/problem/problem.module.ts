import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Account,
  Problem,
  ProblemSetup,
  TestInput,
} from 'src/data-model/entities';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { TestInputService } from 'src/test-input/test-input.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Account, TestInput, ProblemSetup]),
  ],

  controllers: [ProblemController],
  providers: [ProblemService, ProblemSetupService, TestInputService],
})
export class ProblemModule {}
