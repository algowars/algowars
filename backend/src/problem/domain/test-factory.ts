import { Inject } from '@nestjs/common';
import { Test, TestImplementation } from './test';
import { IdImplementation } from 'src/common/domain/id';
import { TestEntity } from '../infrastructure/entities/test.entity';
import { AdditionalTestFile } from './additional-test-file';
import { AdditionalTestFileFactory } from './additional-test-file-factory';

type CreateTestOptions = Readonly<{
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
  additionalTestFile: AdditionalTestFile;
}>;

export class TestFactory {
  @Inject()
  private readonly additionalTestFileFactory: AdditionalTestFileFactory;
  create(options: CreateTestOptions): Test {
    return new TestImplementation({
      ...options,
      id: new IdImplementation(options.id),
    });
  }

  createFromEntity(testEntity: TestEntity): Test {
    return this.create({
      ...testEntity,
      additionalTestFile: this.additionalTestFileFactory.createFromEntity(
        testEntity.additionalTestFile,
      ),
    });
  }
}
