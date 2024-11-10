import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemEntity } from './problem.entity';
import { Problem } from 'src/problem/domain/problem';

@Entity('problem-status')
export class ProblemStatusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => ProblemEntity, (problem) => problem.status, {
    lazy: true,
  })
  problems: Problem[];
}
