import { Module } from '@nestjs/common';
import { TestSetupService } from './test-setup.service';
import { TestSetupController } from './test-setup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestSetup } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TestSetup])],
  controllers: [TestSetupController],
  providers: [TestSetupService],
})
export class TestSetupModule {}
