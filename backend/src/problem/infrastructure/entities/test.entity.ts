import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdditionalTestFileEntity } from './additional-test-file.entity';
import { ProblemSetupEntity } from 'src/problem/infrastructure/entities/problem-setup.entity';
import { BaseEntity } from 'src/common/entities/base-entity';

@Entity('test')
export class TestEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  readonly code: string;

  @ManyToOne(
    () => AdditionalTestFileEntity,
    (additionalTestFile) => additionalTestFile.tests,
    {
      nullable: true,
    },
  )
  readonly additionalTestFile: AdditionalTestFileEntity | null;

  @ManyToOne(() => ProblemSetupEntity, (setup) => setup.language)
  readonly setups: Promise<ProblemSetupEntity[]>;
}
