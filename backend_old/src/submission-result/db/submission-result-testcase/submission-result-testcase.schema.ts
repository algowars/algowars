import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SubmissionResultSchema } from '../submission-result.schema';

@Entity({ name: 'submission_result_testcase' })
export class SubmissionResultTestcaseSchema extends IdentifiableEntitySchema {
  @ManyToOne(() => SubmissionResultSchema, (result) => result.testcases)
  submissionResult?: SubmissionResultSchema;

  @Column({ nullable: false })
  readonly order: number;

  @Column({ default: false })
  readonly isRandomTestcase: boolean;

  @Column({ nullable: false, unique: true })
  readonly token: string;

  @Column({ nullable: true, type: 'text' })
  readonly sourceCode: string;

  @Column({ nullable: true, type: 'text' })
  readonly stdin: string;

  @Column({ nullable: true, type: 'text' })
  readonly stdout: string;

  @Column({ nullable: true, type: 'text' })
  readonly expectedOutput: string;

  @Column({ nullable: true })
  readonly statusId: number;

  @Column({ nullable: true, type: 'text' })
  readonly stderr: string;
}
