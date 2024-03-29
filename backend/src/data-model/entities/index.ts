import { Account } from './player/account.entity';
import { Player } from './player/player.entity';
import { ProblemSetup } from './problem/problem-setup.entity';
import { Problem } from './problem/problem.entity';
import { TestInput } from './problem/test-input.entity';
import { Test } from './problem/test.entity';
import { SubmissionToken } from './submission/submission-token.entity';
import { Submission } from './submission/submission.entity';

const entities = [
  Account,
  Player,
  Problem,
  ProblemSetup,
  Test,
  TestInput,
  Submission,
  SubmissionToken,
];

export {
  Account,
  Player,
  Problem,
  ProblemSetup,
  Test,
  TestInput,
  Submission,
  SubmissionToken,
};

export default entities;
