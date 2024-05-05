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

@Entity()
export class Rush extends Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.rushes)
  player: Player;

  @Column({ default: false })
  hasStarted: boolean;

  @OneToMany(() => RushProblem, (problem) => problem.rush, { cascade: true })
  problems: RushProblem[];

  @ManyToOne(() => RushDuration, (duration) => duration.rushes, {
    nullable: true,
  })
  duration: RushDuration;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  startGame(): void {
    this.hasStarted = true;
  }

  endGame(): void {
    this.hasStarted = false;
  }
}
