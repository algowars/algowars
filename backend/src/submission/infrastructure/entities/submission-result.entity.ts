import { BaseEntity } from 'src/common/entities/base-entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmissionEntity } from './submission.entity';
import { StatusEntity } from './status.entity';

@Entity('submission-result')
export class SubmissionResultEntity extends BaseEntity {
  @PrimaryColumn({ nullable: false, unique: true })
  readonly token: string;

  @Column({ nullable: true })
  readonly sourceCode: string;

  @Column({ nullable: true })
  readonly languageId: number;

  @Column({ nullable: true })
  readonly stdin?: string;

  @Column({ nullable: true })
  readonly stdout?: string;

  @Column({ nullable: true })
  readonly time: string;

  @Column({ nullable: true })
  readonly memory: number;

  @Column({ nullable: true })
  readonly stderr?: string | null;

  @Column({ nullable: true })
  readonly expectedOutput: string;

  @Column({ nullable: true })
  readonly message: string;

  @ManyToOne(() => SubmissionEntity, (submission) => submission.results)
  readonly submission: SubmissionEntity;

  @ManyToOne(() => StatusEntity, (status) => status.submissionResults)
  readonly status: StatusEntity;
}
