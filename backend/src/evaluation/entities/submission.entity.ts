import { AggregateRoot } from '@nestjs/cqrs';

export class Submission extends AggregateRoot {
  constructor(
    private readonly token: string,
    private readonly source_code: string,
    private readonly language_id: number,
    private readonly stdin: string | null,
    private readonly createdAt: Date,
    private readonly finishedAt: Date,
    private readonly time: string,
    private readonly memory: number,
  ) {
    super();
  }
}
