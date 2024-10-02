import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('language')
export class LanguageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false, unique: true })
  readonly name: string;

  @Column({ default: false })
  readonly isArchived: boolean;

  @Column({ default: true })
  readonly isAvailable: boolean;

  @OneToMany(() => SubmissionEntity, (submission) => submission.language)
  readonly submissions?: Promise<SubmissionEntity[]>;
}
