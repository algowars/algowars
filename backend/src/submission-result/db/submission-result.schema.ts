import { PageableEntitySchema } from 'src/common/pagination/db/pageable-entity.schema';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { SubmissionResultTestcaseSchema } from './submission-result-testcase/submission-result-testcase.schema';

@Entity({ name: 'submission_result' })
export class SubmissionResultSchema
  extends IdentifiableEntitySchema
  implements PageableEntitySchema
{
  @OneToMany(
    () => SubmissionResultTestcaseSchema,
    (result) => result.submissionResult,
  )
  testcases: SubmissionResultTestcaseSchema;

  @Column({ nullable: false })
  langaugeId: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
