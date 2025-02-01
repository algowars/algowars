import { Injectable } from '@nestjs/common';
import { Account } from 'src/account/domain/account';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { IProblemRush, ProblemRush } from './game-rush';
import { Id } from 'src/common/domain/id';

export interface CreateGameRushOptions {
  id: string | Id;
  createdBy: Account;
}

@Injectable()
export class GameRushFactory implements EntityDomainFactory<ProblemRush> {
  create(options: CreateGameRushOptions): IProblemRush {
    const id = this.createId(options.id);

    return new ProblemRush();
  }

  private createId(id: string | Id): Id {
    if (typeof id === 'string') {
      return new IdImplementation(id);
    }

    return id;
  }
}
