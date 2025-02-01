import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { GameMode } from './game-mode';
import { Account } from 'src/account/domain/account';

export interface RushProperties extends BaseDomainProperties {
  gameMode: GameMode;
  createdBy: Account;
}

export interface Rush extends BaseDomainAggregateRoot {
  getGameMode(): GameMode;
  getCreatedBy(): Account;
}

export class RushImplementation
  extends BaseDomainAggregateRootImplementation
  implements Rush
{
  private readonly gameMode: GameMode;
  private readonly createdBy: Account;
}
