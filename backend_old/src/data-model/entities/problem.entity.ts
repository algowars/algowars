import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProblemSetup } from './problem-setup.entity';
import { Test } from './test.entity';
import { Submission } from './submission.entity';
import { Player } from './player.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, type: 'text' })
  question: string;

  @Column({ nullable: false, length: 110, unique: true })
  slug: string;

  @ManyToOne(() => Player, (player) => player.problems)
  @JoinTable()
  createdBy: Promise<Player>;

  @OneToMany(() => ProblemSetup, (problemSetup) => problemSetup.problem, {
    cascade: true,
  })
  problemSetups: ProblemSetup[];

  @OneToMany(() => Test, (test) => test.problem, { cascade: true })
  tests: Promise<Test[]>;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Promise<Submission>;

  @OneToOne(() => Submission)
  solution: Promise<Submission>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
