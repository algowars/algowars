import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from '../problem/problem.entity';
import { Submission } from '../submission/submission.entity';
import { Game } from '../battle/game.entity';
import { Lobby } from '../battle/lobby.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 50 })
  username: string;

  @Column()
  isGuest: boolean;

  @OneToMany(() => Problem, (problem) => problem.createdBy)
  problems: Promise<Problem[]>;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Promise<Submission>;

  @OneToMany(() => Game, (game) => game.createdBy)
  games: Promise<Game[]>;

  @ManyToOne(() => Lobby, (lobby) => lobby.players)
  lobbies: Promise<Lobby[]>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
