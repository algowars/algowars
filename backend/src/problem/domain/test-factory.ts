import { Inject } from '@nestjs/common';
import { Test, TestImplementation } from './test';
import { IdImplementation } from 'src/common/domain/id';
import { TestEntity } from '../infrastructure/entities/test.entity';
import {
  AdditionalTestFileFactory,
  CreateAdditionalTestFileOptions,
} from './additional-test-file-factory';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';

export type CreateTestOptions = Readonly<{
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
  additionalTestFile?: CreateAdditionalTestFileOptions;
}>;

export class TestFactory implements EntityDomainFactory<Test, TestEntity> {
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
    return new TestImplementation({
      ...testEntity,
      id: new IdImplementation(testEntity.id),
      additionalTestFile: testEntity.additionalTestFile
        ? this.additionalTestFileFactory.createFromEntity(
            testEntity.additionalTestFile,
          )
        : undefined,
    });
  }

  createEntityFromDomain(domain: Test): TestEntity {
    return {
      id: domain.getId().toString(),
      code: domain.getCode(),
      additionalTestFile: this.additionalTestFileFactory.createEntityFromDomain(
        domain.getAdditionalTestFile(),
      ),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
    };
  }
}
