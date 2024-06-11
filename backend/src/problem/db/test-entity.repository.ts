import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { TestSchema } from './test.schema';
import { Test } from '../entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestSchemaFactory } from './test-schema.factory';

@Injectable()
export class TestEntityRepository extends BaseEntityRepository<
  TestSchema,
  Test
> {
  constructor(
    @InjectRepository(TestSchema)
    testRepository: Repository<TestSchema>,
    testSchemaFactory: TestSchemaFactory,
  ) {
    super(testRepository, testSchemaFactory);
  }
}
