import { BaseEntity } from 'src/common/entities/base-entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('problem-status')
export class ProblemStatusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;
}
