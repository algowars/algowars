import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Submission } from '../../submission/submission.entity';
import { Problem } from '../../problem/problem.entity';
import { Rush } from './rush.entity';

@Entity()
export class RushProblem {
  @PrimaryColumn()
  problemId: number;

  @PrimaryColumn()
  rushId: string;

  @ManyToOne(() => Problem, (problem) => problem.id)
  @JoinColumn({ name: 'id' })
  problem: Problem;

  @ManyToOne(() => Rush, (rush) => rush.problems)
  rush: Rush;

  @OneToOne(() => Submission, { nullable: true })
  submission: Submission;

  @Column({ nullable: false })
  order: number;
}
