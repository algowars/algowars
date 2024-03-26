import { Account } from './account.entity';
import { FFABattle } from './battle/ffa-battle/ffa-battle.entity';
import { LobbyStatus } from './battle/lobby-status.entity';
import { Lobby } from './battle/lobby.entity';
import { Player } from './player.entity';
import { ProblemSetup } from './problem-setup.entity';
import { Problem } from './problem.entity';
import { SubmissionToken } from './submission-token.entity';
import { Submission } from './submission.entity';
import { TestInput } from './test-input.entity';
import { Test } from './test.entity';

const entities = [
  Problem,
  Account,
  Player,
  ProblemSetup,
  Submission,
  SubmissionToken,
  Test,
  TestInput,
  Lobby,
  LobbyStatus,
  FFABattle,
];

export {
  Problem,
  Account,
  Player,
  ProblemSetup,
  Submission,
  SubmissionToken,
  Test,
  TestInput,
  Lobby,
  LobbyStatus,
  FFABattle,
};

export default entities;
