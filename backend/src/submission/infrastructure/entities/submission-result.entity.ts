import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { SubmissionEntity } from './submission.entity';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export interface SubmissionResultEntityProperties {
  token: string;
  sourceCode?: string;
  languageId?: number;
  stdin?: string;
  stdout?: string;
  time?: string;
  memory?: number;
  stderr?: string;
  expectedOutput?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  version?: number;
  status: SubmissionStatus;
}

@Entity('submission-result')
export class SubmissionResultEntity extends BaseEntity {
  @PrimaryColumn({ nullable: false, unique: true })
  readonly token: string;

  @Column({ nullable: true })
  readonly sourceCode?: string;

  @Column({ nullable: true })
  readonly languageId?: number;

  @Column({ nullable: true })
  readonly stdin?: string;

  @Column({ nullable: true })
  readonly stdout?: string;

  @Column({ nullable: true })
  readonly time?: string;

  @Column({ nullable: true })
  readonly memory?: number;

  @Column({ nullable: true })
  readonly stderr?: string | null;

  @Column({ nullable: true })
  readonly expectedOutput?: string;

  @Column({ nullable: true })
  readonly message?: string;

  @ManyToOne(() => SubmissionEntity, (submission) => submission.results)
  readonly submission?: SubmissionEntity;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.IN_QUEUE,
  })
  readonly status: SubmissionStatus;

  constructor(submissionResultProperties: SubmissionResultEntityProperties) {
    super();
    Object.assign(this, submissionResultProperties);
  }
}
