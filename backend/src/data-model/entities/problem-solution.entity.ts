import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProblemSolution {
  @PrimaryColumn()
  languageId: number;

  @PrimaryColumn()
  problemId: number;

  @Column({ nullable: false })
  solution: string;
}
