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

@Entity('problem')
export class ProblemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  readonly title: string;

  @Column({ nullable: false, type: 'text' })
  readonly question: string;

  @Column({ nullable: false, length: 110, unique: true })
  readonly slug: string;

  @ManyToOne(() => AccountEntity, (account) => account.problems)
  readonly createdBy?: AccountEntity;

  @OneToMany(() => ProblemSetupEntity, (setup) => setup.problem)
  readonly setups: Promise<ProblemSetupEntity[]>;
}
