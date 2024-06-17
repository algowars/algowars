import { Test, TestingModule } from '@nestjs/testing';
import { ProblemEntityRepository } from './problem-entity.repository';
import { Repository } from 'typeorm';
import { ProblemSchema } from '../problem.schema';
import { Problem } from '../../entities/problem.entity';
import { ProblemSchemaFactory } from './problem-schema.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseEntityRepository } from 'src/db/base-entity.repository';

describe('ProblemEntityRepository', () => {
  let repository: ProblemEntityRepository;
  let problemRepository: Repository<ProblemSchema>;
  let problemSchemaFactory: ProblemSchemaFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemEntityRepository,
        {
          provide: getRepositoryToken(ProblemSchema),
          useClass: Repository,
        },
        ProblemSchemaFactory,
      ],
    }).compile();

    repository = module.get<ProblemEntityRepository>(ProblemEntityRepository);
    problemRepository = module.get<Repository<ProblemSchema>>(
      getRepositoryToken(ProblemSchema),
    );
    problemSchemaFactory =
      module.get<ProblemSchemaFactory>(ProblemSchemaFactory);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should extend BaseEntityRepository', () => {
    expect(repository).toBeInstanceOf(BaseEntityRepository);
  });

  it('should call the problem repository create method', async () => {
    const problem: Problem = new Problem(
      '1',
      'Title',
      'Question',
      'slug',
      5,
      new Date(),
      new Date(),
    );
    const problemSchema: ProblemSchema = {
      id: '1',
      title: 'Title',
      question: 'Question',
      slug: 'slug',
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(problemSchemaFactory, 'create').mockReturnValue(problemSchema);
    jest.spyOn(problemRepository, 'save').mockResolvedValue(problemSchema);

    await repository.create(problem);

    expect(problemSchemaFactory.create).toHaveBeenCalledWith(problem);
    expect(problemRepository.save).toHaveBeenCalledWith(problemSchema);
  });
});
