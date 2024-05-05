import { Test, TestingModule } from '@nestjs/testing';
import { RushService } from './rush.service';

describe('RushService', () => {
  let service: RushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RushService],
    }).compile();

    service = module.get<RushService>(RushService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
