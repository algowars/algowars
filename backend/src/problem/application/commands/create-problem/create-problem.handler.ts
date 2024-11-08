import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemCommand } from './create-problem.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { Transactional } from 'lib/transactional';
import { ProblemSetupFactory } from 'src/problem/domain/problem-setup-factory';
import { TestFactory } from 'src/problem/domain/test-factory';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { AdditionalTestFileRepository } from 'src/problem/domain/additional-test-file-repository';

@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand, Id>
{
  @Inject(InjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;
  @Inject()
  private readonly problemFactory: ProblemFactory;
  @Inject(InjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject(InjectionToken.ADDITIONAL_TEST_FILE_REPOSITORY)
  private readonly additionalTestFileRepository: AdditionalTestFileRepository;

  @Transactional()
  async execute(command: CreateProblemCommand): Promise<Id> {
    const language = await this.languageRepository.findById(
      command.createProblemRequest.languageId,
    );

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    const additionalTestFile = await this.additionalTestFileRepository.findById(
      command.createProblemRequest.additionalTestFileId,
    );

    if (!additionalTestFile) {
      throw new NotFoundException('Additional Test File not found');
    }
    // create submission and run submission

    // save problem as pending

    // return id
    const problemId = await this.problemRepository.newId();

    const problem = this.problemFactory.create({
      ...command.createProblemRequest,
      id: problemId,
      createdBy: command.account,
      setups: [
        {
          problemId,
          languageId: command.createProblemRequest.languageId,
          initialCode: command.createProblemRequest.initialCode,
          language: language ? language : undefined,
          tests: [
            {
              id: await this.problemRepository.newId(),
              code: command.createProblemRequest.test,
              additionalTestFile: additionalTestFile
                ? additionalTestFile
                : undefined,
            },
          ],
        },
      ],
    });

    await this.problemRepository.save(problem);

    problem.commit();

    return problem.getId();
  }
}
