import { AggregateRoot } from '@nestjs/cqrs';

export class TestInput extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly label: string,
    private readonly input: string,
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getLabel() {
    return this.label;
  }

  getInput() {
    return this.input;
  }
}
