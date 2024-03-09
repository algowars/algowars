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
import { Account } from './account.entity';
import { Test } from './test.entity';
import { Submission } from './submission.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, length: 750 })
  question: string;

  @Column({ nullable: false, length: 110, unique: true })
  slug: string;

  @ManyToOne(() => Account, (account) => account.problems)
  @JoinTable()
  createdBy: Promise<Account>;

  @OneToMany(() => Test, (test) => test.problem, { cascade: true })
  tests: Promise<Test[]>;

  @OneToOne(() => Submission)
  solution: Promise<Submission>;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Promise<Submission>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
