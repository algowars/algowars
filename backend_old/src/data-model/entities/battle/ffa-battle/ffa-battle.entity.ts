import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lobby } from '../lobby.entity';
import { Problem } from '../../problem.entity';

@Entity()
export class FFABattle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Lobby)
  lobby: Lobby;

  @ManyToMany(() => Problem)
  problems: Problem[];

  // duration of battle in minutes
  @Column({ nullable: false, default: 15 })
  duration: number;
}
