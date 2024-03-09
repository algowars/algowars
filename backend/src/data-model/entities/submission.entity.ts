import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { SubmissionToken } from './submission-token.entity';
import { Problem } from './problem.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => SubmissionToken,
    (submissionToken) => submissionToken.submission,
    {
      cascade: true,
    },
  )
  tokens: SubmissionToken[];

  @ManyToOne(() => Problem, (problem) => problem.submissions)
  problem: Problem;

  @ManyToOne(() => Account, (account) => account.submissions)
  @JoinTable()
  createdBy: Promise<Account>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
