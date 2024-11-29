import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { AdditionalTestFileEntity } from 'src/problem/infrastructure/entities/additional-test-file.entity';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { ProblemSetupEntity } from 'src/problem/infrastructure/entities/problem-setup.entity';
import { ProblemEntity } from 'src/problem/infrastructure/entities/problem.entity';
import { TestEntity } from 'src/problem/infrastructure/entities/test.entity';

import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';

export const entities = [
  ProblemEntity,
  ProblemSetupEntity,
  LanguageEntity,
  SubmissionEntity,
  SubmissionResultEntity,
  AccountEntity,
  TestEntity,
  AdditionalTestFileEntity,
];
