import { Inject } from '@nestjs/common';
import { EntityId, readConnection, writeConnection } from 'lib/database.module';
import { Problem } from 'src/problem/domain/problem';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemEntity } from '../entities/problem.entity';
import { ProblemSetup } from 'src/problem/domain/problem-setup';
import { ProblemSetupEntity } from '../entities/problem-setup.entity';
import { Test } from 'src/problem/domain/test';
import { TestEntity } from '../entities/test.entity';
import { AdditionalTestFileEntity } from '../entities/additional-test-file.entity';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionEntity } from 'src/submission/infrastructure/entities/submission.entity';

export class ProblemRepositoryImplementation implements ProblemRepository {
  @Inject() private readonly problemFactory: ProblemFactory;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Problem | Problem[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    await writeConnection.manager.getRepository(ProblemEntity).save(entities);
  }

  async findById(id: string): Promise<Problem | null> {
    const entity = await readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Problem): ProblemEntity {
    const problem = new ProblemEntity();
    problem.id = model.getId().toString();

    const createdBy = new AccountEntity();
    createdBy.id = model.getCreatedBy().getId().toString();

    problem.createdBy = createdBy;
    problem.title = model.getTitle();
    problem.question = model.getQuestion();
    problem.slug = model.getSlug();
    problem.setups = Promise.resolve(
      model.getSetups().map((setup) => this.setupModelToEntity(setup)),
    );
    problem.status = model.getStatus();

    return problem;
  }

  private setupModelToEntity(model: ProblemSetup): ProblemSetupEntity {
    const setup = new ProblemSetupEntity();
    setup.problemId = model.getProblemId().toString();
    setup.languageId = model.getLanguageId().toNumber();
    setup.initialCode = model.getInitialCode();
    setup.tests = model.getTests().map((test) => this.testModelToEntity(test));
    setup.solution = this.solutionToEntity(model.getSolution());

    return setup;
  }

  private solutionToEntity(model: Submission): SubmissionEntity {
    const solution = new SubmissionEntity();
    solution.id = model.getId().toString();
    return solution;
  }

  private testModelToEntity(model: Test): TestEntity {
    const test = new TestEntity();
    test.id = model.getId().toString();
    test.code = model.getCode();

    const additionalTestFile = new AdditionalTestFileEntity();
    additionalTestFile.id = model.getAdditionalTestFile().getId().toString();
    additionalTestFile.fileName = model.getAdditionalTestFile().getFileName();
    additionalTestFile.name = model.getAdditionalTestFile().getName();
    additionalTestFile.initialTestFile = model
      .getAdditionalTestFile()
      .getInitialTestFile();

    test.additionalTestFile = additionalTestFile;

    return test;
  }

  private entityToModel(entity: ProblemEntity): Problem {
    return this.problemFactory.createFromEntity(entity);
  }
}
