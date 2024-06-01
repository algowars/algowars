import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('ProblemController', () => {
  let controller: ProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [CommandBus, QueryBus],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
