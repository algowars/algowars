import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
