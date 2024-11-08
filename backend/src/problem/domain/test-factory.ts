import { Inject } from '@nestjs/common';
import { Test, TestImplementation } from './test';
import { IdImplementation } from 'src/common/domain/id';
import { TestEntity } from '../infrastructure/entities/test.entity';
import { AdditionalTestFile } from './additional-test-file';
import {
  AdditionalTestFileFactory,
  CreateAdditionalTestFileOptions,
} from './additional-test-file-factory';

export type CreateTestOptions = Readonly<{
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
  additionalTestFile?: CreateAdditionalTestFileOptions;
}>;

export class TestFactory {
  @Inject()
  private readonly additionalTestFileFactory: AdditionalTestFileFactory;
  create(options: CreateTestOptions): Test {
    return new TestImplementation({
      ...options,
      id: new IdImplementation(options.id),
      additionalTestFile: options.additionalTestFile
        ? this.additionalTestFileFactory.create(options.additionalTestFile)
        : undefined,
    });
  }

  createFromEntity(testEntity: TestEntity): Test {
    return this.create({
      ...testEntity,
      additionalTestFile: testEntity.additionalTestFile
        ? this.additionalTestFileFactory.createFromEntity(
            testEntity.additionalTestFile,
          )
        : undefined,
    });
  }
}
