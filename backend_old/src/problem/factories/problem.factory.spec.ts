import { Test, TestingModule } from '@nestjs/testing';
import { ProblemEntityRepository } from '../db/problem/problem-entity.repository';
import { ProblemFactory } from './problem.factory';
import { ProblemEntityRepositoryMock } from '../db/problem/problem-entity.repository.mock';
import { ProblemCreatedEvent } from '../events/problem-created.event';

describe('ProblemFactory', () => {
  let problemFactory: ProblemFactory;
  let problemEntityRepository: ProblemEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemFactory,
        {
          provide: ProblemEntityRepository,
          useValue: ProblemEntityRepositoryMock.mockProblemEntityRepository(),
        },
      ],
    }).compile();

    problemFactory = module.get<ProblemFactory>(ProblemFactory);
    problemEntityRepository = module.get<ProblemEntityRepository>(
      ProblemEntityRepository,
    );
  });

  it('should be defined', () => {
    expect(problemFactory).toBeDefined();
  });

  it('should create a problem with an id', async () => {
    const title = 'Sample Title';
    const question = 'Sample Question';
    const slug = 'sample-slug';
    const rating = 5;

    const problem = await problemFactory.create(title, question, slug, rating);

    expect(problem.getId()).toBeDefined();

    expect(problemEntityRepository.create).toHaveBeenCalledTimes(1);
    expect(problemEntityRepository.create).toHaveBeenCalledWith(problem);

    const events = problem.getUncommittedEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ProblemCreatedEvent);
    expect((events[0] as ProblemCreatedEvent).problemId).toBeDefined();
  });
});
