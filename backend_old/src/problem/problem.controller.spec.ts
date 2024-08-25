import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProblemsPaginationQuery } from './queries/problems-pagination/problems-pagination.query';
import { ProblemPagination } from './dto/request/problem-pagination.dto';
import { ProblemDto } from './dto/problem.dto';
import { CreateProblemRequest } from './dto/request/create-problem-request.dto';
import { CreateProblemCommand } from './commands/create-problem/create-problem.command';
import { UpdateTitleRequest } from './dto/request/update-title-request.dto';
import { UpdateTitleCommand } from './commands/update-title/update-title.command';

describe('ProblemController', () => {
  let controller: ProblemController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get problems pageable', async () => {
    const problemPagination: ProblemPagination = {
      page: 1,
      size: 10,
      timestamp: new Date(),
    };
    const problems: ProblemDto[] = [
      {
        id: '1',
        title: 'Problem 1',
        question: 'test',
        slug: 'slug',
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Problem 2',
        question: 'test',
        slug: 'slug',
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(queryBus, 'execute').mockResolvedValue(problems);

    const result = await controller.getProblems(problemPagination);

    expect(result).toEqual(problems);
    expect(queryBus.execute).toHaveBeenCalledWith(
      new ProblemsPaginationQuery(problemPagination),
    );
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('should create a problem', async () => {
    const createProblemRequest: CreateProblemRequest = {
      title: 'New Problem',
      question: 'This is a question?',
      slug: 'slug',
      rating: 100,
    };

    const executeSpy = jest
      .spyOn(commandBus, 'execute')
      .mockResolvedValue(undefined);

    await controller.createProblem(createProblemRequest);

    expect(executeSpy).toHaveBeenCalledWith(
      new CreateProblemCommand(createProblemRequest),
    );
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should update a problems title', async () => {
    const problemId = '1';
    const updateTitleRequest: UpdateTitleRequest = { title: 'Updated Title' };

    const executeSpy = jest
      .spyOn(commandBus, 'execute')
      .mockResolvedValue(undefined);

    await controller.updateProblemTitle(problemId, updateTitleRequest);

    expect(executeSpy).toHaveBeenCalledWith(
      new UpdateTitleCommand(problemId, updateTitleRequest.title),
    );
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });
});
