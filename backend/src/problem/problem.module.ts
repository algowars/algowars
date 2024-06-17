import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ProblemEntityRepository } from './db/problem/problem-entity.repository';
import { ProblemSchemaFactory } from './db/problem/problem-schema.factory';
import { ProblemCommandHandlers } from './commands';
import { ProblemEventHandlers } from './events';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemQueryHandlers } from './queries';
import { ProblemFactories } from './factories';
import { ProblemSchema } from './db/problem/problem.schema';
import { ProblemDtoRepository } from './db/problem/problem-dto.repository';
import { ProblemSetupEntityRepository } from './db/problem-setup/problem-setup-entity.repository';
import { ProblemSetupSchemaFactory } from './db/problem-setup/problem-setup-schema.factory';
import { TestEntityRepository } from './db/test/test-entity.repository';
import { TestSchemaFactory } from './db/test/test-schema.factory';
import { TestInputSchemaFactory } from './db/test/test-input.schema.factory';
import { ProblemSetupSchema } from './db/problem-setup/problem-setup.schema';
import { TestSchema } from './db/test/test.schema';
import { TestInputSchema } from './db/test/test-input.schema';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      ProblemSchema,
      ProblemSetupSchema,
      TestSchema,
      TestInputSchema,
    ]),
  ],
  controllers: [ProblemController],
  providers: [
    ProblemEntityRepository,
    ProblemDtoRepository,
    ProblemSchemaFactory,
    ProblemSetupEntityRepository,
    ProblemSetupSchemaFactory,
    ProblemSetupEntityRepository,
    TestEntityRepository,
    TestSchemaFactory,
    TestEntityRepository,
    TestInputSchemaFactory,
    ...ProblemFactories,
    ...ProblemCommandHandlers,
    ...ProblemEventHandlers,
    ...ProblemQueryHandlers,
  ],
})
export class ProblemModule {}
