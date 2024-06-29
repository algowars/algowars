import { PageableEntitySchema } from 'src/common/pagination/db/pageable-entity.schema';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { SubmissionResultTestcaseSchema } from './submission-result-testcase/submission-result-testcase.schema';
import { AccountSchema } from 'src/db';

@Entity({ name: 'submission_result' })
export class SubmissionResultSchema
  extends IdentifiableEntitySchema
  implements PageableEntitySchema
{
  @OneToMany(
    () => SubmissionResultTestcaseSchema,
    (result) => result.submissionResult,
    {
      cascade: true,
    },
  )
  testcases: SubmissionResultTestcaseSchema[];

  @Column({ nullable: false })
  langaugeId: number;

  @ManyToOne(() => AccountSchema, (account) => account.submissions, {
    nullable: false,
  })
  createdBy: AccountSchema;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
