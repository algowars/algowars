import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProblemSchema } from '../problem/problem.schema';

@Entity({ name: 'problem_setup' })
export class ProblemSetupSchema {
  @PrimaryColumn()
  readonly problemId: string;

  @PrimaryColumn()
  readonly languageId: number;

  @ManyToOne(() => ProblemSchema, (problem) => problem.setups)
  readonly problem: ProblemSchema;

  @Column({ nullable: false, type: 'text' })
  readonly initialCode: string;

  @Column({ nullable: false, type: 'text' })
  readonly testSetup: string;
}
