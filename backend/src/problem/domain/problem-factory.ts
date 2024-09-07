import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Problem, ProblemImplementation, ProblemProperties } from './problem';
import { ProblemEntity } from '../infrastructure/entities/problem.entity';

type CreateProblemOptions = Readonly<{
  id: string;
  title: string;
  slug: string;
  question: string;
}>;

export class ProblemFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateProblemOptions): Problem {
    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  createFromEntity(problemEntity: ProblemEntity): Problem {
    return this.create(problemEntity);
  }

  reconstituteFromEntity(problemEntity: ProblemEntity): Problem {
    return this.reconstitute(problemEntity);
  }

  reconstitute(properties: ProblemProperties): Problem {
    return this.eventPublisher.mergeObjectContext(
      new ProblemImplementation(properties),
    );
  }
}
