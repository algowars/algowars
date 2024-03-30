import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Player, (player) => player.lobbies)
  @JoinTable()
  players: Player[];

  @Column({ nullable: false })
  maxPlayers: number;
}
