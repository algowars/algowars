import { BaseEntity } from 'src/common/entities/base-entity';
import { AdditionalTestFileEntity } from 'src/submission/infrastructure/entities/additional-test-file.entity';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemSetupEntity } from './problem-setup.entity';

@Entity('language')
export class LanguageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false, unique: true })
  readonly name: string;

  @Column({ default: false })
  readonly isArchived?: boolean;

  @Column({ default: true })
  readonly isAvailable?: boolean;

  @Column({ nullable: false })
  readonly initialCode: string;

  @Column({ nullable: false })
  readonly initialSolution: string;

  @OneToMany(() => SubmissionEntity, (submission) => submission.language)
  readonly submissions?: Promise<SubmissionEntity[]>;

  @OneToMany(() => ProblemSetupEntity, (setup) => setup.language)
  readonly setups: Promise<ProblemSetupEntity[]>;

  @OneToMany(
    () => AdditionalTestFileEntity,
    (additionalTestFiles) => additionalTestFiles.language,
  )
  readonly additionalTestFiles: Promise<AdditionalTestFileEntity[]>;
}
