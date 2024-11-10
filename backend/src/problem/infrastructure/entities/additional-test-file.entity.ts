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
  id: string;

  @Column({ nullable: false })
  fileName: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => LanguageEntity, (language) => language.additionalTestFiles, {
    nullable: false,
  })
  language: Language;

  @Column({ nullable: false })
  initialTestFile: string;

  @OneToMany(() => TestEntity, (test) => test.additionalTestFile, {
    lazy: true,
  })
  tests: TestEntity[];
}
