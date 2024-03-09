import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class TestSetup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  header: string;

  @OneToMany(() => Test, (test) => test.setup)
  tests: Promise<Test[]>;
}
