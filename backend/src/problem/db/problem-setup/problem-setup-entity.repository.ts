import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemSetupSchema } from './problem-setup.schema';
import { ProblemSetup } from 'src/problem/entities/problem-setup.entity';
import { ProblemSetupSchemaFactory } from './problem-setup-schema.factory';

@Injectable()
export class ProblemSetupEntityRepository {
  constructor(
    @InjectRepository(ProblemSetupSchema)
    private readonly problemSetupRepository: Repository<ProblemSetupSchema>,
    private readonly problemSetupSchmaFactory: ProblemSetupSchemaFactory,
  ) {}

  async findByIds(
    problemId: string,
    languageId: number,
  ): Promise<ProblemSetup> {
    const foundSetup = await this.problemSetupRepository.findOne({
      where: {
        problemId,
        languageId,
      },
    });

    if (!foundSetup) {
      throw new NotFoundException(
        "Problem isn't available with this language id",
      );
    }

    return this.problemSetupSchmaFactory.createFromSchema(foundSetup);
  }
}
