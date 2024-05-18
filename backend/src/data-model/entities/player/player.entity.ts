import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from '../problem/problem.entity';
import { Submission } from '../submission/submission.entity';
import { Rush } from '../game/rush/rush.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 50 })
  username: string;

  @Column({ type: 'timestamptz', nullable: true })
  usernameLastChanged?: Date | null;

  @Column({ nullable: true, length: 200 })
  bio?: string;

  @Column({ nullable: true, length: 100 })
  websiteUrl?: string;

  @Column({ nullable: true, length: 100 })
  location?: string;

  @OneToMany(() => Problem, (problem) => problem.createdBy)
  problems?: Promise<Problem[]>;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions?: Promise<Submission>;

  @OneToMany(() => Rush, (rush) => rush.player)
  rushes?: Promise<Rush[]>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  updateUsername(newUsername: string): void {
    if (!this.isAfterAllowedUsernameTime()) {
      throw new Error('Username can only be updated after 30 days.');
    }
    this.username = newUsername;
    this.usernameLastChanged = new Date();
  }

  private isAfterAllowedUsernameTime(): boolean {
    const currentDate = new Date();
    const lastChangedDate =
      this.usernameLastChanged || new Date(this.createdAt);

    const daysInMilliseconds =
      Player.USERNAME_DAYS_REQUIRED * 24 * 60 * 60 * 1000;

    if (
      currentDate.getTime() - lastChangedDate.getTime() >
      daysInMilliseconds
    ) {
      return true;
    }

    return false;
  }

  static USERNAME_DAYS_REQUIRED = 30; // days;
}
