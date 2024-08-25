import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { v4 as uuidv4 } from 'uuid';
import { TestInput } from '../entities/test-input.entity';

@Injectable()
export class TestInputFactory implements EntityFactory<TestInput> {
  create(label: string, input: string): TestInput {
    const testInput = new TestInput(uuidv4(), label, input);

    return testInput;
  }
}
