import {
  Column,
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
import { Player } from './player.entity';

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

  @ManyToOne(() => Player, (player) => player.submissions)
  @JoinTable()
  createdBy: Player;

  @ManyToOne(() => Problem, (problem) => problem.submissions)
  problem: Problem;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
