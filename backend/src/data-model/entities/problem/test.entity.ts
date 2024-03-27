import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProblemSetup } from './problem-setup.entity';
import { TestInput } from './test-input.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  expectedOutput: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => ProblemSetup, (setup) => setup.tests)
  setup: ProblemSetup;

  @OneToMany(() => TestInput, (testInput) => testInput.test)
  inputs: TestInput[];
}
