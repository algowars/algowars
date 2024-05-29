import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { Problem } from './entities/problem.entity';
import { ProblemCreatedEvent } from './events/problem-created.event';
import { v4 as uuidv4 } from 'uuid';
import { ProblemEntityRepository } from './db/problem-entity.repository';

@Injectable()
export class ProblemFactory implements EntityFactory<Problem> {
  constructor(
    private readonly problemEntityRepository: ProblemEntityRepository,
  ) {}

  async create(
    title: string,
    question: string,
    slug: string,
    rating: number,
  ): Promise<Problem> {
    const problem = new Problem(
      uuidv4(),
      title,
      question,
      slug,
      rating,
      new Date(),
      new Date(),
    );
    await this.problemEntityRepository.create(problem);
    problem.apply(new ProblemCreatedEvent(problem.getId()));
    return problem;
  }
}
