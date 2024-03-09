import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from './problem.entity';
import { TestInput } from './test-input.entity';
import { TestSetup } from './test-setup.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem, (problem) => problem.tests)
  problem: Problem;

  @Column({ nullable: false })
  expectedOutput: string;

  @OneToMany(() => TestInput, (testInput) => testInput.test)
  inputs: TestInput[];

  @Column({ nullable: false })
  test: string;

  @ManyToOne(() => TestSetup, (testSetup) => testSetup.tests)
  setup: TestSetup;
}
