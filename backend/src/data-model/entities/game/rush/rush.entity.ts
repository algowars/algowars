import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from '../game';
import { Player } from '../../player/player.entity';
import { RushProblem } from './rush-problem.entity';
import { RushDuration } from './rush-duration.entity';
import { Problem } from '../../problem/problem.entity';

@Entity()
export class Rush extends Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.rushes)
  player: Player;

  @OneToMany(() => RushProblem, (problem) => problem.rush, { cascade: true })
  problems: RushProblem[];

  @ManyToOne(() => RushDuration, (duration) => duration.rushes, {
    nullable: true,
  })
  duration: RushDuration;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  setProblems(problems: Problem[]): void {
    this.problems = problems.map((problem, index) => ({
      problemId: problem.id,
      problem,
      rushId: this.id,
      rush: this,
      order: index,
      submission: null,
    }));
  }

  startGame(offsetSeconds?: number): void {
    const currentDate = new Date();
    const millisecondsOffset = offsetSeconds * 1000; // Convert seconds to milliseconds
    this.startedAt = new Date(currentDate.getTime() + millisecondsOffset);
  }
}
