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
import { ProblemEntity } from 'src/problem/infrastructure/entities/problem.entity';
import { Problem } from 'src/problem/domain/problem';

@Entity('submission')
export class SubmissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  readonly sourceCode: string;

  @ManyToOne(() => LanguageEntity, (language) => language.submissions)
  readonly language: LanguageEntity;

  @ManyToOne(() => ProblemEntity, (problem) => problem.submissions)
  readonly problem: ProblemEntity;

  @OneToMany(
    () => SubmissionResultEntity,
    (submissionResult) => submissionResult.submission,
    { cascade: true },
  )
  readonly results: SubmissionResultEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.submissions)
  readonly createdBy: AccountEntity;
}
