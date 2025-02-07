import { Id } from 'src/common/domain/id';
import { Game } from 'src/game/domain/game';

export interface GameQuery {
  findById(id: Id): Promise<Game>;
}
