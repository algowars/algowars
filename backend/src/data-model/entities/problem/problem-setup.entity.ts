import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Problem } from './problem.entity';
import { Test } from './test.entity';

@Entity()
export class ProblemSetup {
  @PrimaryColumn()
  problemId: number;

  @PrimaryColumn()
  languageId: number;

  @ManyToOne(() => Problem, (problem) => problem.setups)
  problem: Problem;

  @Column({ nullable: false, type: 'text' })
  initialCode: string;

  @Column({ nullable: false, type: 'text' })
  testSetup: string;

  @OneToMany(() => Test, (test) => test.setup)
  tests: Promise<Test[]>;
}
