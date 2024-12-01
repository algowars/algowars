import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdditionalTestFileEntity } from './additional-test-file.entity';
import { ProblemSetupEntity } from 'src/problem/infrastructure/entities/problem-setup.entity';
import { BaseEntity } from 'src/common/entities/base-entity';

@Entity('test')
export class TestEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  code: string;

  @ManyToOne(
    () => AdditionalTestFileEntity,
    (additionalTestFile) => additionalTestFile.tests,
    {
      nullable: true,
      eager: true,
    },
  )
  additionalTestFile: AdditionalTestFileEntity | null;

  @ManyToOne(() => ProblemSetupEntity, (setup) => setup.language, {
    lazy: true,
  })
  setups?: ProblemSetupEntity[];
}
