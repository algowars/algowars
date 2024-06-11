import { IdentifiableEntitySchema } from 'src/db/identifiable-entity.schema';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TestSchema } from './test.schema';

@Entity({ name: 'test-input' })
export class TestInputSchema extends IdentifiableEntitySchema {
  @ManyToOne(() => TestSchema, (test) => test.inputs)
  readonly test?: Promise<TestSchema>;

  @Column({ nullable: false, length: 50 })
  readonly label: string;

  @Column({ nullable: false, length: 255 })
  readonly input: string;
}
