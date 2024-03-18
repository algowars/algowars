import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProblemSetup {
  @PrimaryColumn()
  problemId: number;

  @PrimaryColumn()
  languageId: number;

  @Column({ type: 'text', nullable: false })
  code: string;
}
