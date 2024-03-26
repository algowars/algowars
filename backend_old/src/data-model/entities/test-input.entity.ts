import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class TestInput {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Test, (test) => test.inputs)
  test: Promise<Test>;

  @Column({ nullable: false, length: 50 })
  label: string;

  @Column({ nullable: false, length: 255 })
  input: string;
}
