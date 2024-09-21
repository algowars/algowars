import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 40 })
  sub: string;

  @Column({ nullable: false, length: 16 })
  username: string;
}
