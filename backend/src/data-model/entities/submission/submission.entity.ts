import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from '../player/player.entity';
import { Problem } from '../problem/problem.entity';
import { Language } from '../language.entity';
import { Status } from './status.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  sourceCode: string;

  @ManyToOne(() => Language, { nullable: false })
  language: Language;

  @Column('text', { nullable: true })
  stdout: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.IN_QUEUE,
  })
  status: Status;

  @ManyToOne(() => Player, (player) => player.submissions)
  createdBy: Player;

  @ManyToOne(() => Problem, (problem) => problem.submissions)
  problem: Problem;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
