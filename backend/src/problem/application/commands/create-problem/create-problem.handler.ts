import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemCommand } from './create-problem.command';
import { Id } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { Transactional } from 'lib/transactional';

@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand, Id>
{
  @Inject(InjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;
  @Inject()
  private readonly problemFactory: ProblemFactory;

  @Transactional()
  async execute(command: CreateProblemCommand): Promise<Id> {
    const problem = this.problemFactory.create({
      ...command.createProblemRequest,
      id: await this.problemRepository.newId(),
      createdBy: command.account,
    });

    await this.problemRepository.save(problem);

    problem.commit();

    return problem.getId();
  }
}
