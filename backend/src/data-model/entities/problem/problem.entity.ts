import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Player } from '../player/player.entity';
import { ProblemSetup } from './problem-setup.entity';
import { Test } from './test.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, type: 'text' })
  question: string;

  @Column({ nullable: false, length: 110, unique: true })
  slug: string;

  @ManyToOne(() => Player, (player) => player.problems)
  @JoinTable()
  createdBy: Promise<Player>;

  @OneToMany(() => ProblemSetup, (setup) => setup.problem)
  setups: Promise<ProblemSetup>;

  @OneToMany(() => Test, (test) => test.problem)
  tests: Promise<Test[]>;

  @Column({ nullable: true })
  rating: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
