// Import schemas from different modules
import { AccountSchema } from 'src/account/db/account.schema'; // Schema for accounts
import { ProblemSetupSchema } from 'src/problem/db/problem-setup/problem-setup.schema'; // Schema for problem setups
import { ProblemSchema } from 'src/problem/db/problem/problem.schema'; // Schema for problems
import { TagSchema } from 'src/problem/db/tag/tag.schema'; // Schema for tags
import { TestInputSchema } from 'src/problem/db/test/test-input.schema'; // Schema for test inputs
import { TestSchema } from 'src/problem/db/test/test.schema'; // Schema for tests
import { SubmissionResultTestcaseSchema } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase.schema'; // Schema for submission result test cases
import { SubmissionResultSchema } from 'src/submission-result/db/submission-result.schema'; // Schema for submission results

// Array to group all schemas for easier management
const schemas = [
  ProblemSchema, // Include ProblemSchema
  ProblemSetupSchema, // Include ProblemSetupSchema
  TestSchema, // Include TestSchema
  TestInputSchema, // Include TestInputSchema
  AccountSchema, // Include AccountSchema
  SubmissionResultSchema, // Include SubmissionResultSchema
  SubmissionResultTestcaseSchema, // Include SubmissionResultTestcaseSchema
  TagSchema, // Include TagSchema
];

// Export individual schemas for external use
export {
  ProblemSchema,
  ProblemSetupSchema,
  TestSchema,
  TestInputSchema,
  AccountSchema,
  SubmissionResultSchema,
  SubmissionResultTestcaseSchema,
  TagSchema,
};

// Export the grouped schemas array as the default export
export default schemas;
