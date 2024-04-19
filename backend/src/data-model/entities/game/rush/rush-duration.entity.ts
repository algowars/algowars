import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rush } from './rush.entity';

@Entity()
export class RushDuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  minutes: number; // in minutes

  @OneToMany(() => Rush, (rush) => rush.duration)
  rushes: Promise<Rush[]>;
}
