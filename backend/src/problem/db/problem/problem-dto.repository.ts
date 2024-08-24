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
import { TagSchema } from '../tag/tag.schema';
import { TagDto } from 'src/problem/dto/tag.dto';

@Injectable()
export class ProblemDtoRepository extends PageableRepository<ProblemSchema> {
  constructor(private readonly dataSource: DataSource) {
    super(ProblemSchema, dataSource);
  }

  /**
   * Finds all problems and returns them as an array of ProblemDto.
   * @returns A promise that resolves to an array of ProblemDto.
   */
  async findAll(): Promise<ProblemDto[]> {
    const problems = await this.find({});
    return problems.map((problem) => this.toProblemDto(problem));
  }

  /**
   * Finds a problem by its ID and returns it as a ProblemDto.
   * @param id - The ID of the problem to find.
   * @returns A promise that resolves to a ProblemDto.
   */
  async findById(id: string): Promise<ProblemDto> {
    const problem = await this.dataSource.getRepository(ProblemSchema).findOne({
      where: {
        id,
      },
    });

    return this.toProblemDto(problem);
  }

  /**
   * Finds a problem by its slug and language ID and returns its aggregate data.
   * Includes problem details, initial code, and test cases.
   * @param slug - The slug of the problem to find.
   * @param languageId - The language ID for the problem setup.
   * @returns A promise that resolves to a ProblemAggregateDto.
   * @throws NotFoundException if the problem or its setup is not found.
   */
  async findAggregateBySlug(
    slug: string,
    languageId: number,
  ): Promise<ProblemAggregateDto> {
    const problem = await this.dataSource.getRepository(ProblemSchema).findOne({
      where: {
        slug,
      },
      relations: ['tests', 'tests.inputs', 'tags'],
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

  /**
   * Finds problems with pagination support and returns a paginated response.
   * @param problemPageable - The pagination parameters.
   * @returns A promise that resolves to a PaginationResponse containing ProblemDto objects.
   */
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

  /**
   * Converts a ProblemSchema object to a ProblemDto object.
   * @param problem - The ProblemSchema to convert.
   * @returns A ProblemDto object.
   */
  private toProblemDto(problem: ProblemSchema): ProblemDto {
    return {
      id: problem.id,
      title: problem.title,
      question: problem.question,
      slug: problem.slug,
      rating: problem.rating,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt,
      tags: this.toTagDto(problem.tags ?? []),
    };
  }

  /**
   * Converts a TestSchema object to a TestDto object.
   * @param test - The TestSchema to convert.
   * @returns A TestDto object.
   */
  private toTestDto(test: TestSchema): TestDto {
    return {
      inputs: test?.inputs?.map((input) => this.toTestInputDto(input)) ?? [],
    };
  }

  /**
   * Converts an array of TagSchema objects to an array of TagDto objects.
   * @param tags - The array of TagSchema objects to convert.
   * @returns An array of TagDto objects.
   */
  private toTagDto(tags: TagSchema[]): TagDto[] {
    return tags.map((tag) => ({ name: tag.name }));
  }

  /**
   * Converts a TestInputSchema object to a TestInputDto object.
   * @param testInput - The TestInputSchema to convert.
   * @returns A TestInputDto object.
   */
  private toTestInputDto(testInput: TestInputSchema): TestInputDto {
    return {
      label: testInput.label,
      input: testInput.input,
    };
  }
}
