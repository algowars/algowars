import { Account } from './account.entity';
import { ProblemSetup } from './problem-setup.entity';
import { Problem } from './problem.entity';
import { SubmissionToken } from './submission-token.entity';
import { Submission } from './submission.entity';
import { TestInput } from './test-input.entity';
import { Test } from './test.entity';

const entities = [
  Problem,
  Account,
  ProblemSetup,
  Submission,
  SubmissionToken,
  Test,
  TestInput,
];

export {
  Problem,
  Account,
  ProblemSetup,
  Submission,
  SubmissionToken,
  Test,
  TestInput,
};

export default entities;
