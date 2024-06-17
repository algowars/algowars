import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { TestInputSchema } from './test-input.schema';
import { TestInput } from 'src/problem/entities/test-input.entity';

@Injectable()
export class TestInputSchemaFactory
  implements EntitySchemaFactory<TestInputSchema, TestInput>
{
  create(testInput: TestInput): TestInputSchema {
    return {
      id: testInput.getId(),
      label: testInput.getLabel(),
      input: testInput.getInput(),
    };
  }

  createFromSchema(testInputSchema: TestInputSchema): TestInput {
    return new TestInput(
      testInputSchema.id,
      testInputSchema.label,
      testInputSchema.input,
    );
  }
}
