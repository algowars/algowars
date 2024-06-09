import { AccountSchema } from 'src/account/db/account.schema';
import { ProblemSetupSchema } from 'src/problem/db/problem-setup.schema';
import { ProblemSchema } from 'src/problem/db/problem.schema';
import { TestInputSchema } from 'src/problem/db/test-input.schema';
import { TestSchema } from 'src/problem/db/test.schema';

const schemas = [
  ProblemSchema,
  ProblemSetupSchema,
  TestSchema,
  TestInputSchema,
  AccountSchema,
];

export {
  ProblemSchema,
  ProblemSetupSchema,
  TestSchema,
  TestInputSchema,
  AccountSchema,
};

export default schemas;
