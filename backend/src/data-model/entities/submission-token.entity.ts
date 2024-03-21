import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Submission } from './submission.entity';

@Entity()
export class SubmissionToken {
  @PrimaryColumn({ nullable: false, unique: true })
  token: string;

  @ManyToOne(() => Submission, (submission) => submission.tokens)
  submission: Submission;
}
