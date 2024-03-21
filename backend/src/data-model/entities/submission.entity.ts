import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { SubmissionToken } from './submission-token.entity';

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

  @Column({ nullable: false })
  code: string;

  @ManyToOne(() => Account, (account) => account.submissions)
  createdBy: Account;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
