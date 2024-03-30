import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class GameStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  status: string;

  @OneToMany(() => Game, (game) => game.status)
  games: Promise<Game[]>;
}
