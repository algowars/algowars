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
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  sub: string;

  @Column({ nullable: false, unique: true, length: 50 })
  username: string;

  @OneToMany(() => Problem, (problem) => problem.createdBy)
  problems: Promise<Problem[]>;

  @OneToMany(() => Submission, (submission) => submission.createdBy)
  submissions: Promise<Submission[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
