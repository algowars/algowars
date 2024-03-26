import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LobbyStatus } from './lobby-status.entity';

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => LobbyStatus, (lobbyStatus) => lobbyStatus.lobbies)
  status: LobbyStatus;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
