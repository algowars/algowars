import { Test, TestingModule } from '@nestjs/testing';
import { ProblemSchemaFactory } from './problem-schema.factory';
import { Problem } from 'src/problem/entities/problem.entity';
import { ProblemSchema } from './problem.schema';

describe('ProblemSchemaFactory', () => {
  let factory: ProblemSchemaFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemSchemaFactory],
    }).compile();

    factory = module.get<ProblemSchemaFactory>(ProblemSchemaFactory);
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  describe('create', () => {
    it('should create a ProblemSchema from a Problem', () => {
      const problem: Problem = new Problem(
        '1',
        'Title',
        'Question',
        'slug',
        5,
        new Date('2023-01-01'),
        new Date('2023-01-01'),
      );

      const problemSchema = factory.create(problem);

      expect(problemSchema).toEqual({
        id: '1',
        title: 'Title',
        question: 'Question',
        slug: 'slug',
        rating: 5,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      });
    });
  });

  describe('createFromSchema', () => {
    it('should create a Problem from a ProblemSchema', () => {
      const problemSchema: ProblemSchema = {
        id: '1',
        title: 'Title',
        question: 'Question',
        slug: 'slug',
        rating: 5,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      };

      const problem = factory.createFromSchema(problemSchema);

      expect(problem).toBeInstanceOf(Problem);
      expect(problem.getId()).toBe('1');
      expect(problem.getTitle()).toBe('Title');
      expect(problem.getQuestion()).toBe('Question');
      expect(problem.getSlug()).toBe('slug');
      expect(problem.getRating()).toBe(5);
      expect(problem.getCreatedAt()).toEqual(new Date('2023-01-01'));
      expect(problem.getUpdatedAt()).toEqual(new Date('2023-01-01'));
    });
  });
});
