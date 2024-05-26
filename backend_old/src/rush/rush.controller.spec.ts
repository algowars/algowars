import { Test, TestingModule } from '@nestjs/testing';
import { RushController } from './rush.controller';
import { RushService } from './rush.service';

describe('RushController', () => {
  let controller: RushController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RushController],
      providers: [RushService],
    }).compile();

    controller = module.get<RushController>(RushController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
