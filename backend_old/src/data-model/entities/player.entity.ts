import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from './problem.entity';
import { Submission } from './submission.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false, unique: true, length: 50 })
  username: string;

  @Column()
  isGuest: boolean;

  @OneToMany(() => Problem, (problem) => problem.createdBy)
  problems: Promise<Problem[]>;

  @OneToMany(() => Submission, (submission) => submission.createdBy)
  submissions: Promise<Submission[]>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}