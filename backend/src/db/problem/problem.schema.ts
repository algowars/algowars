import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IdentifiableEntitySchema } from '../identifiable-entity.schema';

@Entity({ name: 'problem' })
export class ProblemSchema extends IdentifiableEntitySchema {
  @Column({ nullable: false, length: 100 })
  readonly title: string;

  @Column({ nullable: false, type: 'text' })
  readonly question: string;

  @Column({ nullable: false, length: 110, unique: true })
  readonly slug: string;

  @Column({ nullable: true })
  readonly rating: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
