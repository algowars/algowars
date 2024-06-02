import { AccountSchema } from 'src/account/db/account.schema';
import { ProblemSchema } from 'src/problem/db/problem.schema';

const schemas = [ProblemSchema, AccountSchema];

export { ProblemSchema, AccountSchema };

export default schemas;
