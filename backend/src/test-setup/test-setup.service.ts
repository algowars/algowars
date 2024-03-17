import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { TestSetup } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TestSetupService {
  constructor(
    @InjectRepository(TestSetup)
    private readonly testSetupRepository: Repository<TestSetup>,
  ) {}

  findOne() {
    return this.testSetupRepository.findOne({});
  }

  findAllPageable(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<TestSetup>> {
    const entityName = 'test_setup';
    const queryBuilder =
      this.testSetupRepository.createQueryBuilder(entityName);

    return Pagination.paginateWithQueryBuilder<TestSetup>(
      queryBuilder,
      paginationDto,
    );
  }
}
