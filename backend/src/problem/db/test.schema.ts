import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { ProblemSchema } from './problem.schema';
import { TestInputSchema } from './test-input.schema';

@Entity({ name: 'test' })
export class TestSchema extends IdentifiableEntitySchema {
  @Column({ nullable: false, type: 'text' })
  readonly expectedOutput: string;

  @Column({ nullable: false })
  readonly order: number;

  @ManyToOne(() => ProblemSchema, (problem) => problem.tests)
  readonly problem: ProblemSchema;

  @OneToMany(() => TestInputSchema, (testInput) => testInput.test)
  readonly inputs: TestInputSchema[];
}
