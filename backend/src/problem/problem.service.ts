import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOptions } from 'src/common/query/query-options';
import { Player, Problem, ProblemSetup, Test } from 'src/data-model/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateProblemDto } from './dtos/create-problem.dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createProblemDto: CreateProblemDto,
    player: Player,
  ): Promise<Problem> {
    const createdProblem = new Problem();
    createdProblem.title = createProblemDto.title;
    createdProblem.question = createProblemDto.question;
    createdProblem.slug = createProblemDto.slug;
    createdProblem.createdBy = Promise.resolve(player);

    await this.problemRepository.save(createdProblem);

    const setup = new ProblemSetup();
    setup.problem = createdProblem;
    setup.languageId = createProblemDto.languageId;
    setup.initialCode = createProblemDto.initialCode;
    setup.testSetup = createProblemDto.testSetup;

    await this.dataSource.getRepository(ProblemSetup).save(setup);

    if (createProblemDto.tests && createProblemDto.tests.length) {
      for (const testDto of createProblemDto.tests) {
        const test = new Test();
        test.problem = createdProblem;
        test.expectedOutput = testDto.expectedOutput;
        test.order = createProblemDto.tests.indexOf(testDto);

        await this.dataSource.getRepository(Test).save(test);
      }
    }

    return this.problemRepository.findOne({
      where: { id: createdProblem.id },
      relations: ['setups', 'tests'],
    });
  }

  findOneById(id: number, { relations = [], select = {} }: QueryOptions = {}) {
    if (!id) {
      return null;
    }

    return this.problemRepository.findOne({
      where: {
        id,
      },
      select,
      relations,
    });
  }

  findOneBySlug(
    slug: string,
    { relations = [], select = {} }: QueryOptions = {},
  ) {
    if (!slug) {
      return null;
    }

    return this.problemRepository.findOne({
      where: {
        slug,
      },
      select,
      relations,
    });
  }

  findRandomProblem(disallowedIds: number[] = []): Promise<Problem> {
    const entityName = 'problem';
    const queryBuilder = this.problemRepository.createQueryBuilder(entityName);

    if (disallowedIds.length) {
      queryBuilder.where(`${entityName}.id NOT IN (:...ids)`, {
        ids: disallowedIds,
      });
    }

    return queryBuilder.orderBy('RANDOM()').getOne();
  }
}
