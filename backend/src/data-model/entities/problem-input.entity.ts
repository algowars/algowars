import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemSetup } from './problem-setup.entity';

@Entity()
export class ProblemInput {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: false })
  input: string;

  @ManyToOne(() => ProblemSetup, (problemSetup) => problemSetup.inputs)
  problemSetup: Promise<ProblemSetup>;
}
