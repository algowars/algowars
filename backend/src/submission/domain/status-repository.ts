import { Status } from './status';

export interface StatusRepository {
  findByDescription(description: string): Promise<Status>;
}
