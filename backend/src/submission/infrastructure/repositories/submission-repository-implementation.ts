import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';

export class SubmissionRepositoryImplementation
  implements SubmissionRepository
{
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }
}
