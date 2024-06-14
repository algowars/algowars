import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ProblemEntityRepository } from './db/problem-entity.repository';
import { ProblemSchemaFactory } from './db/problem-schema.factory';
import { ProblemCommandHandlers } from './commands';
import { ProblemEventHandlers } from './events';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemSchema } from './db/problem.schema';
import { ProblemQueryHandlers } from './queries';
import { ProblemDtoRepository } from './db/problem-dto.repository';
import { ProblemFactories } from './factories';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ProblemSchema])],
  controllers: [ProblemController],
  providers: [
    ProblemEntityRepository,
    ProblemDtoRepository,
    ProblemSchemaFactory,
    ...ProblemFactories,
    ...ProblemCommandHandlers,
    ...ProblemEventHandlers,
    ...ProblemQueryHandlers,
  ],
})
export class ProblemModule {}
