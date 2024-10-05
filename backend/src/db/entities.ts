import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { ProblemEntity } from 'src/problem/infrastructure/entities/problem.entity';
import { StatusEntity } from 'src/submission/infrastructure/entities/status.entity';
import { SubmissionResultEntity } from 'src/submission/infrastructure/entities/submission-result.entity';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';

export const entities = [
  ProblemEntity,
  LanguageEntity,
  SubmissionEntity,
  SubmissionResultEntity,
  StatusEntity,
  AccountEntity,
];
