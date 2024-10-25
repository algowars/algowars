import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { SubmissionEntity } from './submission.entity';
import { StatusEntity } from './status.entity';

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

  @ManyToOne(() => StatusEntity, (status) => status.submissionResults)
  readonly status?: StatusEntity;

  constructor(submissionResultProperties: SubmissionResultEntityProperties) {
    super();
    Object.assign(this, submissionResultProperties);
  }
}
