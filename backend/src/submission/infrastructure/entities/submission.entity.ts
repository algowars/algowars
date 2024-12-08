import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmissionResultEntity } from './submission-result.entity';
import { BaseEntity } from 'src/common/entities/base-entity';
import { CodeExecutionEngine } from 'lib/code-execution/code-execution-engines';
import { ProblemEntity } from 'src/problem/infrastructure/entities/problem.entity';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@Entity('submission')
export class SubmissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  sourceCode: string;

  @ManyToOne(() => LanguageEntity, (language) => language.submissions)
  language?: LanguageEntity;

  @ManyToOne(() => ProblemEntity, (problem) => problem.submissions)
  problem: ProblemEntity;

  @OneToMany(
    () => SubmissionResultEntity,
    (submissionResult) => submissionResult.submission,
    { cascade: true },
  )
  results?: SubmissionResultEntity[];

  @Column({ nullable: false })
  codeExecutionContext: CodeExecutionEngine;

  @ManyToOne(() => AccountEntity, (account) => account.submissions)
  createdBy?: AccountEntity;

  /**
   * Get the overall status of the submission based on the statuses of its results.
   * Precedence order: Failure > Processing > Accepted
   */
  public static getOverallStatus(
    submission: SubmissionEntity,
  ): SubmissionStatus | null {
    if (!submission?.results || submission?.results.length === 0) {
      return null;
    }

    let hasFailed = false;
    let status: SubmissionStatus;

    for (const result of submission.results) {
      if (hasFailed) {
        if (result.status !== SubmissionStatus.ACCEPTED) {
          status = result.status;
        }
      } else {
        status = result.status;
      }
    }

    return submission.results[0].status;
  }
}
