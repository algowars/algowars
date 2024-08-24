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

  // Setup the testing module and inject dependencies before each test case
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemEntityRepository,
        {
          provide: getRepositoryToken(ProblemSchema),
          useClass: Repository, // Provide the TypeORM repository for ProblemSchema
        },
        ProblemSchemaFactory,
      ],
    }).compile();

    // Get instances of the repository and factory from the testing module
    repository = module.get<ProblemEntityRepository>(ProblemEntityRepository);
    problemRepository = module.get<Repository<ProblemSchema>>(
      getRepositoryToken(ProblemSchema),
    );
    problemSchemaFactory =
      module.get<ProblemSchemaFactory>(ProblemSchemaFactory);
  });

  // Check if the repository is defined (i.e., successfully instantiated)
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // Verify that the repository extends from BaseEntityRepository
  it('should extend BaseEntityRepository', () => {
    expect(repository).toBeInstanceOf(BaseEntityRepository);
  });

  // Test if the create method of the problem repository is called correctly
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

    // Mock the create method of ProblemSchemaFactory to return a ProblemSchema object
    jest.spyOn(problemSchemaFactory, 'create').mockReturnValue(problemSchema);

    // Mock the save method of the problem repository to resolve to the created ProblemSchema
    jest.spyOn(problemRepository, 'save').mockResolvedValue(problemSchema);

    // Call the create method of the repository
    await repository.create(problem);

    // Ensure the create method of the factory is called with the correct problem entity
    expect(problemSchemaFactory.create).toHaveBeenCalledWith(problem);

    // Ensure the save method of the problem repository is called with the correct ProblemSchema
    expect(problemRepository.save).toHaveBeenCalledWith(problemSchema);
  });
});
