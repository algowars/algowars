import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmissionResultEntity } from './submission-result.entity';
import { BaseEntity } from 'src/common/entities/base-entity';
import { CodeExecutionEngine } from 'lib/code-execution/code-execution-engines';

@Entity('submission')
export class SubmissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  sourceCode: string;

  @ManyToOne(() => LanguageEntity, (language) => language.submissions)
  language?: LanguageEntity;

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
}
