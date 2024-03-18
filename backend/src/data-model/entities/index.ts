import { Account } from './account.entity';
import { ProblemSetup } from './problem-setup.entity';
import { Problem } from './problem.entity';
import { SubmissionToken } from './submission-token.entity';
import { Submission } from './submission.entity';
import { TestInput } from './test-input.entity';
import { TestSetup } from './test-setup.entity';
import { Test } from './test.entity';

const entities = [
  Problem,
  Account,
  Submission,
  SubmissionToken,
  Test,
  TestInput,
  TestSetup,
  ProblemSetup,
];

export {
  Problem,
  Account,
  Submission,
  SubmissionToken,
  Test,
  TestInput,
  TestSetup,
  ProblemSetup,
};

export default entities;
