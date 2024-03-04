import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProblemTest } from './problem-test.entity';
import { ProblemInput } from './problem-input.entity';

@Entity()
export class ProblemSetup {
  @PrimaryColumn()
  problemId: number;

  @PrimaryColumn()
  languageId: number;

  @Column({ nullable: false })
  code: string;

  @OneToMany(() => ProblemTest, (problemTest) => problemTest.problemSetup)
  tests: ProblemTest[];

  @OneToMany(() => ProblemInput, (problemInput) => problemInput.input)
  inputs: ProblemInput[];
}
