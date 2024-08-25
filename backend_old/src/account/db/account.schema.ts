import { PageableEntitySchema } from 'src/common/pagination/db/pageable-entity.schema';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { SubmissionResultSchema } from 'src/submission-result/db/submission-result.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'account' })
// AccountSchema represents the database schema for the 'account' table.
// It extends IdentifiableEntitySchema and implements PageableEntitySchema.
export class AccountSchema
  extends IdentifiableEntitySchema
  implements PageableEntitySchema {
  @Column({ nullable: false, unique: true, select: false })
  readonly sub: string; // 'sub' field is a unique identifier for the account, not selected by default.

  @Column({ nullable: false, unique: true, length: 50 })
  readonly username: string; // 'username' field is a unique and mandatory field with a maximum length of 50 characters.

  @Column({ type: 'timestamptz', nullable: true })
  usernameLastChanged?: Date | null; // 'usernameLastChanged' field stores the last change date of the username, can be null.

  @Column({ nullable: true, length: 200 })
  bio?: string; // 'bio' field is an optional field with a maximum length of 200 characters.

  @Column({ nullable: true, length: 100 })
  websiteUrl?: string; // 'websiteUrl' field is an optional field with a maximum length of 100 characters.

  @Column({ nullable: true, length: 100 })
  location?: string; // 'location' field is an optional field with a maximum length of 100 characters.

  @OneToMany(
    () => SubmissionResultSchema,
    (submissionResult) => submissionResult.createdBy,
  )
  submissions?: SubmissionResultSchema; // 'submissions' field is a one-to-many relationship with SubmissionResultSchema.

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date; // 'createdAt' field stores the creation timestamp of the account, defaulting to the current timestamp.

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date; // 'updatedAt' field stores the last update timestamp of the account, defaulting to the current timestamp.
}
