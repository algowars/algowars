import { BaseEntity } from 'src/common/entities/base-entity';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemSetupEntity } from './problem-setup.entity';
import { AdditionalTestFileEntity } from './additional-test-file.entity';

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

  @OneToMany(() => SubmissionEntity, (submission) => submission.language, {
    lazy: true,
  })
  readonly submissions?: SubmissionEntity[];

  @OneToMany(() => ProblemSetupEntity, (setup) => setup.language, {
    lazy: true,
  })
  readonly setups: ProblemSetupEntity[];

  @OneToMany(
    () => AdditionalTestFileEntity,
    (additionalTestFiles) => additionalTestFiles.language,
  )
  readonly additionalTestFiles: AdditionalTestFileEntity[];
}
