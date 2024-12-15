import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindProblemBySlugRequestParam } from './dto/request/find-problem-by-slug-request-param.dto';
import { FindProblemBySlugQuery } from '../application/queries/find-problem-by-slug-query/find-problem-by-slug.query';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';

describe('ProblemController', () => {
  let controller: ProblemController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(AccountAuthorizationGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ProblemController>(ProblemController);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a proble by the slug', async () => {
    const slug = 'test-slug';
    const dto: FindProblemBySlugRequestParam = { slug };

    const mockResponse = {
      id: 'b520f989-78b4-4d48-95b6-03fc63a8d108',
      title: 'Test Problem',
      slug,
    };
    (queryBus.execute as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.findProblemBySlug(dto);

    expect(queryBus.execute).toHaveBeenCalledTimes(1);
    expect(queryBus.execute).toHaveBeenCalledWith(
      new FindProblemBySlugQuery(slug),
    );

    expect(result).toEqual(mockResponse);
  });

  it('should return the proper error if no problem is found by slug', async () => {
    const slug = 'invalid-slug';
    const dto: FindProblemBySlugRequestParam = { slug };

    (queryBus.execute as jest.Mock).mockRejectedValue(
      new Error('Problem not found'),
    );

    try {
      await controller.findProblemBySlug(dto);
    } catch (e) {
      expect(queryBus.execute).toHaveBeenCalledWith(
        new FindProblemBySlugQuery(slug),
      );

      expect(e.message).toBe('Problem not found');
    }
  });
});
