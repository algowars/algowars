import { Test, TestingModule } from '@nestjs/testing';
import { CodeRushService } from './code-rush.service';

describe('CodeRushService', () => {
  let service: CodeRushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeRushService],
    }).compile();

    service = module.get<CodeRushService>(CodeRushService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
