import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSubmissionResultTestcasesCommand } from './update-submission-result-testcases.command';
import { SubmissionResultTestcaseDto } from 'src/submission-result/dto/submission-result-testcase.dto';
import { SubmissionResultTestcaseEntityRepository } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase-entity.repository';
import { SubmissionResultTestcase } from 'src/submission-result/entities/submission-result-testcase.entity';
import { UpdateSubmissionResultTestcase } from 'src/submission-result/dto/update-submission-result-testcase.dto';

@CommandHandler(UpdateSubmissionResultTestcasesCommand)
export class UpdateSubmissionResultTestcasesHandler
  implements ICommandHandler<UpdateSubmissionResultTestcasesCommand>
{
  constructor(
    private readonly submissionResultTestcaseEntityRepository: SubmissionResultTestcaseEntityRepository,
  ) {}

  async execute({
    updateSubmissionResultTestcases,
  }: UpdateSubmissionResultTestcasesCommand): Promise<
    SubmissionResultTestcaseDto[]
  > {
    const submissionResultTestcases =
      await this.submissionResultTestcaseEntityRepository.findByTokens(
        updateSubmissionResultTestcases.map((testcase) => testcase.token),
      );

    submissionResultTestcases.forEach((testcase) =>
      this.updateTestcase(
        testcase,
        updateSubmissionResultTestcases.find(
          (updateTestcase) => updateTestcase.token === testcase.getToken(),
        ),
      ),
    );

    return (
      await this.submissionResultTestcaseEntityRepository.updateBatch(
        submissionResultTestcases,
      )
    ).map(this.toSubmissionResultTestcaseDto);
  }

  private updateTestcase(
    submissionResultTestcase: SubmissionResultTestcase,
    updateSubmissionResultTestcase: UpdateSubmissionResultTestcase,
  ): void {
    submissionResultTestcase.setSourceCode(
      updateSubmissionResultTestcase.sourceCode,
    );
    submissionResultTestcase.setStdin(updateSubmissionResultTestcase.stdin);
    submissionResultTestcase.setStdout(updateSubmissionResultTestcase.stdout);
    submissionResultTestcase.setExpectedOutput(
      updateSubmissionResultTestcase.expectedOutput,
    );
    submissionResultTestcase.setStatusId(
      updateSubmissionResultTestcase.statusId,
    );
    submissionResultTestcase.setStderr(updateSubmissionResultTestcase.stderr);
  }

  private toSubmissionResultTestcaseDto(
    submissionResultTestcase: SubmissionResultTestcase,
  ): SubmissionResultTestcaseDto {
    return {
      id: submissionResultTestcase.getId(),
      order: submissionResultTestcase.getOrder(),
      isRandomTestcase: submissionResultTestcase.getIsRandomTestcase(),
      token: submissionResultTestcase.getToken(),
      sourceCode: submissionResultTestcase.getSourceCode(),
      stdin: submissionResultTestcase.getStdin(),
      stdout: submissionResultTestcase.getStdout(),
      expectedOutput: submissionResultTestcase.getExpectedOutput(),
      statusId: submissionResultTestcase.getStatusId(),
      stderr: submissionResultTestcase.getStderr(),
    };
  }
}
