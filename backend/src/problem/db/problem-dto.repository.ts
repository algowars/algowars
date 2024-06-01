import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemSchema } from './problem.schema';
import { Repository } from 'typeorm';
import { ProblemDto } from '../dto/problem.dto';
import { ProblemPagination } from '../dto/request/problem-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/response/pagination-response.dto';

@Injectable()
export class ProblemDtoRepository {
  constructor(
    @InjectRepository(ProblemSchema)
    private readonly problemRepository: Repository<ProblemSchema>,
  ) {}

  async findAll(): Promise<ProblemDto[]> {
    const problems = await this.problemRepository.find({});
    return problems.map((problem) => this.toProblemDto(problem));
  }

  async findAllPageable(
    problemPagination: ProblemPagination,
  ): Promise<PaginationResponse<ProblemDto>> {
    const entityName = 'Problem';
    const queryBuilder = this.problemRepository.createQueryBuilder(entityName);
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
