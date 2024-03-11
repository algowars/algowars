import { Module } from '@nestjs/common';
import { TestSetupService } from './test-setup.service';
import { TestSetupController } from './test-setup.controller';

@Module({
  controllers: [TestSetupController],
  providers: [TestSetupService],
})
export class TestSetupModule {}
