import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { ProblemEntity } from 'src/problem/infrastructure/entities/problem.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdditionalTestFileEntity } from './additional-test-file.entity';
import { ProblemSetupEntity } from 'src/problem/infrastructure/entities/problem-setup.entity';

@Entity('test')
export class TestEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  readonly code: string;

  @ManyToOne(
    () => AdditionalTestFileEntity,
    (additionalTestFile) => additionalTestFile.tests,
  )
  readonly additionalTestFile: AdditionalTestFileEntity;

  @ManyToOne(() => ProblemSetupEntity, (setup) => setup.language)
  readonly setups: Promise<ProblemSetupEntity[]>;
}
