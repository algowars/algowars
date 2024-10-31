import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProblemEntity } from './problem.entity';
import { LanguageEntity } from './language.entity';

@Entity('problem-setup')
export class ProblemSetupEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  readonly problemId: string;

  @PrimaryColumn()
  readonly languageId: number;

  @ManyToOne(() => ProblemEntity, (problem) => problem.setups)
  readonly problem: ProblemEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.setups)
  readonly language: LanguageEntity;

  @Column({ nullable: false, type: 'text' })
  readonly initialCode: string;
}
