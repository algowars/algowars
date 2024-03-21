import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Problem } from './problem.entity';

@Entity()
export class ProblemSetup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  languageId: number;

  @Column({ nullable: false, type: 'text' })
  initialCode: string;

  @Column({ nullable: false, type: 'text' })
  testSetup: string;

  @ManyToOne(() => Problem, (problem) => problem.problemSetups)
  problem: Promise<Problem>;
}
