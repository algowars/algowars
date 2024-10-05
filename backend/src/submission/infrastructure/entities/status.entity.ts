import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubmissionResultEntity } from './submission-result.entity';

@Entity('status')
export class StatusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false, unique: true })
  readonly description: string;

  @OneToMany(
    () => SubmissionResultEntity,
    (submissionResult) => submissionResult.status,
  )
  readonly submissionResults: SubmissionResultEntity[];
}
