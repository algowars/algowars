import { PageableEntitySchema } from 'src/common/pagination/db/pageable-entity.schema';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProblemSetupSchema } from '../problem-setup/problem-setup.schema';
import { TestSchema } from '../test/test.schema';
import { TagSchema } from '../tag/tag.schema';

@Entity({ name: 'problem' })
export class ProblemSchema
  extends IdentifiableEntitySchema
  implements PageableEntitySchema {
  /**
   * The title of the problem.
   * This column is required and has a maximum length of 100 characters.
   */
  @Column({ nullable: false, length: 100 })
  readonly title: string;

  /**
   * The question or description of the problem.
   * This column is required and is of type 'text' to allow longer content.
   */
  @Column({ nullable: false, type: 'text' })
  readonly question: string;

  /**
   * A unique slug identifier for the problem.
   * This column is required, has a maximum length of 110 characters, and must be unique.
   */
  @Column({ nullable: false, length: 110, unique: true })
  readonly slug: string;

  /**
   * The rating of the problem.
   * This column is optional and stores a numerical rating.
   */
  @Column({ nullable: true })
  readonly rating: number;

  /**
   * A one-to-many relationship with ProblemSetupSchema.
   * The 'cascade' option allows related setups to be automatically saved when the problem is saved.
   */
  @OneToMany(() => ProblemSetupSchema, (setup) => setup.problem, {
    cascade: true,
  })
  readonly setups?: ProblemSetupSchema[];

  /**
   * A one-to-many relationship with TestSchema.
   * The 'cascade' option allows related tests to be automatically saved when the problem is saved.
   */
  @OneToMany(() => TestSchema, (test) => test.problem, {
    cascade: true,
  })
  readonly tests?: TestSchema[];

  /**
   * A many-to-many relationship with TagSchema.
   * Tags are required and the relationship is managed via a join table called 'problem_tags'.
   */
  @ManyToMany(() => TagSchema, { nullable: false })
  @JoinTable({ name: 'problem_tags' })
  readonly tags: TagSchema[];

  /**
   * The date and time when the problem was created.
   * This column is automatically populated with the current timestamp when a new problem is created.
   */
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  /**
   * The date and time when the problem was last updated.
   * This column is automatically populated with the current timestamp when a problem is updated.
   */
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
