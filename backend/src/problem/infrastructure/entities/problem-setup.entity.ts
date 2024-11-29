import { BaseEntity } from 'src/common/entities/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ProblemEntity } from './problem.entity';
import { LanguageEntity } from './language.entity';
import { TestEntity } from './test.entity';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';

@Entity('problem-setup')
export class ProblemSetupEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  problemId: string;

  @PrimaryColumn()
  languageId: number;

  @ManyToOne(() => ProblemEntity, (problem) => problem.setups)
  problem?: ProblemEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.setups, {
    eager: true,
  })
  language: LanguageEntity;

  @OneToOne(() => SubmissionEntity, { cascade: ['remove', 'soft-remove'] })
  @JoinColumn({ name: 'solutionId' })
  solution: SubmissionEntity;

  @OneToMany(() => TestEntity, (test) => test.setups, { cascade: true })
  tests: TestEntity[];

  @Column({ nullable: false, type: 'text' })
  initialCode: string;
}
