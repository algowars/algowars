import { Injectable, NotFoundException } from '@nestjs/common';
import { Pageable } from 'src/common/pagination/dto/pageable';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { PageableRepository } from 'src/common/pagination/db/pageable.repository';
import { DataSource } from 'typeorm';
import { ProblemSchema } from './problem.schema';
import { ProblemDto } from 'src/problem/dto/problem.dto';
import { ProblemAggregateDto } from 'src/problem/dto/problem-aggregate.dto';
import { ProblemSetupSchema } from '../problem-setup/problem-setup.schema';
import { TestSchema } from '../test/test.schema';
import { TestDto } from 'src/problem/dto/test.dto';
import { TestInputSchema } from '../test/test-input.schema';
import { TestInputDto } from 'src/problem/dto/test-input.dto';

@Injectable()
export class ProblemDtoRepository extends PageableRepository<ProblemSchema> {
  constructor(private readonly dataSource: DataSource) {
    super(ProblemSchema, dataSource);
  }

  async findAll(): Promise<ProblemDto[]> {
    const problems = await this.find({});
    return problems.map((problem) => this.toProblemDto(problem));
  }

  async findById(id: string): Promise<ProblemDto> {
    const problem = await this.dataSource.getRepository(ProblemSchema).findOne({
      where: {
        id,
      },
    });

    return this.toProblemDto(problem);
  }

  async findAggregateBySlug(
    slug: string,
    languageId: number,
  ): Promise<ProblemAggregateDto> {
    const problem = await this.dataSource.getRepository(ProblemSchema).findOne({
      where: {
        slug,
      },
      relations: ['tests', 'tests.inputs'],
    });

    if (!problem) {
      throw new NotFoundException(`Problem by the slug: ${slug} not found`);
    }

    const setup = await this.dataSource
      .getRepository(ProblemSetupSchema)
      .findOne({
        where: {
          problemId: problem.id,
          languageId,
        },
      });

    if (!setup) {
      throw new NotFoundException(
        'Problem is not compatible with the given language',
      );
    }

    return {
      problem: this.toProblemDto(problem),
      initialCode: setup.initialCode,
      testCases: problem?.tests?.map((test) => this.toTestDto(test)),
    };
  }

  async findProblemsPageable(
    problemPageable: Pageable,
  ): Promise<PaginationResponse<ProblemDto>> {
    const paginationResponse = await this.findPageable(problemPageable);

    const results = paginationResponse.results.map((result) =>
      this.toProblemDto(result),
    );

    return {
      ...paginationResponse,
      results,
    };
  }

  private toProblemDto(problem: ProblemSchema): ProblemDto {
    return {
      id: problem.id,
      title: problem.title,
      question: problem.question,
      slug: problem.slug,
      rating: problem.rating,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt,
    };
  }

  private toTestDto(test: TestSchema): TestDto {
    return {
      inputs: test?.inputs?.map((input) => this.toTestInputDto(input)) ?? [],
    };
  }

  private toTestInputDto(testInput: TestInputSchema): TestInputDto {
    return {
      label: testInput.label,
      input: testInput.input,
    };
  }
}
