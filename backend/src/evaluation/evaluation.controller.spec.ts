import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './services/evaluation.service';

describe('EvaluationController', () => {
  let controller: EvaluationController;

  // This block runs before each test case
  beforeEach(async () => {
    // Create a testing module with the necessary controllers and providers
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController], // Register the EvaluationController
      providers: [EvaluationService],      // Register the EvaluationService
    }).compile();

    // Get an instance of EvaluationController from the testing module
    controller = module.get<EvaluationController>(EvaluationController);
  });

  // A basic test to ensure the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined(); // Assert that the controller is defined (i.e., it exists and is correctly instantiated)
  });
});
