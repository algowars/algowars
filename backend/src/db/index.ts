import { AccountSchema } from 'src/account/db/account.schema';
import { ProblemSetupSchema } from 'src/problem/db/problem-setup/problem-setup.schema';
import { ProblemSchema } from 'src/problem/db/problem/problem.schema';
import { TagSchema } from 'src/problem/db/tag/tag.schema';
import { TestInputSchema } from 'src/problem/db/test/test-input.schema';
import { TestSchema } from 'src/problem/db/test/test.schema';

const schemas = [
  ProblemSchema,
  ProblemSetupSchema,
  TestSchema,
  TestInputSchema,
  AccountSchema,
  TagSchema,
];

export {
  ProblemSchema,
  ProblemSetupSchema,
  TestSchema,
  TestInputSchema,
  AccountSchema,
  TagSchema,
};

export default schemas;
