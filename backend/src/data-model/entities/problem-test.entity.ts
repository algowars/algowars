import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemSetup } from './problem-setup.entity';

@Entity()
export class ProblemTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  test: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => ProblemSetup, (problemSetup) => problemSetup.tests)
  problemSetup: ProblemSetup;
}
