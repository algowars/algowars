import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { LanguageEntity } from 'src/problem/infrastructure/entities/language.entity';
import { Language } from 'src/problem/domain/language';
import { BaseEntity } from 'src/common/entities/base-entity';

@Entity('additional-test-files')
export class AdditionalTestFileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  readonly fileName: string;

  @ManyToOne(() => LanguageEntity, (language) => language.additionalTestFiles, {
    nullable: false,
  })
  readonly language: Language;

  @Column({ nullable: false })
  readonly initialTestFile: string;

  @OneToMany(() => TestEntity, (test) => test.additionalTestFile)
  readonly tests: Promise<TestEntity[]>;
}