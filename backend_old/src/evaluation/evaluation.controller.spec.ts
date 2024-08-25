import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

describe('EvaluationController', () => {
  let controller: EvaluationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController],
      providers: [EvaluationService],
    }).compile();

    controller = module.get<EvaluationController>(EvaluationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a submission and return the id', async () => {
    const createEvaluationTests: any = {
      sourceCode: '',
    };

    const id = await controller.runTests(createEvaluationTests);

    expect(typeof id).toBe('string');
  });

  it('should return an error if no sourceCode is provided in running the tests', async (done) => {
    const createEvaluationTests: any = {};

    try {
      await controller.runTests(createEvaluationTests);
    } catch (error) {
      expect(error.message).toContain('sourceCode');
      done();
    }
  });

  it('should return an error if no problemSlug is provided in running the tests', async (done) => {
    const createEvaluationTests: any = {
      sourceCode: 'valid code',
    };

    try {
      await controller.runTests(createEvaluationTests);
    } catch (error) {
      expect(error.message).toContain('problemSlug');
      done();
    }
  });

  it('should return an error if languageId is not provided in running the tests', async (done) => {
    const createEvaluationTests: any = {
      sourceCode: 'valid code',
      problemSlug: 'some-problem',
    };

    try {
      await controller.runTests(createEvaluationTests);
    } catch (error) {
      expect(error.message).toContain('languageId');
      done();
    }
  });

  it('should return an error if the language id is not an allowed language id', async (done) => {
    const invalidLanguageId = 100_000;
    const createEvaluationTests: any = {
      sourceCode: 'valid code',
      problemSlug: 'some-problem',
      languageId: invalidLanguageId,
    };

    try {
      await controller.runTests(createEvaluationTests);
    } catch (error) {
      expect(error.message).toContain('language id is not allowed');
      done();
    }
  });
});
