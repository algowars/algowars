import { PageableEntitySchema } from 'src/common/pagination/db/pageable-entity.schema';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { Entity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity({ name: 'tag' })
export class TagSchema
  extends IdentifiableEntitySchema
  implements PageableEntitySchema
{
  @Column({ nullable: false, length: 25 })
  readonly name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
