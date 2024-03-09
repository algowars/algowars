import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Submission } from './submission.entity';

@Entity()
export class SubmissionToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Submission, (submission) => submission.tokens)
  submission: Submission;

  @Column({ nullable: false, unique: true })
  token: string;
}
