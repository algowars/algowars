import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestInput } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TestInputService {
  constructor(
    @InjectRepository(TestInput)
    private readonly testInputRepository: Repository<TestInput>,
  ) {}

  findByProblemId(id: number, relations: string[] = []) {
    return this.testInputRepository.find({
      where: {
        id,
      },
      relations,
    });
  }
}
