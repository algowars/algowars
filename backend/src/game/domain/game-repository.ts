import { Id } from 'src/common/domain/id';
import { IRushProblem } from './rush-problem';

export interface IGameRepository {
  newId(): Promise<Id>;
  saveRush(data: IRushProblem | IRushProblem[]): Promise<void>;
}
