import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ProblemTest } from './problem-test.entity';
import { ProblemInitialInputs } from './problem-initial-inputs.entity';

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

  @ManyToMany(() => ProblemInitialInputs)
  @JoinTable()
  initialInputs: ProblemInitialInputs[];
}
