import { IdImplementation } from 'src/common/domain/id';
import { ProblemStatusEntity } from '../infrastructure/entities/problem-status.entity';
import { ProblemStatus, ProblemStatusImplementation } from './problem-status';

export type CreateProblemStatusOptions = Readonly<{
  id: number;
  description: string;
}>;

export class ProblemStatusFactory {
  create(options: CreateProblemStatusOptions): ProblemStatus {
    return new ProblemStatusImplementation({
      ...options,
      id: new IdImplementation(options.id),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
    });
  }

  createFromEntity(entity: ProblemStatusEntity): ProblemStatus {
    return new ProblemStatusImplementation({
      ...entity,
      id: new IdImplementation(entity.id),
    });
  }
}
