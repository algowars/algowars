import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, length: 750 })
  body: string;

  @ManyToOne(() => Account, (account) => account.problems)
  @JoinTable()
  createdBy: Promise<Account>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
