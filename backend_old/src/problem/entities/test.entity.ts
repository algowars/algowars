import { AggregateRoot } from '@nestjs/cqrs';
import { TestInput } from './test-input.entity';

export class Test extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly expectedOutput: string,
    private readonly order: number,
    private readonly inputs: TestInput[],
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getExpectedOutput() {
    return this.expectedOutput;
  }

  getOrder() {
    return this.order;
  }

  getInputs() {
    return [...this.inputs];
  }
}
