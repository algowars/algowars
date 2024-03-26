import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lobby } from './lobby.entity';

@Entity()
export class LobbyStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  description: string;

  @Column({ nullable: false })
  color: string;

  @ManyToOne(() => Lobby, (lobby) => lobby.status)
  lobbies: Promise<Lobby>;
}
