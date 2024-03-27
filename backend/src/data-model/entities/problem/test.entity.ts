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

  @Column({ nullable: false, type: 'text' })
  expectedOutput: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => Problem, (problem) => problem.tests)
  problem: Problem;

  @OneToMany(() => TestInput, (testInput) => testInput.test)
  inputs: TestInput[];
}
