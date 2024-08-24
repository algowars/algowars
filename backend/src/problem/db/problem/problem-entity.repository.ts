import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { Problem } from '../../entities/problem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemSchemaFactory } from './problem-schema.factory';
import { ProblemSchema } from './problem.schema';

@Injectable()
export class ProblemEntityRepository extends BaseEntityRepository<
  ProblemSchema,
  Problem
> {
  /**
   * Constructor that injects the ProblemSchema repository and factory.
   * It calls the constructor of the BaseEntityRepository with these dependencies.
   * 
   * @param problemRepository - The TypeORM repository for ProblemSchema entities.
   * @param problemSchemaFactory - Factory for converting between Problem and ProblemSchema.
   */
  constructor(
    @InjectRepository(ProblemSchema)
    problemRepository: Repository<ProblemSchema>,
    problemSchemaFactory: ProblemSchemaFactory,
  ) {
    super(problemRepository, problemSchemaFactory);
  }

  /**
   * Finds a problem by its slug.
   * 
   * @param slug - The slug of the problem to find.
   * @returns A promise that resolves to a Problem entity.
   */
  async findBySlug(slug: string): Promise<Problem> {
    const foundProblem = await this.entityRepository.findOne({
      where: {
        slug,
      },
    });

    // Convert the found ProblemSchema entity into a Problem entity using the factory
    return this.entitySchemaFactory.createFromSchema(foundProblem);
  }

  /**
   * Finds a problem by its slug, including related entities.
   * This method fetches the problem along with its related setups, tests, and test inputs.
   * 
   * @param slug - The slug of the problem to find.
   * @returns A promise that resolves to a Problem entity with relations.
   */
  async findBySlugWithRelations(slug: string): Promise<Problem> {
    const foundProblem = await this.entityRepository.findOne({
      where: {
        slug,
      },
      relations: ['setups', 'tests', 'tests.inputs'], // Include related entities
    });

    // Convert the found ProblemSchema entity with relations into a Problem entity using the factory
    return this.entitySchemaFactory.createFromSchema(foundProblem);
  }
}
