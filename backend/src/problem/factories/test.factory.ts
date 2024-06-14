import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { v4 as uuidv4 } from 'uuid';
import { TestInput } from '../entities/test-input.entity';
import { Test } from '../entities/test.entity';
import { TestInputFactory } from './test-input.factory';

@Injectable()
export class TestFactory implements EntityFactory<Test> {
  constructor(private readonly testInputFactory: TestInputFactory) {}

  async create(
    expectedOutput: string,
    order: number,
    inputs: TestInput[],
  ): Promise<Test> {
    const test = new Test(uuidv4(), expectedOutput, order, inputs);

    return test;
  }

  createFromJSON(testInputs: string): Test[] {
    const parsedInputs = JSON.parse(testInputs);

    const tests = [];

    if (!Array.isArray(parsedInputs)) {
      throw new BadRequestException('Tests is not of type array');
    }

    for (let index = 0; index < parsedInputs.length; index++) {
      const test = parsedInputs[index];

      if (!Array.isArray(test?.inputs)) {
        throw new BadRequestException('Test inputs is not of type array');
      }

      if (!test?.expectedOutput) {
        throw new BadRequestException('Test requires an expected output');
      }

      const testInputs = [];

      for (const testInput of test?.inputs) {
        const createdInput = this.testInputFactory.create(
          testInput.label,
          testInput.input,
        );

        testInputs.push(createdInput);
      }

      const createdTest = new Test(
        uuidv4(),
        test.expectedOutput,
        index,
        testInputs,
      );

      tests.push(createdTest);
    }

    return tests;
  }
}
