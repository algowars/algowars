import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemCommand } from './create-problem.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { Transactional } from 'lib/transactional';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { AdditionalTestFileRepository } from 'src/problem/domain/additional-test-file-repository';
import { ProblemStatusRepository } from 'src/problem/domain/problem-status-repository';

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
  @Inject(InjectionToken.PROBLEM_STATUS_REPOSITORY)
  private readonly problemStatusRepository: ProblemStatusRepository;

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

    const problemStatus = await this.problemStatusRepository.findById(
      CreateProblemHandler.PROBLEM_STATUS_PENDING_ID,
    );

    if (!problemStatus) {
      throw new NotFoundException('Problem Status not found');
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
          languageId: language.getId().toNumber(),
          initialCode: command.createProblemRequest.initialCode,
          tests: [
            {
              id: await this.problemRepository.newId(),
              code: command.createProblemRequest.test,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              version: 0,
              additionalTestFile: {
                id: additionalTestFile.getId(),
                fileName: additionalTestFile.getFileName(),
                language: additionalTestFile.getLanguage(),
                initialTestFile: additionalTestFile.getInitialTestFile(),
                name: additionalTestFile.getName(),
              },
            },
          ],
        },
      ],
      status: problemStatus,
    });

    await this.problemRepository.save(problem);

    problem.commit();

    return problem.getId();
  }

  private static PROBLEM_STATUS_PENDING_ID = 1;
}
