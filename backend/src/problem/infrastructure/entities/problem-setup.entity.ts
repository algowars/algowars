import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ProblemEntity } from './problem.entity';
import { LanguageEntity } from './language.entity';
import { TestEntity } from './test.entity';

@Entity('problem-setup')
export class ProblemSetupEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  problemId: string;

  @PrimaryColumn()
  languageId: number;

  @ManyToOne(() => ProblemEntity, (problem) => problem.setups)
  problem?: ProblemEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.setups)
  language?: LanguageEntity;

  @OneToMany(() => TestEntity, (test) => test.setups, { cascade: true })
  tests: TestEntity[];

  @Column({ nullable: false, type: 'text' })
  initialCode: string;
}
