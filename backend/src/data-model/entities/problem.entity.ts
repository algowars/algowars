import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { ProblemSolution } from './problem-solution.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, length: 750 })
  question: string;

  @Column({ nullable: false, length: 110, unique: true })
  titleSlug: string;

  @ManyToOne(() => Account, (account) => account.problems)
  @JoinTable()
  createdBy: Promise<Account>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => ProblemSolution)
  solution: Promise<ProblemSolution>;
}
