import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionResultController } from './submission-result.controller';
import { SubmissionResultService } from './submission-result.service';

describe('SubmissionResultController', () => {
  let controller: SubmissionResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionResultController],
      providers: [SubmissionResultService],
    }).compile();

    controller = module.get<SubmissionResultController>(SubmissionResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
