import { AggregateRoot } from '@nestjs/cqrs';

export class Submission extends AggregateRoot {
  constructor(
    // A unique token identifying the submission
    private readonly token: string,

    // The source code submitted for execution
    private readonly source_code: string,

    // The ID representing the programming language used
    private readonly language_id: number,

    // The standard input provided to the program during execution, can be null
    private readonly stdin: string | null,

    // The date and time when the submission was created
    private readonly createdAt: Date,

    // The date and time when the submission finished executing
    private readonly finishedAt: Date,

    // The time taken for the submission to execute
    private readonly time: string,

    // The amount of memory used during execution
    private readonly memory: number,
  ) {
    // Calls the constructor of the base class AggregateRoot
    super();
  }
}
