import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { TestSchema } from './test.schema';
import { TestInputSchemaFactory } from './test-input.schema.factory';
import { Test } from 'src/problem/entities/test.entity';

@Injectable()
export class TestSchemaFactory
  implements EntitySchemaFactory<TestSchema, Test>
{
  constructor(
    private readonly testInputSchemaFactory: TestInputSchemaFactory,
  ) {}

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

  createFromSchema(testSchema: TestSchema): Test {
    let inputs = [];

    if (testSchema.inputs) {
      inputs = testSchema.inputs.map((input) =>
        this.testInputSchemaFactory.createFromSchema(input),
      );
    }

    return new Test(
      testSchema.id,
      testSchema.expectedOutput,
      testSchema.order,
      inputs,
    );
  }
}
