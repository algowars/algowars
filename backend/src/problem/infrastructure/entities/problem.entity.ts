import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { BaseEntity } from 'src/common/entities/base-entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProblemSetupEntity } from './problem-setup.entity';
import { ProblemStatus } from 'src/problem/domain/problem-status';

@Entity('problem')
export class ProblemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  title: string;

  @Column({ nullable: false, type: 'text' })
  question: string;

  @Column({ nullable: false, length: 110, unique: true })
  slug: string;

  @ManyToOne(() => AccountEntity, (account) => account.problems)
  createdBy?: AccountEntity;

  @OneToMany(() => ProblemSetupEntity, (setup) => setup.problem, {
    cascade: true,
    lazy: true,
  })
  setups?: Promise<ProblemSetupEntity[]>;

  @Column({
    type: 'enum',
    enum: ProblemStatus,
    default: ProblemStatus.PENDING,
  })
  status: ProblemStatus;
}
