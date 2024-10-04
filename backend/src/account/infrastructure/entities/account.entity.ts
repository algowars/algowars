import { BaseEntity } from 'src/common/entities/base-entity';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 40, unique: true })
  sub: string;

  @Column({ nullable: false, length: 16, unique: true })
  username: string;

  @OneToMany(() => SubmissionEntity, (submission) => submission.createdBy)
  readonly submissions?: Submission[];
}
