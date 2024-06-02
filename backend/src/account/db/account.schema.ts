import { PageableEntitySchema } from 'src/common/pagination/db/pageable-entity.schema';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountSchema
  extends IdentifiableEntitySchema
  implements PageableEntitySchema
{
  @Column({ nullable: false, unique: true, select: false })
  readonly sub: string;

  @Column({ nullable: false, unique: true, length: 50 })
  readonly username: string;

  @Column({ type: 'timestamptz', nullable: true })
  usernameLastChanged?: Date | null;

  @Column({ nullable: true, length: 200 })
  bio?: string;

  @Column({ nullable: true, length: 100 })
  websiteUrl?: string;

  @Column({ nullable: true, length: 100 })
  location?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
