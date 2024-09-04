import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';

describe('ProblemController', () => {
  let controller: ProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a problem', () => {});

  it('should get a problem by the slug', () => {});

  it('should return the proper error if no problem is found by slug', () => {});

  it('should get the problems paginated', () => {});
});
