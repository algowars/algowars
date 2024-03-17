import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TestSetupService } from './test-setup.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { TestSetup } from 'src/data-model/entities';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';

@Controller('v1/test-setup')
export class TestSetupController {
  constructor(private readonly testSetupService: TestSetupService) {}

  @UseGuards(AuthorizationGuard)
  @Get('find')
  findTestSetup(): Promise<TestSetup> {
    return this.testSetupService.findOne();
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  getTestSetups(
    @Query()
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<TestSetup>> {
    return this.testSetupService.findAllPageable(paginationDto);
  }
}
