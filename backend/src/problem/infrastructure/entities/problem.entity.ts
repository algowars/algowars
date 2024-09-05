import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProblemEntity extends BaseEntity {
  @PrimaryColumn({ type: 'binary', length: '16' })
  id: Buffer;

  @Column({ nullable: false, length: 100 })
  readonly title: string;

  @Column({ nullable: false, type: 'text' })
  readonly question: string;

  @Column({ nullable: false, length: 110, unique: true })
  readonly slug: string;
}
