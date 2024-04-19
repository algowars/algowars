import { Test, TestingModule } from '@nestjs/testing';
import { CodeRushController } from './code-rush.controller';
import { CodeRushService } from './code-rush.service';

describe('CodeRushController', () => {
  let controller: CodeRushController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeRushController],
      providers: [CodeRushService],
    }).compile();

    controller = module.get<CodeRushController>(CodeRushController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
