import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class TestInput {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  label: string;

  @Column({ nullable: false })
  input: string;

  @ManyToOne(() => Test, (test) => test.inputs)
  test: Test;
}
