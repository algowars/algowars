import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { ProblemSetupEntity } from 'src/problem/infrastructure/entities/problem-setup.entity';
import { ProblemEntity } from 'src/problem/infrastructure/entities/problem.entity';
import { AdditionalTestFileEntity } from 'src/submission/infrastructure/entities/additional-test-file.entity';
import { StatusEntity } from 'src/submission/infrastructure/entities/status.entity';
import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { TestEntity } from 'src/submission/infrastructure/entities/test.entity';

export const entities = [
  ProblemEntity,
  ProblemSetupEntity,
  LanguageEntity,
  SubmissionEntity,
  SubmissionResultEntity,
  StatusEntity,
  AccountEntity,
  TestEntity,
  AdditionalTestFileEntity,
];
