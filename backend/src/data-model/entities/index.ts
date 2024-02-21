import { Account } from './account.entity';
import { LanguageSetup } from './language-setup.entity';
import { ProblemInitialInputs } from './problem-initial-inputs.entity';
import { ProblemSetup } from './problem-setup.entity';
import { ProblemSolution } from './problem-solution.entity';
import { ProblemTest } from './problem-test.entity';
import { Problem } from './problem.entity';

const entities = [
  Problem,
  Account,
  LanguageSetup,
  ProblemInitialInputs,
  ProblemSetup,
  ProblemSolution,
  ProblemTest,
];

export {
  Problem,
  Account,
  LanguageSetup,
  ProblemInitialInputs,
  ProblemSetup,
  ProblemSolution,
  ProblemTest,
};

export default entities;
