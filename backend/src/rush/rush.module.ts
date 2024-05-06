import { Module } from '@nestjs/common';
import { RushService } from './rush.service';
import { RushController } from './rush.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Player, Problem, Rush } from 'src/data-model/entities';
import { AccountService } from 'src/account/account.service';
import { ProblemService } from 'src/problem/problem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Rush, Player, Account])],
  controllers: [RushController],
  providers: [RushService, AccountService, ProblemService],
})
export class RushModule {}
