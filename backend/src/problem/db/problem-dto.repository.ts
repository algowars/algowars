import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemSchema } from './problem.schema';
import { Repository } from 'typeorm';
import { ProblemDto } from '../dto/problem.dto';
import { Pageable } from 'src/common/pagination/dto/pageable';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';

@Injectable()
export class ProblemDtoRepository {
  constructor(
    @InjectRepository(ProblemSchema)
    private readonly problemRepository: PageableRepository<ProblemSchema>,
  ) {}

  async findAll(): Promise<ProblemDto[]> {
    const problems = await this.problemRepository.find({});
    return problems.map((problem) => this.toProblemDto(problem));
  }

  async findProblemsPageable(
    problemPageable: Pageable,
  ): Promise<PaginationResponse<ProblemDto>> {
    const paginationResponse = await this.
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
