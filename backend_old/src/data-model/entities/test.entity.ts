import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestInput } from './test-input.entity';
import { Problem } from './problem.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => TestInput, (testInput) => testInput.test)
  inputs: TestInput[];

  @Column({ nullable: false })
  expectedOutput: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => Problem, (problem) => problem.tests)
  problem: Problem;
}
