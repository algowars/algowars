import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { IGameRepository } from 'src/game/domain_old/game-repository';
import { IRushProblem } from 'src/game/domain_old/rush-problem';

export class GameRepository implements IGameRepository {
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }
  saveRush(data: IRushProblem | IRushProblem[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
