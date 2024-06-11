import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { TestSchema } from './test.schema';
import { Test } from '../entities/test.entity';
import { TestInputSchemaFactory } from './test-input.schema.factory';

@Injectable()
export class TestSchemaFactory
  implements EntitySchemaFactory<TestSchema, Test>
{
  constructor(testInputSchemaFactory: TestInputSchemaFactory) {}

  create(test: Test): TestSchema {
    return {
      id: test.getId(),
      expectedOutput: test.getExpectedOutput(),
      order: test.getOrder(),
      inputs: test
        .getInputs()
        .map((input) => this.testInputSchemaFactory.create(input)),
    };
  }

  createFromSchema(entitySchema: TestSchema): Test {
    throw new Error('Method not implemented.');
  }
}
