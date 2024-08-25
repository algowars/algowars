import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { Problem } from '../entities/problem.entity';
import { ProblemCreatedEvent } from '../events/problem-created.event';
import { v4 as uuidv4 } from 'uuid';
import { ProblemEntityRepository } from '../db/problem/problem-entity.repository';
import { TestFactory } from './test.factory';
import { Test } from '../entities/test.entity';
import { ProblemSetupFactory } from './problem-setup.factory';
import { CreateProblemRequest } from '../dto/request/create-problem-request.dto';

@Injectable()
export class ProblemFactory implements EntityFactory<Problem> {
  constructor(
    private readonly problemEntityRepository: ProblemEntityRepository,
    private readonly problemSetupFactory: ProblemSetupFactory,
    private readonly testFactory: TestFactory,
  ) {}

  async create(createProblemRequest: CreateProblemRequest): Promise<Problem> {
    const problem = new Problem(
      uuidv4(),
      createProblemRequest.title,
      createProblemRequest.question,
      createProblemRequest.slug,
      createProblemRequest.rating,
      new Date(),
      new Date(),
    );

    const problemSetup = this.problemSetupFactory.create(
      problem.getId(),
      createProblemRequest.languageId,
      createProblemRequest.initialCode,
      createProblemRequest.testSetup,
    );
    problem.addSetup(await problemSetup);

    const tests = this.createTests(createProblemRequest.testInputs);
    problem.setTests(tests);

    await this.problemEntityRepository.create(problem);
    problem.apply(new ProblemCreatedEvent(problem.getId()));
    return problem;
  }

  private createTests(testInputsJSON: string): Test[] {
    return this.testFactory.createFromJSON(testInputsJSON);
  }
}
