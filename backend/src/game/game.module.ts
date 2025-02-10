import { Logger, Module, Provider } from '@nestjs/common';
import { GameFactory } from './domain/game-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountModule } from 'src/account/account.module';
import { ProblemModule } from 'src/problem/problem.module';
import { SubmissionModule } from 'src/submission/submission.module';
import { GameController } from './interface/game.controller';
import { GameCommandHandlers } from './application/commands';
import { GameInjectionToken } from './application/injection-token';
import { GameRepositoryImplementation } from './infrastructure/repositories/game-repository-implementation';
import { PlayerCountMatrix } from './domain/game-mode-player-count-matrix';
import { LobbyFactory } from './domain/lobby-factory';
import { GameQueryHandlers } from './application/queries';
import { GameQueryImplementation } from './infrastructure/queries/game-query-implementation';
import { GameRoundBuilderImplementation } from './domain/game-round-builder';

const infrastructure: Provider[] = [
  {
    provide: GameInjectionToken.GAME_REPOSITORY,
    useClass: GameRepositoryImplementation,
  },
  {
    provide: GameInjectionToken.GAME_QUERY,
    useClass: GameQueryImplementation,
  },
  {
    provide: GameInjectionToken.GAME_ROUND_BUILDER,
    useClass: GameRoundBuilderImplementation,
  },
];

const application = [...GameCommandHandlers, ...GameQueryHandlers];

export const domain = [GameFactory, LobbyFactory, PlayerCountMatrix];

@Module({
  imports: [CqrsModule, AccountModule, ProblemModule, SubmissionModule],
  controllers: [GameController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class GameModule {}
