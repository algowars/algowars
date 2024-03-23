import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerSubmission } from './player-submissoin.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => PlayerSubmission, (submission) => submission.player)
  submissions: Promise<PlayerSubmission[]>;
}
