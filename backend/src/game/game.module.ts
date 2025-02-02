import { Logger, Module, Provider } from '@nestjs/common';
import { GameFactory } from './domain/game-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountModule } from 'src/account/account.module';
import { ProblemModule } from 'src/problem/problem.module';
import { SubmissionModule } from 'src/submission/submission.module';
import { GameController } from './interface/game.controller';

const infrastructure: Provider[] = [];

const application = [];

export const domain = [GameFactory];

@Module({
  imports: [CqrsModule, AccountModule, ProblemModule, SubmissionModule],
  controllers: [GameController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class GameModule {}
