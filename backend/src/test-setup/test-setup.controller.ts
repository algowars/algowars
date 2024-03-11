import { Controller, Get, UseGuards } from '@nestjs/common';
import { TestSetupService } from './test-setup.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { TestSetup } from 'src/data-model/entities';

@Controller('v1/test-setup')
export class TestSetupController {
  constructor(private readonly testSetupService: TestSetupService) {}

  @UseGuards(AuthorizationGuard)
  @Get('find')
  async findTestSetup(): Promise<TestSetup> {
    return this.testSetupService.findOne();
  }
}
