import { Injectable } from '@nestjs/common';
import { ProblemSchema } from './problem.schema';
import { ProblemDto } from '../dto/problem.dto';
import { Pageable } from 'src/common/pagination/dto/pageable';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { PageableRepository } from 'src/common/pagination/db/pageable.repository';
import { DataSource } from 'typeorm';

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

  async findProblemsPageable(
    problemPageable: Pageable,
  ): Promise<PaginationResponse<ProblemDto>> {
    const paginationResponse = await this.findPageable(problemPageable);

    paginationResponse.results = paginationResponse.results.map((result) =>
      this.toProblemDto(result),
    );

    return paginationResponse;
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
}
