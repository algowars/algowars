import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lobby } from './lobby.entity';
import { GameSession } from './game-session.entity';
import { Player } from '../player/player.entity';
import { GameStatus } from './game-status.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Lobby, { cascade: true, nullable: false })
  lobby: Lobby;

  @OneToMany(() => GameSession, (gameSession) => gameSession.game)
  sessions: GameSession[];

  @Column({ nullable: false })
  duration: number; // in minutes

  @ManyToOne(() => GameStatus, (gameStatus) => gameStatus.games)
  status: GameStatus;

  @ManyToOne(() => Player, (player) => player.lobbies)
  createdBy: Player;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
